'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import DetailModal from './DetailModal'
import { caseStudies } from '../data/caseStudies'
import { STATUS_LABEL, hasLiveDemo } from '../types/project'
import type { CaseStudy } from '../types/project'

const ease = [0.13, 0.86, 0.18, 1] as const

function StatusDot({ status }: { status: CaseStudy['status'] }) {
  const live = hasLiveDemo(status)
  return (
    <span
      aria-hidden="true"
      className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
      style={{
        background: live ? 'rgba(107,203,107,0.85)' : 'rgba(212,175,55,0.7)',
        boxShadow: live ? '0 0 8px rgba(107,203,107,0.5)' : 'none',
      }}
    />
  )
}

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 text-[9px] font-semibold uppercase leading-4 tracking-[0.24em]">
      <span className="text-white/50">{label}</span>
      <span className="break-words text-white/58">{value}</span>
    </p>
  )
}

function CaseStudyCard({ study, onOpen }: { study: CaseStudy; onOpen: () => void }) {
  return (
    <motion.article
      className="case-card group relative flex h-full flex-col overflow-hidden"
      style={{ '--case-accent': study.accent } as CSSProperties}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.9, delay: (study.order - 1) * 0.06, ease }}
    >
      <div className="case-card-rule" aria-hidden="true" />

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="border border-[color:var(--case-accent)]/40 bg-[color:var(--case-accent)]/[0.08] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.26em] text-[color:var(--case-accent)]">
            {study.group}
          </span>
          <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/56">
            {study.projectType}
          </span>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[color:var(--case-accent)] opacity-80">
            {study.subtitle}
          </p>
          <h3 className="mt-2.5 text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.015em] text-white sm:text-[1.5rem]">
            {study.title}
          </h3>
        </div>

        <dl className="space-y-3">
          <div>
            <dt className="text-[8px] font-semibold uppercase tracking-[0.34em] text-white/55">Problem</dt>
            <dd className="mt-1.5 text-[13px] leading-6 text-white/58">{study.problem}</dd>
          </div>
          <div>
            <dt className="text-[8px] font-semibold uppercase tracking-[0.34em] text-white/55">Solution</dt>
            <dd className="mt-1.5 text-[13px] leading-6 text-white/58">{study.solution}</dd>
          </div>
        </dl>

        <ul className="space-y-1.5">
          {study.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2.5 text-[12px] leading-5 text-white/58">
              <span aria-hidden="true" className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 bg-[color:var(--case-accent)] opacity-70" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-1.5 border-t border-white/[0.06] pt-4">
          <MetaLine label="Stack" value={study.stack.join(' · ')} />
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-semibold uppercase leading-4 tracking-[0.24em]">
            <span className="text-white/50">Status</span>
            <span className="inline-flex items-center gap-1.5 text-white/58">
              <StatusDot status={study.status} />
              {STATUS_LABEL[study.status]}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex flex-1 items-center justify-center gap-2 border border-white/16 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/78 transition-colors duration-500 hover:border-[color:var(--case-accent)] hover:text-[color:var(--case-accent)] sm:flex-none"
          >
            View Case Study
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {study.liveUrl ? (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 border border-white/10 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/50 transition-colors duration-500 hover:border-white/28 hover:text-white/85 sm:flex-none"
            >
              Open Demo
              <span className="sr-only">（{study.title} を新しいタブで開きます）</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
              </svg>
            </a>
          ) : null}

          {study.githubUrl ? (
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 border border-white/10 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/50 transition-colors duration-500 hover:border-white/28 hover:text-white/85 sm:flex-none"
            >
              View Source
              <span className="sr-only">（{study.title} のGitHubリポジトリを新しいタブで開きます）</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

function DetailSection({
  no,
  title,
  items,
  text,
  accent,
}: {
  no: string
  title: string
  items?: readonly string[]
  text?: string
  accent: string
}) {
  return (
    <section className="border-t border-white/[0.06] pt-5">
      <h4 className="flex items-baseline gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/70">
        <span aria-hidden="true" className="font-mono text-[9px]" style={{ color: accent, opacity: 0.7 }}>
          {no}
        </span>
        {title}
      </h4>
      {text ? <p className="mt-3 text-[13px] leading-7 text-white/52">{text}</p> : null}
      {items ? (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-[13px] leading-6 text-white/52">
              <span aria-hidden="true" className="mt-[9px] h-[3px] w-[3px] flex-shrink-0" style={{ background: accent, opacity: 0.7 }} />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

function CaseStudyDetail({ study }: { study: CaseStudy }) {
  return (
    <div className="max-h-[inherit]">
      <div className="border-b border-white/[0.07] px-6 pb-6 pt-14 sm:px-9 sm:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.26em]"
            style={{
              borderColor: `${study.accent}66`,
              background: `${study.accent}14`,
              color: study.accent,
            }}
          >
            {study.group}
          </span>
          <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/58">
            {study.projectType}
          </span>
          <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/58">
            <StatusDot status={study.status} />
            {STATUS_LABEL[study.status]}
          </span>
        </div>
        <h3 className="mt-4 text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.1rem]">
          {study.title}
        </h3>
        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em]" style={{ color: study.accent, opacity: 0.8 }}>
          {study.subtitle} · {study.year}
        </p>
        {study.statusNote ? (
          <p className="mt-4 border-l border-white/12 pl-4 text-[12px] leading-6 text-white/56">{study.statusNote}</p>
        ) : null}
      </div>

      {study.screenshot ? (
        <div className="border-b border-white/[0.07] p-6 sm:p-9">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/10 bg-[#050505]">
            <Image
              src={study.screenshot}
              alt={study.screenshotAlt ?? `${study.title} の画面`}
              fill
              sizes="(min-width: 768px) 640px, 92vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      ) : null}

      <div className="space-y-5 p-6 sm:p-9">
        <DetailSection no="01" title="Problem" text={study.problem} accent={study.accent} />
        <DetailSection no="02" title="Goal" text={study.detail.goal} accent={study.accent} />
        <DetailSection no="03" title="Proposed Solution" items={study.detail.proposedSolution} accent={study.accent} />
        <DetailSection no="04" title="MVP Scope" items={study.detail.mvpScope} accent={study.accent} />
        <DetailSection no="05" title="Phase 2" items={study.detail.phase2} accent={study.accent} />
        <DetailSection no="06" title="Architecture" items={study.detail.architecture} accent={study.accent} />
        <DetailSection no="07" title="Security / Constraints" items={study.detail.security} accent={study.accent} />
        <DetailSection no="08" title="Expected Business Impact" items={study.detail.expectedImpact} accent={study.accent} />
        <DetailSection no="09" title="Key Features" items={study.features} accent={study.accent} />
        <DetailSection no="10" title="Tech Stack" items={study.stack} accent={study.accent} />

        <section className="border-t border-white/[0.06] pt-5">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/70">Project Status</h4>
          <p className="mt-3 text-[13px] leading-7 text-white/52">
            {STATUS_LABEL[study.status]} — {study.projectType}
            {study.statusNote ? `。${study.statusNote}` : '。'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {study.liveUrl ? (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/16 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/78 transition-colors duration-500 hover:border-white/35 hover:text-white"
              >
                Open Demo
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            ) : null}
            {study.githubUrl ? (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/16 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/78 transition-colors duration-500 hover:border-white/35 hover:text-white"
              >
                View Source on GitHub
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            ) : null}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[rgba(212,175,55,0.4)] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.26em] text-[rgba(212,175,55,0.9)] transition-colors duration-500 hover:border-[rgba(212,175,55,0.7)] hover:text-white"
            >
              Discuss a Similar Build
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openStudy = caseStudies.find((study) => study.id === openId) ?? null

  return (
    <section
      id="case-studies"
      className="case-studies-section relative overflow-hidden px-4 py-24 sm:px-6 md:px-10 md:py-36"
    >
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.11]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative mx-auto max-w-[1420px]">
        <AnimateIn>
          <div className="mb-12 border-b border-white/[0.08] pb-8 md:mb-16">
            <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-white/56">
              AI &amp; Automation Case Studies
            </p>
            <h2 className="text-[clamp(2.6rem,9vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.02em] text-white">
              AI Systems
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.24)' }}>
                &amp; Automation
              </span>
            </h2>
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-sm leading-8 text-white/58">
                業務の課題から設計したAIシステム・業務自動化・API連携です。各ケーススタディには課題、MVPの範囲、Phase 2、アーキテクチャ、セキュリティ上の制約までを記載しています。
              </p>
              <p className="max-w-md text-[11.5px] leading-6 tracking-[0.04em] text-white/58 lg:text-right">
                掲載しているのは自主開発および学習課題として制作したものです。実在するクライアントの受託案件ではなく、企業名・売上・導入実績は一切記載していません。ソースコードはすべてGitHubで確認できます。
              </p>
            </div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} onOpen={() => setOpenId(study.id)} />
          ))}
        </div>

        <AnimateIn delay={200}>
          <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-20">
            <p className="text-[11.5px] leading-6 tracking-[0.06em] text-white/58">
              似た仕組みを検討中の方は、現在の業務フローだけお持ちください。適した形を整理してご提案します。
            </p>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70 transition duration-500 hover:border-[rgba(212,175,55,0.45)] hover:text-white sm:w-auto"
            >
              Start a Project
            </a>
          </div>
        </AnimateIn>
      </div>

      <DetailModal open={openStudy !== null} onClose={() => setOpenId(null)} label={openStudy?.title ?? ''}>
        {openStudy ? <CaseStudyDetail study={openStudy} /> : null}
      </DetailModal>
    </section>
  )
}
