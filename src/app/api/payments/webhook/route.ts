import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/square";

// Disable body parsing to get raw body for signature verification
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-square-hmacsha256-signature") || "";
    const webhookSignatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;

    // Verify webhook signature if key is configured
    if (webhookSignatureKey) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSignatureKey);
      if (!isValid) {
        console.error("Invalid webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    } else {
      console.warn("SQUARE_WEBHOOK_SIGNATURE_KEY not configured - skipping signature verification");
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);
    const eventType = payload.type;
    const data = payload.data;

    console.log(`Received Square webhook: ${eventType}`);

    // Handle different event types
    switch (eventType) {
      case "payment.completed":
        await handlePaymentCompleted(data);
        break;

      case "payment.updated":
        await handlePaymentUpdated(data);
        break;

      case "order.fulfillment.updated":
        await handleOrderFulfillmentUpdated(data);
        break;

      case "checkout.link.completed":
        await handleCheckoutCompleted(data);
        break;

      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    // Still return 200 to prevent Square from retrying
    return NextResponse.json({ received: true, error: "Processing error" });
  }
}

/**
 * Handle payment.completed webhook
 */
async function handlePaymentCompleted(data: Record<string, unknown>) {
  const payment = (data.object as Record<string, unknown>)?.payment as Record<string, unknown> | undefined;
  if (!payment) return;

  const paymentId = payment.id as string;
  const orderId = payment.order_id as string;
  const status = payment.status as string;
  const amount = payment.amount_money as Record<string, unknown> | undefined;

  console.log(`Payment completed: ${paymentId}`);
  console.log(`Order: ${orderId}, Status: ${status}, Amount: ${amount?.amount}`);

  // You could store this in a database for auditing
  // or trigger additional actions like sending notifications
}

/**
 * Handle payment.updated webhook
 */
async function handlePaymentUpdated(data: Record<string, unknown>) {
  const payment = (data.object as Record<string, unknown>)?.payment as Record<string, unknown> | undefined;
  if (!payment) return;

  const paymentId = payment.id as string;
  const status = payment.status as string;

  console.log(`Payment updated: ${paymentId}, Status: ${status}`);

  // Handle different payment statuses
  if (status === "FAILED" || status === "CANCELED") {
    console.log(`Payment ${paymentId} was ${status.toLowerCase()}`);
    // Could trigger notifications or cleanup
  }
}

/**
 * Handle order.fulfillment.updated webhook
 */
async function handleOrderFulfillmentUpdated(data: Record<string, unknown>) {
  const order = (data.object as Record<string, unknown>)?.order as Record<string, unknown> | undefined;
  if (!order) return;

  const orderId = order.id as string;
  console.log(`Order fulfillment updated: ${orderId}`);
}

/**
 * Handle checkout.link.completed webhook
 */
async function handleCheckoutCompleted(data: Record<string, unknown>) {
  const checkoutLink = data.object as Record<string, unknown> | undefined;
  if (!checkoutLink) return;

  const orderId = checkoutLink.order_id as string;
  console.log(`Checkout completed for order: ${orderId}`);

  // This confirms the checkout was successful
  // The user should be redirected to payment-success page
}
