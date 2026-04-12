"use client";

import { useState } from "react";

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "O que é a PUC Tech?",
    a: "A PUC Tech é a liga acadêmica de tecnologia da PUC-SP. Reunimos estudantes apaixonados por tech para colaborar em projetos reais, eventos e pesquisa aplicada.",
  },
  {
    q: "Quem pode se inscrever?",
    a: "Qualquer aluno regularmente matriculado na PUC-SP, independentemente do curso ou período.",
  },
  {
    q: "Existe taxa de inscrição?",
    a: "Não. A participação na liga é completamente gratuita.",
  },
  {
    q: "Quando acontece a dinâmica presencial?",
    a: "A dinâmica está prevista para o dia 18/04 (sábado). Reserve a data! Mais detalhes serão enviados por email após a primeira etapa.",
  },
  {
    q: "Quantas vagas há disponíveis?",
    a: "O número de vagas é limitado. A seleção é realizada com base nas respostas do formulário e no desempenho nas dinâmicas do processo seletivo.",
  },
  {
    q: "Como saberei se fui selecionado?",
    a: "Você receberá um email com o resultado após a primeira etapa. Fique atento à sua caixa de entrada (e ao spam).",
  },
  {
    q: "Preciso ter experiência prévia em tecnologia?",
    a: "Não é obrigatório. Buscamos pessoas curiosas, proativas e dispostas a aprender. A vontade de crescer vale mais que o currículo.",
  },
  {
    q: "Qual é a frequência de reuniões?",
    a: "Reuniões semanais aos sábados de manhã, alternando entre remota e presencial. Geralmente almoçamos juntos depois!",
  },
];

export default function AdmissionsClosed() {
  const [faqOpen, setFaqOpen] = useState(false);
  const [openFaqItem, setOpenFaqItem] = useState<string | null>(null);

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

      {/* ── FAQ floating button ── */}
      <div className="fixed bottom-6 right-5 z-40">
        <button
          type="button"
          onClick={() => setFaqOpen(true)}
          aria-label="Abrir perguntas frequentes"
          className="flex items-center gap-2 pl-4 pr-5 py-[11px] rounded-full text-[0.8rem] font-semibold tracking-[0.06em] uppercase text-white shadow-[0_4px_20px_rgba(0,85,255,0.4)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(0,85,255,0.5)] active:translate-y-0"
          style={{ background: "linear-gradient(135deg,#0055ff 0%,#0099dd 100%)" }}
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          FAQ
        </button>
      </div>

      {/* Mobile FAQ drawer */}
      <FaqDrawer
        open={faqOpen}
        onClose={() => setFaqOpen(false)}
        openItem={openFaqItem}
        onToggleItem={(q) => setOpenFaqItem((prev) => (prev === q ? null : q))}
      />
    </>
  );
}

/* ─── FAQ Sub-components ─── */
interface FaqDrawerProps {
  open: boolean;
  onClose: () => void;
  openItem: string | null;
  onToggleItem: (q: string) => void;
}

function FaqDrawer({ open, onClose, openItem, onToggleItem }: FaqDrawerProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end animate-fade-in"
      style={{ background: "rgba(2,6,23,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-h-[78vh] overflow-y-auto rounded-t-2xl border-t border-white/[0.08] animate-slide-up ml-auto mr-auto max-w-[600px]"
        style={{ background: "#05101f" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <span className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center justify-between px-5 pt-3 pb-4 border-b border-white/[0.06]">
          <div>
            <span className="flex items-center gap-[8px] font-mono text-[0.65rem] tracking-[0.18em] uppercase text-[#00d4ff] mb-1">
              <span className="inline-block w-3 h-px bg-[#00d4ff]" />
              Dúvidas Frequentes
            </span>
            <p className="text-[#f8fafc] text-[1rem] font-medium">Perguntas frequentes</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-[#94a3b8] transition-colors hover:border-white/20 hover:text-white"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-2">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openItem === item.q;
            return (
              <div key={item.q} className={`border-white/[0.06] ${idx !== 0 ? "border-t" : ""}`}>
                <button
                  type="button"
                  onClick={() => onToggleItem(item.q)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-[15px] text-left transition-colors duration-150 hover:bg-white/[0.03] group"
                >
                  <span className={`text-[0.84rem] font-medium leading-snug transition-colors duration-200 ${isOpen ? "text-[#f8fafc]" : "text-[#94a3b8] group-hover:text-white/80"}`}>
                    {item.q}
                  </span>
                  <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? "border-[#00d4ff] bg-[rgba(0,212,255,0.1)] rotate-45" : "border-white/20 bg-white/[0.03] rotate-0"}`}>
                    <svg width="9" height="9" fill="none" viewBox="0 0 24 24">
                      <path stroke={isOpen ? "#00d4ff" : "#94a3b8"} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div style={{ maxHeight: isOpen ? "200px" : "0px", overflow: "hidden", transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
                  <p className="px-5 pb-[15px] pt-1 text-[0.82rem] text-[#64748b] leading-[1.7]">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-8" />
      </div>
    </div>
  );
}
