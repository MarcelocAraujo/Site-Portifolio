import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formação Acadêmica — Marcelo Caldas",
  description:
    "Formação acadêmica de Marcelo Caldas: Ciência da Computação na Universidade Católica de Pernambuco e cursos complementares.",
};

const ITEMS = [
  {
    tag: "Graduação",
    periodo: "2024.2 — 2028.1 (previsto)",
    titulo: "Bacharelado em Ciência da Computação",
    local: "Universidade Católica de Pernambuco",
    descricao:
      "Graduação em andamento, atualmente no 5º período, com interesse em desenvolvimento de software, inteligência artificial, análise de dados e novas tecnologias.",
  },
  {
    tag: "Educação básica",
    periodo: "2008 — 2023",
    titulo: "Ensino Fundamental e Médio",
    local: "Colégio Damas",
    descricao: "Formação escolar completa no Colégio Damas, em Recife.",
  },
  {
    tag: "Curso",
    periodo: "Udemy",
    titulo: "Introdução ao Java — Fundamentos para Lógica de Programação",
    local: "Formação complementar",
    descricao:
      "Curso introdutório de Java voltado aos fundamentos da lógica de programação.",
  },
  {
    tag: "Curso",
    periodo: "Udemy",
    titulo: "Do Básico ao Avançado — O Curso Completo de Microsoft Excel",
    local: "Formação complementar",
    descricao: "Curso completo de Microsoft Excel, do nível básico ao avançado.",
  },
  {
    tag: "Curso",
    periodo: "Udemy",
    titulo: "Banco de Dados SQL do Zero ao Avançado + Projetos Reais",
    local: "Formação complementar",
    descricao:
      "Curso de banco de dados SQL com conteúdo progressivo e aplicação em projetos reais.",
  },
];

export default function Formacao() {
  return (
    <section>
      <p className="reveal-clip font-mono text-xs uppercase tracking-[0.1em] text-primary">
        Formação acadêmica
      </p>
      <h1 className="reveal-clip mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Trajetória e Cursos
      </h1>
      <p className="fade-in mt-5 max-w-[55ch] text-pretty text-base leading-relaxed text-muted-foreground [animation-delay:160ms]">
        Registro cronológico da minha formação e dos cursos que complementam
        a graduação em Ciência da Computação.
      </p>

      <ol className="mt-10 border-l border-border">
        {ITEMS.map((item) => (
          <li key={item.titulo} className="relative pb-8 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-primary" />
            <div className="border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="border border-primary/40 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
                  {item.tag}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.periodo}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {item.titulo}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.local}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                {item.descricao}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
