import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BootRecovery from "./components/BootRecovery";
import ClientHealth from "./components/ClientHealth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "AICMODE — AI Developer × Web Designer";
const description =
  "AIシステム開発、Webアプリ開発、AI自動化、業務効率化ツールを、要件整理から設計・実装・運用まで一貫して担当します。Next.js・React・TypeScript・Python・OpenAI APIを使い、店舗・病院・クリニック・中小企業・個人事業主・ブランドの課題を解決。Webサイト制作、LP制作、API連携まで対応するAI Developer / Web Designer です。";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AIシステム開発",
    "Webアプリ開発",
    "AI自動化",
    "業務効率化",
    "AI開発",
    "AIエンジニア",
    "業務改善システム",
    "医療AI",
    "SaaS開発",
    "システム開発",
    "API連携",
    "Web制作",
    "ホームページ制作",
    "LP制作",
    "AI Developer",
    "AI Engineer",
    "AI System Development",
    "Web Developer",
    "Creative Technologist",
    "Business Automation",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "OpenAI API",
    "Google APIs",
    "Vercel",
    "AICMODE",
  ],
  authors: [{ name: "AICMODE" }],
  creator: "AICMODE",
  openGraph: {
    title,
    description,
    siteName: "AICMODE",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "AIシステム開発・Webアプリ開発・AI自動化・業務効率化を、設計から実装・運用まで一貫対応。Next.js / React / Python / OpenAI API。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Matches the tag Next.js emits by default; pinned explicitly so the mobile
// layout can never regress if that default changes.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-[#080808] text-[#f0f0f0] antialiased min-h-screen">
        {/* Inlined into the document, so it survives a failed asset chunk. */}
        <BootRecovery />
        <ClientHealth />
        {children}
      </body>
    </html>
  );
}
