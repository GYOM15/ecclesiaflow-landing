import { NextRequest, NextResponse } from "next/server";

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

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("Setup password error:", err);
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue" },
      { status: 500 }
    );
  }
}
