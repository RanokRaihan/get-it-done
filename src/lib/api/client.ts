import { ApiError } from "./errors";
import { clearTokens, getAuthToken, refreshAccessToken } from "./tokens";
import type { RequestConfig } from "./types";
import {
  buildUrl,
  DEFAULT_TIMEOUT,
  isRetryableError,
  RETRY_DELAY,
  sleep,
} from "./utils";

async function request<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  body?: unknown,
  config: RequestConfig = {},
): Promise<T> {
  const {
    params,
    headers: customHeaders,
    timeout = DEFAULT_TIMEOUT,
    tags,
    revalidate,
    retries = 0,
    skipAuth = false,
    cache,
    skipRefresh = false,
  } = config;

  const url = buildUrl(endpoint, params);
  console.log(url);
  const buildHeaders = async (): Promise<Record<string, string>> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (!skipAuth) {
      const token = await getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    if (customHeaders) {
      Object.assign(
        headers,
        customHeaders instanceof Headers
          ? Object.fromEntries(customHeaders.entries())
          : customHeaders,
      );
    }

    return headers;
  };

  const buildFetchOptions = async (): Promise<
    RequestInit & { next?: { tags?: string[]; revalidate?: number | false } }
  > => {
    const headers = await buildHeaders();

    const fetchOptions: RequestInit & {
      next?: { tags?: string[]; revalidate?: number | false };
    } = {
      method,
      headers,
    };

    if (body !== undefined && method !== "GET") {
      fetchOptions.body = JSON.stringify(body);
    }

    if (tags || revalidate !== undefined) {
      fetchOptions.next = {};
      if (tags) fetchOptions.next.tags = tags;
      if (revalidate !== undefined) fetchOptions.next.revalidate = revalidate;
    }

    if (cache) {
      fetchOptions.cache = cache;
    }

    return fetchOptions;
  };

  const executeRequest = async (
    fetchOptions: RequestInit,
  ): Promise<{ response: Response; data: unknown }> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 204) {
        return { response, data: {} };
      }

      let data: unknown;
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      return { response, data };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  let lastError: Error | null = null;
  let attempt = 0;
  let hasTriedRefresh = false;

  while (attempt <= retries) {
    try {
      const fetchOptions = await buildFetchOptions();
      const { response, data } = await executeRequest(fetchOptions);

      if (!response.ok) {
        console.log("test data", data);
        console.log("trying url", url);
        const errorData = data as {
          message?: string;
          errors?: Record<string, string[]>;
        };

        // Handle 401 Unauthorized - attempt token refresh
        if (
          response.status === 401 &&
          !skipAuth &&
          !skipRefresh &&
          !hasTriedRefresh
        ) {
          hasTriedRefresh = true;

          const refreshed = await refreshAccessToken();

          if (refreshed) {
            const newFetchOptions = await buildFetchOptions();
            const retryResult = await executeRequest(newFetchOptions);

            if (retryResult.response.ok) {
              return retryResult.data as T;
            }

            const retryErrorData = retryResult.data as {
              message?: string;
              errors?: Record<string, string[]>;
            };

            throw new ApiError(
              retryErrorData?.message ||
                `Request failed with status ${retryResult.response.status}`,
              retryResult.response.status,
              retryErrorData?.errors,
            );
          }

          throw new ApiError(
            "Session expired. Please log in again.",
            401,
            errorData?.errors,
          );
        }

        const error = new ApiError(
          errorData?.message || `Request failed with status ${response.status}`,
          response.status,
          errorData?.errors,
        );

        if (isRetryableError(error, response.status) && attempt < retries) {
          lastError = error;
          attempt++;
          await sleep(RETRY_DELAY * attempt);
          continue;
        }

        throw error;
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("Request timeout", 408);
      }

      if (ApiError.isApiError(error)) {
        if (error.statusCode >= 400 && error.statusCode < 500) {
          throw error;
        }
      }

      if (isRetryableError(error) && attempt < retries) {
        lastError = error instanceof Error ? error : new Error(String(error));
        attempt++;
        await sleep(RETRY_DELAY * attempt);
        continue;
      }

      if (ApiError.isApiError(error)) {
        throw error;
      }

      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        0,
      );
    }
  }

  throw lastError || new ApiError("Request failed after retries", 500);
}

// Public API Client

export const apiClient = {
  get: <T>(endpoint: string, config?: RequestConfig): Promise<T> =>
    request<T>("GET", endpoint, undefined, config),

  post: <T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> => request<T>("POST", endpoint, body, config),

  put: <T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> => request<T>("PUT", endpoint, body, config),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> => request<T>("PATCH", endpoint, body, config),

  delete: <T = void>(endpoint: string, config?: RequestConfig): Promise<T> =>
    request<T>("DELETE", endpoint, undefined, config),

  /**
   * Manually refresh the access token
   * Useful for proactively refreshing before expiration
   */
  refreshToken: refreshAccessToken,

  /**
   * Clear all auth tokens (logout)
   */
  clearAuth: clearTokens,
};
