import type { Metadata } from 'next'
import CaseStudies from '../components/CaseStudies'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import WorksArchive from '../components/WorksArchive'

export const metadata: Metadata = {
  title: '制作実績｜AICMODE',
  description: 'AI・自動化の制作事例と、サイト・アプリの全30件の制作実績をご覧いただけます。',
  alternates: { canonical: '/works' },
}

export default function WorksPage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="制作実績一覧"
          title="作ったものを、すべてご覧いただけます。"
          description="AI・自動化の事例と、サイト・アプリの全30件を掲載しています。各カードから公開デモや詳しい制作内容を確認できます。"
        />
        <CaseStudies />
        <WorksArchive defaultExpanded />
      </main>
      <Footer />
    </>
  )
}
