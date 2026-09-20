import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projetos — Marcelo Caldas",
  description:
    "Galeria de projetos de Marcelo Caldas: app de hábitos, e-commerce de plantas, app de clima e Jogo da Forca.",
};

const PROJETOS = [
  {
    imagem: "/images/ocupacional-3d.png",
    titulo: "Site Ocupacional 3D",
    descricao: "Plataforma web criada para a Ocupacional 3D (empresa), na cadeira de Computação, Sociedade e Sustentabilidade.",
    stack: ["Wix", "Web Design"],
  },
  {
    imagem: "/images/banco-de-dados.png",
    titulo: "Concessionária de Carros",
    descricao: "Criação de um banco de dados para a cadeira de Projeto de Banco de Dados.",
    stack: ["SQL", "MySQL","Modelagem Relacional"],
  },
  {
    imagem: "/images/java-logo.png",
    titulo: "Cadastro de Sócios",
    descricao: "Construção de um sistema de cadastro de sócios para a cadeira de Programação Orientada a Objetos.",
    stack: ["JAVA", "POO"],
  },
  {
    imagem: "/images/carrinho.jpeg",
    titulo: "Robótica",
    descricao: "Protótipo de robô móvel desenvolvido com Arduino UNO para a cadeira de Robótica.",
    stack: ["Arduino", "C++", "Hardware"],
  },
  {
    imagem: "/images/excel-logo.png",
    titulo: "Tabela Verdade",
    descricao: "Simulador de Tabela Verdade desenvolvido para a cadeira de Lógica Matemática Aplicada à Computação.",
    stack: ["Excel", "Lógica"],
  },
];

export default function Projetos() {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
        <div>
          <p className="reveal-clip font-mono text-xs uppercase tracking-[0.1em] text-primary">
            Galeria de projetos
          </p>
          <h1 className="reveal-clip mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Trabalhos Selecionados
          </h1>
        </div>
        <Link
          href="/forca"
          className="fade-in bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 [animation-delay:160ms]"
        >
          Jogar Forca
        </Link>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden border border-border md:grid-cols-3">
        {PROJETOS.map((projeto) => (
          <article key={projeto.titulo} className="group bg-card p-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border">
              <Image
                src={projeto.imagem}
                alt={`Captura do projeto ${projeto.titulo}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold tracking-tight">
              {projeto.titulo}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {projeto.descricao}
            </p>
            <div className="mt-3 flex gap-2">
              {projeto.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-6 border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
              Destaque · projeto pessoal
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
              Jogo da Forca
            </h2>
            <p className="mt-2 max-w-[52ch] text-sm text-muted-foreground">
              Uma versão interativa do clássico jogo: teclado virtual, lista de
              letras tentadas, boneco desenhado passo a passo e 30 palavras
              sorteadas a cada partida.
            </p>
          </div>
          <Link
            href="/forca"
            className="border border-input px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Jogar agora
          </Link>
        </div>
      </section>
    </section>
  );
}
