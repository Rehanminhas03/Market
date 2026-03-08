import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/payment-tokens";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { valid: false, error: "Token is required" },
        { status: 400 }
      );
    }

    const result = verifyAccessToken(token);

    if (result.valid) {
      return NextResponse.json({
        valid: true,
        payload: result.payload,
      });
    } else {
      return NextResponse.json({
        valid: false,
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { valid: false, error: "Token verification failed" },
      { status: 500 }
    );
  }
}
