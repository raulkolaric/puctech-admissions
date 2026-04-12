/**
 * page.tsx — Server Component Gatekeeper (Kill Switch)
 *
 * WHY this architecture?
 * ─────────────────────
 * This file is a Server Component (no "use client"). It runs on the
 * server for EVERY request because of `dynamic = "force-dynamic"`.
 *
 * It reads `process.env.ADMISSIONS_OPEN` at runtime — NOT at build time.
 */

import AdmissionForm from "./AdmissionForm";
import AdmissionsClosed from "./AdmissionsClosed";

// Force dynamic rendering — never cache this page statically.
// This ensures process.env.ADMISSIONS_OPEN is read on EVERY request.
export const dynamic = "force-dynamic";

export default function Home() {
  const isOpen = process.env.ADMISSIONS_OPEN === "true";

  return (
    <div className="relative min-h-screen">
      {isOpen ? <AdmissionForm /> : <AdmissionsClosed />}
    </div>
  );
}
