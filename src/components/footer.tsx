export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <p className="font-mono">Ficha nº 2026 — Marcelo Caldas, Recife/PE</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/MarcelocAraujo"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            GitHub
          </a>
          
          <a
            href="https://www.linkedin.com/in/marcelo-caldas-de-araújo-filho-4aa669394/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}