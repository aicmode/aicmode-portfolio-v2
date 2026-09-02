'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import DetailModal from './DetailModal'
import WorkPoster, { WorkDetail } from './WorkPoster'
import {
  archiveDomains,
  archiveProjects,
  categoriesByDomain,
  projectCountByCategory,
  projectCountByDomain,
  projects,
} from '../data/projects'
import { ALL_FILTER, CATEGORY_DOMAIN, domainFilterLabel, filterLabel } from '../types/project'
import type { DomainFilter, Filter } from '../types/project'

const ease = [0.13, 0.86, 0.18, 1] as const
const ARCHIVE_PROJECTS_ID = 'works-archive-projects'

/**
 * The complete set of works with the category filter preserved. Lives below
 * the curated sections so the sales-critical work is not buried, while nothing
 * is removed from the portfolio.
 */
export default function WorksArchive({ defaultExpanded = false }: { defaultExpanded?: boolean }) {
  const [activeDomain, setActiveDomain] = useState<DomainFilter>(ALL_FILTER)
  const [activeCategory, setActiveCategory] = useState<Filter>(ALL_FILTER)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [openId, setOpenId] = useState<string | null>(null)
  const archiveHeadingRef = useRef<HTMLDivElement>(null)
  const archiveToggleRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const openProject = projects.find((project) => project.id === openId) ?? null

  /** Top row: the two things this portfolio is, plus everything. */
  const domainFilters = useMemo<readonly DomainFilter[]>(() => [ALL_FILTER, ...archiveDomains], [])

  /**
   * Second row: the existing fine-grained categories, narrowed to the chosen
   * domain. Nothing is offered while "すべて" is active — one row of three is
   * the whole choice a first-time visitor has to make.
   */
  const categoryFilters = useMemo<readonly Filter[]>(
    () => (activeDomain === ALL_FILTER ? [] : [ALL_FILTER, ...categoriesByDomain[activeDomain]]),
    [activeDomain],
  )

  const domainCounts = useMemo<Record<DomainFilter, number>>(
    () => ({ [ALL_FILTER]: archiveProjects.length, ...projectCountByDomain }),
    [],
  )

  const categoryCounts = useMemo<Record<Filter, number>>(
    () => ({
      [ALL_FILTER]: activeDomain === ALL_FILTER ? archiveProjects.length : projectCountByDomain[activeDomain],
      ...projectCountByCategory,
    }),
    [activeDomain],
  )

  /** What the active tabs select, independent of whether the archive is open. */
  const filteredProjects = useMemo(
    () =>
      archiveProjects.filter((project) => {
        if (activeDomain !== ALL_FILTER && CATEGORY_DOMAIN[project.group] !== activeDomain) return false
        if (activeCategory !== ALL_FILTER && project.group !== activeCategory) return false
        return true
      }),
    [activeDomain, activeCategory],
  )

  /** What is actually rendered: nothing at all while the archive is collapsed. */
  const displayedProjects = isExpanded ? filteredProjects : []

  /** The words for the current selection: 大分類, narrowed by 細分類 when set. */
  const selectionLabel =
    activeCategory === ALL_FILTER ? domainFilterLabel(activeDomain) : filterLabel(activeCategory)

  const toggleLabel = isExpanded
    ? '閉じる'
    : activeDomain === ALL_FILTER && activeCategory === ALL_FILTER
      ? `すべての実績を見る（${domainCounts[ALL_FILTER]}件）`
      : `${selectionLabel}を見る（${filteredProjects.length}件）`

  function handleDomainChange(domain: DomainFilter) {
    setActiveDomain(domain)
    setActiveCategory(ALL_FILTER)
    setIsExpanded(true)
  }

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
              AI・業務自動化を中心に、これまで制作してきたものを掲載しています。
              Webサイト制作など、その他の制作実績もこちらから確認できます。
            </p>
          </div>
        </AnimateIn>

        {/* 大分類 first, on its own line: three choices, one of which is the
            whole archive. The fine-grained categories only appear once a
            domain is chosen, so the first read is never six tabs wide. */}
        <div className="works-tabs no-scrollbar -mx-4 mb-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max items-center gap-2 sm:flex-wrap sm:gap-2.5" role="group" aria-label="大きな分類で絞り込み">
            {domainFilters.map((domain) => {
              const isActive = activeDomain === domain
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => handleDomainChange(domain)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-[12.5px] font-semibold tracking-[0.06em] transition-all duration-500 ${
                    isActive
                      ? 'border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.07)] text-[rgba(212,175,55,0.95)] shadow-[0_0_30px_rgba(212,175,55,0.08)]'
                      : 'border-white/10 text-white/58 hover:border-white/25 hover:text-white/80'
                  }`}
                >
                  {domainFilterLabel(domain)}
                  <span
                    className={`text-[8px] font-semibold tabular-nums tracking-[0.1em] transition-colors duration-500 ${
                      isActive ? 'text-[rgba(212,175,55,0.85)]' : 'text-white/55'
                    }`}
                  >
                    {domainCounts[domain]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {categoryFilters.length > 0 ? (
          <div className="works-tabs no-scrollbar -mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0 md:mb-10">
            <div
              className="flex min-w-max items-center gap-2 sm:flex-wrap sm:gap-2.5"
              role="group"
              aria-label={`${domainFilterLabel(activeDomain)}の中で絞り込み`}
            >
              {categoryFilters.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-2 whitespace-nowrap border px-3.5 py-2 text-[11.5px] font-medium tracking-[0.06em] transition-all duration-500 ${
                      isActive
                        ? 'border-white/35 bg-white/[0.05] text-white'
                        : 'border-white/[0.08] text-white/50 hover:border-white/22 hover:text-white/75'
                    }`}
                  >
                    {filterLabel(category)}
                    <span className="text-[8px] font-semibold tabular-nums tracking-[0.1em] text-white/45">
                      {categoryCounts[category]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="mb-8 md:mb-10" />
        )}

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
          aria-label={`${selectionLabel}の制作実績`}
        >
          {isExpanded ? (
            <>
              <motion.div
                key={`${activeDomain}-${activeCategory}`}
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
