"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const TOTAL_STEPS = 4;

export default function Home() {
  /* ── Step state ── */
  const [step, setStep] = useState(1);

  /* ── Form data ── */
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");

  const [ra, setRa] = useState("");
  const [curso, setCurso] = useState("");
  const [ano, setAno] = useState("");
  const [telefone, setTelefone] = useState("");

  const [motivoPuc, setMotivoPuc] = useState("");
  const [areasInteresse, setAreasInteresse] = useState("");
  const [projetos, setProjetos] = useState("");
  const [experiencia, setExperiencia] = useState("");

  const [habilidades, setHabilidades] = useState("");
  const [softHardSkills, setSoftHardSkills] = useState("");
  const [tempoLivre, setTempoLivre] = useState("");
  const [areasOperacionais, setAreasOperacionais] = useState<string[]>([]);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* ── Checkbox toggle logic ── */
  function handleAreaToggle(area: string) {
    if (area === "Não tenho interesse") {
      setAreasOperacionais(["Não tenho interesse"]);
      return;
    }
    setAreasOperacionais((prev) => {
      const filtered = prev.filter((p) => p !== "Não tenho interesse");
      return filtered.includes(area) ? filtered.filter((p) => p !== area) : [...filtered, area];
    });
  }

  /* ── Per-step validation ── */
  function canAdvance(): boolean {
    switch (step) {
      case 1: return nome.trim() !== "" && email.trim() !== "";
      case 2: return ra.trim() !== "" && curso !== "" && ano !== "" && telefone.trim() !== "";
      case 3: return motivoPuc.trim() !== "" && areasInteresse.trim() !== "" && projetos.trim() !== "" && experiencia.trim() !== "";
      case 4: return habilidades.trim() !== "" && softHardSkills.trim() !== "" && tempoLivre.trim() !== "" && areasOperacionais.length > 0;
      default: return false;
    }
  }

  /* ── Submit ── */
  async function handleSubmit() {
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome, ra, curso, ano, email, telefone, instagram,
          motivo_puc: motivoPuc,
          areas_interesse: areasInteresse,
          projetos, experiencia, habilidades,
          soft_hard_skills: softHardSkills,
          tempo_livre: tempoLivre,
          areas_operacionais: areasOperacionais,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao enviar inscrição.");
      }

      setStatus("success");
      // Reset everything
      setNome(""); setEmail(""); setInstagram("");
      setRa(""); setCurso(""); setAno(""); setTelefone("");
      setMotivoPuc(""); setAreasInteresse(""); setProjetos(""); setExperiencia("");
      setHabilidades(""); setSoftHardSkills(""); setTempoLivre("");
      setAreasOperacionais([]);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro inesperado.");
      setStatus("error");
    }
  }

  /* ── Step titles & subtitles ── */
  const stepMeta: Record<number, { title: string; subtitle: string }> = {
    1: { title: "Sobre você", subtitle: "Conte-nos um pouco mais sobre quem você é." },
    2: { title: "Universidade", subtitle: "Informações sobre seu vínculo acadêmico." },
    3: { title: "Áreas de Interesse", subtitle: "OBS: Se não tiver o que responder, escreva \"N/A\"." },
    4: { title: "Habilidades", subtitle: "Mostre suas competências e o que te motiva." },
  };

  return (
    <>
      {/* ── Animated background ── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-[30%] -left-[20%] w-[70vw] h-[70vw] rounded-full animate-pulse-slow"
          style={{ background: "radial-gradient(circle, rgba(0,85,255,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full animate-pulse-slow-reverse"
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

      {/* ── Wrapper ── */}
      <div
        className="relative z-10 grid w-full min-h-screen"
        style={{ gridTemplateColumns: "1fr 520px 1fr" }}
      >
        {/* ─────────── LEFT PANEL ─────────── */}
        <aside className="flex flex-col justify-center px-12 py-[60px]" style={{ gridColumn: 1 }}>
          <span className="flex items-center gap-[10px] font-mono text-[0.82rem] tracking-[0.18em] uppercase text-[#00d4ff] mb-10">
            <span className="inline-block w-6 h-px bg-[#00d4ff]" />
            PUC-TECH — Liga Acadêmica
          </span>

          <h1 className="text-[clamp(2rem,3vw,2.8rem)] font-light leading-[1.15] tracking-[-0.02em] text-[#f8fafc] mb-5">
            Processo<br />Seletivo<br />
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

          <p className="text-[0.9rem] text-[#94a3b8] leading-[1.7] max-w-[320px] mb-14">
            Junte-se à liga de tecnologia da PUC e colabore em projetos reais, eventos e pesquisa aplicada junto a outros estudantes.
          </p>

          {/* ── Step indicator on left panel ── */}
          <div className="flex flex-col gap-0 mt-auto">
            <p className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-[#475569] mb-6">
              Progresso
            </p>
            {[1, 2, 3, 4].map((s) => (
              <StepIndicatorItem key={s} stepNumber={s} label={stepMeta[s].title} current={step} />
            ))}
          </div>
        </aside>

        {/* ─────────── FORM COLUMN ─────────── */}
        <main className="flex flex-col justify-center px-10 py-10" style={{ gridColumn: 2 }}>

          {/* Form header — changes per step */}
          <div className="mb-10 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#475569] mb-4">
              Etapa {step} de {TOTAL_STEPS}
            </p>
            <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#f8fafc] mb-1">
              {stepMeta[step].title}
            </h2>
            <p className="text-[0.83rem] text-[#94a3b8]">
              {stepMeta[step].subtitle}
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

          {/* ── Step content ── */}
          <div className="flex flex-col gap-5">

            {/* STEP 1 — Sobre você */}
            {step === 1 && (
              <>
                <FieldWrapper label="Qual seu Nome?" htmlFor="nome">
                  <input type="text" id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} placeholder="Ex: Ana Paula Barros" />
                </FieldWrapper>

                <FieldWrapper label="Qual seu Email para contato?" htmlFor="email">
                  <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="seuemail@exemplo.com" />
                </FieldWrapper>

                <FieldWrapper label="Qual seu Instagram?" htmlFor="instagram">
                  <input type="text" id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} className={inputClass} placeholder="@seuperfil" />
                </FieldWrapper>
              </>
            )}

            {/* STEP 2 — Universidade */}
            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-[14px]">
                  <FieldWrapper label="Qual seu RA?" htmlFor="ra">
                    <input type="text" id="ra" required value={ra} onChange={(e) => setRa(e.target.value)} className={inputClass} placeholder="Ex: 00123456" />
                  </FieldWrapper>

                  <FieldWrapper label="Qual seu Curso?" htmlFor="curso">
                    <div className="relative">
                      <select id="curso" required value={curso} onChange={(e) => setCurso(e.target.value)} className={`${selectBaseClass} ${curso ? "text-[#f8fafc]" : "text-[#475569]"}`}>
                        <option value="" disabled>Selecione seu curso</option>
                        <option value="Ciência da Computação">Ciência da Computação</option>
                        <option value="Jogos Digitais">Jogos Digitais</option>
                        <option value="Design">Design</option>
                        <option value="Engenharia Biomédica">Engenharia Biomédica</option>
                        <option value="Engenharia de Sistemas Cyber-Físicos">Engenharia de Sistemas Cyber-Físicos</option>
                        <option value="Engenharia de Produção">Engenharia de Produção</option>
                        <option value="Engenharia Civil">Engenharia Civil</option>
                        <option value="Outro">Outro</option>
                      </select>
                      <ChevronIcon />
                    </div>
                  </FieldWrapper>
                </div>

                <div className="grid grid-cols-2 gap-[14px]">
                  <FieldWrapper label="Qual seu Ano/Período?" htmlFor="ano">
                    <div className="relative">
                      <select id="ano" required value={ano} onChange={(e) => setAno(e.target.value)} className={`${selectBaseClass} ${ano ? "text-[#f8fafc]" : "text-[#475569]"}`}>
                        <option value="" disabled>Selecione</option>
                        <option value="1º Período / 1º Ano">1º Período 1º Ano</option>
                        <option value="3º Período / 2º Ano">3º Período 2º Ano</option>
                        <option value="5º Período / 3º Ano">5º Período 3º Ano</option>
                        <option value="7º Período / 4º Ano">7º Período 4º Ano</option>
                        <option value="9º Período / 5º Ano">9º Período 5º Ano</option>
                        <option value="Outro">Outro</option>
                      </select>
                      <ChevronIcon />
                    </div>
                  </FieldWrapper>

                  <FieldWrapper label="Telefone (com DDD)" htmlFor="telefone">
                    <input type="tel" id="telefone" required value={telefone} onChange={(e) => setTelefone(e.target.value)} className={inputClass} placeholder="(11) 99999-9999" />
                  </FieldWrapper>
                </div>
              </>
            )}

            {/* STEP 3 — Áreas de Interesse */}
            {step === 3 && (
              <>
                <FieldWrapper label="Por que você gostaria de entrar na PUC Tech?" htmlFor="motivo_puc">
                  <textarea id="motivo_puc" required value={motivoPuc} onChange={(e) => setMotivoPuc(e.target.value)} className={`${inputClass} resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="Quais são suas áreas de interesse?" htmlFor="areas_interesse">
                  <textarea id="areas_interesse" required value={areasInteresse} onChange={(e) => setAreasInteresse(e.target.value)} className={`${inputClass} resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="Você já desenvolveu algum projeto? Se sim, quais?" htmlFor="projetos">
                  <textarea id="projetos" required placeholder="Sinta-se à vontade para deixar o link." value={projetos} onChange={(e) => setProjetos(e.target.value)} className={`${inputClass} resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="Você possui alguma experiência prévia? Descreva." htmlFor="experiencia">
                  <textarea id="experiencia" required value={experiencia} onChange={(e) => setExperiencia(e.target.value)} className={`${inputClass} resize-y min-h-[90px]`} />
                </FieldWrapper>
              </>
            )}

            {/* STEP 4 — Habilidades */}
            {step === 4 && (
              <>
                <FieldWrapper label="Quais habilidades você possui e acredita serem relevantes?" htmlFor="habilidades">
                  <textarea id="habilidades" required value={habilidades} onChange={(e) => setHabilidades(e.target.value)} className={`${inputClass} resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="Quais são suas principais Soft-Skills e Hard-Skills?" htmlFor="soft_hard_skills">
                  <textarea id="soft_hard_skills" required value={softHardSkills} onChange={(e) => setSoftHardSkills(e.target.value)} className={`${inputClass} resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="O que você gosta de fazer no tempo livre?" htmlFor="tempo_livre">
                  <textarea id="tempo_livre" required value={tempoLivre} onChange={(e) => setTempoLivre(e.target.value)} className={`${inputClass} resize-y min-h-[90px]`} />
                </FieldWrapper>

                {/* Checkboxes */}
                <div className="relative mb-2 group/field animate-fade-up">
                  <label className="flex items-center gap-[6px] text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] mb-3">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#475569]" />
                    Gostaria de contribuir com áreas operacionais?
                  </label>
                  <div className="flex flex-col gap-3">
                    {[
                      "Marketing (redes sociais, comunicação e design)",
                      "Eventos (organização de oficinas, workshops, etc.)",
                      "RH e Administrativo (gestão de pessoas e processos)",
                      "Não tenho interesse",
                    ].map((area) => (
                      <label key={area} className="flex items-start gap-3 cursor-pointer group/chk" onClick={() => handleAreaToggle(area)}>
                        <div
                          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all ${
                            areasOperacionais.includes(area)
                              ? "bg-[rgba(0,212,255,0.15)] border-[#00d4ff]"
                              : "bg-white/[0.03] border-white/10 group-hover/chk:border-white/30"
                          }`}
                        >
                          {areasOperacionais.includes(area) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-[0.9rem] leading-snug transition-colors ${
                            areasOperacionais.includes(area) ? "text-[#f8fafc]" : "text-[#94a3b8] group-hover/chk:text-white/80"
                          }`}
                        >
                          {area}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Navigation bar ── */}
          <div className="flex items-center gap-4 mt-10 pt-6 border-t border-white/[0.06]">
            {step > 1 && (
              <button
                type="button"
                onClick={() => { setStep((s) => s - 1); setStatus("idle"); }}
                className="px-6 py-[13px] rounded-[10px] text-[0.88rem] font-semibold tracking-[0.08em] uppercase border border-white/10 text-[#94a3b8] transition-all duration-200 hover:border-white/20 hover:text-white"
              >
                Voltar
              </button>
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                disabled={!canAdvance()}
                onClick={() => setStep((s) => s + 1)}
                className="group relative flex-1 px-6 py-[15px] flex items-center justify-center gap-[10px] overflow-hidden rounded-[10px] font-sans text-[0.88rem] font-semibold tracking-[0.08em] uppercase text-white transition-all duration-[250ms] disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,85,255,0.35),0_0_0_1px_rgba(0,212,255,0.15)] active:translate-y-0"
                style={{ background: "linear-gradient(135deg,#0055ff 0%,#0099dd 100%)" }}
              >
                <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-[600ms] group-hover:translate-x-full" />
                Próximo
                <span className="inline-flex transition-transform duration-200 group-hover:translate-x-[3px]">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            ) : (
              <button
                type="button"
                disabled={!canAdvance() || status === "loading"}
                onClick={handleSubmit}
                className="group relative flex-1 px-6 py-[15px] flex items-center justify-center gap-[10px] overflow-hidden rounded-[10px] font-sans text-[0.88rem] font-semibold tracking-[0.08em] uppercase text-white transition-all duration-[250ms] disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,85,255,0.35),0_0_0_1px_rgba(0,212,255,0.15)] active:translate-y-0"
                style={{ background: "linear-gradient(135deg,#0055ff 0%,#0099dd 100%)" }}
              >
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
            )}
          </div>

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
    <div className="relative mb-2 group/field animate-fade-up" style={{ animationDelay: delay }}>
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

/* ── Step indicator for the left panel ── */
interface StepIndicatorItemProps {
  stepNumber: number;
  label: string;
  current: number;
}

function StepIndicatorItem({ stepNumber, label, current }: StepIndicatorItemProps) {
  const isActive = stepNumber === current;
  const isDone = stepNumber < current;

  return (
    <div className={`relative flex items-start gap-4 ${stepNumber < 4 ? "pb-7" : "pb-0"}`}>
      {/* Connector */}
      {stepNumber < 4 && (
        <span
          className="absolute left-[7px] top-4 bottom-0 w-px"
          style={{
            background: isDone
              ? "linear-gradient(to bottom, #00d4ff, rgba(0,212,255,0.3))"
              : "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
          }}
        />
      )}
      {/* Dot */}
      <div
        className={`w-[15px] h-[15px] rounded-full flex-shrink-0 mt-0.5 relative border transition-colors ${
          isActive ? "border-[#00d4ff] bg-[rgba(0,212,255,0.1)]"
          : isDone ? "border-[#00d4ff] bg-[#00d4ff]"
          : "border-white/10 bg-[#0f172a]"
        }`}
      >
        {isActive && <span className="absolute inset-[3px] rounded-full bg-[#00d4ff]" />}
        {isDone && (
          <svg className="absolute inset-0 m-auto" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {/* Label */}
      <p className={`text-[0.8rem] leading-[1.5] transition-colors ${isActive ? "text-[#f8fafc]" : isDone ? "text-[#00d4ff]" : "text-[#94a3b8]"}`}>
        {label}
      </p>
    </div>
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
      {!last && (
        <span
          className="absolute left-[7px] top-4 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)" }}
        />
      )}
      <div
        className={`w-[15px] h-[15px] rounded-full flex-shrink-0 mt-0.5 relative border transition-colors ${
          active ? "border-[#00d4ff] bg-[rgba(0,212,255,0.1)]" : "border-white/10 bg-[#0f172a]"
        }`}
      >
        {active && <span className="absolute inset-[3px] rounded-full bg-[#00d4ff]" />}
      </div>
      <p className={`text-[0.8rem] leading-[1.5] transition-colors ${active ? "text-[#f8fafc]" : "text-[#94a3b8]"}`}>
        {children}
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
    </svg>
  );
}
