import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CaseStudies from "./components/CaseStudies";
import HealthcareAI from "./components/HealthcareAI";
import SelectedWorks from "./components/SelectedWorks";
import Services from "./components/Services";
import About from "./components/About";
import Process from "./components/Process";
import Trust from "./components/Trust";
import Skills from "./components/Skills";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import WorksArchive from "./components/WorksArchive";
import Footer from "./components/Footer";
import { faqs } from "./data/faqs";
import { services } from "./data/services";
import { caseStudies } from "./data/caseStudies";
import { projects } from "./data/projects";

const SITE_URL = "https://aicmode-portfolio.vercel.app";
const GITHUB_URL = "https://github.com/aicmode";

/**
 * Structured data, built from the same arrays the page renders, so the two can
 * never describe different things.
 *
 * Person + ProfessionalService, not Organization: this is one freelance
 * developer, and there is no registered company, address, phone number or
 * review to describe. Nothing about pricing, ratings, aggregate reviews or
 * client counts appears here — inventing any of that is exactly the kind of
 * structured-data claim search engines penalise, and it would be untrue.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "AICMODE",
      alternateName: "AICMODE | AI Systems, Business Automation & Web Applications",
      description:
        "鹿児島を拠点に、AIシステム、業務自動化、API連携、Webアプリを設計・開発。医療現場の業務理解を生かし、要件整理からMVP、テスト、公開まで一貫して対応するポートフォリオ。",
      inLanguage: "ja-JP",
      publisher: { "@id": `${SITE_URL}/#aicmode` },
      about: { "@id": `${SITE_URL}/#service` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#aicmode`,
      name: "AICMODE",
      alternateName: "AIC",
      url: SITE_URL,
      jobTitle: "AI Developer / Web Developer",
      description:
        "医療現場で約9年間培った業務理解を生かし、AIシステム開発、業務自動化、API連携、Webアプリ開発を要件整理から公開まで一貫して担当するフリーランス開発者。",
      knowsAbout: [
        "AI Systems Development",
        "Business Automation",
        "Workflow Automation",
        "Web Application Development",
        "API Integration",
        "Prompt Engineering",
        "Dashboard Development",
        "Web Design",
        "Responsive Design",
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Python",
        "Flask",
        "Node.js",
        "Express",
        "REST API",
        "OpenAI API",
        "Whisper API",
        "Dify API",
        "Google APIs",
        "Google Apps Script",
        "LINE Messaging API",
        "Slack API",
        "Discord API",
        "Webhook",
        "Git",
        "GitHub",
        "Vercel",
      ],
      knowsLanguage: ["ja", "en"],
      sameAs: [GITHUB_URL],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "AICMODE",
      description:
        "AIシステム開発、業務自動化、API連携、ダッシュボード構築、Webアプリ開発、医療・介護分野の業務整理、Webサイト・LP制作を提供します。",
      url: SITE_URL,
      areaServed: "JP",
      availableLanguage: ["ja", "en"],
      provider: { "@id": `${SITE_URL}/#aicmode` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Development, Automation & Web Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@id": `${SITE_URL}/#service-${service.id}` },
        })),
      },
    },
    ...services.map((service) => ({
      "@type": "Service",
      "@id": `${SITE_URL}/#service-${service.id}`,
      name: service.name,
      serviceType: service.type,
      description: service.description,
      areaServed: "JP",
      provider: { "@id": `${SITE_URL}/#aicmode` },
    })),
    // Portfolio pieces are CreativeWork, and `creator` is the only relationship
    // asserted — never a client, sponsor or customer, because there is none.
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#case-studies`,
      name: "AI & Automation Case Studies",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: study.title,
          description: study.solution,
          creator: { "@id": `${SITE_URL}/#aicmode` },
          keywords: study.stack.join(", "),
          ...(study.liveUrl ? { url: study.liveUrl } : {}),
          ...(study.githubUrl ? { codeRepository: study.githubUrl } : {}),
        },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#works`,
      name: "Portfolio Projects",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          creator: { "@id": `${SITE_URL}/#aicmode` },
          keywords: project.stack.join(", "),
          ...(project.liveUrl ? { url: project.liveUrl } : {}),
          ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
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
      {/*
        Order is deliberate for an AI / automation brief: the case studies come
        before the web work, and the full archive sits after Contact so it can't
        bury the sales-critical sections.
      */}
      <main id="main">
        <Hero />
        <CaseStudies />
        <HealthcareAI />
        <SelectedWorks />
        <Services />
        <About />
        <Process />
        <Trust />
        <Skills />
        <FAQ />
        <Contact />
        <WorksArchive />
      </main>
      <Footer />
    </>
  );
}
