# Square Payment Integration Setup Guide

This document explains how to set up Square payment processing for your Marketlyn website. Please follow these steps carefully to enable payment functionality.

---

## Overview

Your website uses Square to process payments securely. Before customers can complete purchases, you need to:

1. Create a Square Developer account
2. Create an application in Square
3. Provide us with the required credentials

---

## What You Need to Provide

After completing the setup steps below, please send us the following information:

| Credential | Description |
|------------|-------------|
| **Access Token** | Your Sandbox or Production access token |
| **Application ID** | Your Square application ID |
| **Location ID** | Your business location ID |
| **Webhook Signature Key** | (Optional) For enhanced security |

---

## Step-by-Step Setup Instructions

### Step 1: Create a Square Account (if you don't have one)

1. Go to [Square](https://squareup.com) and sign up for a free account
2. Complete your business profile with your business information
3. This is your regular Square merchant account

### Step 2: Access the Square Developer Dashboard

1. Go to [Square Developer Dashboard](https://developer.squareup.com/)
2. Sign in with your Square account credentials
3. If this is your first time, you'll need to accept the developer terms

### Step 3: Create a New Application

1. Click **"+"** or **"Create Application"** button
2. Enter an application name (e.g., "Marketlyn Website Payments")
3. Click **"Save"**

### Step 4: Get Your Application ID

1. After creating the application, you'll see your **Application ID** at the top
2. It looks like: `sq0idp-XXXXXXXXXXXXXXXXXXXX`
3. Copy this value - we need it!

### Step 5: Get Your Access Token

**For Testing (Sandbox):**
1. In your application, click on **"Credentials"** tab
2. Find **"Sandbox Access Token"**
3. Click **"Show"** to reveal the token
4. Copy this token (starts with `EAAAxxxxxxx`)

**For Live Payments (Production):**
1. In your application, click on **"Credentials"** tab
2. Find **"Production Access Token"**
3. You may need to click **"Create Production Access Token"**
4. Copy this token (starts with `EAAAxxxxxxx`)

> **Important**: Keep your access tokens secure! Never share them publicly.

### Step 6: Get Your Location ID

1. Go to [Square Dashboard](https://squareup.com/dashboard)
2. Click on **"Account & Settings"** (gear icon)
3. Click on **"Business Information"** then **"Locations"**
4. Click on your main location
5. Look for **"Location ID"** - it looks like: `LXXXXXXXXXXXXXXXXXX`
6. Copy this value - we need it!

**Alternative method:**
1. In the Developer Dashboard, click on **"Locations"** in the left sidebar
2. Your Location IDs will be listed there

### Step 7: Configure Webhooks (Recommended)

Webhooks notify us when payments are completed. This is optional but recommended for production.

1. In your application, click on **"Webhooks"** tab
2. Click **"Add Webhook"** or **"Add Subscription"**
3. Enter the webhook URL: `https://YOUR-WEBSITE-URL/api/payments/webhook`
   - Replace `YOUR-WEBSITE-URL` with your actual domain
4. Select these events:
   - `payment.completed`
   - `payment.updated`
   - `checkout.link.completed`
5. Click **"Save"**
6. Copy the **"Signature Key"** - we need this for security verification

---

## Testing vs. Production

### Sandbox (Testing)
- Use Sandbox credentials first to test the payment flow
- No real money is charged
- Use test card numbers provided by Square:
  - Card Number: `4532 0123 4567 8901`
  - Any future expiration date
  - Any 3-digit CVV
  - Any ZIP code

### Production (Live)
- Only switch to Production credentials after testing is complete
- Real payments will be processed
- Funds will be deposited to your linked bank account

---

## Credentials Summary

Please provide these credentials to your developer:

```
SQUARE_ENVIRONMENT=sandbox    (or 'production' for live)
SQUARE_ACCESS_TOKEN=          (your access token)
SQUARE_APPLICATION_ID=        (your application ID)
SQUARE_LOCATION_ID=           (your location ID)
SQUARE_WEBHOOK_SIGNATURE_KEY= (optional, for webhooks)
```

---

## Security Best Practices

1. **Never share** your access tokens publicly or in emails
2. **Use a secure method** to share credentials (encrypted message, password manager, etc.)
3. **Test thoroughly** with Sandbox before going live
4. **Monitor transactions** regularly in your Square Dashboard

---

## Frequently Asked Questions

### What fees does Square charge?
Square charges 2.9% + 30 cents per transaction for online payments. Check [Square's pricing page](https://squareup.com/us/en/pricing) for current rates.

### How long until I receive funds?
Square typically deposits funds within 1-2 business days.

### Can I issue refunds?
Yes, you can issue full or partial refunds through your Square Dashboard.

### Is my customer data secure?
Yes, Square is PCI-DSS Level 1 certified, the highest level of security certification.

---

## Need Help?

If you have questions about:
- **Square account setup**: Contact [Square Support](https://squareup.com/help)
- **Website integration**: Contact your developer

---

*Document last updated: March 2026*
