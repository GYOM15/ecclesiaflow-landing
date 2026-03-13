import { api, type ApiResponse } from "./client";

// --- Types (mirroring OpenAPI spec) ---

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber?: string;
}

export interface SignUpResponse {
  message?: string;
  email: string;
  firstName: string;
  lastName: string;
  confirmed: boolean;
  createdAt: string;
  confirmedAt?: string;
  socialProvider?: "GOOGLE" | "MICROSOFT" | "FACEBOOK" | null;
  hasLocalCredentials?: boolean;
}

export interface ConfirmationResponse {
  message: string;
  temporaryToken: string;
  expiresIn: number;
  passwordEndpoint: string;
}

export interface SocialOnboardingRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber?: string;
}

export interface SocialOnboardingResponse {
  message: string;
  email: string;
  firstName: string;
  lastName: string;
}

// --- API Functions ---

export function signUp(
  data: SignUpRequest
): Promise<ApiResponse<SignUpResponse>> {
  return api.post<SignUpResponse>("/api/members", data);
}

export function confirmEmail(
  token: string
): Promise<ApiResponse<ConfirmationResponse>> {
  return api.get<ConfirmationResponse>(
    `/api/members/confirmation?token=${encodeURIComponent(token)}`
  );
}

export function resendConfirmation(
  email: string
): Promise<ApiResponse<{ message: string }>> {
  return api.post<{ message: string }>("/api/members/new-confirmation", {
    email,
  });
}

export function socialOnboarding(
  accessToken: string,
  data: SocialOnboardingRequest
): Promise<ApiResponse<SocialOnboardingResponse>> {
  return api.post<SocialOnboardingResponse>(
    "/api/members/social-onboarding",
    data,
    { Authorization: `Bearer ${accessToken}` }
  );
}

export function getMyProfile(
  accessToken: string
): Promise<ApiResponse<SignUpResponse>> {
  return api.get<SignUpResponse>("/api/members/me", {
    Authorization: `Bearer ${accessToken}`,
  });
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
}

export interface UpdateProfileResponse {
  message: string;
  email: string;
  firstName: string;
  lastName: string;
}

export function updateMyProfile(
  accessToken: string,
  data: UpdateProfileRequest
): Promise<ApiResponse<UpdateProfileResponse>> {
  return api.patch<UpdateProfileResponse>("/api/members/me", data, {
    Authorization: `Bearer ${accessToken}`,
  });
}

export interface EmailChangeResponse {
  message: string;
}

export function requestEmailChange(
  accessToken: string,
  email: string
): Promise<ApiResponse<EmailChangeResponse>> {
  return api.patch<EmailChangeResponse>(
    "/api/members/me/email",
    { email },
    { Authorization: `Bearer ${accessToken}` }
  );
}

export function confirmEmailChange(
  token: string
): Promise<ApiResponse<SignUpResponse>> {
  return api.post<SignUpResponse>(
    `/api/members/me/email/confirm?token=${encodeURIComponent(token)}`,
    {}
  );
}

export function deleteMyAccount(
  accessToken: string
): Promise<ApiResponse<{ message: string }>> {
  return api.delete<{ message: string }>("/api/members/me", {
    Authorization: `Bearer ${accessToken}`,
  });
}

export function reactivateMyAccount(
  accessToken: string
): Promise<ApiResponse<SignUpResponse>> {
  return api.post<SignUpResponse>(
    "/api/members/me/reactivate",
    {},
    { Authorization: `Bearer ${accessToken}` }
  );
}
