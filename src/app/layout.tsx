import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import Shell from "@/components/Shell";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = "Fatima Zahrae Ahannuk — Big Data & AI Engineer";
const description =
  "Portfolio of Fatima Zahrae Ahannuk, Big Data & AI engineering student at ENSA Tétouan: machine learning, deep learning, NLP and data engineering projects with live demos. Seeking a PFE internship from February 2027.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Fatima Zahrae Ahannuk" }],
  keywords: ["Fatima Zahrae Ahannuk", "Data Engineer", "Machine Learning", "AI", "ENSA Tétouan", "PFE", "Portfolio"],
  openGraph: { title, description, type: "website", images: ["/photo.jpg"] },
  twitter: { card: "summary", title, description, images: ["/photo.jpg"] },
};

export const viewport: Viewport = { themeColor: "#07090f" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <LangProvider>
          <Shell>{children}</Shell>
        </LangProvider>
      </body>
    </html>
  );
}
