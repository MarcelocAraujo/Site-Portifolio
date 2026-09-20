import type { Metadata } from "next";
import { JogoForca } from "./jogo-forca";

export const metadata: Metadata = {
  title: "Jogo da Forca — Marcelo Caldas",
  description:
    "Projeto pessoal de Marcelo Caldas: um Jogo da Forca interativo com teclado virtual, lista de tentativas e boneco desenhado.",
};

export default function ForcaPage() {
  return <JogoForca />;
}
