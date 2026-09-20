import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marcelo Caldas — Portfólio Acadêmico",
  description:
    "Currículo e portfólio de Marcelo Caldas, estudante de Ciência da Computação: formação, cursos, projetos e um Jogo da Forca interativo.",
};

const DESTAQUES = [
  {
    href: "/formacao" as const,
    tag: "Formação",
    titulo: "Formação acadêmica",
    descricao: "Graduação em Ciência da Computação, cursos e certificações.",
  },
  {
    href: "/curriculo" as const,
    tag: "Documento",
    titulo: "Currículo completo",
    descricao: "PDF com formação, habilidades e contato.",
  },
  {
    href: "/projetos" as const,
    tag: "Trabalho",
    titulo: "Projetos",
    descricao: "Trabalhos acadêmicos e projetos pessoais selecionados.",
  },
];

export default function Home() {
  return (
    <>
      <header className="grid gap-10 border-b border-border pb-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="reveal-clip font-mono text-xs uppercase tracking-[0.1em] text-primary">
            Estudante de Ciência da Computação — UNICAP
          </p>
          <h1 className="reveal-clip mt-4 text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            Marcelo Caldas de Araújo Filho
          </h1>
          <p className="fade-in mt-6 max-w-[50ch] text-pretty text-base leading-relaxed text-muted-foreground [animation-delay:200ms]">
            Estudante de Ciência da Computação, com interesse na área de desenvolvimento e IA.
            Este site reúne minha formação, os projetos que venho construindo e um Jogo da Forca
            que fiz do zero.

          </p>
          <div className="fade-in mt-8 flex flex-wrap gap-3 [animation-delay:280ms]">
            <Link
              href="/forca"
              className="bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Jogar Forca
            </Link>
            <Link
              href="/curriculo"
              className="border border-input px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              Ver currículo
            </Link>
          </div>
        </div>
        <div className="fade-in lg:col-span-5 [animation-delay:160ms]">
          <div className="border border-border bg-card p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              Ficha rápida
            </p>
            <dl className="mt-4 divide-y divide-border">
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-sm text-muted-foreground">Local</dt>
                <dd className="font-mono text-sm">Recife, PE</dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-sm text-muted-foreground">Período</dt>
                <dd className="font-mono text-sm">5º de 8</dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-sm text-muted-foreground">Projetos</dt>
                <dd className="font-mono text-sm">5</dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-sm text-muted-foreground">Status</dt>
                <dd className="font-mono text-sm text-primary">
                  disponível p/ estágio
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold tracking-tight">
          Explore o portfólio
        </h2>
        <div className="mt-5 grid gap-px overflow-hidden border border-border sm:grid-cols-3">
          {DESTAQUES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-card p-5 transition-colors hover:bg-secondary"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
                {item.tag}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                {item.titulo}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.descricao}
              </p>
              <span className="mt-4 inline-block font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                abrir
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
