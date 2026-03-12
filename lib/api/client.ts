export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  errorCode?: string;
  errors?: Array<{ field: string; message: string }>;
}

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

/** Timeout for all API calls — ensures fast failure when backends are down */
const API_TIMEOUT_MS = 10_000;

async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const timeoutSignal = AbortSignal.timeout(API_TIMEOUT_MS);
    const signal = options.signal
      ? AbortSignal.any([options.signal, timeoutSignal])
      : timeoutSignal;

    const response = await fetch(url, {
      ...options,
      signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        error: data ?? {
          timestamp: new Date().toISOString(),
          status: response.status,
          error: response.statusText,
          message: "Une erreur inattendue est survenue",
        },
      };
    }

    return { ok: true, data: data as T };
  } catch {
    return {
      ok: false,
      error: {
        timestamp: new Date().toISOString(),
        status: 0,
        error: "Network Error",
        message:
          "Un problème est survenu. Veuillez réessayer plus tard.",
      },
    };
  }
}

export const api = {
  get: <T>(url: string, headers?: HeadersInit) =>
    apiRequest<T>(url, { method: "GET", headers }),
  post: <T>(url: string, body: unknown, headers?: HeadersInit) =>
    apiRequest<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    }),
  patch: <T>(url: string, body: unknown, headers?: HeadersInit) =>
    apiRequest<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers,
    }),
  delete: <T>(url: string, headers?: HeadersInit) =>
    apiRequest<T>(url, { method: "DELETE", headers }),
};
