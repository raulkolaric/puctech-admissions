import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// ── Validation ──────────────────────────────────────────────────────────────
interface FormPayload {
  nome: string;
  ra: string;
  curso: string;
  interesse: string;
  motivacao: string;
}

function validate(body: unknown): body is FormPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.nome === "string" && b.nome.trim() !== "" &&
    typeof b.ra === "string" && b.ra.trim() !== "" &&
    typeof b.curso === "string" && b.curso.trim() !== "" &&
    typeof b.interesse === "string" && b.interesse.trim() !== "" &&
    typeof b.motivacao === "string" && b.motivacao.trim() !== ""
  );
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 2. Validate fields
  if (!validate(body)) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  // 3. Authenticate with Google via Service Account
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // 4. Append row to sheet
  const timestamp = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  const tab = process.env.GOOGLE_SHEET_TAB;
  const range = tab ? `'${tab}'!A:F` : "A:F";

  console.log("[sheets] tab:", tab ?? "(using first sheet)");
  console.log("[sheets] range:", range);
  console.log("[sheets] sheetId:", process.env.GOOGLE_SHEET_ID);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          timestamp,
          body.nome.trim(),
          body.ra.trim(),
          body.curso.trim(),
          body.interesse.trim(),
          body.motivacao.trim(),
        ]],
      },
    });
  } catch (err) {
    console.error("[sheets] append failed:", err);
    return NextResponse.json(
      { error: "Erro ao salvar inscrição. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
