'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { CSSProperties } from 'react'
import { CATEGORY_LABEL, PROJECT_TYPE_LABEL, STATUS_CTA, STATUS_LABEL, hasLiveDemo } from '../types/project'
import type { Project } from '../types/project'

const ease = [0.13, 0.86, 0.18, 1] as const

/**
 * Internal navigation that still takes part in the card's hover choreography.
 * A plain `Link` would drop out of the `rest` / `hover` variants the article
 * propagates, so a card linking to a detail page would animate differently
 * from every card linking outwards.
 */
const MotionLink = motion.create(Link)

const VARIANT_CLASS: Record<NonNullable<Project['variant']>, string> = {
  special: 'bakery-special-card',
  kissa: 'kissa-premium-card',
  greenroot: 'greenroot-premium-card',
  blackline: 'blackline-premium-card',
  velvet: 'velvet-premium-card',
}

const VARIANT_TYPE_CLASS: Partial<Record<NonNullable<Project['variant']>, string>> = {
  kissa: 'kissa-premium',
  greenroot: 'greenroot-premium',
  blackline: 'blackline-premium',
  velvet: 'velvet-premium',
}

function ArrowIcon() {
  return (
    <motion.svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      variants={{ rest: { x: 0, y: 0 }, hover: { x: 5, y: -5 } }}
      transition={{ duration: 0.9, ease }}
    >
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

/**
 * The diagonal arrow above is the site's mark for leaving the page; this one
 * stays flat because the link it sits on navigates within the site, in the same
 * tab. Same size and same hover travel, so the two read as one family.
 */
function InternalArrowIcon() {
  return (
    <motion.svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      variants={{ rest: { x: 0 }, hover: { x: 5 } }}
      transition={{ duration: 0.9, ease }}
    >
      <path d="M5 12h13M13 6l6 6-6 6" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

/**
 * Poster frames are one shared 16/10 size for every card. A capture that is not
 * landscape — a phone or watch screen — declares `imageFit: 'contain'` so it
 * keeps its own proportions inside that frame instead of being cropped to fill
 * it. The class, not a Tailwind utility, is what does it: `.editorial-poster-image`
 * sets `object-fit: cover` from a two-class selector that a utility cannot outrank.
 */
function isContainFit(project: Project) {
  return project.imageFit === 'contain'
}

function ProjectImage({
  project,
  className,
  sizes,
  preload = false,
}: {
  project: Project
  className: string
  sizes: string
  preload?: boolean
}) {
  const [hasFailed, setHasFailed] = useState(false)
  const imageAlt = project.imageAlt ?? `${project.title} のサムネイル画像`

  return (
    <>
      <Image
        key={project.image}
        src={project.image}
        alt={hasFailed ? '' : imageAlt}
        fill
        sizes={sizes}
        className={`${className}${hasFailed ? ' opacity-0' : ''}`}
        style={{ objectPosition: project.imagePosition ?? 'center' }}
        preload={preload}
        loading={preload ? undefined : 'lazy'}
        unoptimized={project.image.startsWith('https://')}
        onError={() => setHasFailed(true)}
        aria-hidden={hasFailed || undefined}
      />
      {hasFailed ? (
        <div
          role="img"
          aria-label={imageAlt}
          className="absolute inset-0 z-[4] flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_68%),#050505] px-6 text-center"
        >
          <div>
            <span className="block text-[10px] font-semibold tracking-[0.18em] text-white/38">
              画像を読み込めませんでした
            </span>
            <span className="mt-3 block text-[11px] font-semibold tracking-[0.12em] text-white/56">
              {project.title}
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}

/** Shared poster artwork so published and unpublished projects keep identical framing and hover behavior. */
function WorkPosterVisual({
  project,
  containFit,
  variant,
  priority,
  showFeaturedBadge,
  isMediChart,
}: {
  project: Project
  containFit: boolean
  variant: Project['variant']
  priority: boolean
  showFeaturedBadge: boolean
  isMediChart: boolean
}) {
  return (
    <div className="editorial-poster-shell relative overflow-hidden">
      {(showFeaturedBadge || isMediChart) && !project.wide ? (
        <div className="pointer-events-none absolute left-4 top-4 z-10 border border-white/18 bg-black/70 px-3 py-2 text-[9px] font-bold leading-none tracking-[0.2em] text-white/58 backdrop-blur-md">
          注目
        </div>
      ) : null}

      {isMediChart ? (
        <div className="medichart-updated-badge pointer-events-none absolute right-4 top-4 z-10 px-3 py-2 text-[9px] font-bold leading-none tracking-[0.2em] backdrop-blur-md">
          更新
        </div>
      ) : null}

      <ProjectImage
        project={project}
        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
        className={[
          'editorial-poster-image',
          containFit ? 'poster-image-contain' : '',
          variant === 'special' ? 'bakery-poster-image' : '',
          variant === 'kissa' ? 'kissa-poster-image' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        preload={priority}
      />
    </div>
  )
}

/**
 * Scroll reveal is the right default for a grid that is on the page from the
 * start, but wrong for one the user just asked to see: content mounted below
 * the fold would stay at `opacity: 0` until it is scrolled to, and a filter
 * change that remounts the grid would blank out cards that were already read.
 * `revealOnMount` swaps the viewport trigger for a plain mount animation.
 *
 * The reveal has to travel through the `rest` variant rather than an `animate`
 * object, because `animate="rest"` is also what propagates the rest/hover
 * labels down to the arrow and image children.
 */
const MOUNT_REVEAL_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  rest: { opacity: 1, y: 0 },
  hover: { opacity: 1, y: 0 },
} as const

export default function WorkPoster({
  project,
  index,
  priority = false,
  showFeaturedBadge = false,
  revealOnMount = false,
  onOpenDetail,
}: {
  project: Project
  /** Position within the currently rendered grid, used for stagger only. */
  index: number
  /** Eager-load the first cards so the grid has no blank posters on entry. */
  priority?: boolean
  showFeaturedBadge?: boolean
  /** Animate in as soon as the card mounts instead of waiting for a scroll. */
  revealOnMount?: boolean
  onOpenDetail: () => void
}) {
  const variant = project.variant
  const typePrefix = variant ? VARIANT_TYPE_CLASS[variant] : undefined
  /* Carries the "更新" badge; the card treatment is otherwise identical. */
  const isMediChart = project.id === 'medichart-lite'
  const containFit = isContainFit(project)
  /*
   * Published work hands off to its deployment or repository in a new tab.
   * Work with neither stays visibly unpublished instead of inventing a target.
   * The detail read stays inside the page — in the shared dialog, or on the
   * project's own page when it has one (`detailPath`), which then becomes the
   * primary action: no deployment exists to promise, and the page is the
   * fullest honest answer to "what is this".
   */
  const detailPath = project.detailPath
  const primaryUrl = hasLiveDemo(project.status) ? project.liveUrl : project.githubUrl
  const primaryLabel = detailPath
    ? '詳細を見る'
    : primaryUrl
      ? (project.ctaLabel ?? STATUS_CTA[project.status])
      : '未公開'
  const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const
  const revealProps = revealOnMount
    ? { variants: MOUNT_REVEAL_VARIANTS, initial: 'hidden' }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.16 },
      }

  return (
    <motion.article
      className={[
        'work-card editorial-work-card group relative overflow-hidden bg-[#030303]',
        isMediChart ? 'medichart-work-card' : '',
        containFit ? 'contain-poster-card' : '',
        project.wide ? 'featured-work-card' : '',
        variant ? VARIANT_CLASS[variant] : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--work-accent': project.accent, '--work-tint': project.tint } as CSSProperties}
      {...revealProps}
      transition={{ duration: 1.05, delay: Math.min(index, 6) * 0.07, ease }}
      whileHover="hover"
      animate="rest"
    >
      <div className="work-card-body">
        {detailPath ? (
          <MotionLink
            href={detailPath}
            className="editorial-poster-link block"
            variants={{ rest: { y: 0 }, hover: { y: -10 } }}
            transition={{ duration: 1.15, ease }}
          >
            <WorkPosterVisual
              project={project}
              containFit={containFit}
              variant={variant}
              priority={priority}
              showFeaturedBadge={showFeaturedBadge}
              isMediChart={isMediChart}
            />
            <span className="sr-only">{project.title} の詳細ページを開く</span>
          </MotionLink>
        ) : primaryUrl ? (
          <motion.a
            href={primaryUrl}
            {...externalLinkProps}
            className="editorial-poster-link block"
            variants={{ rest: { y: 0 }, hover: { y: -10 } }}
            transition={{ duration: 1.15, ease }}
          >
            <WorkPosterVisual
              project={project}
              containFit={containFit}
              variant={variant}
              priority={priority}
              showFeaturedBadge={showFeaturedBadge}
              isMediChart={isMediChart}
            />
            <span className="sr-only">{project.title} を新しいタブで開く</span>
          </motion.a>
        ) : (
          <motion.div
            className="editorial-poster-link block"
            variants={{ rest: { y: 0 }, hover: { y: -10 } }}
            transition={{ duration: 1.15, ease }}
          >
            <WorkPosterVisual
              project={project}
              containFit={containFit}
              variant={variant}
              priority={priority}
              showFeaturedBadge={showFeaturedBadge}
              isMediChart={isMediChart}
            />
          </motion.div>
        )}

        {/*
          Plain Japanese first, and only what a non-technical visitor needs to
          decide whether to look closer: what the thing is, what it does, and
          whether it is live. The stack, the tags and the design notes are one
          click away in the dialog rather than crowding the card.
        */}
        <div className="editorial-work-meta flex gap-5 px-1 pt-5 sm:pt-6">
          <div className="min-w-0">
            <p
              className={[
                'text-[11px] font-semibold tracking-[0.16em] text-[color:var(--work-accent)]',
                typePrefix ? `${typePrefix}-subtitle` : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {project.subtitle}
            </p>

            <h3
              className={[
                'mt-2 font-semibold tracking-[-0.02em] text-white',
                variant === 'special' ? 'bakery-card-title' : 'text-xl tracking-[-0.01em] sm:text-2xl',
                typePrefix ? `${typePrefix}-title` : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {project.title}
            </h3>

            <p className="mt-2.5 max-w-[30rem] text-[15px] leading-7 text-white/72">{project.plainSummary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="border border-[color:var(--work-accent)]/45 bg-[color:var(--work-accent)]/[0.08] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[color:var(--work-accent)]">
                {CATEGORY_LABEL[project.group]}
              </span>
              <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-white/56">
                {STATUS_LABEL[project.status]}
              </span>
            </div>
          </div>
        </div>

        <div className="work-card-actions flex flex-wrap items-center gap-2.5 px-1 pb-1 pt-5">
          {detailPath ? (
            <MotionLink
              href={detailPath}
              className="editorial-work-button inline-flex h-11 items-center justify-center gap-2 border border-white/18 px-4 text-white/72"
              variants={{
                rest: { borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.72)' },
                hover: { borderColor: project.accent, color: project.accent },
              }}
              transition={{ duration: 0.9, ease }}
            >
              <span className="text-[10px] font-semibold tracking-[0.1em] sm:text-[11px]">
                {primaryLabel}
              </span>
              <span className="sr-only">（{project.title} の詳細ページへ移動します）</span>
              <InternalArrowIcon />
            </MotionLink>
          ) : primaryUrl ? (
            <motion.a
              href={primaryUrl}
              {...externalLinkProps}
              className="editorial-work-button inline-flex h-11 items-center justify-center gap-2 border border-white/18 px-4 text-white/72"
              variants={{
                rest: { borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.72)' },
                hover: { borderColor: project.accent, color: project.accent },
              }}
              transition={{ duration: 0.9, ease }}
            >
              <span className="text-[10px] font-semibold tracking-[0.1em] sm:text-[11px]">
                {primaryLabel}
              </span>
              <span className="sr-only">（{project.title} のページを新しいタブで開きます）</span>
              <ArrowIcon />
            </motion.a>
          ) : (
            <span
              aria-disabled="true"
              className="editorial-work-button inline-flex h-11 cursor-not-allowed items-center justify-center border border-white/10 px-4 text-white/38"
            >
              <span className="text-[10px] font-semibold tracking-[0.1em] sm:text-[11px]">
                {primaryLabel}
              </span>
            </span>
          )}

          {project.showGithubOnCard && project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center border border-white/10 px-4 text-[10px] font-semibold tracking-[0.1em] text-white/58 transition-colors duration-500 hover:border-white/28 hover:text-white/85 sm:text-[11px]"
            >
              GitHubで見る
              <span className="sr-only">（{project.title} のソースを新しいタブで開きます）</span>
            </a>
          ) : null}

          {/* 「詳しく見る」 opens the dialog in place: it never navigates, so
              the visitor never loses the grid. A card that already offers
              「詳細を見る」 leaves it out — the detail page carries the same
              content at full length, and two controls reading almost the same
              in Japanese would only make the visitor choose between them. */}
          {detailPath ? null : (
            <button
              type="button"
              onClick={onOpenDetail}
              className="inline-flex h-11 items-center justify-center gap-2 border border-white/10 px-4 text-[10px] font-semibold tracking-[0.1em] text-white/58 transition-colors duration-500 hover:border-white/28 hover:text-white/85 sm:text-[11px]"
            >
              詳しく見る
              <span className="sr-only">（{project.title} の詳細を開きます）</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

/**
 * Ordered screen flow, shown in the dialog under the hero image when a project
 * has one. It is an addition to the dialog's shared layout, never a replacement
 * for part of it: every dialog opens with the same header and the same hero
 * frame, so no project's detail view is shaped differently from the rest.
 *
 * Each frame takes its aspect ratio from the file's own pixel size, so nothing
 * is stretched and nothing is cropped — `object-contain` inside a box of the
 * image's exact ratio is a no-op, and stays one if a different device with
 * different proportions is added later.
 */
function ScreenFlow({ project, gallery }: { project: Project; gallery: NonNullable<Project['gallery']> }) {
  return (
    <section className="border-b border-white/[0.07] px-6 py-7 sm:px-9 sm:py-8">
      <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">画面の流れ</h4>
      {project.galleryNote ? (
        <p className="mt-2.5 text-[12px] leading-6 text-white/48">{project.galleryNote}</p>
      ) : null}
      <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {gallery.map((shot, index) => (
          <li key={shot.src}>
            <div
              className="relative w-full overflow-hidden rounded-[16px] border border-white/10 bg-black"
              style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 640px) 220px, 44vw"
                className="object-contain"
              />
            </div>
            <p className="mt-2.5 flex gap-2 text-[11.5px] leading-5 text-white/52">
              <span
                aria-hidden="true"
                className="font-mono text-[10px] leading-5"
                style={{ color: project.accent, opacity: 0.75 }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              {shot.caption}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Body of the work detail dialog. Kept here so card and dialog share one source. */
export function WorkDetail({ project }: { project: Project }) {
  const tags = project.tags ?? []

  return (
    <div>
      <div className="border-b border-white/[0.07] px-6 pb-6 pt-14 sm:px-9 sm:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em]"
            style={{
              borderColor: `${project.accent}66`,
              background: `${project.accent}14`,
              color: project.accent,
            }}
          >
            {CATEGORY_LABEL[project.group]}
          </span>
          <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-white/58">
            {PROJECT_TYPE_LABEL[project.projectType]}
          </span>
          <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-white/58">
            {STATUS_LABEL[project.status]}
          </span>
        </div>
        <h3 className="mt-4 text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.1rem]">
          {project.title}
        </h3>
        <p className="mt-2 text-[11px] font-semibold tracking-[0.12em]" style={{ color: project.accent, opacity: 0.8 }}>
          {project.category}（{project.year}年）
        </p>
        <p className="mt-4 text-[15px] leading-7 text-white/72">{project.plainSummary}</p>
        {tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-white/56"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.07] bg-[#050505]">
        <ProjectImage
          project={project}
          sizes="(min-width: 768px) 640px, 92vw"
          className={isContainFit(project) ? 'object-contain' : 'object-cover'}
        />
      </div>

      {project.gallery ? <ScreenFlow project={project} gallery={project.gallery} /> : null}

      <div className="space-y-5 p-6 sm:p-9">
        <section>
          <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">概要</h4>
          <p className="mt-3 text-[13px] leading-7 text-white/52">{project.summary}</p>
        </section>
        {project.overview ? (
          <section className="border-t border-white/[0.06] pt-5">
            <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">このプロジェクトについて</h4>
            <p className="mt-3 text-[13px] leading-7 text-white/52">{project.overview}</p>
          </section>
        ) : null}
        <section className="border-t border-white/[0.06] pt-5">
          <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">こまっていたこと</h4>
          <p className="mt-3 text-[13px] leading-7 text-white/52">{project.problem}</p>
        </section>
        <section className="border-t border-white/[0.06] pt-5">
          <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">つくったもの</h4>
          <p className="mt-3 text-[13px] leading-7 text-white/52">{project.solution}</p>
        </section>
        <section className="border-t border-white/[0.06] pt-5">
          <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">できること</h4>
          <ul className="mt-3 space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-[13px] leading-6 text-white/52">
                <span aria-hidden="true" className="mt-[9px] h-[3px] w-[3px] flex-shrink-0" style={{ background: project.accent, opacity: 0.7 }} />
                {feature}
              </li>
            ))}
          </ul>
        </section>
        {project.detailSections?.map((section) => (
          <section key={section.title} className="border-t border-white/[0.06] pt-5">
            <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">
              {section.title}
            </h4>
            {section.body ? <p className="mt-3 text-[13px] leading-7 text-white/52">{section.body}</p> : null}
            {section.items ? (
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[13px] leading-6 text-white/52">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-[3px] w-[3px] flex-shrink-0"
                      style={{ background: project.accent, opacity: 0.7 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        {/* Conditional, like Safety and Role below it: what a project actually
            verified, for the projects that have verified something. */}
        {project.outcome ? (
          <section className="border-t border-white/[0.06] pt-5">
            <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">確認できたこと</h4>
            <ul className="mt-3 space-y-2">
              {project.outcome.map((item) => (
                <li key={item} className="flex gap-3 text-[13px] leading-6 text-white/52">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-[3px] w-[3px] flex-shrink-0"
                    style={{ background: project.accent, opacity: 0.7 }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {project.safety ? (
          <section className="border-t border-white/[0.06] pt-5">
            <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">安全のための決めごと</h4>
            <p className="mt-3 text-[13px] leading-7 text-white/52">{project.safety}</p>
          </section>
        ) : null}
        {project.role ? (
          <section className="border-t border-white/[0.06] pt-5">
            <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">担当した範囲</h4>
            <p className="mt-3 text-[13px] leading-7 text-white/58">{project.role.join('・')}</p>
          </section>
        ) : null}
        <section className="border-t border-white/[0.06] pt-5">
          <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">使った技術</h4>
          <p className="mt-3 text-[13px] leading-7 text-white/58">{project.stack.join(' · ')}</p>
          <p className="mt-2 text-[12px] leading-6 text-white/45">{project.colorLabel}</p>
        </section>
        <section className="border-t border-white/[0.06] pt-5">
          <h4 className="text-[13px] font-semibold tracking-[0.12em] text-white/78">公開状況</h4>
          <p className="mt-3 text-[13px] leading-7 text-white/52">
            {STATUS_LABEL[project.status]} ／ {PROJECT_TYPE_LABEL[project.projectType]}。実際の企業から依頼を受けて作ったものではありません。
          </p>
          {project.statusNote ? (
            <p className="mt-3 border-l border-white/12 pl-4 text-[12.5px] leading-6 text-white/56">
              {project.statusNote}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2.5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/16 px-5 py-3 text-[11px] font-semibold tracking-[0.1em] text-white/78 transition-colors duration-500 hover:border-white/35 hover:text-white"
              >
                実際に見る
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/16 px-5 py-3 text-[11px] font-semibold tracking-[0.1em] text-white/78 transition-colors duration-500 hover:border-white/35 hover:text-white"
              >
                GitHubで中身を見る
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}
