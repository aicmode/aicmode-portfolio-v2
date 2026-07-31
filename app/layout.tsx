import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BootRecovery from "./components/BootRecovery";
import ClientHealth from "./components/ClientHealth";
import MotionPreferences from "./components/MotionPreferences";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // Text stays readable while the webfont loads rather than flashing invisible.
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://aicmode-portfolio.vercel.app";

const title = "AICMODE | AI Systems, Business Automation & Web Applications";
const description =
  "鹿児島を拠点に、AIシステム、業務自動化、API連携、Webアプリを設計・開発。医療現場の業務理解を生かし、要件整理からMVP、テスト、公開まで一貫して対応します。";

export const metadata: Metadata = {
  // Required for relative OG / canonical URLs to resolve to absolute ones.
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "AICMODE",
  keywords: [
    "AIシステム開発",
    "業務自動化",
    "AI自動化",
    "業務効率化",
    "API連携",
    "Webアプリ開発",
    "ダッシュボード開発",
    "AI開発",
    "フリーランス エンジニア",
    "Web制作",
    "ホームページ制作",
    "LP制作",
    "AI Developer",
    "Business Automation",
    "Workflow Automation",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "OpenAI API",
    "Dify API",
    "LINE Messaging API",
    "Slack API",
    "Google APIs",
    "Vercel",
    "AICMODE",
  ],
  authors: [{ name: "AICMODE", url: SITE_URL }],
  creator: "AICMODE",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AICMODE",
    locale: "ja_JP",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
  themeColor: "#080808",
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
        {/* First tab stop: lets a keyboard user jump the fixed nav. */}
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <MotionPreferences>{children}</MotionPreferences>
      </body>
    </html>
  );
}
