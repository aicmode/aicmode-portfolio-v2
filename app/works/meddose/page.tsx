import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimateIn from '../../components/AnimateIn'
import Footer from '../../components/Footer'
import { projects } from '../../data/projects'
import { STATUS_LABEL } from '../../types/project'

/**
 * MedDose, at full length.
 *
 * Every fact on this page is read from the same `projects` entry the card and
 * the archive use, so the page and the card can never end up describing
 * different work. Nothing is written twice: no problem statement, feature list
 * or screenshot caption is retyped here.
 *
 * The site's own nav is deliberately absent. It scrolls to fragments on the
 * home page (`#works`, `#contact`), which do not exist in this document — a
 * back link to `/#works` is the honest version of that on a subpage.
 */

const PROJECT_ID = 'meddose'
const SITE_URL = 'https://aicmode-portfolio.vercel.app'
const PATH = '/works/meddose'

const project = projects.find((entry) => entry.id === PROJECT_ID)

const title = 'MedDose | Apple Watch Medication Calculator — AICMODE'
const description =
  '看護師としての実務経験から設計した、臨時薬の服用スケジュールを自動計算するApple Watchアプリ。Swift / SwiftUI / watchOSで実装し、Apple Watch Series 11の実機で動作確認まで行ったプロトタイプです。'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}${PATH}`,
    siteName: 'AICMODE',
    locale: 'ja_JP',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

/** Section label + rule, shared by every block below the hero. */
function SectionHeading({ no, en, ja, accent }: { no: string; en: string; ja: string; accent: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-white/[0.08] pb-4">
      <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.2em]" style={{ color: accent, opacity: 0.75 }}>
        {no}
      </span>
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.34em] text-white/78 sm:text-[15px]">{en}</h2>
      <p className="text-[11px] tracking-[0.14em] text-white/50">{ja}</p>
    </div>
  )
}

function Bullets({ items, accent }: { items: readonly string[]; accent: string }) {
  return (
    <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 text-[13.5px] leading-7 text-white/60">
          <span
            aria-hidden="true"
            className="mt-[11px] h-[3px] w-[3px] flex-shrink-0"
            style={{ background: accent, opacity: 0.75 }}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
    </svg>
  )
}

export default function MedDosePage() {
  if (!project) notFound()

  const { accent, gallery, outcome, role, safety, statusNote } = project
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    url: `${SITE_URL}${PATH}`,
    inLanguage: 'ja-JP',
    creator: { '@id': `${SITE_URL}/#aicmode` },
    keywords: project.stack.join(', '),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <main id="main" className="relative overflow-x-hidden bg-[#050506]">
        <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.11]" />

        <div className="relative mx-auto max-w-[1100px] px-4 pb-24 pt-28 sm:px-6 md:px-10 md:pb-36 md:pt-36">
          {/* ── Header ─────────────────────────────────────────────── */}
          <AnimateIn>
            <Link
              href="/#works"
              className="inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 transition-colors duration-500 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Works
            </Link>

            <div className="mt-9 flex flex-wrap items-center gap-2">
              <span
                className="border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.26em]"
                style={{ borderColor: `${accent}66`, background: `${accent}14`, color: accent }}
              >
                {project.group}
              </span>
              <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/58">
                {project.projectType}
              </span>
              <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/58">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: 'rgba(212,175,55,0.7)' }}
                />
                {STATUS_LABEL[project.status]}
              </span>
              <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/58">
                Apple Watch 実機動作確認済み
              </span>
            </div>

            <p className="mt-7 text-[10px] uppercase tracking-[0.44em]" style={{ color: accent, opacity: 0.85 }}>
              {project.subtitle}
            </p>
            <h1 className="mt-4 text-[clamp(3rem,11vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.02em] text-white">
              MedDose
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/60">{project.summary}</p>

            {statusNote ? (
              <p className="mt-6 max-w-2xl border-l border-white/12 pl-5 text-[12.5px] leading-7 text-white/52">
                {statusNote}
              </p>
            ) : null}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 border border-white/16 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/78 transition duration-500 hover:border-white/38 hover:text-white sm:w-auto"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  View Source on GitHub
                  <span className="sr-only">（新しいタブで開きます）</span>
                  <ExternalArrow />
                </a>
              ) : null}
              <Link
                href="/#contact"
                className="inline-flex w-full items-center justify-center border border-[rgba(212,175,55,0.4)] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[rgba(212,175,55,0.9)] transition duration-500 hover:border-[rgba(212,175,55,0.7)] hover:text-white sm:w-auto"
              >
                Discuss a Similar Build
              </Link>
            </div>
          </AnimateIn>

          {/* ── Screen flow ────────────────────────────────────────── */}
          {gallery ? (
            <AnimateIn delay={80}>
              <section className="mt-20 md:mt-28">
                <SectionHeading no="01" en="Screen Flow" ja="操作フロー" accent={accent} />
                {project.galleryNote ? (
                  <p className="mt-6 max-w-2xl text-[13px] leading-7 text-white/55">{project.galleryNote}</p>
                ) : null}
                {/*
                  Each frame takes its aspect ratio from the file's real pixel
                  size, so the watch screen is never stretched or cropped. Five
                  across on a wide screen puts the whole flow in one line; it
                  folds to three and then two without the frames changing shape.
                */}
                <ol className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                  {gallery.map((shot, index) => (
                    <li key={shot.src}>
                      <div
                        className="relative w-full overflow-hidden rounded-[18px] border border-white/10 bg-black"
                        style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 44vw"
                          className="object-contain"
                          priority={index < 3}
                        />
                      </div>
                      <p className="mt-3.5 flex gap-2.5 text-[12px] leading-6 text-white/58">
                        <span
                          aria-hidden="true"
                          className="font-mono text-[10px] leading-6"
                          style={{ color: accent, opacity: 0.75 }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {shot.caption}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </AnimateIn>
          ) : null}

          {/* ── Problem / Solution ─────────────────────────────────── */}
          <AnimateIn delay={80}>
            <section className="mt-20 md:mt-28">
              <SectionHeading no="02" en="Problem" ja="課題" accent={accent} />
              <p className="mt-6 max-w-3xl text-[14px] leading-8 text-white/60">{project.problem}</p>
            </section>
          </AnimateIn>

          <AnimateIn delay={80}>
            <section className="mt-16 md:mt-20">
              <SectionHeading no="03" en="Solution" ja="解決策" accent={accent} />
              <p className="mt-6 max-w-3xl text-[14px] leading-8 text-white/60">{project.solution}</p>
            </section>
          </AnimateIn>

          {/* ── Features ───────────────────────────────────────────── */}
          <AnimateIn delay={80}>
            <section className="mt-16 md:mt-20">
              <SectionHeading no="04" en="Key Features" ja="主な機能" accent={accent} />
              <Bullets items={project.features} accent={accent} />
            </section>
          </AnimateIn>

          {/* ── Role ───────────────────────────────────────────────── */}
          {role ? (
            <AnimateIn delay={80}>
              <section className="mt-16 md:mt-20">
                <SectionHeading no="05" en="Role" ja="担当範囲" accent={accent} />
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {role.map((item) => (
                    <li
                      key={item}
                      className="border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/60"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 max-w-3xl text-[13px] leading-7 text-white/48">
                  現場課題の発見から要件整理、計算ロジック設計、watchOS向けUI設計、SwiftUI実装、画面遷移、実機テスト、Git / GitHubでのバージョン管理、READMEの作成まで、すべて個人で担当しています。
                </p>
              </section>
            </AnimateIn>
          ) : null}

          {/* ── Stack ──────────────────────────────────────────────── */}
          <AnimateIn delay={80}>
            <section className="mt-16 md:mt-20">
              <SectionHeading no="06" en="Tech Stack" ja="使用技術" accent={accent} />
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="border px-3.5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.22em]"
                    style={{ borderColor: `${accent}3d`, background: `${accent}0f`, color: accent }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </AnimateIn>

          {/* ── Outcome ────────────────────────────────────────────── */}
          {outcome ? (
            <AnimateIn delay={80}>
              <section className="mt-16 md:mt-20">
                <SectionHeading no="07" en="Outcome" ja="成果" accent={accent} />
                <Bullets items={outcome} accent={accent} />
              </section>
            </AnimateIn>
          ) : null}

          {/* ── Notice ─────────────────────────────────────────────── */}
          {safety ? (
            <AnimateIn delay={80}>
              <section className="mt-16 md:mt-20">
                <SectionHeading no="08" en="Notice" ja="注意事項" accent={accent} />
                <div className="mt-6 border border-[rgba(212,175,55,0.28)] bg-[rgba(212,175,55,0.04)] p-6 sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[rgba(212,175,55,0.85)]">
                    Medical Disclaimer
                  </p>
                  <p className="mt-4 text-[13.5px] leading-8 text-white/64">{safety}</p>
                  <p className="mt-4 text-[13.5px] leading-8 text-white/64">
                    実際に使用する場合は、処方箋、電子カルテ、医師の指示を必ず確認してください。
                  </p>
                </div>
              </section>
            </AnimateIn>
          ) : null}

          {/* ── Footer links ───────────────────────────────────────── */}
          <AnimateIn delay={80}>
            <div className="mt-20 flex flex-col gap-6 border-t border-white/[0.08] pt-8 md:mt-28 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-xl text-[11.5px] leading-6 tracking-[0.04em] text-white/55">
                自主開発のプロトタイプです。App Storeでは公開しておらず、実在クライアントの受託案件でもありません。ソースコードはGitHubで確認できます。
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 border border-white/14 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white sm:w-auto"
                  >
                    GitHub Repository
                    <span className="sr-only">（新しいタブで開きます）</span>
                    <ExternalArrow />
                  </a>
                ) : null}
                <Link
                  href="/#works"
                  className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white sm:w-auto"
                >
                  Back to Works
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
