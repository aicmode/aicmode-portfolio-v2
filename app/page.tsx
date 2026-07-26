import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Works from "./components/Works";
import About from "./components/About";
import Skills from "./components/Skills";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { faqs } from "./data/faqs";

const GITHUB_URL = "https://github.com/aicmode";

// Each entry becomes both a standalone Service node and an Offer in the
// ProfessionalService's catalog, so the two can never describe different menus.
const services = [
  {
    id: "ai-system-development",
    name: "AIシステム開発",
    type: "AI System Development",
    description:
      "OpenAI APIなどを活用し、問い合わせ対応・文章生成・要約・分類といった時間のかかる業務をAIに任せられる仕組みを、設計から実装・運用まで構築します。",
  },
  {
    id: "business-automation",
    name: "業務効率化・AI自動化",
    type: "Business Automation",
    description:
      "毎日の手作業・集計・通知・共有を自動化し、人が判断や接客に使う時間を取り戻す仕組みを設計します。",
  },
  {
    id: "web-application-development",
    name: "Webアプリ開発",
    type: "Web Application Development",
    description:
      "Next.js・React・TypeScript・Pythonで、予約・管理・計算など業務に合わせた目的特化型のWebアプリケーションを開発します。",
  },
  {
    id: "business-improvement-system",
    name: "業務改善システム開発",
    type: "Business Improvement System",
    description:
      "現場の業務フローを整理し、属人化や二重入力をなくす社内システム・内部ツールを構築します。",
  },
  {
    id: "saas-development",
    name: "SaaS開発",
    type: "SaaS Development",
    description:
      "継続利用を前提としたWebサービスを、認証・データ設計・ダッシュボードまで含めて開発します。",
  },
  {
    id: "api-integration",
    name: "API連携",
    type: "API Integration",
    description:
      "Google APIs、LINE Messaging API、Slack API、Discord API、REST APIなど、すでに使っているツールと自動でつながる状態にします。",
  },
  {
    id: "custom-dashboard",
    name: "ダッシュボード構築",
    type: "Custom Dashboard",
    description:
      "売上・進捗・予約状況など、判断に必要な数値を一画面で把握できるダッシュボードを構築します。",
  },
  {
    id: "brand-website",
    name: "Webサイト制作",
    type: "Web Design",
    description:
      "店舗・病院・クリニック・中小企業・個人事業主・ブランド向けに、第一印象と信頼感が伝わり、問い合わせにつながるWebサイトを制作します。",
  },
  {
    id: "landing-page",
    name: "LP制作",
    type: "Landing Page",
    description:
      "訴求・根拠・導線を1ページに整理し、申し込みまでの離脱を減らすランディングページを制作します。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "#aicmode-website",
      name: "AICMODE",
      alternateName: "AICMODE — AI Developer × Web Designer",
      description:
        "AIシステム開発、Webアプリ開発、AI自動化、業務効率化を、設計・実装・運用まで一貫して担当するAI Developer / Web Designer のポートフォリオ。",
      inLanguage: "ja-JP",
      publisher: { "@id": "#aicmode" },
      about: { "@id": "#aicmode-service" },
    },
    {
      "@type": "Person",
      "@id": "#aicmode",
      name: "AICMODE",
      alternateName: "AIC",
      url: GITHUB_URL,
      jobTitle: "AI Developer / Web Designer",
      description:
        "AIシステム開発、Webアプリ開発、業務効率化、API連携を、要件整理から設計・実装・運用まで一貫して担当するAI Developer / Web Designer。",
      knowsAbout: [
        "AI System Development",
        "AI Automation",
        "Business Automation",
        "Business Improvement System",
        "Web Application Development",
        "SaaS Development",
        "API Integration",
        "Prompt Engineering",
        "Web Design",
        "Responsive Design",
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Python",
        "Node.js",
        "REST API",
        "OpenAI API",
        "Google APIs",
        "LINE Messaging API",
        "Discord API",
        "Slack API",
        "Git",
        "GitHub",
        "Vercel",
      ],
      knowsLanguage: ["ja", "en"],
      sameAs: [GITHUB_URL],
    },
    {
      "@type": "ProfessionalService",
      "@id": "#aicmode-service",
      name: "AICMODE",
      description:
        "店舗・病院・クリニック・中小企業・個人事業主・ブランド向けに、AIシステム開発、Webアプリ開発、AI自動化、業務効率化、API連携、Web制作を提供します。",
      url: GITHUB_URL,
      areaServed: "JP",
      availableLanguage: ["ja", "en"],
      provider: { "@id": "#aicmode" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Development & Web Design Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@id": `#service-${service.id}` },
        })),
      },
    },
    ...services.map((service) => ({
      "@type": "Service",
      "@id": `#service-${service.id}`,
      name: service.name,
      serviceType: service.type,
      description: service.description,
      areaServed: "JP",
      provider: { "@id": "#aicmode" },
    })),
    {
      "@type": "FAQPage",
      "@id": "#aicmode-faq",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main>
        <Hero />
        <Works />
        <About />
        <Skills />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
