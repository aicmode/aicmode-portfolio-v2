import type { Metadata } from 'next'
import About from '../components/About'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import Skills from '../components/Skills'
import Trust from '../components/Trust'

export const metadata: Metadata = {
  title: '自己紹介・スキル｜AIC',
  description: 'AICの詳しい自己紹介、得意なこと、制作で大切にしていること、技術・スキルをご紹介します。',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="自己紹介・スキル"
          title="現場で使い続けられるものを作ります。"
          description="看護師としての経験、得意なこと、制作で大切にしていること、これまで使ってきた技術をまとめています。"
        />
        <About />
        <Trust />
        <Skills />
      </main>
      <Footer />
    </>
  )
}
