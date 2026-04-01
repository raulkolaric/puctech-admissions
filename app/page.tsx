"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const TOTAL_STEPS = 5;

export default function Home() {
  /* ── Step state ── */
  const [step, setStep] = useState(1);

  /* ── Form data ── */
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [ra, setRa] = useState("");
  const [curso, setCurso] = useState("");
  const [outroCurso, setOutroCurso] = useState("");
  const [ano, setAno] = useState("");
  const [telefone, setTelefone] = useState("");

  const [motivoPuc, setMotivoPuc] = useState("");
  const [areasInteresse, setAreasInteresse] = useState("");
  const [projetos, setProjetos] = useState("");
  const [experiencia, setExperiencia] = useState("");

  const [habilidades, setHabilidades] = useState("");
  const [softHardSkills, setSoftHardSkills] = useState("");
  const [tempoLivre, setTempoLivre] = useState("");

  const [expectativas, setExpectativas] = useState("");
  const [areasOperacionais, setAreasOperacionais] = useState<string[]>([]);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  function validateStep(): boolean {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!nome.trim()) newErrors.nome = "O nome é obrigatório.";
      else if (nome.trim().split(/\s+/).length < 2) newErrors.nome = "Por favor, insira nome e sobrenome.";

      if (!email.trim()) newErrors.email = "O email é obrigatório.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = "Insira um email válido.";

      if (!dataNascimento) {
        newErrors.dataNascimento = "A data de nascimento é obrigatória.";
      } else {
        const year = new Date(dataNascimento).getFullYear();
        if (year < 1950 || year > new Date().getFullYear() - 15) {
          newErrors.dataNascimento = "Insira um ano de nascimento válido.";
        }
      }
    } else if (step === 2) {
      if (!ra.trim()) newErrors.ra = "O RA é obrigatório.";
      else if (!/^\d{8}$/.test(ra.trim())) newErrors.ra = "O RA deve ter exatamente 8 números (ex: 00123456).";
      
      if (!curso) newErrors.curso = "Selecione um curso.";
      else if (curso === "Outro" && !outroCurso.trim()) newErrors.outroCurso = "Informe qual seu curso.";

      if (!ano) newErrors.ano = "Selecione um ano/período.";
      
      const phoneDigits = telefone.replace(/\D/g, "");
      if (!telefone.trim()) newErrors.telefone = "O telefone é obrigatório.";
      else if (phoneDigits.length < 10) newErrors.telefone = "Insira um telefone válido com DDD.";
    } else if (step === 3) {
      if (motivoPuc.trim().length < 10) newErrors.motivoPuc = "Detalhe um pouco mais (mínimo 10 caracteres).";
      if (areasInteresse.trim().length < 10) newErrors.areasInteresse = "Detalhe um pouco mais (mínimo 10 caracteres).";
      if (!projetos.trim()) newErrors.projetos = "Este campo é obrigatório.";
      if (!experiencia.trim()) newErrors.experiencia = "Este campo é obrigatório.";
    } else if (step === 4) {
      if (habilidades.trim().length < 10) newErrors.habilidades = "Detalhe um pouco mais (mínimo 10 caracteres).";
      if (!softHardSkills.trim()) newErrors.softHardSkills = "Este campo é obrigatório.";
      if (tempoLivre.trim().length < 10) newErrors.tempoLivre = "Detalhe um pouco mais (mínimo 10 caracteres).";
    } else if (step === 5) {
      if (expectativas.trim().length < 10) newErrors.expectativas = "Detalhe um pouco mais (mínimo 10 caracteres).";
      if (areasOperacionais.length === 0) newErrors.areasOperacionais = "Selecione pelo menos uma opção.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          nome, ra, curso: curso === "Outro" ? outroCurso : curso, ano, email, telefone, instagram, data_nascimento: dataNascimento,
          motivo_puc: motivoPuc,
          areas_interesse: areasInteresse,
          projetos, experiencia, habilidades,
          soft_hard_skills: softHardSkills,
          tempo_livre: tempoLivre,
          expectativas,
          areas_operacionais: areasOperacionais,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao enviar inscrição.");
      }

      setStatus("success");
      // Reset everything
      setNome(""); setEmail(""); setInstagram(""); setDataNascimento("");
      setRa(""); setCurso(""); setOutroCurso(""); setAno(""); setTelefone("");
      setMotivoPuc(""); setAreasInteresse(""); setProjetos(""); setExperiencia("");
      setHabilidades(""); setSoftHardSkills(""); setTempoLivre("");
      setExpectativas(""); setAreasOperacionais([]); setErrors({});
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
    5: { title: "Expectativas", subtitle: "Última etapa! Queremos saber suas expectativas." },
  };

  return (
    <>
      {/* ── Animated background ── */}
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

      {/* ── Progress bar (fixed top) ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/[0.06]">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${(step / TOTAL_STEPS) * 100}%`,
            background: "linear-gradient(90deg, #0055ff 0%, #00d4ff 100%)",
            boxShadow: "0 0 12px rgba(0,212,255,0.4), 0 0 4px rgba(0,85,255,0.6)",
          }}
        />
      </div>

      {/* ── Wrapper ── */}
      <div
        className="relative z-10 grid w-full overflow-x-clip min-h-screen grid-cols-1 lg:grid-cols-[1fr_520px_1fr] touch-pan-y"
      >
        {/* ───── MOBILE HEADER (visible < lg) ───── */}
        <header className="flex flex-col items-center text-center px-6 pt-10 pb-6 lg:hidden">
          <span className="flex items-center gap-[10px] font-mono text-[0.82rem] tracking-[0.18em] uppercase text-[#00d4ff] mb-6">
            <span className="inline-block w-6 h-px bg-[#00d4ff]" />
            PUC-TECH — Liga Acadêmica
          </span>
          <h1 className="text-3xl font-light leading-[1.15] tracking-[-0.02em] text-[#f8fafc]">
            Processo Seletivo{" "}
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
        </header>
        {/* ─────────── LEFT PANEL (desktop only) ─────────── */}
        <aside className="hidden lg:flex flex-col justify-center px-12 py-[60px]">
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
        </aside>

        {/* ─────────── FORM COLUMN ─────────── */}
        <main className="flex flex-col justify-center px-6 py-8 lg:px-10 lg:py-10">

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center animate-fade-up">
              <div className="w-[84px] h-[84px] rounded-full bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.15)] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,212,255,0.1)]">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                  <path stroke="#00d4ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-[#f8fafc] mb-4">
                Inscrição concluída!
              </h2>
              <p className="text-[#94a3b8] text-[0.95rem] leading-[1.7] max-w-[340px] mb-10">
                Seus dados foram enviados com sucesso. Fique de olho no seu <strong className="text-[#f8fafc] text-[1.1rem]">email</strong> para as próximas etapas e já <strong className="text-[#f8fafc] text-[1.1rem]">reserve o seu sábado (18/04)</strong> para a nossa dinâmica presencial!
              </p>
            </div>
          ) : (
            <>
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
                <FieldWrapper label="Qual seu Nome?" htmlFor="nome" error={errors.nome}>
                  <input type="text" id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} className={`${inputClass} h-[50px]`} placeholder="Ex: Ana Paula Barros" />
                </FieldWrapper>

                <FieldWrapper label="Qual seu Email para contato?" htmlFor="email" error={errors.email}>
                  <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} h-[50px]`} placeholder="seuemail@exemplo.com" />
                </FieldWrapper>

                <FieldWrapper label="Qual seu Instagram?" htmlFor="instagram" error={errors.instagram}>
                  <input type="text" id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} className={`${inputClass} h-[50px]`} placeholder="@seuperfil" />
                </FieldWrapper>

                <FieldWrapper label="Data de Nascimento" htmlFor="dataNascimento" error={errors.dataNascimento}>
                  <input 
                    type="date" 
                    id="dataNascimento" 
                    required 
                    value={dataNascimento} 
                    onChange={(e) => setDataNascimento(e.target.value)} 
                    className={`${inputClass} h-[50px] !py-0 flex items-center`} 
                    style={{ colorScheme: "dark" }} 
                  />
                </FieldWrapper>
              </>
            )}

            {/* STEP 2 — Universidade */}
            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-[14px]">
                  <div className="min-w-0">
                    <FieldWrapper label="Qual seu RA?" htmlFor="ra" error={errors.ra}>
                      <input type="text" id="ra" required value={ra} onChange={(e) => setRa(e.target.value)} className={`${inputClass} h-[50px]`} placeholder="Ex: 00123456" />
                    </FieldWrapper>
                  </div>

                  <div className="min-w-0">
                    <FieldWrapper label="Qual seu Curso?" htmlFor="curso" error={errors.curso}>
                      <div className="relative">
                        <select id="curso" required value={curso} onChange={(e) => { setCurso(e.target.value); setOutroCurso(""); setErrors({}); }} className={`${selectBaseClass} ${curso ? "text-[#f8fafc]" : "text-[#475569]"}`}>
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
                </div>

                {curso === "Outro" && (
                  <div className="animate-fade-up">
                    <FieldWrapper label="Qual seu outro curso?" htmlFor="outroCurso" error={errors.outroCurso}>
                      <input 
                        type="text" 
                        id="outroCurso" 
                        required 
                        value={outroCurso} 
                        onChange={(e) => setOutroCurso(e.target.value)} 
                        className={`${inputClass} h-[50px]`} 
                        placeholder="Nome do seu curso" 
                      />
                    </FieldWrapper>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-[14px]">
                  <div className="min-w-0">
                    <FieldWrapper label="Qual seu Ano/Período?" htmlFor="ano" error={errors.ano}>
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
                  </div>

                  <div className="min-w-0">
                    <FieldWrapper label="Telefone (com DDD)" htmlFor="telefone" error={errors.telefone}>
                      <input type="tel" id="telefone" required value={telefone} onChange={(e) => setTelefone(e.target.value)} className={`${inputClass} h-[50px]`} placeholder="(11) 99999-9999" />
                    </FieldWrapper>
                  </div>
                </div>
              </>
            )}

            {/* STEP 3 — Áreas de Interesse */}
            {step === 3 && (
              <>
                <FieldWrapper label="Por que você gostaria de entrar na PUC Tech?" htmlFor="motivo_puc" error={errors.motivoPuc}>
                  <textarea id="motivo_puc" required value={motivoPuc} onChange={(e) => setMotivoPuc(e.target.value)} className={`${inputClass} py-[13px] resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="Quais são suas áreas de interesse?" htmlFor="areas_interesse" error={errors.areasInteresse}>
                  <textarea id="areas_interesse" required value={areasInteresse} onChange={(e) => setAreasInteresse(e.target.value)} className={`${inputClass} py-[13px] resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="Você já desenvolveu algum projeto? Se sim, quais?" htmlFor="projetos" error={errors.projetos}>
                  <textarea id="projetos" required placeholder="Sinta-se à vontade para deixar o link." value={projetos} onChange={(e) => setProjetos(e.target.value)} className={`${inputClass} py-[13px] resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="Você possui alguma experiência prévia? Descreva." htmlFor="experiencia" error={errors.experiencia}>
                  <textarea id="experiencia" required value={experiencia} onChange={(e) => setExperiencia(e.target.value)} className={`${inputClass} py-[13px] resize-y min-h-[90px]`} />
                </FieldWrapper>
              </>
            )}

            {/* STEP 4 — Habilidades */}
            {step === 4 && (
              <>
                <FieldWrapper label="Quais habilidade voce possui e acredita serem relevantes? (hard skills e soft skills)" htmlFor="habilidades" error={errors.habilidades}>
                  <textarea id="habilidades" required value={habilidades} onChange={(e) => setHabilidades(e.target.value)} className={`${inputClass} py-[13px] resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="Você tem disponibilidade para participar das reuniões semanais e eventos? (Atividades no período da tarde, e reuniões aos sábados)" htmlFor="soft_hard_skills" error={errors.softHardSkills}>
                  <textarea id="soft_hard_skills" required value={softHardSkills} onChange={(e) => setSoftHardSkills(e.target.value)} className={`${inputClass} py-[13px] resize-y min-h-[90px]`} />
                </FieldWrapper>

                <FieldWrapper label="O que você gosta de fazer no tempo livre?" htmlFor="tempo_livre" error={errors.tempoLivre}>
                  <textarea id="tempo_livre" required value={tempoLivre} onChange={(e) => setTempoLivre(e.target.value)} className={`${inputClass} py-[13px] resize-y min-h-[90px]`} />
                </FieldWrapper>
              </>
            )}

            {/* STEP 5 — Expectativas */}
            {step === 5 && (
              <>
                <FieldWrapper label="Quais são suas expectativas ao entrar na PUC Tech?" htmlFor="expectativas" error={errors.expectativas}>
                  <textarea id="expectativas" required placeholder="O que você espera aprender, conquistar ou vivenciar como membro da liga?" value={expectativas} onChange={(e) => setExpectativas(e.target.value)} className={`${inputClass} py-[13px] resize-y min-h-[90px]`} />
                </FieldWrapper>

                {/* Checkboxes */}
                <div className="relative mb-4 group/field animate-fade-up">
                  <label className={`flex items-center gap-[6px] text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-3 transition-colors duration-200 ${errors.areasOperacionais ? "text-red-400" : "text-[#94a3b8]"}`}>
                    <span className={`w-[5px] h-[5px] rounded-full transition-colors duration-200 ${errors.areasOperacionais ? "bg-red-400" : "bg-[#475569]"}`} />
                    Você tem interesse com as áreas operacionais?
                  </label>
                  <div className="flex flex-col gap-3">
                    {[
                      "Marketing (redes sociais, comunicação e design)",
                      "Eventos (organização de oficinas, workshops, etc.)",
                      "People (gestão de pessoas e processos)",
                      "Não tenho interesse",
                    ].map((area) => (
                      <label key={area} className="flex items-start gap-3 cursor-pointer group/chk" onClick={() => handleAreaToggle(area)}>
                        <div
                          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all ${
                            areasOperacionais.includes(area)
                              ? "bg-[rgba(0,212,255,0.15)] border-[#00d4ff]"
                              : (errors.areasOperacionais ? "bg-red-500/[0.04] border-red-500/50" : "bg-white/[0.03] border-white/10 group-hover/chk:border-white/30")
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
                  {errors.areasOperacionais && (
                    <p className="mt-2 text-[0.75rem] font-medium text-red-400 animate-fade-in">
                      {errors.areasOperacionais}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ── Navigation bar ── */}
          <div className="flex items-center gap-4 mt-10 pt-6 border-t border-white/[0.06]">
            {step > 1 && (
              <button
                type="button"
                onClick={() => { setStep((s) => s - 1); setStatus("idle"); setErrors({}); }}
                className="px-6 py-[13px] rounded-[10px] text-[0.88rem] font-semibold tracking-[0.08em] uppercase border border-white/10 text-[#94a3b8] transition-all duration-200 hover:border-white/20 hover:text-white"
              >
                Voltar
              </button>
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => {
                  if (validateStep()) {
                    setStep((s) => s + 1);
                    setErrors({});
                  }
                }}
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
                disabled={status === "loading"}
                onClick={() => {
                  if (validateStep()) handleSubmit();
                }}
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
            </>
          )}

        </main>

        {/* ───── MOBILE FOOTER (visible < lg) ───── */}
        <footer className="flex flex-col items-center text-center px-6 pt-4 pb-10 lg:hidden">
          <p className="text-[0.85rem] text-[#94a3b8] leading-[1.7] max-w-[360px]">
            Junte-se à liga de tecnologia da PUC e colabore em projetos reais, eventos e pesquisa aplicada junto a outros estudantes.
          </p>
        </footer>
      </div>
    </>
  );
}

/* ─── Shared style strings ─── */
const inputClass =
  "w-full px-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-[10px] text-[#f8fafc] font-sans text-base outline-none transition-all duration-[250ms] placeholder:text-[#475569] hover:border-white/[0.14] focus:border-[rgba(0,212,255,0.4)] focus:bg-[rgba(0,212,255,0.04)] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.06)]";

const selectBaseClass =
  "w-full appearance-none px-4 h-[50px] pr-10 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-[10px] font-sans text-base outline-none transition-all duration-[250ms] hover:border-white/[0.14] focus:border-[rgba(0,212,255,0.4)] focus:bg-[rgba(0,212,255,0.04)] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.06)] cursor-pointer [&>option]:bg-[#0f172a] [&>option]:text-[#f8fafc]";

/* ─── Sub-components ─── */
interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  delay?: string;
  error?: string;
  children: React.ReactNode;
}

function FieldWrapper({ label, htmlFor, delay = "0s", error, children }: FieldWrapperProps) {
  return (
    <div className="relative mb-5 group/field animate-fade-up overflow-x-hidden" style={{ animationDelay: delay }}>
      <label
        htmlFor={htmlFor}
        className={`flex items-start gap-[6px] text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-2 min-h-[28px] transition-colors duration-200 ${
          error ? "text-red-400 group-focus-within/field:text-red-400" : "text-[#94a3b8] group-focus-within/field:text-[#00d4ff]"
        }`}
      >
        <span className={`flex-shrink-0 w-[5px] h-[5px] rounded-full mt-[5px] transition-colors duration-200 ${
          error ? "bg-red-400 group-focus-within/field:bg-red-400" : "bg-[#475569] group-focus-within/field:bg-[#00d4ff]"
        }`} />
        <span className="block leading-tight">{label}</span>
      </label>
      <div className={error ? "[&>input]:border-red-500/50 [&>input]:bg-red-500/[0.04] [&>textarea]:border-red-500/50 [&>textarea]:bg-red-500/[0.04] [&>div>select]:border-red-500/50 [&>div>select]:bg-red-500/[0.04]" : ""}>
        {children}
      </div>
      {error && (
        <p className="absolute -bottom-[22px] left-0 text-[0.72rem] font-medium text-red-400 animate-fade-in">
          {error}
        </p>
      )}
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




function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
    </svg>
  );
}
