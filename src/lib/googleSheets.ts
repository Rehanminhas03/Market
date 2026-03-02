import { google } from "googleapis";

const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);
const GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

interface OnboardingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mls: string;
  licenseNumber: string;
  city: string;
  state: string;
  primaryArea: string;
  primaryRadius: string;
  secondaryArea: string;
  secondaryRadius: string;
  accountManager: string;
  selectedPlan: string;
  billingAddress: string;
  shippingAddress: string;
}

/**
 * Append a row to the Google Sheet with onboarding data
 */
export async function appendToGoogleSheet(data: OnboardingData): Promise<boolean> {
  // Skip if credentials are not configured
  if (!GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY || !GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.warn("Google Sheets credentials not configured. Skipping sheet update.");
    return false;
  }

  try {
    // Create auth client
    const auth = new google.auth.JWT({
      email: GOOGLE_SHEETS_CLIENT_EMAIL,
      key: GOOGLE_SHEETS_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Format timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Prepare row data (must match header order in spreadsheet)
    const rowData = [
      timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.mls,
      data.licenseNumber,
      data.city,
      data.state,
      data.primaryArea,
      data.primaryRadius,
      data.secondaryArea,
      data.secondaryRadius,
      data.accountManager || "N/A",
      data.selectedPlan,
      data.billingAddress,
      data.shippingAddress,
    ];

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet1!A:Q", // Columns A through Q
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    console.log("Successfully appended to Google Sheet");
    return true;
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    return false;
  }
}
