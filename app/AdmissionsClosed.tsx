/**
 * AdmissionsClosed — Polished "closed" state UI
 *
 * WHY a separate component?
 * ─────────────────────────
 * A Senior keeps the closed state isolated so the form bundle is never
 * shipped to the client when admissions are off. Because page.tsx is
 * a Server Component, Next.js will tree-shake AdmissionForm.tsx entirely
 * when the gatekeeper renders this component instead.
 *
 * This component is intentionally a Server Component (no "use client").
 * It's pure HTML/CSS — no interactivity needed.
 */

export default function AdmissionsClosed() {
  return (
    <>
      {/* ── Animated background (matches form aesthetic) ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none touch-none">
        <div
          className="absolute -top-[30%] -left-[20%] w-[70vw] h-[70vw] rounded-full animate-pulse-slow will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(0,85,255,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full animate-pulse-slow-reverse will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-[480px] flex-col items-center text-center animate-fade-up">

          {/* Badge */}
          <span className="flex items-center gap-[10px] font-mono text-[0.82rem] tracking-[0.18em] uppercase text-[#00d4ff] mb-10">
            <span className="inline-block w-6 h-px bg-[#00d4ff]" />
            PUC-TECH — Liga Acadêmica
          </span>

          {/* Icon */}
          <div className="relative mb-8">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full animate-closed-pulse" 
              style={{ 
                background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
                transform: "scale(2.5)",
              }} 
            />
            <div className="relative w-[96px] h-[96px] rounded-full bg-[rgba(0,212,255,0.04)] border border-[rgba(0,212,255,0.12)] flex items-center justify-center shadow-[0_0_40px_rgba(0,212,255,0.08)]">
              {/* Lock icon */}
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="16.5" r="1.5" fill="#00d4ff" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.15] tracking-[-0.02em] text-[#f8fafc] mb-3">
            Inscrições{" "}
            <strong
              className="font-semibold"
              style={{
                background: "linear-gradient(120deg,#f8fafc 30%,#00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Encerradas
            </strong>
          </h1>

          {/* Subtitle */}
          <p className="text-[0.95rem] text-[#94a3b8] leading-[1.8] max-w-[380px] mb-10">
            O Processo Seletivo 2026 da PUC-TECH foi encerrado. 
            Agradecemos o interesse de todos os candidatos!
          </p>

          {/* Divider */}
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent mb-10" />

          {/* CTA — Instagram link */}
          <a
            href="https://www.instagram.com/puctechsp"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-[14px] rounded-[10px] border border-white/10 text-[0.88rem] font-semibold tracking-[0.06em] text-[#94a3b8] transition-all duration-300 hover:border-[rgba(0,212,255,0.25)] hover:text-[#f8fafc] hover:shadow-[0_0_20px_rgba(0,212,255,0.08)]"
          >
            {/* Instagram icon */}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="transition-colors duration-300 group-hover:text-[#00d4ff]">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            Siga-nos no Instagram
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="transition-transform duration-200 group-hover:translate-x-[2px]">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>

          {/* Secondary info */}
          <p className="mt-8 text-[0.78rem] text-[#475569] leading-[1.6]">
            Fique de olho nas nossas redes sociais para futuras oportunidades.
          </p>
        </div>
      </div>
    </>
  );
}
