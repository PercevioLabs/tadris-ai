import { google } from "googleapis";
import { NextResponse } from "next/server";

// Validates the input data
function validateInput(email: string, role: string) {
  if (!email || !role) {
    return "Email and role are required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();

    // 1. Validate Input
    const validationError = validateInput(email, role);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }

    // 2. Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Sheet1!A:C"; // Email | Role | Created At

    // 3. Duplicate Handling: Check if email already exists
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:A", // Only check the email column
    });

    const rows = getResponse.data.values || [];
    const emailExists = rows.some((row) => row[0].toLowerCase() === email.toLowerCase());

    if (emailExists) {
      return NextResponse.json(
        { success: false, message: "You are already on the waitlist" },
        { status: 409 }
      );
    }

    // 4. Append row: Email | Role | Created At
    const createdAt = new Date().toISOString();
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[email, role, createdAt]],
      },
    });

    return NextResponse.json({ success: true, message: "Successfully joined waitlist" });
  } catch (error: any) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
