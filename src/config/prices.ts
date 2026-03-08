// Centralized price configuration for all plans
// All prices are in cents (e.g., $399.00 = 39900)

export const PLAN_PRICES: Record<string, number> = {
  dealflow: 39900,      // $399.00
  marketedge: 69900,    // $699.00
  closepoint: 99900,    // $999.00
  core: 269500,         // $2,695.00
  scale: 389900,        // $3,899.00
};

export const CRM_ADDON_PRICE = 9900; // $99.00

// Plan display names for receipts and emails
export const PLAN_DISPLAY_NAMES: Record<string, string> = {
  dealflow: "Dealflow",
  marketedge: "MarketEdge",
  closepoint: "ClosePoint",
  core: "Core (up to 5 agents)",
  scale: "Scale (up to 10 agents)",
};

/**
 * Get the total price for a plan with optional CRM addon
 * @param plan - The plan identifier (lowercase)
 * @param includeCRM - Whether to include the CRM addon
 * @returns Price in cents
 */
export const getPlanPrice = (plan: string, includeCRM: boolean = false): number => {
  const basePrice = PLAN_PRICES[plan.toLowerCase()] || 0;
  return includeCRM ? basePrice + CRM_ADDON_PRICE : basePrice;
};

/**
 * Format price in cents to display string
 * @param priceInCents - Price in cents
 * @returns Formatted price string (e.g., "$399.00")
 */
export const formatPrice = (priceInCents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInCents / 100);
};

/**
 * Get plan display name
 * @param plan - The plan identifier (lowercase)
 * @returns Display name for the plan
 */
export const getPlanDisplayName = (plan: string): string => {
  return PLAN_DISPLAY_NAMES[plan.toLowerCase()] || plan;
};

/**
 * Validate if a plan identifier is valid
 * @param plan - The plan identifier to validate
 * @returns Whether the plan is valid
 */
export const isValidPlan = (plan: string): boolean => {
  return plan.toLowerCase() in PLAN_PRICES;
};
