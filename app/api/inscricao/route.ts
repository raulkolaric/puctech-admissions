import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// ── Validation ──────────────────────────────────────────────────────────────
interface FormPayload {
  nome: string;
  ra: string;
  curso: string;
  ano: string;
  email: string;
  telefone: string;
  instagram: string;
  data_nascimento: string;
  motivo_puc: string;
  areas_interesse: string;
  projetos: string;
  experiencia: string;
  habilidades: string;
  soft_hard_skills: string;
  tempo_livre: string;
  areas_operacionais: string[];
}

function validate(body: unknown): body is FormPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.nome === "string" && b.nome.trim() !== "" &&
    typeof b.ra === "string" && b.ra.trim() !== "" &&
    typeof b.curso === "string" && b.curso.trim() !== "" &&
    typeof b.ano === "string" && b.ano.trim() !== "" &&
    typeof b.email === "string" && b.email.trim() !== "" &&
    typeof b.telefone === "string" && b.telefone.trim() !== "" &&
    typeof b.instagram === "string" &&
    typeof b.data_nascimento === "string" && b.data_nascimento.trim() !== "" &&
    typeof b.motivo_puc === "string" && b.motivo_puc.trim() !== "" &&
    typeof b.areas_interesse === "string" && b.areas_interesse.trim() !== "" &&
    typeof b.projetos === "string" && b.projetos.trim() !== "" &&
    typeof b.experiencia === "string" && b.experiencia.trim() !== "" &&
    typeof b.habilidades === "string" && b.habilidades.trim() !== "" &&
    typeof b.soft_hard_skills === "string" && b.soft_hard_skills.trim() !== "" &&
    typeof b.tempo_livre === "string" && b.tempo_livre.trim() !== "" &&
    Array.isArray(b.areas_operacionais) && b.areas_operacionais.length > 0
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
  //    The private key can arrive in many forms depending on how the hosting
  //    platform stores env vars (double-escaped, JSON-stringified, etc.).
  let rawKey = process.env.GOOGLE_PRIVATE_KEY ?? "";

  // Strip surrounding quotes that some dashboards add
  if (rawKey.startsWith('"') && rawKey.endsWith('"')) {
    rawKey = rawKey.slice(1, -1);
  }

  // Replace literal \n (two chars: backslash + n) with real newlines
  const privateKey = rawKey.replace(/\\n/g, "\n");

  // ── Debug: key diagnostics (never log the actual key) ──
  console.log("[auth] email present:", !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  console.log("[auth] raw key length:", rawKey.length);
  console.log("[auth] parsed key length:", privateKey.length);
  console.log("[auth] starts with -----BEGIN:", privateKey.startsWith("-----BEGIN"));
  console.log("[auth] ends with PRIVATE KEY-----:", privateKey.trimEnd().endsWith("PRIVATE KEY-----"));
  console.log("[auth] first 30 chars:", privateKey.substring(0, 30));
  console.log("[auth] last 30 chars:", privateKey.substring(privateKey.length - 30));
  console.log("[auth] contains real newlines:", privateKey.includes("\n"));
  console.log("[auth] newline count:", (privateKey.match(/\n/g) || []).length);

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // 4. Append row to sheet
  const timestamp = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  const tab = process.env.GOOGLE_SHEET_TAB;
  const range = tab ? `'${tab}'!A:Q` : "A:Q";

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
          body.ano.trim(),
          body.email.trim(),
          body.telefone.trim(),
          body.instagram.trim(),        // optional
          body.data_nascimento.trim(),
          body.motivo_puc.trim(),
          body.areas_interesse.trim(),
          body.projetos.trim(),
          body.experiencia.trim(),
          body.habilidades.trim(),
          body.soft_hard_skills.trim(),
          body.tempo_livre.trim(),
          body.areas_operacionais.join(", "), // array back to comma string
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
