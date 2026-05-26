import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification token is required.",
        },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Backend API URL is not configured.",
        },
        { status: 500 }
      );
    }

    const apiUrl = baseUrl.replace(/\/+$/, "");

    const url = `${apiUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    let data;

    try {
      data = await response.json();
    } catch {
      data = {
        success: false,
        message: "Invalid response from server.",
      };
    }

    return NextResponse.json(data, {
      status: response.status,
    });

  } catch (error) {
    console.error("Email verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Email verification failed. Please try again.",
      },
      { status: 500 }
    );
  }
}