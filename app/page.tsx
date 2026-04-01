"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const [cursoValue, setCursoValue] = useState("");
  const [interesseValue, setInteresseValue] = useState("");
  const [motivacao, setMotivacao] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          ra,
          curso: cursoValue,
          interesse: interesseValue,
          motivacao,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao enviar inscrição.");
      }

      setStatus("success");
      // Reset fields
      setNome("");
      setRa("");
      setCursoValue("");
      setInteresseValue("");
      setMotivacao("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro inesperado.");
      setStatus("error");
    }
  }

  return (
    <>
      {/* ── Animated background ── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Blue glow top-left */}
        <div
          className="absolute -top-[30%] -left-[20%] w-[70vw] h-[70vw] rounded-full animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(0,85,255,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Cyan glow bottom-right */}
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full animate-pulse-slow-reverse"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Wrapper ── */}
      <div
        className="relative z-10 grid w-full min-h-screen"
        style={{
          gridTemplateColumns: "1fr 520px 1fr",
        }}
      >
        {/* ─────────── LEFT PANEL ─────────── */}
        <aside
          className="flex flex-col justify-center px-12 py-[60px]"
          style={{ gridColumn: 1 }}
        >
          {/* Brand tag */}
          <span className="flex items-center gap-[10px] font-mono text-[0.82rem] tracking-[0.18em] uppercase text-[#00d4ff] mb-10">
            <span className="inline-block w-6 h-px bg-[#00d4ff]" />
            PUC-TECH — Liga Acadêmica
          </span>

          {/* Headline */}
          <h1
            className="text-[clamp(2rem,3vw,2.8rem)] font-light leading-[1.15] tracking-[-0.02em] text-[#f8fafc] mb-5"
          >
            Processo
            <br />
            Seletivo
            <br />
            <strong
              className="font-semibold"
              style={{
                background: "linear-gradient(120deg,#f8fafc 30%,#00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              2026
            </strong>
          </h1>

          {/* Description */}
          <p className="text-[0.9rem] text-[#94a3b8] leading-[1.7] max-w-[320px] mb-14">
            Junte-se à liga de tecnologia da PUC e colabore em projetos reais, eventos e pesquisa aplicada junto a outros estudantes.
          </p>
        </aside>

        {/* ─────────── FORM COLUMN ─────────── */}
        <main
          className="flex flex-col justify-center px-10 py-10"
          style={{ gridColumn: 2 }}
        >
          {/* Form header */}
          <div className="mb-10 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#475569] mb-4">
              Formulário de inscrição
            </p>
            <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#f8fafc] mb-1">
              Dados do candidato
            </h2>
            <p className="text-[0.83rem] text-[#94a3b8]">
              Preencha todos os campos para submeter sua inscrição.
            </p>
          </div>

          {/* ── Success banner ── */}
          {status === "success" && (
            <div className="mb-6 flex items-center gap-3 rounded-[10px] border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.06)] px-4 py-3 text-[0.83rem] text-[#00d4ff] backdrop-blur-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Inscrição enviada com sucesso!
            </div>
          )}

          {/* ── Error banner ── */}
          {status === "error" && (
            <div className="mb-6 flex items-center gap-3 rounded-[10px] border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-[0.83rem] text-red-400 backdrop-blur-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              {errorMsg}
            </div>
          )}

          <form id="ligaForm" noValidate className="flex flex-col" onSubmit={handleSubmit}>

            {/* Nome completo */}
            <FieldWrapper label="Nome completo" htmlFor="nome" delay="0.10s">
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Ex: Ana Paula Barros"
                autoComplete="name"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={inputClass}
              />
            </FieldWrapper>

            {/* RA + Curso — two columns */}
            <div className="grid grid-cols-2 gap-[14px]">
              <FieldWrapper label="RA" htmlFor="ra" delay="0.14s">
                <input
                  type="text"
                  id="ra"
                  name="ra"
                  placeholder="Ex: 00123456"
                  required
                  value={ra}
                  onChange={(e) => setRa(e.target.value)}
                  className={inputClass}
                />
              </FieldWrapper>

              <FieldWrapper label="Curso" htmlFor="curso" delay="0.14s">
                <div className="relative">
                  <select
                    id="curso"
                    name="curso"
                    required
                    value={cursoValue}
                    onChange={(e) => setCursoValue(e.target.value)}
                    className={`${selectBaseClass} ${cursoValue ? "text-[#f8fafc]" : "text-[#475569]"}`}
                  >
                    <option value="" disabled>Selecione seu curso</option>
                    <option value="cc">Ciência da Computação</option>
                    <option value="design">Design</option>
                    <option value="biomed">Engenharia Biomédica</option>
                    <option value="civil">Engenharia Civil</option>
                    <option value="producao">Engenharia de Produção</option>
                    <option value="scf">Engenharia de Sistemas Ciber Físicos</option>
                    <option value="jogos">Jogos Digitais</option>
                  </select>
                  <ChevronIcon />
                </div>
              </FieldWrapper>
            </div>

            {/* Interesse */}
            <FieldWrapper label="Especialização de interesse" htmlFor="interesse" delay="0.18s">
              <div className="relative">
                <select
                  id="interesse"
                  name="interesse"
                  required
                  value={interesseValue}
                  onChange={(e) => setInteresseValue(e.target.value)}
                  className={`${selectBaseClass} ${interesseValue ? "text-[#f8fafc]" : "text-[#475569]"}`}
                >
                  <option value="" disabled>Selecione uma área</option>
                  <option value="cyber">Cibersecurity</option>
                  <option value="ia">Inteligência Artificial</option>
                  <option value="dev">Desenvolvimento de Sistemas</option>
                  <option value="data">Data Science</option>
                  <option value="cloud">Cloud Computing</option>
                  <option value="iot">Internet das Coisas (IoT)</option>
                  <option value="games">Desenvolvimento de Games</option>
                  <option value="mobile">Desenvolvimento Mobile</option>
                  <option value="devops">DevOps &amp; SRE</option>
                  <option value="blockchain">Blockchain &amp; Web3</option>
                </select>
                <ChevronIcon />
              </div>
            </FieldWrapper>

            {/* Motivação */}
            <FieldWrapper label="Motivação" htmlFor="motivacao" delay="0.22s">
              <textarea
                id="motivacao"
                name="motivacao"
                placeholder="Descreva sua motivação em entrar na liga e o que espera contribuir..."
                required
                value={motivacao}
                onChange={(e) => setMotivacao(e.target.value)}
                className={`${inputClass} resize-none min-h-[110px] leading-[1.6]`}
              />
            </FieldWrapper>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative w-full mt-2 px-6 py-[15px] flex items-center justify-center gap-[10px] overflow-hidden rounded-[10px] font-sans text-[0.88rem] font-semibold tracking-[0.08em] uppercase text-white transition-all duration-[250ms] disabled:opacity-60 disabled:cursor-not-allowed hover:not-disabled:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,85,255,0.35),0_0_0_1px_rgba(0,212,255,0.15)] active:translate-y-0"
              style={{
                background: "linear-gradient(135deg,#0055ff 0%,#0099dd 100%)",
              }}
            >
              {/* shimmer */}
              <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-[600ms] group-hover:translate-x-full" />

              {status === "loading" ? (
                <>
                  <Spinner />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar inscrição
                  <span className="inline-flex transition-transform duration-200 group-hover:translate-x-[3px]">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </>
              )}
            </button>

          </form>
        </main>

        {/* ─────────── RIGHT PANEL ─────────── */}
        <aside
          className="flex flex-col justify-end px-10 py-[60px] xl:flex lg:flex hidden"
          style={{ gridColumn: 3 }}
        >
          <div className="flex flex-col gap-0">
            <p className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-[#475569] mb-6">
              Calendário do processo
            </p>

            <TimelineItem active>Inscrições abertas</TimelineItem>
            <TimelineItem>Entrevistas com candidatos selecionados</TimelineItem>
            <TimelineItem last>Divulgação do resultado final</TimelineItem>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ─── Shared style strings ─── */
const inputClass =
  "w-full px-4 py-[13px] bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-[10px] text-[#f8fafc] font-sans text-[0.93rem] outline-none transition-all duration-[250ms] placeholder:text-[#475569] hover:border-white/[0.14] focus:border-[rgba(0,212,255,0.4)] focus:bg-[rgba(0,212,255,0.04)] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.06)]";

const selectBaseClass =
  "w-full appearance-none px-4 py-[13px] pr-10 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-[10px] font-sans text-[0.93rem] outline-none transition-all duration-[250ms] hover:border-white/[0.14] focus:border-[rgba(0,212,255,0.4)] focus:bg-[rgba(0,212,255,0.04)] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.06)] cursor-pointer [&>option]:bg-[#0f172a] [&>option]:text-[#f8fafc]";

/* ─── Sub-components ─── */
interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  delay?: string;
  children: React.ReactNode;
}

function FieldWrapper({ label, htmlFor, delay = "0s", children }: FieldWrapperProps) {
  return (
    <div
      className="relative mb-5 group/field animate-fade-up"
      style={{ animationDelay: delay }}
    >
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-[6px] text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] mb-2 transition-colors duration-200 group-focus-within/field:text-[#00d4ff]"
      >
        <span className="w-[5px] h-[5px] rounded-full bg-[#475569] transition-colors duration-200 group-focus-within/field:bg-[#00d4ff]" />
        {label}
      </label>
      {children}
    </div>
  );
}

function ChevronIcon() {
  return (
    <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2">
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

interface TimelineItemProps {
  active?: boolean;
  last?: boolean;
  children: React.ReactNode;
}

function TimelineItem({ active = false, last = false, children }: TimelineItemProps) {
  return (
    <div className={`relative flex items-start gap-4 ${last ? "pb-0" : "pb-7"}`}>
      {/* Connector line */}
      {!last && (
        <span
          className="absolute left-[7px] top-4 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)" }}
        />
      )}

      {/* Dot */}
      <div
        className={`w-[15px] h-[15px] rounded-full flex-shrink-0 mt-0.5 relative border transition-colors ${
          active
            ? "border-[#00d4ff] bg-[rgba(0,212,255,0.1)]"
            : "border-white/10 bg-[#0f172a]"
        }`}
      >
        {active && (
          <span className="absolute inset-[3px] rounded-full bg-[#00d4ff]" />
        )}
      </div>

      {/* Text */}
      <p
        className={`text-[0.8rem] leading-[1.5] transition-colors ${
          active ? "text-[#f8fafc]" : "text-[#94a3b8]"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
      />
    </svg>
  );
}
