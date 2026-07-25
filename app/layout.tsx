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

export const metadata: Metadata = {
  title: "AICMODE — Web Design × AI",
  description:
    "AI × Overseas Culture inspired portfolio by AICMODE. Creative web design combining artificial intelligence with global creative culture.",
  keywords: ["web design", "AI design", "portfolio", "AICMODE", "creative studio", "Next.js", "overseas culture"],
  authors: [{ name: "AICMODE" }],
  creator: "AICMODE",
  openGraph: {
    title: "AICMODE — Web Design × AI",
    description:
      "AI × Overseas Culture inspired portfolio by AICMODE. Creative web design combining artificial intelligence with global culture.",
    siteName: "AICMODE",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AICMODE — Web Design × AI",
    description: "AI × Overseas Culture inspired portfolio by AICMODE.",
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
