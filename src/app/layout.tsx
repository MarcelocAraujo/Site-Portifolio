import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcelo Caldas — Portfólio Acadêmico",
  description:
    "Currículo e portfólio de Marcelo Caldas: formação acadêmica, cursos, projetos e um Jogo da Forca interativo.",
  openGraph: {
    title: "Marcelo Caldas — Portfólio Acadêmico",
    description:
      "Currículo e portfólio acadêmico com projetos e um Jogo da Forca interativo.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var salvo = localStorage.getItem("tema");
    var escuro = salvo ? salvo === "escuro" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", escuro);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <div className="relative min-h-screen bg-background text-foreground">
          <NavBar />
          <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
