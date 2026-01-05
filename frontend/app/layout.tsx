import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyfen - Gestão de Hospedagens",
  description: "Sistema de gestão para pousadas, hotéis e casas de temporada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
