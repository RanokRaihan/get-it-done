"use server";

import type { BackendError } from "../api/types";

export type ActionResult<T> =
  | { success: true; message: string; statusCode: number; data: T }
  | BackendError;

export async function actionHandler<T>(
  fn: () => Promise<T>,
): Promise<T | BackendError> {
  try {
    return await fn();
  } catch (error: unknown) {
    // Backend structured error — return as-is
    if (
      typeof error === "object" &&
      error !== null &&
      "success" in error &&
      (error as BackendError).success === false
    ) {
      return error as BackendError;
    }

    // Network/timeout/unexpected error
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      statusCode: 500,
      errorType: "NETWORK_ERROR",
      errorSources: [
        {
          path: "global",
          message:
            error instanceof Error ? error.message : "Something went wrong",
        },
      ],
    };
  }
}
