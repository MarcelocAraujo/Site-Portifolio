"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const PALAVRAS = [
  "JAVASCRIPT", "REACT", "ALGORITMO", "PROGRAMACAO", "COMPUTADOR",
  "DESENVOLVEDOR", "INTERFACE", "TECLADO", "MONITOR", "INTERNET",
  "BIBLIOTECA", "COMPONENTE", "VARIAVEL", "FUNCAO", "OBJETO",
  "NAVEGADOR", "SERVIDOR", "BANCODADOS", "PIXEL", "ANIMAÇÃO",
  "FRAMEWORK", "DEPURADOR", "TERMINAL", "REPOSITORIO", "MEMORIA",
  "PROCESSADOR", "GABINETE", "SOFTWARE", "HARDWARE", "CIRCUITO",
  "CURSOR", "ARQUIVO",
];

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_ERROS = 6;

function normalizar(letra: string) {
  return letra.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function sortearPalavra(): string {
  return PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)]!;
}

type StatusPartida = "jogando" | "vitoria" | "derrota";

export function JogoForca() {
  // Palavra fixa na primeira renderização para evitar mismatch de
  // hidratação; uma nova palavra é sorteada assim que o cliente monta.
  const [palavra, setPalavra] = useState<string>(PALAVRAS[0]!);
  const [tentadas, setTentadas] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setPalavra(sortearPalavra());
  }, []);

  const palavraNormalizada = useMemo(() => normalizar(palavra), [palavra]);

  const corretas = tentadas.filter((l) => palavraNormalizada.includes(l));
  const erradas = tentadas.filter((l) => !palavraNormalizada.includes(l));
  const tentativasRestantes = MAX_ERROS - erradas.length;

  const venceu = palavraNormalizada.split("").every((l) => corretas.includes(l));
  const perdeu = erradas.length >= MAX_ERROS;

  const status: StatusPartida = venceu ? "vitoria" : perdeu ? "derrota" : "jogando";

  function tentar(letraBruta: string) {
    if (status !== "jogando") return;
    const letra = normalizar(letraBruta.trim().toUpperCase());
    if (!letra || letra.length !== 1 || !ALFABETO.includes(letra)) return;
    if (tentadas.includes(letra)) return;
    setTentadas((prev) => [...prev, letra]);
  }

  function reiniciar() {
    setPalavra(sortearPalavra());
    setTentadas([]);
    setInput("");
  }

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-8">
        <div>
          <p className="reveal-clip font-mono text-xs uppercase tracking-[0.1em] text-primary">
            Projeto pessoal · React
          </p>
          <h1 className="reveal-clip mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Jogo da Forca
          </h1>
        </div>
        <span className="fade-in font-mono text-[11px] text-muted-foreground [animation-delay:120ms]">
          {PALAVRAS.length} palavras · {MAX_ERROS} vidas
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {/* Painel principal */}
        <div className="border border-border bg-card p-6 lg:col-span-7">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Tentativas restantes
            </p>
            <span className="font-display text-2xl font-bold text-primary">
              {tentativasRestantes}
              <span className="text-base text-muted-foreground">/{MAX_ERROS}</span>
            </span>
          </div>

          {/* Palavra */}
          <div className="mt-6 flex flex-wrap gap-2">
            {palavra.split("").map((letra, i) => {
              const letraNorm = normalizar(letra);
              const revelada = status === "derrota" || corretas.includes(letraNorm);
              return (
                <span
                  key={i}
                  className={cn(
                    "grid h-14 min-w-12 flex-1 place-items-center border-b-2 font-display text-2xl font-bold transition-colors",
                    revelada
                      ? "border-primary text-foreground"
                      : "border-foreground/25 text-foreground/30",
                    status === "derrota" &&
                      !corretas.includes(letraNorm) &&
                      "border-destructive text-destructive",
                  )}
                >
                  {revelada ? letra : "_"}
                </span>
              );
            })}
          </div>

          {/* Mensagem de fim de jogo */}
          {status !== "jogando" && (
            <div
              className={cn(
                "fade-in mt-6 border px-4 py-3 text-center",
                status === "vitoria"
                  ? "border-teal/40 bg-teal/10 text-teal"
                  : "border-destructive/40 bg-destructive/10 text-destructive",
              )}
            >
              <p className="font-display text-lg font-bold">
                {status === "vitoria"
                  ? "Parabéns, você venceu!"
                  : "Fim de jogo! Você perdeu."}
              </p>
              <p className="mt-1 font-mono text-xs">A palavra era: {palavra}</p>
            </div>
          )}

          {/* Entrada de letra por input */}
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              tentar(input);
              setInput("");
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1}
              disabled={status !== "jogando"}
              placeholder="Digite uma letra"
              aria-label="Digite uma letra"
              className="min-w-0 flex-1 border border-input bg-board px-4 py-2.5 font-display text-sm font-semibold uppercase outline-none transition-colors placeholder:normal-case placeholder:text-muted-foreground focus:border-primary disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={status !== "jogando"}
              className="bg-primary px-4 py-2.5 font-display text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-40"
            >
              Enviar
            </button>
          </form>

          {/* Teclado virtual */}
          <div className="mt-5 grid grid-cols-7 gap-1.5">
            {ALFABETO.map((letra) => {
              const usada = tentadas.includes(letra);
              const correta = usada && palavraNormalizada.includes(letra);
              const errada = usada && !palavraNormalizada.includes(letra);
              return (
                <button
                  key={letra}
                  onClick={() => tentar(letra)}
                  disabled={usada || status !== "jogando"}
                  className={cn(
                    "border border-border py-2.5 font-display text-sm font-semibold transition",
                    correta
                      ? "border-teal/40 bg-teal/10 text-teal"
                      : errada
                        ? "border-destructive/30 bg-destructive/10 text-destructive line-through"
                        : "bg-board hover:bg-secondary active:scale-95",
                  )}
                >
                  {letra}
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel lateral */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          <div className="border border-border bg-card p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Boneco
            </p>
            <BonecoForca erros={erradas.length} />
          </div>

          <div className="flex-1 border border-border bg-card p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Letras tentadas
            </p>
            {tentadas.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Nenhuma letra ainda. Chute a primeira!
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {tentadas.map((letra) => {
                  const correta = palavraNormalizada.includes(letra);
                  return (
                    <span
                      key={letra}
                      className={cn(
                        "border px-2.5 py-1 font-display text-sm font-semibold",
                        correta
                          ? "border-teal/40 bg-teal/10 text-teal"
                          : "border-destructive/30 bg-destructive/10 text-destructive line-through",
                      )}
                    >
                      {letra}
                    </span>
                  );
                })}
              </div>
            )}
            <button
              onClick={reiniciar}
              className="mt-6 w-full border border-input py-2.5 text-sm font-semibold transition hover:bg-accent"
            >
              Reiniciar jogo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BonecoForca({ erros }: { erros: number }) {
  const COR_BASE = "var(--color-muted-foreground)";
  const COR_ATIVA = "var(--color-primary)";
  const COR_INATIVA = "var(--color-border)";
  const cor = (parte: number) => (erros >= parte ? COR_ATIVA : COR_INATIVA);

  return (
    <svg
      viewBox="0 0 140 170"
      className="mx-auto mt-4 h-44 w-auto"
      role="img"
      aria-label={`Boneco da forca com ${erros} erros`}
    >
      {/* Estrutura da forca */}
      <line x1="10" y1="165" x2="130" y2="165" stroke={COR_BASE} strokeWidth="4" strokeLinecap="round" />
      <line x1="25" y1="165" x2="25" y2="10" stroke={COR_BASE} strokeWidth="4" strokeLinecap="round" />
      <line x1="25" y1="10" x2="95" y2="10" stroke={COR_BASE} strokeWidth="4" strokeLinecap="round" />
      <line x1="95" y1="10" x2="95" y2="32" stroke={COR_BASE} strokeWidth="4" strokeLinecap="round" />
      {/* 1: cabeça */}
      <circle cx="95" cy="46" r="14" fill="none" stroke={cor(1)} strokeWidth="3.5" />
      {/* 2: tronco */}
      <line x1="95" y1="60" x2="95" y2="110" stroke={cor(2)} strokeWidth="3.5" strokeLinecap="round" />
      {/* 3: braço esquerdo */}
      <line x1="95" y1="72" x2="72" y2="90" stroke={cor(3)} strokeWidth="3.5" strokeLinecap="round" />
      {/* 4: braço direito */}
      <line x1="95" y1="72" x2="118" y2="90" stroke={cor(4)} strokeWidth="3.5" strokeLinecap="round" />
      {/* 5: perna esquerda */}
      <line x1="95" y1="110" x2="76" y2="138" stroke={cor(5)} strokeWidth="3.5" strokeLinecap="round" />
      {/* 6: perna direita */}
      <line x1="95" y1="110" x2="114" y2="138" stroke={cor(6)} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
