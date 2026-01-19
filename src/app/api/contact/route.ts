import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password, not regular password
      },
    });

    // Email content for you (the receiver)
    const mailOptionsToAdmin = {
      from: process.env.EMAIL_USER,
      to: "minhasrehan96@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #d5b367, #c9a555); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #161616; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>

          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 2px solid #d5b367; padding-bottom: 10px;">Contact Details</h2>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 10px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}" style="color: #d5b367;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; color: #333;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Company:</td>
                <td style="padding: 10px 0; color: #333;">${company || "Not provided"}</td>
              </tr>
            </table>

            <h3 style="color: #333; margin-top: 30px; border-bottom: 2px solid #d5b367; padding-bottom: 10px;">Message</h3>
            <p style="color: #555; line-height: 1.6; background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 15px;">
              ${message.replace(/\n/g, "<br>")}
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>This email was sent from your website contact form.</p>
            </div>
          </div>
        </div>
      `,
    };

    // Auto-reply email to the person who submitted the form
    const mailOptionsToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting us!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #d5b367, #c9a555); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #161616; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
          </div>

          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hi ${name},
            </p>

            <p style="color: #555; line-height: 1.6;">
              Thank you for contacting us! We have received your message and will get back to you within 24 hours.
            </p>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
              <p style="color: #666; line-height: 1.6; margin-bottom: 0;">
                ${message.replace(/\n/g, "<br>")}
              </p>
            </div>

            <p style="color: #555; line-height: 1.6;">
              In the meantime, feel free to explore our services or schedule a call with us.
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

    // Send both emails
    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Check if it's a configuration issue
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Return more specific error for debugging
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    );
  }
}
