import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SURVEY_SHEET_ID;
    const range = "Sheet1!A:AP";

    // 1. Check if the sheet is empty to add headers
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A1:A1",
    });

    if (!getResponse.data.values || getResponse.data.values.length === 0) {
      const headers = [
        "Timestamp",
        "Name",
        "Email",
        "Institution",
        "Q1: Currently Teaching",
        "Q2: Primary Subject",
        "Q2: Subject (Other)",
        "Q3: Courses per Semester",
        "Q4: Average Class Size",
        "Q5: Years of Experience",
        "Q6: Prep (Hrs/Wk)",
        "Q6: Assessments (Hrs/Wk)",
        "Q6: Grading (Hrs/Wk)",
        "Q6: Queries (Hrs/Wk)",
        "Q6: Reporting (Hrs/Wk)",
        "Q7: Burdensome Activities",
        "Q8: Heaviest Workload Period",
        "Q9: General Tools Used",
        "Q9: Tools (Other)",
        "Q10: AI Tools Tried",
        "Q10: AI Tools (Other)",
        "Q11: AI Usage Frequency",
        "Q12: AI Use Cases",
        "Q12: AI Use Cases (Other)",
        "Q13: Comfort - Assessments",
        "Q13: Comfort - Prep",
        "Q13: Comfort - Grading",
        "Q13: Comfort - Queries",
        "Q13: Comfort - Notes",
        "Q13: Comfort - Reporting",
        "Q14: AI Role - Assessments",
        "Q14: AI Role - Prep",
        "Q14: AI Role - Grading",
        "Q14: AI Role - Queries",
        "Q14: AI Role - Notes",
        "Q14: AI Role - Reporting",
        "Q15: Biggest Concerns",
        "Q15: Concerns (Other)",
        "Q16: Requirements for Confidence",
        "Q16: Requirements (Other)",
        "Q17: Follow-up Interest",
        "Q18: Follow-up Contact",
      ];
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        requestBody: { values: [headers] },
      });
    }

    // 2. Duplicate Check
    const checkEmail = data.email?.toLowerCase().trim();
    const checkContact = data.followUpContact?.toLowerCase().trim();

    if (checkEmail || checkContact) {
      const existingData = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Sheet1!C:AP", // Identity Email (C) to Follow-up Contact (AP)
      });

      const rows = existingData.data.values || [];
      const isDuplicate = rows.some((row) => {
        const rowEmail = row[0]?.toLowerCase().trim(); // Column C
        const rowContact = row[39]?.toLowerCase().trim(); // Column AP (offset from C is 39)
        
        const emailMatch = checkEmail && checkEmail !== "-" && rowEmail === checkEmail;
        const contactMatch = checkContact && checkContact !== "-" && rowContact === checkContact;
        
        return emailMatch || contactMatch;
      });

      if (isDuplicate) {
        return NextResponse.json(
          { success: false, message: "A survey with this email or contact info has already been submitted." },
          { status: 409 }
        );
      }
    }

    // 3. Prepare the row data
    const timestamp = new Date().toISOString();
    
    // Flatten the data into an array
    const row = [
      timestamp,
      data.name || "Anonymous",
      data.email || "-",
      data.institution || "-",
      
      // Section 1
      data.isTeaching || "-",
      data.subject || "-",
      data.subjectOther || "-",
      data.coursesPerSemester || "-",
      data.classSize || "-",
      data.experience || "-",

      // Section 2
      data.workloadHours?.["Teaching preparation (lesson plans, slides, activities)"] || "0",
      data.workloadHours?.["Creating assessments (quizzes, exams, assignments)"] || "0",
      data.workloadHours?.["Grading and providing feedback to students"] || "0",
      data.workloadHours?.["Responding to student queries (email, office hours)"] || "0",
      data.workloadHours?.["Course documentation and institutional reporting"] || "0",
      data.burdensomeActivities?.join(", ") || "-",
      data.heaviestWorkload || "-",

      // Section 3
      data.currentTools?.join(", ") || "-",
      data.toolsOther || "-",
      data.aiTools?.join(", ") || "-",
      data.aiToolsOther || "-",
      data.aiFrequency || "-",
      data.aiUseCases?.join(", ") || "-",
      data.aiUseCasesOther || "-",

      // Section 4
      data.comfortLevels?.["Creating assessments (quizzes, exams, assignments)"] || "0",
      data.comfortLevels?.["Teaching preparation (lesson plans, slides, activities)"] || "0",
      data.comfortLevels?.["Grading and providing feedback to students"] || "0",
      data.comfortLevels?.["Responding to student queries (email, office hours)"] || "0",
      data.comfortLevels?.["Converting notes into study materials"] || "0",
      data.comfortLevels?.["Course documentation and institutional reporting"] || "0",

      data.aiRolePreference?.["Creating assessments (quizzes, exams, assignments)"] || "-",
      data.aiRolePreference?.["Teaching preparation (lesson plans, slides, activities)"] || "-",
      data.aiRolePreference?.["Grading and providing feedback to students"] || "-",
      data.aiRolePreference?.["Responding to student queries (email, office hours)"] || "-",
      data.aiRolePreference?.["Converting lecture notes or recordings into study materials"] || "-",
      data.aiRolePreference?.["Course documentation and institutional reporting"] || "-",

      data.aiConcerns?.join(", ") || "-",
      data.aiConcernsOther || "-",
      data.aiRequirements?.join(", ") || "-",
      data.aiRequirementsOther || "-",

      // Section 5
      data.followUp || "-",
      data.followUpContact || "-"
    ];

    // 3. Append row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true, message: "Survey submitted successfully" });
  } catch (error: any) {
    console.error("Survey API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit survey" },
      { status: 500 }
    );
  }
}
