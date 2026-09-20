"use client";

import { useEffect, useState } from "react";

type Tema = "claro" | "escuro";

function lerTemaAtual(): Tema {
  if (typeof document === "undefined") return "claro";
  return document.documentElement.classList.contains("dark") ? "escuro" : "claro";
}

export function ThemeToggle() {
  // Começa null até montar no cliente, para não divergir do que o script
  // inline no <head> já aplicou antes da hidratação.
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    setTema(lerTemaAtual());
  }, []);

  function alternar() {
    const proximo: Tema = lerTemaAtual() === "escuro" ? "claro" : "escuro";
    document.documentElement.classList.toggle("dark", proximo === "escuro");
    window.localStorage.setItem("tema", proximo);
    setTema(proximo);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={
        tema === "escuro" ? "Mudar para modo claro" : "Mudar para modo escuro"
      }
      className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-card text-foreground transition-colors hover:bg-secondary"
    >
      {tema === "escuro" ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
        </svg>
      )}
    </button>
  );
}
