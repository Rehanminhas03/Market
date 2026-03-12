import { NextRequest, NextResponse } from "next/server";
import { createCheckoutLink } from "@/lib/square";
import { isValidPlan } from "@/config/prices";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, includeCRM = false } = body;

    // Validate plan
    if (!plan || typeof plan !== "string") {
      return NextResponse.json(
        { error: "Plan is required" },
        { status: 400 }
      );
    }

    if (!isValidPlan(plan)) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Check Square configuration
    if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
      console.error("Square credentials not configured");
      return NextResponse.json(
        { error: "Payment system is not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Create Square checkout link
    const { checkoutUrl, orderId } = await createCheckoutLink(
      plan.toLowerCase(),
      Boolean(includeCRM)
    );

    console.log(`[Checkout] Plan: ${plan}, SiteURL: ${process.env.NEXT_PUBLIC_SITE_URL}, OrderId: ${orderId}`);

    return NextResponse.json({
      success: true,
      checkoutUrl,
      orderId,
    });
  } catch (error) {
    console.error("Error creating checkout:", error);

    // Handle specific Square errors
    if (error instanceof Error) {
      if (error.message.includes("ACCESS_TOKEN")) {
        return NextResponse.json(
          { error: "Payment system configuration error. Please contact support." },
          { status: 500 }
        );
      }
      if (error.message.includes("LOCATION_ID")) {
        return NextResponse.json(
          { error: "Payment location not configured. Please contact support." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
