import jwt from "jsonwebtoken";

// Token expiration time (24 hours - gives users plenty of time to complete onboarding)
const TOKEN_EXPIRATION = "24h";

// Get JWT secret from environment or use a default for development
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET || process.env.SQUARE_ACCESS_TOKEN;
  if (!secret) {
    throw new Error("JWT_SECRET or SQUARE_ACCESS_TOKEN must be configured");
  }
  return secret;
};

export interface PaymentTokenPayload {
  orderId: string;
  plan: string;
  includeCRM: boolean;
  customerEmail?: string;
  totalAmount: number;
  verifiedAt: string;
}

export interface TokenVerificationResult {
  valid: boolean;
  payload?: PaymentTokenPayload;
  error?: string;
}

/**
 * Generate a JWT access token after successful payment verification
 * @param paymentData - Payment data to encode in the token
 * @returns JWT token string
 */
export const generateAccessToken = (paymentData: {
  orderId: string;
  plan: string;
  includeCRM: boolean;
  customerEmail?: string;
  totalAmount: number;
}): string => {
  const secret = getJwtSecret();

  const payload: PaymentTokenPayload = {
    ...paymentData,
    verifiedAt: new Date().toISOString(),
  };

  return jwt.sign(payload, secret, {
    expiresIn: TOKEN_EXPIRATION,
    algorithm: "HS256",
  });
};

/**
 * Verify and decode a payment access token
 * @param token - The JWT token to verify
 * @returns Verification result with decoded payload if valid
 */
export const verifyAccessToken = (token: string): TokenVerificationResult => {
  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    }) as PaymentTokenPayload;

    return {
      valid: true,
      payload: decoded,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        valid: false,
        error: "Token has expired. Please complete payment again.",
      };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return {
        valid: false,
        error: "Invalid token. Please complete payment first.",
      };
    }
    return {
      valid: false,
      error: "Token verification failed.",
    };
  }
};

/**
 * Decode a token without verification (for debugging)
 * @param token - The JWT token to decode
 * @returns Decoded payload or null
 */
export const decodeToken = (token: string): PaymentTokenPayload | null => {
  try {
    return jwt.decode(token) as PaymentTokenPayload;
  } catch {
    return null;
  }
};
