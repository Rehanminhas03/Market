import { google } from "googleapis";

// Initialize Google Sheets API client
const getGoogleSheetsClient = async () => {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Google Sheets credentials not configured");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
};

/**
 * Append a row of data to the Google Sheet
 * @param data - Array of values to append as a row
 */
export const appendToGoogleSheet = async (data: (string | number | boolean)[]) => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Google Sheets spreadsheet ID not configured");
  }

  const sheets = await getGoogleSheetsClient();

  // Append to the first sheet (Sheet1), starting from row 2 (row 1 is headers)
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:R", // Columns A through R (18 columns for all our data)
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [data],
    },
  });

  return response.data;
};

/**
 * Get all rows from the Google Sheet
 * @returns Array of rows
 */
export const getGoogleSheetData = async () => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Google Sheets spreadsheet ID not configured");
  }

  const sheets = await getGoogleSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:R",
  });

  return response.data.values || [];
};
