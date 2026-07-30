'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import DetailModal from './DetailModal'
import WorkPoster, { WorkDetail } from './WorkPoster'
import { archiveCategories, archiveProjects, projectCountByCategory, projects } from '../data/projects'
import type { Category } from '../types/project'

const ease = [0.13, 0.86, 0.18, 1] as const
type Filter = 'All' | Category

/**
 * The complete set of 26 works with the category filter preserved. Lives below
 * the curated sections so the sales-critical work is not buried, while nothing
 * is removed from the portfolio.
 */
export default function WorksArchive() {
  const [activeCategory, setActiveCategory] = useState<Filter>('All')
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = projects.find((project) => project.id === openId) ?? null

  const filters = useMemo<readonly Filter[]>(() => ['All', ...archiveCategories], [])

  const counts = useMemo<Record<Filter, number>>(
    () => ({ All: archiveProjects.length, ...projectCountByCategory }) as Record<Filter, number>,
    [],
  )

  const visibleProjects = useMemo(
    () =>
      archiveProjects.filter(
        (project) => activeCategory === 'All' || project.group === activeCategory,
      ),
    [activeCategory],
  )

  return (
    <section
      id="archive"
      className="works editorial-works-section relative overflow-x-hidden bg-[#010101] px-4 py-24 sm:px-6 md:px-10 md:py-36"
    >
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative mx-auto max-w-[1420px]">
        <AnimateIn>
          <div className="mb-10 flex flex-col gap-8 border-b border-white/[0.08] pb-8 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-white/56">Works Archive</p>
              <h2 className="text-[clamp(2.4rem,8vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.02em] text-white">
                Archive
              </h2>
              <p
                className="mt-4 text-[10px] uppercase tracking-[0.44em] md:text-[11px]"
                style={{ color: 'rgba(212,175,55,0.82)' }}
              >
                Portfolio Projects: {archiveProjects.length}
              </p>
            </div>
            <p className="max-w-xl text-sm leading-8 text-white/58 lg:text-right">
              これまでに制作したWebアプリ・Webサイト・LP・ECサイトの全一覧です。カテゴリーで絞り込めます。
              各カードのStatusは実際の公開状況を確認して記載しています。
            </p>
          </div>
        </AnimateIn>

        <div className="works-tabs no-scrollbar -mx-4 mb-12 overflow-x-auto px-4 sm:mx-0 sm:px-0 md:mb-16">
          <div className="flex min-w-max items-center gap-2 sm:flex-wrap sm:gap-2.5" role="group" aria-label="作品カテゴリーの絞り込み">
            {filters.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`group/tab inline-flex items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.26em] transition-all duration-500 ${
                    isActive
                      ? 'border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.07)] text-[rgba(212,175,55,0.95)] shadow-[0_0_30px_rgba(212,175,55,0.08)]'
                      : 'border-white/10 text-white/58 hover:border-white/25 hover:text-white/80'
                  }`}
                >
                  {category}
                  <span
                    className={`text-[8px] font-semibold tabular-nums tracking-[0.1em] transition-colors duration-500 ${
                      isActive ? 'text-[rgba(212,175,55,0.85)]' : 'text-white/55'
                    }`}
                  >
                    {counts[category]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="editorial-poster-grid mx-auto grid auto-rows-fr grid-cols-1 items-stretch gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20 xl:grid-cols-3"
        >
          {visibleProjects.map((project, index) => (
            <WorkPoster
              key={project.id}
              project={project}
              index={index}
              showFeaturedBadge={project.featured}
              onOpenDetail={() => setOpenId(project.id)}
            />
          ))}
        </motion.div>

        <AnimateIn delay={200}>
          <div className="mt-14 flex flex-col gap-6 border-t border-white/[0.07] pt-8 md:mt-20 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/18">AICMODE</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/18">2026</span>
            </div>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70 transition duration-500 hover:border-[rgba(212,175,55,0.45)] hover:text-white hover:shadow-[0_0_44px_rgba(212,175,55,0.08)] sm:w-auto"
            >
              Start a Project
            </a>
          </div>
        </AnimateIn>
      </div>

      <DetailModal open={openProject !== null} onClose={() => setOpenId(null)} label={openProject?.title ?? ''}>
        {openProject ? <WorkDetail project={openProject} /> : null}
      </DetailModal>
    </section>
  )
}
