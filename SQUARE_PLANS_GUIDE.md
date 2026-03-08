# Square Plans & Pricing Guide — Marketlyn

This document explains how payment plans work on your Marketlyn website and how to manage them through Square.

---

## How Plans Work

Your website uses **Square Checkout Links** to process one-time payments. When a customer selects a plan and clicks "Pay", the website automatically creates a secure Square checkout page with the correct plan name and price.

**You do NOT need to create products or plans inside Square Dashboard.** The plans are already configured in your website. Square simply processes the payment.

---

## Current Plans & Pricing

| Plan | Price | Description |
|------|-------|-------------|
| **Dealflow** | $399.00 | Single agent plan |
| **MarketEdge** | $699.00 | Single agent plan |
| **ClosePoint** | $999.00 | Single agent plan |
| **Core** | $2,695.00 | Up to 5 agents |
| **Scale** | $3,899.00 | Up to 10 agents |

**Optional Add-on:**
| Add-on | Price |
|--------|-------|
| CRM (GoHighLevel) | $99.00 |

---

## What Happens When a Customer Pays

1. Customer selects a plan on the website
2. Website creates a **Square Checkout Link** automatically
3. Customer is redirected to a secure Square-hosted payment page
4. Customer enters their card details and completes payment
5. Customer is redirected back to the website's success page
6. You receive a notification (via Square Dashboard and email)

---

## Viewing Payments in Square Dashboard

### View All Transactions

1. Go to [Square Dashboard](https://squareup.com/dashboard)
2. Click **"Transactions"** in the left sidebar
3. You'll see all completed payments with:
   - Customer name and email
   - Plan name (shown as line item)
   - Amount charged
   - Date and time
   - Payment status

### View Payment Details

1. Click on any transaction to see:
   - Full payment breakdown (plan + CRM add-on if applicable)
   - Customer payment method
   - Receipt link (you can resend to customer)

### Filter Transactions

1. Use the **date range** filter to view payments for a specific period
2. Use the **search bar** to find payments by customer name or email
3. Filter by **status** (Completed, Refunded, etc.)

---

## Issuing Refunds

### Full Refund

1. Go to **"Transactions"** in Square Dashboard
2. Find and click the transaction
3. Click **"Issue Refund"**
4. Select **"Full Refund"**
5. Add an optional reason
6. Click **"Refund"**

### Partial Refund

1. Go to **"Transactions"** in Square Dashboard
2. Find and click the transaction
3. Click **"Issue Refund"**
4. Enter the custom refund amount
5. Add an optional reason
6. Click **"Refund"**

> **Note:** Refunds typically take 3-5 business days to appear on the customer's statement.

---

## Changing Plan Prices

If you need to update plan prices, **contact your developer**. Prices are configured in the website code to ensure consistency across the checkout flow, email confirmations, and receipts.

Do **NOT** try to change prices from the Square Dashboard — the website generates its own checkout links with the configured prices.

---

## Viewing Reports & Analytics

### Sales Summary

1. Go to [Square Dashboard](https://squareup.com/dashboard)
2. Click **"Reports"** in the left sidebar
3. View:
   - **Sales Summary** — Total revenue, number of transactions, average sale
   - **Sales Trends** — Daily/weekly/monthly trends
   - **Item Sales** — Breakdown by plan type

### Deposits

1. Click **"Balance"** or **"Bank Transfers"** in the left sidebar
2. View upcoming and past deposits to your bank account
3. Square typically deposits funds within **1-2 business days**

---

## Square Fees

Square charges the following fees for online payments:

| Fee Type | Rate |
|----------|------|
| Online payment | 2.9% + $0.30 per transaction |

**Example fee calculations:**

| Plan | Price | Square Fee | You Receive |
|------|-------|------------|-------------|
| Dealflow | $399.00 | ~$11.87 | ~$387.13 |
| MarketEdge | $699.00 | ~$20.57 | ~$678.43 |
| ClosePoint | $999.00 | ~$29.27 | ~$969.73 |
| Core | $2,695.00 | ~$78.46 | ~$2,616.54 |
| Scale | $3,899.00 | ~$113.37 | ~$3,785.63 |

> Fees are approximate. Check [Square's pricing page](https://squareup.com/us/en/pricing) for current rates.

---

## Testing Payments (Sandbox Mode)

Before going live, your website should be tested with Square's **Sandbox** environment:

- **No real money** is charged during testing
- Use the following test card:
  - **Card Number:** `4532 0123 4567 8901`
  - **Expiration:** Any future date (e.g., `12/26`)
  - **CVV:** Any 3 digits (e.g., `111`)
  - **ZIP Code:** Any valid ZIP (e.g., `10001`)

Once testing is complete, your developer will switch the website to **Production** mode to accept real payments.

---

## Switching from Sandbox to Production

When you're ready to go live:

1. Ensure your Square account is fully verified
2. Provide your **Production Access Token** to your developer (see [Square Setup Guide](./SQUARE_SETUP_GUIDE.md))
3. Your developer will update the website configuration
4. Test one real transaction with a small amount to confirm everything works
5. Issue a refund for the test transaction

---

## Troubleshooting

### "Payment system is not configured"
- Square credentials haven't been added yet. Share your credentials with your developer (see [Square Setup Guide](./SQUARE_SETUP_GUIDE.md)).

### "Failed to create checkout session"
- Could be a temporary Square outage. Try again in a few minutes.
- If persistent, contact your developer to check the logs.

### Customer says they paid but you don't see it
1. Check **"Transactions"** in Square Dashboard
2. The payment may still be processing (allow a few minutes)
3. Ask the customer for their receipt email from Square
4. Contact your developer if the issue persists

### Refund not appearing for customer
- Refunds take **3-5 business days** to process
- The refund will show as a separate line item in your Square transactions

---

## Need Help?

| Topic | Contact |
|-------|---------|
| Square account & payments | [Square Support](https://squareup.com/help) |
| Website & integration | Your developer |
| General inquiries | support@marketlyn.com |

---

*Document last updated: March 2026*
