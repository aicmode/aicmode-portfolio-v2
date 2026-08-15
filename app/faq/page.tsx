import type { Metadata } from 'next'
import DetailPageHeader from '../components/DetailPageHeader'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import { faqs } from '../data/faqs'

const SITE_URL = 'https://aicmode-portfolio.vercel.app'

export const metadata: Metadata = {
  title: 'よくある質問｜AIC',
  description: 'AI・自動化・Webアプリ制作のご相談前によくいただく質問をまとめています。',
  alternates: { canonical: '/faq' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/faq#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <main id="main">
        <DetailPageHeader
          eyebrow="よくある質問"
          title="ご相談前の疑問にお答えします。"
          description="進め方、費用、安全面、公開後の対応など、よくいただく質問をまとめています。"
        />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
