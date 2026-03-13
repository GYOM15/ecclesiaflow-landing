import { NextRequest, NextResponse } from "next/server";

/** Safe user-facing messages by HTTP status */
const SAFE_MESSAGES: Record<number, string> = {
  400: "La requête est invalide. Veuillez vérifier vos informations.",
  401: "Session invalide ou expirée.",
  403: "Accès refusé.",
  404: "Ressource introuvable.",
  410: "Ce lien a expiré. Veuillez renvoyer un email de confirmation.",
  500: "Une erreur interne est survenue. Veuillez réessayer plus tard.",
};

export async function POST(request: NextRequest) {
  try {
    const { password, setupToken } = await request.json();

    if (!password || !setupToken) {
      return NextResponse.json(
        { error: "Le mot de passe et le token sont requis" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.AUTH_API_URL}/ecclesiaflow/auth/password/setup`;

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Setup-Token": setupToken,
        Accept: "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Never forward raw backend error details to the client
      const safeMessage =
        SAFE_MESSAGES[response.status] ?? "Une erreur inattendue est survenue.";

      return NextResponse.json(
        { message: safeMessage, status: response.status },
        { status: response.status }
      );
    }

    // Success — forward only the expected fields (tokens)
    return NextResponse.json(
      {
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
        expiresIn: data?.expiresIn,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue" },
      { status: 500 }
    );
  }
}
