"use server";

import { apiClient, ApiResponse } from "../api";
import { setTokens } from "../api/tokens";

type LoginData = {
  email: string;
  password: string;
  remember?: boolean;
};
type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};
type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
const LoginAction = async (loginData: LoginData) => {
  // ignoring "remember" for now, as token handling is done via httpOnly cookies
  const { email, password } = loginData;
  const payload = { email, password };
  try {
    const response: ApiResponse<LoginResponse> = await apiClient.post(
      "/auth/login",
      payload,
      {
        skipAuth: true,
        skipRefresh: true,
      },
    );
    if (response.success && response.data.accessToken) {
      await setTokens(response.data.accessToken, response.data.refreshToken);
    }
    return response;
  } catch (error) {
    console.log("error at login action", error);
  }
};

export { LoginAction };
