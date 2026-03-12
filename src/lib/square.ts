import { SquareClient, SquareEnvironment, Currency } from "square";
import { getPlanPrice, getPlanDisplayName, CRM_ADDON_PRICE } from "@/config/prices";
import crypto from "crypto";

// Initialize Square client
const getSquareClient = (): SquareClient => {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const environment = process.env.SQUARE_ENVIRONMENT === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

  if (!token) {
    throw new Error("SQUARE_ACCESS_TOKEN is not configured");
  }

  return new SquareClient({
    token,
    environment,
  });
};

// Get the base URL for redirects (strip trailing slash for safety)
const getBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://re.marketlyn.com";
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    console.warn("[Square] WARNING: NEXT_PUBLIC_SITE_URL is not set, using fallback: https://re.marketlyn.com");
  }
  return url.replace(/\/+$/, "");
};

interface CheckoutLinkResult {
  checkoutUrl: string;
  orderId: string;
}

/**
 * Create a Square Checkout Link for a plan purchase
 * @param plan - The plan identifier (e.g., "dealflow", "marketedge")
 * @param includeCRM - Whether to include the CRM addon
 * @returns Object containing checkout URL and order ID
 */
export const createCheckoutLink = async (
  plan: string,
  includeCRM: boolean = false
): Promise<CheckoutLinkResult> => {
  const client = getSquareClient();
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!locationId) {
    throw new Error("SQUARE_LOCATION_ID is not configured");
  }

  const baseUrl = getBaseUrl();
  const redirectUrl = `${baseUrl}/payment-success`;
  console.log(`[Square] Creating checkout link with redirectUrl: ${redirectUrl}`);
  const planPrice = getPlanPrice(plan, false);
  const planName = getPlanDisplayName(plan);

  // Build line items
  const lineItems = [
    {
      name: `${planName} Plan`,
      quantity: "1",
      basePriceMoney: {
        amount: BigInt(planPrice),
        currency: Currency.Usd,
      },
    },
  ];

  // Add CRM addon if selected
  if (includeCRM) {
    lineItems.push({
      name: "CRM Add-on (GoHighLevel)",
      quantity: "1",
      basePriceMoney: {
        amount: BigInt(CRM_ADDON_PRICE),
        currency: Currency.Usd,
      },
    });
  }

  // Generate unique idempotency key
  const idempotencyKey = crypto.randomUUID();

  // Create the checkout link
  const response = await client.checkout.paymentLinks.create({
    idempotencyKey,
    order: {
      locationId,
      lineItems,
      metadata: {
        plan: plan.toLowerCase(),
        includeCRM: includeCRM.toString(),
      },
    },
    checkoutOptions: {
      redirectUrl,
      askForShippingAddress: false,
    },
    prePopulatedData: {
      buyerEmail: undefined,
    },
  });

  if (!response.paymentLink?.url || !response.paymentLink?.orderId) {
    throw new Error("Failed to create checkout link");
  }

  return {
    checkoutUrl: response.paymentLink.url,
    orderId: response.paymentLink.orderId,
  };
};

interface PaymentVerificationResult {
  verified: boolean;
  plan: string;
  includeCRM: boolean;
  customerEmail?: string;
  totalAmount: number;
  orderId: string;
}

/**
 * Verify a payment/order was completed successfully
 * @param orderId - The Square order ID to verify
 * @returns Verification result with order details
 */
export const verifyPayment = async (orderId: string): Promise<PaymentVerificationResult> => {
  const client = getSquareClient();

  try {
    // Get the order details
    const orderResponse = await client.orders.get({ orderId });
    const order = orderResponse.order;

    if (!order) {
      return {
        verified: false,
        plan: "",
        includeCRM: false,
        totalAmount: 0,
        orderId,
      };
    }

    // Check if the order is paid
    const isPaid = order.state === "COMPLETED";

    // Extract metadata
    const plan = order.metadata?.plan || "";
    const includeCRM = order.metadata?.includeCRM === "true";

    // Get total amount
    const totalAmount = Number(order.totalMoney?.amount || 0);

    // Get customer email from tenders if available
    let customerEmail: string | undefined;
    if (order.tenders && order.tenders.length > 0) {
      const tender = order.tenders[0];
      if (tender.customerId) {
        try {
          const customerResponse = await client.customers.get({ customerId: tender.customerId });
          customerEmail = customerResponse.customer?.emailAddress ?? undefined;
        } catch {
          // Customer email not available
        }
      }
    }

    return {
      verified: isPaid,
      plan,
      includeCRM,
      customerEmail,
      totalAmount,
      orderId,
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return {
      verified: false,
      plan: "",
      includeCRM: false,
      totalAmount: 0,
      orderId,
    };
  }
};

/**
 * Verify Square webhook signature
 * @param payload - Raw request body
 * @param signature - Signature from Square-Signature header
 * @param webhookSignatureKey - Your webhook signature key
 * @returns Whether the signature is valid
 */
export const verifyWebhookSignature = (
  payload: string,
  signature: string,
  webhookSignatureKey: string
): boolean => {
  const hmac = crypto.createHmac("sha256", webhookSignatureKey);
  hmac.update(payload);
  const expectedSignature = hmac.digest("base64");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};

/**
 * Get payment details by payment ID
 * @param paymentId - The Square payment ID
 * @returns Payment details or null if not found
 */
export const getPaymentDetails = async (paymentId: string) => {
  const client = getSquareClient();

  try {
    const response = await client.payments.get({ paymentId });
    return response;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return null;
  }
};

export { getSquareClient };
