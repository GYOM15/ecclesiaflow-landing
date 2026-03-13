import { api, type ApiResponse } from "./client";

export interface PasswordManagementResponse {
  message: string;
}

export function addLocalCredentials(
  accessToken: string,
  password: string
): Promise<ApiResponse<PasswordManagementResponse>> {
  return api.post<PasswordManagementResponse>(
    "/api/backend-auth/credentials",
    { password },
    { Authorization: `Bearer ${accessToken}` }
  );
}
