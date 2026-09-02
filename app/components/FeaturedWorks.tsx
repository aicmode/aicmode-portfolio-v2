'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from './AnimateIn'
import { caseStudies } from '../data/caseStudies'
import { projectCountByDomain, projects } from '../data/projects'
import {
  PROJECT_TYPE_LABEL,
  STATUS_LABEL,
  type ProjectStatus,
  type ProjectType,
} from '../types/project'

const medibrief = caseStudies.find((study) => study.id === 'medibrief-ai')!
const medichart = projects.find((project) => project.id === 'medichart-lite')!
const handoverMaker = projects.find((project) => project.id === 'handover-maker')!
const difyChat = caseStudies.find((study) => study.id === 'dify-ai-chat')!
const expenseTracker = caseStudies.find((study) => study.id === 'smart-expense-tracker')!
const medDose = projects.find((project) => project.id === 'meddose')!
const adLibraryMonitor = projects.find((project) => project.id === 'meta-ad-library-monitor')!
const nurseFukugyoLab = projects.find((project) => project.id === 'nurse-fukugyo-lab')!

/** Counted, never typed in: the archive and this line can only ever agree. */
const webProjectCount = projectCountByDomain['Web Production']

type FeaturedWork = {
  id: string
  title: string
  label: string
  description: string
  accent: string
  projectType: ProjectType
  status: ProjectStatus
  image?: string
  imageAlt?: string
  liveUrl?: string
  githubUrl?: string
  /** Route of the work's own page on this site, when it has one. */
  detailPath?: string
  diagram?: readonly [string, string, string]
}

/**
 * What this studio is, in the order it should be read: AI and automation first
 * and at length, web production second and briefly. The two arrays are the
 * whole of that hierarchy — nothing here is colour-coded or restyled to make
 * the point, the heading order and the group sizes make it.
 */
const aiWorks: readonly FeaturedWork[] = [
  {
    id: medibrief.id,
    title: 'MediBrief',
    label: '医療 × AI',
    description: '話したいことを、診察で伝えやすいメモに自動で整理します。',
    image: medibrief.screenshot,
    imageAlt: medibrief.screenshotAlt,
    accent: medibrief.accent,
    projectType: medibrief.projectType,
    status: medibrief.status,
    liveUrl: medibrief.liveUrl,
    githubUrl: medibrief.githubUrl,
  },
  {
    id: medichart.id,
    title: medichart.title,
    label: '医療向けWebアプリ',
    description: '患者さんの情報や記録を、一つの画面で確認しやすくします。',
    image: medichart.image,
    imageAlt: medichart.imageAlt,
    accent: medichart.accent,
    projectType: medichart.projectType,
    status: medichart.status,
    liveUrl: medichart.liveUrl,
    githubUrl: medichart.githubUrl,
  },
  {
    id: handoverMaker.id,
    title: handoverMaker.title,
    label: '介護・医療 × 業務効率化',
    description: '申し送り、記録、予定、検索、印刷を一つにまとめた完全オフライン対応ツールです。',
    image: handoverMaker.image,
    imageAlt: handoverMaker.imageAlt,
    accent: handoverMaker.accent,
    projectType: handoverMaker.projectType,
    status: handoverMaker.status,
    liveUrl: handoverMaker.liveUrl,
    githubUrl: handoverMaker.githubUrl,
  },
  {
    id: difyChat.id,
    title: 'Dify AI Chat',
    label: '問い合わせ対応',
    description: 'よくある質問に自動で答え、問い合わせ対応の負担を減らします。',
    image: difyChat.screenshot,
    imageAlt: difyChat.screenshotAlt,
    accent: difyChat.accent,
    projectType: difyChat.projectType,
    status: difyChat.status,
    liveUrl: difyChat.liveUrl,
    githubUrl: difyChat.githubUrl,
  },
  {
    id: expenseTracker.id,
    title: 'Smart Expense Tracker',
    label: '集計Webアプリ',
    description: '支出を記録するだけで、合計やグラフを自動で表示します。',
    image: expenseTracker.screenshot,
    imageAlt: expenseTracker.screenshotAlt,
    accent: expenseTracker.accent,
    projectType: expenseTracker.projectType,
    status: expenseTracker.status,
    liveUrl: expenseTracker.liveUrl,
    githubUrl: expenseTracker.githubUrl,
  },
  {
    id: medDose.id,
    title: medDose.title,
    label: '医療 × 自動計算',
    description: '薬をいつまで飲むのか、腕時計の上で自動計算します。',
    image: medDose.image,
    imageAlt: medDose.imageAlt,
    accent: medDose.accent,
    projectType: medDose.projectType,
    status: medDose.status,
    githubUrl: medDose.githubUrl,
  },
  {
    id: adLibraryMonitor.id,
    title: adLibraryMonitor.title,
    label: '広告リサーチ × 自動化',
    description: '登録した広告主の広告をまとめて取得し、前回から増えた分だけを見つけ出します。',
    image: adLibraryMonitor.image,
    imageAlt: adLibraryMonitor.imageAlt,
    accent: adLibraryMonitor.accent,
    projectType: adLibraryMonitor.projectType,
    status: adLibraryMonitor.status,
    githubUrl: adLibraryMonitor.githubUrl,
    detailPath: adLibraryMonitor.detailPath,
  },
] as const

/**
 * Web production: a second skill, shown so a visitor knows it is available —
 * not a second headline act. The top page keeps one representative piece and
 * sends the rest to the archive; adding another entry here is all it takes to
 * grow the group later.
 */
const webWorks: readonly FeaturedWork[] = [
  {
    id: nurseFukugyoLab.id,
    title: nurseFukugyoLab.title,
    label: '看護師向けWebメディア',
    description: nurseFukugyoLab.plainSummary,
    image: nurseFukugyoLab.image,
    imageAlt: nurseFukugyoLab.imageAlt,
    accent: nurseFukugyoLab.accent,
    projectType: nurseFukugyoLab.projectType,
    status: nurseFukugyoLab.status,
    liveUrl: nurseFukugyoLab.liveUrl,
    githubUrl: nurseFukugyoLab.githubUrl,
  },
] as const

/** One featured card. Identical treatment in both groups: the hierarchy is
    carried by the headings and the order, never by the card design. */
function WorkCard({ work, delay }: { work: FeaturedWork; delay: number }) {
  return (
    <AnimateIn delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden border border-white/[0.09] bg-white/[0.018]">
        {work.image ? (
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.08] bg-[#080808]">
            <Image
              src={work.image}
              alt={work.imageAlt ?? `${work.title}の画面`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.025]"
            />
          </div>
        ) : (
          <div
            className="flex aspect-[16/10] items-center justify-center border-b border-white/[0.08] px-7"
            style={{ background: `radial-gradient(circle at 50% 20%, ${work.accent}22, transparent 65%), #070707` }}
            aria-hidden="true"
          >
            <div className="flex w-full items-center justify-center gap-3 text-center text-[11px] font-semibold tracking-[0.08em] text-white/60 sm:gap-5">
              <span className="border border-white/12 px-3 py-3">{work.diagram?.[0]}</span>
              <span className="text-white/25">→</span>
              <span className="border px-3 py-3" style={{ borderColor: `${work.accent}66`, color: work.accent }}>{work.diagram?.[1]}</span>
              <span className="text-white/25">→</span>
              <span className="border border-white/12 px-3 py-3">{work.diagram?.[2]}</span>
            </div>
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[10px] font-semibold tracking-[0.14em]" style={{ color: work.accent }}>
            {work.label}
          </p>
          <h4 className="mt-3 text-xl font-semibold leading-7 text-white">{work.title}</h4>
          <p className="mt-4 text-[14px] leading-7 text-white/60">{work.description}</p>
          <p className="mt-4 text-[10px] leading-5 tracking-[0.08em] text-white/38">
            {PROJECT_TYPE_LABEL[work.projectType]} ・ {STATUS_LABEL[work.status]}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {/* A work with no reachable deployment still has somewhere
                to send a visitor when it has its own page: the page,
                in this tab. Nothing here ever stands in for a demo
                that does not exist. */}
            {work.detailPath ? (
              <Link
                href={work.detailPath}
                className="inline-flex min-h-11 items-center justify-center border border-white/16 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/76 transition hover:border-white/35 hover:text-white"
              >
                詳細を見る
              </Link>
            ) : null}
            {work.liveUrl ? (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-white/16 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/76 transition hover:border-white/35 hover:text-white"
              >
                実際に見る<span className="sr-only">（新しいタブで開きます）</span>
              </a>
            ) : null}
            {work.githubUrl ? (
              <a
                href={work.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-white/10 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/50 transition hover:border-white/28 hover:text-white"
              >
                GitHubで見る<span className="sr-only">（新しいタブで開きます）</span>
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </AnimateIn>
  )
}

/**
 * A group heading. `rank` is the only thing that separates MAIN from SUB, and
 * it changes one small label — no second palette, no second card style.
 */
function GroupHeading({
  rank,
  title,
  description,
}: {
  rank: 'MAIN' | 'SUB'
  title: string
  description: string
}) {
  const isMain = rank === 'MAIN'
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`px-2 py-1 font-mono text-[9px] tracking-[0.24em] ${
            isMain
              ? 'border border-[rgba(212,175,55,0.38)] text-[rgba(232,204,113,0.88)]'
              : 'border border-white/12 text-white/42'
          }`}
        >
          {rank}
        </span>
        <h3
          className={`font-bold tracking-[-0.015em] text-white ${
            isMain ? 'text-[clamp(1.35rem,3vw,2rem)]' : 'text-[clamp(1.15rem,2.4vw,1.55rem)]'
          }`}
        >
          {title}
        </h3>
      </div>
      <p className="max-w-lg text-[13px] leading-6 text-white/55 md:text-right">{description}</p>
    </div>
  )
}

export default function FeaturedWorks() {
  return (
    <section id="works" className="relative scroll-mt-20 overflow-hidden bg-[#010101] px-5 py-20 md:px-12 md:py-28">
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <AnimateIn>
          <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">代表制作実績</p>
              <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-black leading-[1.2] tracking-[-0.025em] text-white">
                実際に作ったもの
              </h2>
            </div>
            <p className="max-w-lg text-[14px] leading-7 text-white/58 md:text-right">
              AI・業務自動化を中心に開発しています。Web制作にも対応しています。
            </p>
          </div>
        </AnimateIn>

        {/* MAIN. First, and the larger of the two groups, because that is what
            this portfolio is for. */}
        <div className="mt-12">
          <AnimateIn>
            <GroupHeading
              rank="MAIN"
              title="AI・業務自動化"
              description="AI・業務自動化を中心に、実際に設計・開発した制作実績です。"
            />
          </AnimateIn>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiWorks.map((work, index) => (
              <WorkCard key={work.id} work={work} delay={100 + index * 80} />
            ))}
          </div>
        </div>

        {/* SUB. Separated by space and by its own heading, not by a different
            look — same cards, read second. */}
        <div className="mt-16 border-t border-white/[0.07] pt-12 md:mt-20 md:pt-14">
          <AnimateIn>
            <GroupHeading
              rank="SUB"
              title="Web制作"
              description="Webサイト・LP・情報発信サイトなどの制作にも対応しています。"
            />
          </AnimateIn>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {webWorks.map((work, index) => (
              <WorkCard key={work.id} work={work} delay={100 + index * 80} />
            ))}
            {/* Keeps the row from reading as a half-empty shelf, and says where
                the remaining web work actually is instead of listing it here. */}
            <AnimateIn className="lg:col-span-2" delay={100 + webWorks.length * 80}>
              <div className="flex h-full flex-col justify-center gap-4 border border-dashed border-white/[0.09] bg-white/[0.012] p-7">
                <p className="text-[13px] leading-7 text-white/55">
                  ホームページ、1ページの紹介サイト、ネットショップなどのWeb制作は、制作実績一覧の「Web制作」からまとめてご覧いただけます。
                </p>
                <Link
                  href="/works#archive"
                  className="inline-flex min-h-11 w-full items-center justify-center border border-white/14 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/70 transition hover:border-white/35 hover:text-white sm:w-auto sm:self-start sm:px-6"
                >
                  Web制作の実績を見る（{webProjectCount}件）
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>

        <AnimateIn delay={360}>
          <div className="mt-14 flex justify-center">
            <Link
              href="/works"
              className="inline-flex min-h-12 w-full items-center justify-center border border-[rgba(212,175,55,0.38)] bg-[rgba(212,175,55,0.04)] px-7 py-3 text-[12px] font-semibold tracking-[0.08em] text-[rgba(232,204,113,0.92)] transition hover:border-[rgba(212,175,55,0.65)] hover:text-white sm:w-auto"
            >
              すべての制作実績を見る（{projects.length}件）
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
