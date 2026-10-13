# Portfólio — Marcelo Caldas

Portfólio acadêmico em **Next.js (App Router)** + **React** + **Tailwind CSS v4**, com tema claro/escuro alternável e um Jogo da Forca interativo.

🔗 **Acesse:** https://marcelocaldas.vercel.app

Projeto desenvolvido para a disciplina **Programação Web e Mobile** (UNICAP).

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- next/font (IBM Plex Mono + IBM Plex Sans) e next/image (otimização de imagens)

## Funcionalidades

- **Tema claro/escuro:** botão no canto direito da navegação. A escolha fica salva no `localStorage` e é aplicada antes da primeira renderização, evitando o "flash" de tela clara ao carregar.
- **Jogo da Forca (`/forca`):** teclado virtual, entrada por texto, lista de letras já tentadas (corretas x erradas), boneco desenhado em SVG conforme os erros aumentam, 30+ palavras sorteadas aleatoriamente e botão de reiniciar.
- **Galeria de projetos:** cada card ajusta o enquadramento da imagem de forma independente (fotos usam `object-cover`, logos usam `object-contain`).
- **Páginas:** início, formação acadêmica e cursos, currículo em PDF e projetos.

## Estrutura

```
src/
  app/
    layout.tsx           # layout raiz: fontes, nav, footer, script anti-flash do tema
    page.tsx             # página inicial
    globals.css          # design system (cores, tipografia, tema claro/escuro)
    formacao/page.tsx    # formação acadêmica e cursos
    curriculo/page.tsx   # link para o currículo em PDF
    projetos/page.tsx    # galeria de projetos
    forca/
      page.tsx           # metadata (SEO) da página do jogo
      jogo-forca.tsx     # lógica e interface do Jogo da Forca (client component)
  components/
    nav-bar.tsx          # menu superior, com link ativo destacado
    footer.tsx           # rodapé com GitHub, LinkedIn e e-mail
    theme-toggle.tsx     # botão de alternar claro/escuro
  lib/
    utils.ts             # helper cn para combinar classes do Tailwind
public/
  images/                # imagens dos projetos e retrato
  favicon.ico
  robots.txt
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Build de produção

```bash
npm run build
npm run start
```

## Deploy

Publicado na [Vercel](https://vercel.com) em https://marcelocaldas.vercel.app. A cada push na branch `main`, o deploy é atualizado automaticamente.
