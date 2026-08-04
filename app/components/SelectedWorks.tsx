'use client'

import { useState } from 'react'
import AnimateIn from './AnimateIn'
import DetailModal from './DetailModal'
import WorkPoster, { WorkDetail } from './WorkPoster'
import { projects, selectedProjects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'

/**
 * The curated first read: every `featured` piece, ordered so an AI / web-app
 * client sees relevant work immediately. The count is read from the data rather
 * than written into the copy, so featuring one more piece can never leave the
 * sentence claiming a number the grid does not show. The full set stays
 * available in Works Archive.
 */
export default function SelectedWorks() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = projects.find((project) => project.id === openId) ?? null

  return (
    <section
      id="works"
      className="works editorial-works-section relative overflow-x-hidden bg-[#010101] px-4 py-24 sm:px-6 md:px-10 md:py-36"
    >
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative mx-auto max-w-[1420px]">
        <AnimateIn>
          <div className="mb-12 flex flex-col gap-8 border-b border-white/[0.08] pb-8 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-white/56">Selected Works</p>
              <h2 className="text-[clamp(3.4rem,13vw,10rem)] font-black uppercase leading-[0.82] text-white">
                Works
              </h2>
              <p
                className="mt-4 text-[10px] uppercase tracking-[0.44em] md:text-[11px]"
                style={{ color: 'rgba(212,175,55,0.82)' }}
              >
                {projects.length} Portfolio Projects · {caseStudies.length} AI Case Studies
              </p>
            </div>
            <p className="max-w-xl text-sm leading-8 text-white/58 lg:text-right">
              Webアプリ、業務効率化ツール、API連携、医療・ブランドサイトから、まず見ていただきたい
              {selectedProjects.length}件を掲載しています。
              各カードには使用した技術スタックと公開状況を記載し、Detailsから課題・実装内容まで確認できます。
            </p>
          </div>
        </AnimateIn>

        <div className="editorial-poster-grid mx-auto grid auto-rows-fr grid-cols-1 items-stretch gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20 xl:grid-cols-3">
          {selectedProjects.map((project, index) => (
            <WorkPoster
              key={project.id}
              project={project}
              index={index}
              priority={index < 2}
              onOpenDetail={() => setOpenId(project.id)}
            />
          ))}
        </div>

        <AnimateIn delay={200}>
          <div className="mt-14 flex flex-col gap-6 border-t border-white/[0.07] pt-8 md:mt-20 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xl text-[11.5px] leading-6 tracking-[0.04em] text-white/58">
              掲載作品は自主制作および学習目的の制作物です。実在クライアントの受託案件ではないため、企業名・売上・利用者数は記載していません。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#archive"
                className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white sm:w-auto"
              >
                View All {projects.length} Works
              </a>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70 transition duration-500 hover:border-[rgba(212,175,55,0.45)] hover:text-white hover:shadow-[0_0_44px_rgba(212,175,55,0.08)] sm:w-auto"
              >
                Start a Project
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>

      <DetailModal open={openProject !== null} onClose={() => setOpenId(null)} label={openProject?.title ?? ''}>
        {openProject ? <WorkDetail project={openProject} /> : null}
      </DetailModal>
    </section>
  )
}
