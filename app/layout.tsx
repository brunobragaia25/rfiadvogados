import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const frutiger = localFont({
  src: "./fonts/Frutiger 57 Condensed Regular.otf",
  variable: "--font-frutiger",
  weight: "400",
});

export const metadata: Metadata = {
  title: "RFI Advogados - Escritório boutique de Direito Empresarial",
  description:
    "A RFI Advogados é um escritório boutique focado em Direito Empresarial, com atendimento personalizado, ético e de alta qualidade, oferecendo suporte jurídico estratégico para empresas em todas as fases do seu desenvolvimento.",
  openGraph: {
    title: "RFI Advogados",
    description:
      "A RFI Advogados é um escritório boutique focado em Direito Empresarial, com atendimento personalizado, ético e de alta qualidade.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={frutiger.variable}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
