import type { Metadata } from 'next'
import CaseStudies from '../components/CaseStudies'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import WorksArchive from '../components/WorksArchive'
import { caseStudies } from '../data/caseStudies'
import { projects } from '../data/projects'

/** Counted from the data, so the copy can never fall behind the portfolio. */
const projectCount = projects.length
const caseStudyCount = caseStudies.length

export const metadata: Metadata = {
  title: '制作実績｜AIC',
  description: `AI・業務自動化を中心とした制作事例${caseStudyCount}件と、サイト・アプリの全${projectCount}件の制作実績をご覧いただけます。`,
  alternates: { canonical: '/works' },
}

export default function WorksPage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="制作実績一覧"
          title="作ったものを、すべてご覧いただけます。"
          description="AI・業務自動化を中心に、これまで制作してきたプロジェクトを掲載しています。Webサイト制作など、その他の制作実績もこちらから確認できます。"
        />
        <CaseStudies />
        <WorksArchive defaultExpanded />
      </main>
      <Footer />
    </>
  )
}
