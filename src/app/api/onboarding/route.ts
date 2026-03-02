import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/mongodb";
import Onboarding from "@/models/Onboarding";
import { appendToGoogleSheet } from "@/lib/googleSheets";

// Plan labels for display
const planLabels: Record<string, string> = {
  dealflow: "$399 — Dealflow",
  marketedge: "$699 — MarketEdge",
  closepoint: "$999 — ClosePoint",
  core: "$2,695 — Core (Team)",
  scale: "$3,899 — Scale (Team)",
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
    } = body;

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "mls",
      "licenseNumber",
      "city",
      "state",
      "primaryArea",
      "primaryRadius",
      "secondaryArea",
      "secondaryRadius",
      "selectedPlan",
      "billingAddress",
      "shippingAddress",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // 1. Save to MongoDB (if configured)
    let savedToDb = false;
    try {
      await connectToDatabase();
      const onboarding = new Onboarding({
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
        accountManager: accountManager || "",
        selectedPlan,
        billingAddress,
        shippingAddress,
        status: "pending",
      });
      await onboarding.save();
      savedToDb = true;
      console.log("Saved to MongoDB successfully");
    } catch (dbError) {
      console.error("MongoDB error (continuing anyway):", dbError);
      // Continue even if DB fails - we'll still send emails
    }

    // 2. Append to Google Sheet (if configured)
    const savedToSheet = await appendToGoogleSheet({
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
      selectedPlan: planLabels[selectedPlan] || selectedPlan,
      billingAddress,
      shippingAddress,
    });

    // 3. Send confirmation emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const planDisplay = planLabels[selectedPlan] || selectedPlan;

    // Email to admin
    const mailOptionsToAdmin = {
      from: process.env.EMAIL_USER,
      to: "minhasrehan96@gmail.com",
      subject: `New Onboarding Submission: ${firstName} ${lastName} - ${planDisplay}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #d5b367, #c9a555); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #161616; margin: 0; font-size: 24px;">New Client Onboarding</h1>
            <p style="color: #161616; margin: 5px 0 0 0; opacity: 0.8;">A new client has submitted their onboarding form</p>
          </div>

          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

            <!-- Personal Information -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px; margin-top: 0;">Personal Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #d5b367;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; color: #333;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">MLS:</td>
                <td style="padding: 8px 0; color: #333;">${mls}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">License #:</td>
                <td style="padding: 8px 0; color: #333;">${licenseNumber}</td>
              </tr>
            </table>

            <!-- Location -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px; margin-top: 30px;">Location</h2>
            <table style="width: 100%; border-collapse: collapse;">
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
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px; margin-top: 30px;">Service Areas</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px;">Primary Area:</td>
                <td style="padding: 8px 0; color: #333;">${primaryArea} (${primaryRadius} miles)</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Secondary Area:</td>
                <td style="padding: 8px 0; color: #333;">${secondaryArea} (${secondaryRadius} miles)</td>
              </tr>
            </table>

            <!-- Plan & Assignment -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px; margin-top: 30px;">Plan & Assignment</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px;">Selected Plan:</td>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">${planDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Account Manager:</td>
                <td style="padding: 8px 0; color: #333;">${accountManager || "Not assigned"}</td>
              </tr>
            </table>

            <!-- Addresses -->
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px; margin-top: 30px;">Addresses</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 150px; vertical-align: top;">Billing:</td>
                <td style="padding: 8px 0; color: #333;">${billingAddress.replace(/\n/g, "<br>")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; vertical-align: top;">Shipping:</td>
                <td style="padding: 8px 0; color: #333;">${shippingAddress.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>

            <!-- Status -->
            <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Database:</strong> ${savedToDb ? "✅ Saved" : "❌ Not saved (check MongoDB config)"}
                <br>
                <strong>Google Sheet:</strong> ${savedToSheet ? "✅ Added" : "❌ Not added (check Sheets config)"}
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>This email was sent from the Marketlyn onboarding form.</p>
            </div>
          </div>
        </div>
      `,
    };

    // Confirmation email to user
    const mailOptionsToUser = {
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
              Thank you for completing your onboarding form! We're excited to have you on board.
            </p>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Selected Plan:</h3>
              <p style="color: #d5b367; font-size: 18px; font-weight: bold; margin-bottom: 0;">
                ${planDisplay}
              </p>
            </div>

            <p style="color: #555; line-height: 1.6;">
              <strong>What happens next?</strong>
            </p>
            <ul style="color: #555; line-height: 1.8;">
              <li>Our team will review your submission within 24-48 hours</li>
              <li>You'll receive a call from your dedicated account manager</li>
              <li>We'll start setting up your marketing campaigns</li>
            </ul>

            <p style="color: #555; line-height: 1.6;">
              If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:support@marketlyn.com" style="color: #d5b367;">support@marketlyn.com</a> or call us at <a href="tel:+13073107054" style="color: #d5b367;">+1 (307) 310-7054</a>.
            </p>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://marketlyn.com"}"
                 style="display: inline-block; background: linear-gradient(135deg, #d5b367, #c9a555); color: #161616; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Visit Our Website
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>Best regards,<br>The Marketlyn Team</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send emails
    try {
      await transporter.sendMail(mailOptionsToAdmin);
      await transporter.sendMail(mailOptionsToUser);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the whole request if email fails
    }

    return NextResponse.json(
      {
        message: "Onboarding submitted successfully",
        savedToDb,
        savedToSheet,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing onboarding:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to process onboarding: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all submissions (for admin use)
export async function GET() {
  try {
    await connectToDatabase();
    const submissions = await Onboarding.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
