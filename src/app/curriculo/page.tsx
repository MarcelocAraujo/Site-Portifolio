import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currículo — Marcelo Caldas",
  description:
    "Currículo de Marcelo Caldas de Araújo Filho, estudante de Ciência da Computação em Recife.",
};

const CURRICULO_URL = "/curriculo-marcelo-caldas.pdf";

export default function Curriculo() {
  return (
    <section>
      <p className="reveal-clip font-mono text-xs uppercase tracking-[0.1em] text-primary">
        Documento profissional
      </p>
      <h1 className="reveal-clip mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Currículo
      </h1>
      <p className="fade-in mt-5 max-w-[55ch] text-pretty text-base leading-relaxed text-muted-foreground [animation-delay:160ms]">
        Formação, cursos, habilidades e contato reunidos no documento
        completo, em PDF.
      </p>

      <div className="fade-in mt-10 flex flex-col items-start justify-between gap-6 border border-border bg-card p-6 [animation-delay:240ms] sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
            PDF · Currículo
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            Marcelo Caldas de Araújo Filho
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Estudante de Ciência da Computação · Recife, PE
          </p>
        </div>
        <a
          href={CURRICULO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          Abrir currículo
        </a>
      </div>
    </section>
  );
}
