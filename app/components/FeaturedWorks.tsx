'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from './AnimateIn'
import { caseStudies } from '../data/caseStudies'
import { projects } from '../data/projects'

const medibrief = caseStudies.find((study) => study.id === 'medibrief-ai')!
const medichart = projects.find((project) => project.id === 'medichart-lite')!
const summaryTool = caseStudies.find((study) => study.id === 'slack-line-summary')!

const featuredWorks = [
  {
    id: medibrief.id,
    title: 'MediBrief',
    label: '医療 × AI',
    description: medibrief.plainSummary,
    image: medibrief.screenshot,
    imageAlt: medibrief.screenshotAlt,
    accent: medibrief.accent,
    liveUrl: medibrief.liveUrl,
    githubUrl: medibrief.githubUrl,
  },
  {
    id: medichart.id,
    title: medichart.title,
    label: '医療向けWebアプリ',
    description: medichart.plainSummary,
    image: medichart.image,
    imageAlt: medichart.imageAlt,
    accent: medichart.accent,
    liveUrl: medichart.liveUrl,
    githubUrl: medichart.githubUrl,
  },
  {
    id: summaryTool.id,
    title: summaryTool.title,
    label: 'AI・自動化',
    description: summaryTool.plainSummary,
    accent: summaryTool.accent,
    githubUrl: summaryTool.githubUrl,
  },
] as const

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
              医療、AIによる自動化、仕事用アプリの代表例です。
            </p>
          </div>
        </AnimateIn>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {featuredWorks.map((work, index) => (
            <AnimateIn key={work.id} delay={100 + index * 80}>
              <article className="group flex h-full flex-col overflow-hidden border border-white/[0.09] bg-white/[0.018]">
                {'image' in work && work.image ? (
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
                      <span className="border border-white/12 px-3 py-3">連絡</span>
                      <span className="text-white/25">→</span>
                      <span className="border px-3 py-3" style={{ borderColor: `${work.accent}66`, color: work.accent }}>要約</span>
                      <span className="text-white/25">→</span>
                      <span className="border border-white/12 px-3 py-3">通知</span>
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] font-semibold tracking-[0.14em]" style={{ color: work.accent }}>
                    {work.label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-7 text-white">{work.title}</h3>
                  <p className="mt-4 text-[14px] leading-7 text-white/60">{work.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {'liveUrl' in work && work.liveUrl ? (
                      <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center border border-white/16 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/76 transition hover:border-white/35 hover:text-white"
                      >
                        実際に見る<span className="sr-only">（新しいタブで開きます）</span>
                      </a>
                    ) : null}
                    <a
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center border border-white/10 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/50 transition hover:border-white/28 hover:text-white"
                    >
                      GitHubで見る<span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  </div>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={360}>
          <div className="mt-9 flex justify-center">
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
