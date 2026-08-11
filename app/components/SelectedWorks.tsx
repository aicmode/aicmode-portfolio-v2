'use client'

import { useState } from 'react'
import AnimateIn from './AnimateIn'
import DetailModal from './DetailModal'
import WorkPoster, { WorkDetail } from './WorkPoster'
import { projects, selectedProjects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'

/**
 * The curated first read. The count is taken from the data rather than written
 * into the copy, so featuring one more piece can never leave the sentence
 * claiming a number the grid does not show. The full set stays below, in the
 * archive.
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
              <p className="mb-5 text-[12px] tracking-[0.2em] text-white/56">制作実績</p>
              <h2 className="text-[clamp(2.2rem,7vw,4.6rem)] font-black leading-[1.15] tracking-[-0.02em] text-white">
                サイトとアプリの
                <br />
                制作実績
              </h2>
              <p className="mt-4 text-[13px] tracking-[0.08em]" style={{ color: 'rgba(212,175,55,0.82)' }}>
                サイト・アプリ {projects.length}件 ／ AI・自動化 {caseStudies.length}件
              </p>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-white/58 lg:text-right">
              仕事に使うアプリ、便利ツール、お店や会社のサイトなどを作っています。
              まず見ていただきたい{selectedProjects.length}件です。
              「詳しく見る」から、作った理由や中身まで確認できます。
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
            <p className="max-w-xl text-[12.5px] leading-7 text-white/58">
              すべて自分で企画・制作したものです。実際の企業から依頼を受けて作ったものではないため、
              企業名や売上、利用者数は記載していません。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#archive"
                className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[12px] font-semibold tracking-[0.12em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white sm:w-auto"
              >
                すべての実績を見る（{projects.length}件）
              </a>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[12px] font-semibold tracking-[0.12em] text-white/70 transition duration-500 hover:border-[rgba(212,175,55,0.45)] hover:text-white hover:shadow-[0_0_44px_rgba(212,175,55,0.08)] sm:w-auto"
              >
                相談してみる
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
