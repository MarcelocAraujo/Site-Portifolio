"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/formacao", label: "Formação" },
  { href: "/curriculo", label: "Currículo" },
  { href: "/projetos", label: "Projetos" },
  { href: "/forca", label: "Forca" },
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="font-display text-sm font-bold tracking-tight">
          MARCELO CALDAS
          <span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex flex-wrap items-center gap-px overflow-hidden rounded-sm border border-border">
            {NAV_LINKS.map((link) => {
              const ativo = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground",
                    ativo && "bg-primary text-primary-foreground hover:text-primary-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
