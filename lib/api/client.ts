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

/**
 * Patterns that indicate a technical/sensitive error message from the backend.
 * These must NEVER be shown to end users (security + UX).
 */
const SENSITIVE_PATTERNS = [
  /jwt/i,
  /token/i,
  /sql/i,
  /hibernate/i,
  /stacktrace/i,
  /\.java/i,
  /exception/i,
  /at\s+[\w.]+\(/i,
  /org\./i,
  /com\./i,
  /spring/i,
  /keycloak/i,
  /grpc/i,
  /datasource/i,
  /connection refused/i,
];

/** User-friendly fallback messages by HTTP status */
const SAFE_MESSAGES: Record<number, string> = {
  400: "La requête est invalide. Veuillez vérifier vos informations.",
  401: "Votre session a expiré. Veuillez vous reconnecter.",
  403: "Vous n'avez pas les droits nécessaires pour cette action.",
  404: "La ressource demandée est introuvable.",
  409: "Un conflit est survenu. Veuillez réessayer.",
  410: "Ce lien a expiré.",
  422: "Les données fournies sont invalides.",
  429: "Trop de requêtes. Veuillez patienter un instant.",
  500: "Une erreur interne est survenue. Veuillez réessayer plus tard.",
  502: "Le service est momentanément indisponible.",
  503: "Le service est en maintenance. Veuillez réessayer plus tard.",
};

const DEFAULT_MESSAGE = "Une erreur inattendue est survenue.";

/**
 * Sanitize an error message to prevent leaking sensitive technical details.
 * Returns a safe user-friendly message if the original contains sensitive patterns.
 */
function sanitizeMessage(message: string | undefined, status: number): string {
  if (!message) return SAFE_MESSAGES[status] ?? DEFAULT_MESSAGE;

  const isSensitive = SENSITIVE_PATTERNS.some((pattern) =>
    pattern.test(message)
  );

  if (isSensitive) {
    return SAFE_MESSAGES[status] ?? DEFAULT_MESSAGE;
  }

  return message;
}

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
      // Redirect to reactivation page if account is deactivated
      if (response.status === 403 && data?.errorCode === "ACCOUNT_DEACTIVATED") {
        if (typeof window !== "undefined") {
          window.location.href = "/reactivate";
          // Never resolve — page is navigating away, prevents error flash
          return new Promise<never>(() => {});
        }
      }

      // Redirect to login on expired session
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/api/auth/federated-signout";
          return new Promise<never>(() => {});
        }
      }

      const error: ApiError = data
        ? {
            ...data,
            message: sanitizeMessage(data.message, response.status),
          }
        : {
            timestamp: new Date().toISOString(),
            status: response.status,
            error: response.statusText,
            message: SAFE_MESSAGES[response.status] ?? DEFAULT_MESSAGE,
          };

      return { ok: false, error };
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
