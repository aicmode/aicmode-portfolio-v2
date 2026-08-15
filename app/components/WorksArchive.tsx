'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import DetailModal from './DetailModal'
import WorkPoster, { WorkDetail } from './WorkPoster'
import { archiveCategories, archiveProjects, projectCountByCategory, projects } from '../data/projects'
import { ALL_FILTER, filterLabel } from '../types/project'
import type { Filter } from '../types/project'

const ease = [0.13, 0.86, 0.18, 1] as const
const ARCHIVE_PROJECTS_ID = 'works-archive-projects'

/**
 * The complete set of works with the category filter preserved. Lives below
 * the curated sections so the sales-critical work is not buried, while nothing
 * is removed from the portfolio.
 */
export default function WorksArchive({ defaultExpanded = false }: { defaultExpanded?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<Filter>(ALL_FILTER)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [openId, setOpenId] = useState<string | null>(null)
  const archiveHeadingRef = useRef<HTMLDivElement>(null)
  const archiveToggleRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const openProject = projects.find((project) => project.id === openId) ?? null

  const filters = useMemo<readonly Filter[]>(() => [ALL_FILTER, ...archiveCategories], [])

  const counts = useMemo<Record<Filter, number>>(
    () => ({ [ALL_FILTER]: archiveProjects.length, ...projectCountByCategory }),
    [],
  )

  /** What the active tab selects, independent of whether the archive is open. */
  const filteredProjects = useMemo(
    () =>
      activeCategory === ALL_FILTER
        ? archiveProjects
        : archiveProjects.filter((project) => project.group === activeCategory),
    [activeCategory],
  )

  /** What is actually rendered: nothing at all while the archive is collapsed. */
  const displayedProjects = isExpanded ? filteredProjects : []

  const toggleLabel = isExpanded
    ? '閉じる'
    : activeCategory === ALL_FILTER
      ? `すべての実績を見る（${counts[ALL_FILTER]}件）`
      : `${filterLabel(activeCategory)}を見る（${counts[activeCategory]}件）`

  function handleCategoryChange(category: Filter) {
    setActiveCategory(category)
    setIsExpanded(true)
  }

  function handleArchiveToggle() {
    if (!isExpanded) {
      setIsExpanded(true)
      return
    }

    setIsExpanded(false)
    window.requestAnimationFrame(() => {
      archiveHeadingRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      archiveToggleRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <section
      id="archive"
      className="works editorial-works-section relative overflow-x-hidden bg-[#010101] px-4 py-20 sm:px-6 md:px-10 md:py-28"
    >
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative mx-auto max-w-[1420px]">
        <AnimateIn>
          <div
            ref={archiveHeadingRef}
            className="mb-8 flex scroll-mt-20 flex-col gap-7 border-b border-white/[0.08] pb-7 md:mb-10 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-5 text-[12px] tracking-[0.2em] text-white/56">すべての制作実績</p>
              <h2 className="text-[clamp(1.9rem,5.5vw,3.6rem)] font-black leading-[1.2] tracking-[-0.02em] text-white">
                これまでに作ったもの
              </h2>
              <p className="mt-4 text-[13px] tracking-[0.08em]" style={{ color: 'rgba(212,175,55,0.82)' }}>
                全{archiveProjects.length}件
              </p>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-white/58 lg:text-right">
              これまでに作ったものを、すべてこちらに残しています。
              種類を選ぶと、その分だけを見られます。
            </p>
          </div>
        </AnimateIn>

        <div className="works-tabs no-scrollbar -mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0 md:mb-10">
          <div className="flex min-w-max items-center gap-2 sm:flex-wrap sm:gap-2.5" role="group" aria-label="作品カテゴリーの絞り込み">
            {filters.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isActive}
                  className={`group/tab inline-flex items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-[12.5px] font-semibold tracking-[0.06em] transition-all duration-500 ${
                    isActive
                      ? 'border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.07)] text-[rgba(212,175,55,0.95)] shadow-[0_0_30px_rgba(212,175,55,0.08)]'
                      : 'border-white/10 text-white/58 hover:border-white/25 hover:text-white/80'
                  }`}
                >
                  {filterLabel(category)}
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

        <div className="flex justify-center">
          <button
            ref={archiveToggleRef}
            type="button"
            onClick={handleArchiveToggle}
            aria-expanded={isExpanded}
            aria-controls={ARCHIVE_PROJECTS_ID}
            className="inline-flex min-h-12 w-full max-w-full items-center justify-center border border-[rgba(212,175,55,0.34)] bg-[rgba(212,175,55,0.04)] px-5 py-3 text-center text-[12px] font-semibold tracking-[0.08em] text-[rgba(232,204,113,0.9)] transition duration-500 hover:border-[rgba(212,175,55,0.62)] hover:bg-[rgba(212,175,55,0.08)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(232,204,113,0.95)] sm:w-auto sm:px-8 sm:text-[13px]"
          >
            {toggleLabel}
          </button>
        </div>

        <div
          id={ARCHIVE_PROJECTS_ID}
          hidden={!isExpanded}
          role="region"
          aria-label={`${filterLabel(activeCategory)}の制作実績`}
        >
          {isExpanded ? (
            <>
              <motion.div
                key={activeCategory}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease }}
                className="editorial-poster-grid mx-auto mt-12 grid auto-rows-fr grid-cols-1 items-stretch gap-x-8 gap-y-12 md:mt-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16 xl:grid-cols-3"
              >
                {displayedProjects.map((project, index) => (
                  <WorkPoster
                    key={project.id}
                    project={project}
                    index={index}
                    showFeaturedBadge={project.featured}
                    revealOnMount
                    onOpenDetail={() => setOpenId(project.id)}
                  />
                ))}
              </motion.div>

              <div className="mt-12 flex justify-center border-t border-white/[0.07] pt-8 md:mt-16">
                <button
                  type="button"
                  onClick={handleArchiveToggle}
                  aria-expanded={isExpanded}
                  aria-controls={ARCHIVE_PROJECTS_ID}
                  className="inline-flex min-h-12 w-full items-center justify-center border border-white/14 px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/68 transition duration-500 hover:border-[rgba(212,175,55,0.45)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(232,204,113,0.95)] sm:w-auto sm:px-8 sm:text-[13px]"
                >
                  閉じる
                </button>
              </div>

              <AnimateIn delay={200}>
                <div className="mt-10 flex flex-col gap-6 border-t border-white/[0.07] pt-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] tracking-[0.4em] text-white/18">AIC</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/18">2026</span>
                  </div>
                  <Link
                    href="/#contact"
                    className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[12px] font-semibold tracking-[0.12em] text-white/70 transition duration-500 hover:border-[rgba(212,175,55,0.45)] hover:text-white hover:shadow-[0_0_44px_rgba(212,175,55,0.08)] sm:w-auto"
                  >
                    相談してみる
                  </Link>
                </div>
              </AnimateIn>
            </>
          ) : null}
        </div>
      </div>

      <DetailModal open={openProject !== null} onClose={() => setOpenId(null)} label={openProject?.title ?? ''}>
        {openProject ? <WorkDetail project={openProject} /> : null}
      </DetailModal>
    </section>
  )
}
