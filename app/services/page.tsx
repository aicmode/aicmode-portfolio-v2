import type { Metadata } from 'next'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import Services from '../components/Services'

export const metadata: Metadata = {
  title: 'できること｜AICMODE',
  description: '業務の自動化、AIを使ったツール、仕事用Webアプリなど、AICMODEがお手伝いできることをご紹介します。',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="できること詳細"
          title="困りごとから、必要な仕組みを考えます。"
          description="トップでは省いた「お困りごとから探す」と、お渡しできるものの一覧をこちらでご覧いただけます。"
        />
        <Services />
      </main>
      <Footer />
    </>
  )
}
