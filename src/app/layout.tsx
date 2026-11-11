import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vila do Papai Noel | Kit Digital para Imprimir e Montar",
  description:
    "Kit digital em PDF com casinhas, personagens, trenó, renas e bônus para imprimir, montar e brincar em família neste Natal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
