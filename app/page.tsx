"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const [curso, setCurso] = useState("");
  const [ano, setAno] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [auxilio, setAuxilio] = useState("");

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

  function handleAreaToggle(area: string) {
    if (area === "Não tenho interesse") {
      setAreasOperacionais(["Não tenho interesse"]);
      return;
    }
    
    setAreasOperacionais(prev => {
      const filtered = prev.filter(p => p !== "Não tenho interesse");
      if (filtered.includes(area)) {
        return filtered.filter(p => p !== area);
      } else {
        return [...filtered, area];
      }
    });
  }

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
          curso,
          ano,
          email,
          telefone,
          auxilio,
          motivo_puc: motivoPuc,
          areas_interesse: areasInteresse,
          projetos,
          experiencia,
          habilidades,
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
      
      // Reset fields
      setNome(""); setRa(""); setCurso(""); setAno("");
      setEmail(""); setTelefone(""); setAuxilio("");
      setMotivoPuc(""); setAreasInteresse(""); setProjetos(""); setExperiencia("");
      setHabilidades(""); setSoftHardSkills(""); setTempoLivre("");
      setAreasOperacionais([]);
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

          <form id="ligaForm" noValidate className="flex flex-col gap-10" onSubmit={handleSubmit}>

            {/* ================= SECTION 1 ================= */}
            <fieldset className="flex flex-col gap-5">
              <legend className="text-[#f8fafc] font-medium text-lg mb-4 border-b border-white/10 pb-2 w-full">
                1. Informações Básicas
              </legend>

              <FieldWrapper label="1. Qual seu Nome?" htmlFor="nome">
                <input type="text" id="nome" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} />
              </FieldWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                <FieldWrapper label="2. Qual seu RA?" htmlFor="ra">
                  <input type="text" id="ra" name="ra" required value={ra} onChange={(e) => setRa(e.target.value)} className={inputClass} />
                </FieldWrapper>

                <FieldWrapper label="3. Qual seu Curso?" htmlFor="curso">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                <FieldWrapper label="4. Qual seu Ano/Período?" htmlFor="ano">
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

                <FieldWrapper label="5. Qual seu Email?" htmlFor="email">
                  <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                </FieldWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                <FieldWrapper label="6. Telefone (com DDD)" htmlFor="telefone">
                  <input type="tel" id="telefone" required value={telefone} onChange={(e) => setTelefone(e.target.value)} className={inputClass} />
                </FieldWrapper>

                <FieldWrapper label="7. Necessita de auxílio especial?" htmlFor="auxilio">
                  <input type="text" id="auxilio" placeholder="Opcional. Ex: interprete de libras" value={auxilio} onChange={(e) => setAuxilio(e.target.value)} className={inputClass} />
                </FieldWrapper>
              </div>
            </fieldset>

            {/* ================= SECTION 2 ================= */}
            <fieldset className="flex flex-col gap-5">
              <legend className="text-[#f8fafc] font-medium text-lg mb-4 border-b border-white/10 pb-2 w-full">
                2. Áreas de Interesse
                <span className="block text-xs text-[#94a3b8] font-normal mt-1">OBS: Se não tiver o que responder, escreva "N/A".</span>
              </legend>

              <FieldWrapper label="8. Por que você gostaria de entrar na PUC Tech?" htmlFor="motivo_puc">
                <textarea id="motivo_puc" required value={motivoPuc} onChange={(e) => setMotivoPuc(e.target.value)} className={`${inputClass} resize-y min-h-[80px]`} />
              </FieldWrapper>

              <FieldWrapper label="9. Quais são suas áreas de interesse?" htmlFor="areas_interesse">
                <textarea id="areas_interesse" required value={areasInteresse} onChange={(e) => setAreasInteresse(e.target.value)} className={`${inputClass} resize-y min-h-[80px]`} />
              </FieldWrapper>

              <FieldWrapper label="10. Você já desenvolveu algum projeto? Se sim, quais?" htmlFor="projetos">
                <textarea id="projetos" required placeholder="Sinta-se à vontade para deixar o link." value={projetos} onChange={(e) => setProjetos(e.target.value)} className={`${inputClass} resize-y min-h-[80px]`} />
              </FieldWrapper>

              <FieldWrapper label="11. Você possui alguma experiência prévia? Descreva." htmlFor="experiencia">
                <textarea id="experiencia" required value={experiencia} onChange={(e) => setExperiencia(e.target.value)} className={`${inputClass} resize-y min-h-[80px]`} />
              </FieldWrapper>
            </fieldset>

            {/* ================= SECTION 3 ================= */}
            <fieldset className="flex flex-col gap-5">
              <legend className="text-[#f8fafc] font-medium text-lg mb-4 border-b border-white/10 pb-2 w-full">
                3. Habilidades
              </legend>

              <FieldWrapper label="12. Quais habilidades você possui e acredita serem relevantes?" htmlFor="habilidades">
                <textarea id="habilidades" required value={habilidades} onChange={(e) => setHabilidades(e.target.value)} className={`${inputClass} resize-y min-h-[80px]`} />
              </FieldWrapper>

              <FieldWrapper label="13. Quais são suas principais Soft-Skills e Hard-Skills?" htmlFor="soft_hard_skills">
                <textarea id="soft_hard_skills" required value={softHardSkills} onChange={(e) => setSoftHardSkills(e.target.value)} className={`${inputClass} resize-y min-h-[80px]`} />
              </FieldWrapper>

              <FieldWrapper label="14. O que você gosta de fazer no tempo livre?" htmlFor="tempo_livre">
                <textarea id="tempo_livre" required value={tempoLivre} onChange={(e) => setTempoLivre(e.target.value)} className={`${inputClass} resize-y min-h-[80px]`} />
              </FieldWrapper>

              {/* Checkboxes for area operacionais */}
              <div className="relative mb-2 group/field animate-fade-up" style={{ animationDelay: "0s" }}>
                <label className="flex items-center gap-[6px] text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] mb-3">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#475569]" />
                  15. Gostaria de contribuir com áreas operacionais?
                </label>
                <div className="flex flex-col gap-3">
                  {[
                    "Marketing (redes sociais, comunicação e design)",
                    "Eventos (organização de oficinas, workshops, etc.)",
                    "RH e Administrativo (gestão de pessoas e processos)",
                    "Não tenho interesse"
                  ].map(area => (
                    <label key={area} className="flex items-start gap-3 cursor-pointer group/chk" onClick={() => handleAreaToggle(area)}>
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all ${
                        areasOperacionais.includes(area)
                          ? "bg-[rgba(0,212,255,0.15)] border-[#00d4ff]"
                          : "bg-white/[0.03] border-white/10 group-hover/chk:border-white/30"
                      }`}>
                        {areasOperacionais.includes(area) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-[0.9rem] leading-snug transition-colors ${
                        areasOperacionais.includes(area) ? "text-[#f8fafc]" : "text-[#94a3b8] group-hover/chk:text-white/80"
                      }`}>
                        {area}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>

            {/* Submit Toolbar */}
            <div className="pt-4 border-t border-white/[0.06]">
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
            </div>

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
