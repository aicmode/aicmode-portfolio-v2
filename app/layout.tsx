import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
