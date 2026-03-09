import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appendToGoogleSheet } from "@/lib/google-sheets";

// Plan display names
const PLAN_NAMES: Record<string, string> = {
  dealflow: "$399 — Dealflow",
  marketedge: "$699 — MarketEdge",
  closepoint: "$999 — ClosePoint",
  core: "$2,695 — Core (up to 5 agents)",
  scale: "$3,899 — Scale (up to 10 agents)",
};

// Radius display names
const RADIUS_NAMES: Record<string, string> = {
  "15-30": "15–30 miles",
  "30-50": "30–50 miles",
  "50-80": "50–80 miles",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      mls,
      licenseNumber,
      city,
      state,
      primaryArea,
      primaryRadius,
      secondaryArea,
      secondaryRadius,
      accountManager,
      selectedPlan,
      billingAddress,
      shippingAddress,
      includeCRM,
    } = body;

    // Validate required fields
    const requiredFields = [
      { field: firstName, name: "First name" },
      { field: lastName, name: "Last name" },
      { field: email, name: "Email" },
      { field: phone, name: "Phone" },
      { field: mls, name: "MLS" },
      { field: licenseNumber, name: "License number" },
      { field: city, name: "City" },
      { field: state, name: "State" },
      { field: primaryArea, name: "Primary area" },
      { field: primaryRadius, name: "Primary radius" },
      { field: selectedPlan, name: "Selected plan" },
      { field: billingAddress, name: "Billing address" },
      { field: shippingAddress, name: "Shipping address" },
    ];

    const missingFields = requiredFields
      .filter(({ field }) => !field || !field.trim())
      .map(({ name }) => name);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const sheetData = [
      timestamp,
      firstName,
      lastName,
      email,
      phone,
      mls,
      licenseNumber,
      city,
      state,
      primaryArea,
      RADIUS_NAMES[primaryRadius] || primaryRadius,
      secondaryArea || "",
      secondaryRadius ? (RADIUS_NAMES[secondaryRadius] || secondaryRadius) : "",
      accountManager || "",
      PLAN_NAMES[selectedPlan] || selectedPlan,
      billingAddress,
      shippingAddress,
      includeCRM ? "Yes" : "No",
    ];

    // Append to Google Sheets (if configured)
    let sheetSaved = false;
    try {
      await appendToGoogleSheet(sheetData);
      sheetSaved = true;
    } catch (sheetError) {
      console.error("Google Sheets error:", sheetError instanceof Error ? sheetError.message : sheetError);
      console.error("Google Sheets full error:", JSON.stringify(sheetError, null, 2));
      // Continue with email even if Google Sheets fails
    }

    // Create email transporter (Zoho SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const planDisplayName = PLAN_NAMES[selectedPlan] || selectedPlan;
    const crmNote = includeCRM ? " + CRM Add-on ($99)" : "";

    // Admin notification email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to the same email (jerryfrancis465@gmail.com)
      subject: `New Onboarding Submission: ${firstName} ${lastName} - ${planDisplayName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #d5b367, #c9a555); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #161616; margin: 0; font-size: 24px;">New Onboarding Submission</h1>
            <p style="color: #161616; margin: 5px 0 0 0; opacity: 0.8;">Received: ${new Date().toLocaleString()}</p>
          </div>

          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

            <!-- Plan Badge -->
            <div style="background: linear-gradient(135deg, #d5b367, #c9a555); color: #161616; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">${planDisplayName}${crmNote}</p>
            </div>

            <!-- Personal Information -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px; margin-top: 0;">Personal Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #d5b367;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #d5b367;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">MLS:</td>
                <td style="padding: 8px 0; color: #333;">${mls}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">License Number:</td>
                <td style="padding: 8px 0; color: #333;">${licenseNumber}</td>
              </tr>
            </table>

            <!-- Location Information -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px;">Location Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px;">City:</td>
                <td style="padding: 8px 0; color: #333;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">State:</td>
                <td style="padding: 8px 0; color: #333;">${state}</td>
              </tr>
            </table>

            <!-- Service Areas -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px;">Service Areas</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px;">Primary Area:</td>
                <td style="padding: 8px 0; color: #333;">${primaryArea}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Primary Radius:</td>
                <td style="padding: 8px 0; color: #333;">${RADIUS_NAMES[primaryRadius] || primaryRadius}</td>
              </tr>
              ${secondaryArea ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Secondary Area:</td>
                <td style="padding: 8px 0; color: #333;">${secondaryArea}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Secondary Radius:</td>
                <td style="padding: 8px 0; color: #333;">${RADIUS_NAMES[secondaryRadius] || secondaryRadius || "Not specified"}</td>
              </tr>
              ` : ""}
            </table>

            <!-- Plan & Assignment -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px;">Plan & Assignment</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px;">Selected Plan:</td>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">${planDisplayName}</td>
              </tr>
              ${includeCRM ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">CRM Add-on:</td>
                <td style="padding: 8px 0; color: #d5b367; font-weight: bold;">Yes ($99)</td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Account Manager:</td>
                <td style="padding: 8px 0; color: #333;">${accountManager || "Not assigned"}</td>
              </tr>
            </table>

            <!-- Addresses -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px;">Addresses</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px; vertical-align: top;">Billing Address:</td>
                <td style="padding: 8px 0; color: #333;">${billingAddress.replace(/\n/g, "<br>")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; vertical-align: top;">Shipping Address:</td>
                <td style="padding: 8px 0; color: #333;">${shippingAddress.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>This submission was received from the Marketlyn onboarding form.</p>
            </div>
          </div>
        </div>
      `,
    };

    // User confirmation email
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Marketlyn! Your Onboarding is Complete",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #d5b367, #c9a555); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #161616; margin: 0; font-size: 24px;">Welcome to Marketlyn!</h1>
          </div>

          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hi ${firstName},
            </p>

            <p style="color: #555; line-height: 1.6;">
              Thank you for completing your onboarding! We're excited to have you on board.
            </p>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Your Selected Plan:</h3>
              <p style="color: #d5b367; font-size: 20px; font-weight: bold; margin: 0;">${planDisplayName}${crmNote}</p>
            </div>

            <h3 style="color: #333;">What Happens Next?</h3>
            <ol style="color: #555; line-height: 1.8; padding-left: 20px;">
              <li>Our team will review your information within 24-48 hours</li>
              <li>You'll receive a call from your dedicated account manager</li>
              <li>We'll set up your account and configure your service areas</li>
              <li>Start receiving exclusive referrals in your target areas!</li>
            </ol>

            <p style="color: #555; line-height: 1.6;">
              If you have any questions in the meantime, feel free to reach out to us.
            </p>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://marketlyn.com"}"
                 style="display: inline-block; background: linear-gradient(135deg, #d5b367, #c9a555); color: #161616; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Visit Our Website
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>Best regards,<br>The Marketlyn Team</p>
              <p style="margin-top: 10px;">
                <a href="mailto:support@marketlyn.com" style="color: #d5b367;">support@marketlyn.com</a> |
                <a href="tel:+13073107054" style="color: #d5b367;">+1 (307) 310-7054</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      {
        message: sheetSaved
          ? "Onboarding submitted successfully"
          : "Onboarding submitted but data backup encountered an issue. Our team has been notified.",
        sheetSaved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing onboarding:", error);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to process onboarding: ${errorMessage}` },
      { status: 500 }
    );
  }
}
