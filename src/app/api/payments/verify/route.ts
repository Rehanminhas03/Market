import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/square";
import { generateAccessToken } from "@/lib/payment-tokens";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    // Validate order ID
    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Check Square configuration
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      console.error("Square credentials not configured");
      return NextResponse.json(
        { error: "Payment verification service is not configured." },
        { status: 500 }
      );
    }

    // Verify payment with Square
    const verificationResult = await verifyPayment(orderId);

    if (!verificationResult.verified) {
      return NextResponse.json(
        {
          verified: false,
          error: "Payment not completed or order not found.",
        },
        { status: 400 }
      );
    }

    // Generate access token for onboarding
    const accessToken = generateAccessToken({
      orderId: verificationResult.orderId,
      plan: verificationResult.plan,
      includeCRM: verificationResult.includeCRM,
      customerEmail: verificationResult.customerEmail,
      totalAmount: verificationResult.totalAmount,
    });

    return NextResponse.json({
      verified: true,
      accessToken,
      plan: verificationResult.plan,
      includeCRM: verificationResult.includeCRM,
      orderId: verificationResult.orderId,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);

    return NextResponse.json(
      { error: "Failed to verify payment. Please contact support." },
      { status: 500 }
    );
  }
}

// Also support GET for simple verification checks
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID is required" },
      { status: 400 }
    );
  }

  // Check Square configuration
  if (!process.env.SQUARE_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Payment verification service is not configured." },
      { status: 500 }
    );
  }

  try {
    const verificationResult = await verifyPayment(orderId);

    return NextResponse.json({
      verified: verificationResult.verified,
      plan: verificationResult.plan,
      includeCRM: verificationResult.includeCRM,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { verified: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
