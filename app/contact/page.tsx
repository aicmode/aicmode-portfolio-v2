import type { Metadata } from 'next'
import Contact from '../components/Contact'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import Process from '../components/Process'

export const metadata: Metadata = {
  title: 'お問い合わせ｜AIC',
  description: 'ご相談から公開までの流れ、ご相談例、最初のご連絡でお伝えいただきたいことをご案内します。',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="お問い合わせ詳細"
          title="決まっていないことも、一緒に整理します。"
          description="よくあるご相談例と、最初のメッセージで分かる範囲だけ教えていただきたい内容をまとめています。"
        />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
