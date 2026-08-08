/**
 * Shared vocabulary for everything shown in Works, Selected Works and the
 * AI & Automation case studies.
 *
 * Status and project type are enums rather than free text on purpose: a
 * prospective client has to be able to tell, at a glance and without ambiguity,
 * whether something is a live deployment, source code, or a design study — and
 * whether it was a paid client engagement or self-directed work. Labels live in
 * one place (`STATUS_LABEL`, `STATUS_CTA`) so a card, a modal and the archive
 * can never disagree about the same project.
 */

/** Where the work currently lives, verified against the real URL. */
export type ProjectStatus =
  /** Publicly reachable and returning 200 at the time of writing. */
  | 'released'
  /** Designed and documented, no running deployment. */
  | 'case-study'
  /** Built while following a course curriculum, publicly reachable. */
  | 'training'
  /** Was deployed, currently not reachable. */
  | 'temporary-unavailable'
  /** Finished code that has not been deployed yet. */
  | 'deployment-required'
  /** Runs locally / needs its own API keys; only the source is public. */
  | 'source-only'
  /**
   * A working build that runs on real hardware but is not distributed: no store
   * listing, no hosted demo. Kept separate from `source-only` so a device app
   * that has actually been installed and used is not read as untested code, and
   * separate from `released` so it can never be mistaken for a shipped product.
   */
  | 'prototype'

/**
 * How the work came about. Deliberately has no "Client Project" member: every
 * item currently in this portfolio is self-directed or course work, and adding
 * that member would invite mislabelling.
 */
export type ProjectType =
  | 'Self-directed Project'
  | 'Personal Project'
  | 'Training Project'
  | 'Concept Project'
  | 'Architecture Study'

export type Category =
  | 'AI Systems'
  | 'Automation'
  | 'Web Applications'
  | 'Websites'
  | 'Landing Pages'
  | 'EC'

/**
 * The archive's "show everything" tab. It is deliberately not a `Category`
 * member — no project carries it — so it lives here as one constant that both
 * the tab list and the filter compare against, and can never drift into a
 * string that matches nothing.
 */
export const ALL_FILTER = 'All'

/** A tab in the Works Archive: every category, plus "All". */
export type Filter = typeof ALL_FILTER | Category

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  released: 'Released',
  'case-study': 'Case Study',
  training: 'Training Project',
  'temporary-unavailable': 'Demo Temporarily Unavailable',
  'deployment-required': 'Deployment Required',
  'source-only': 'Source Code Available',
  prototype: 'Prototype',
}

/**
 * Default label for the primary button. A project may override it, but the
 * default already keeps the promise honest: nothing that has no reachable
 * deployment can end up offering "Open Site".
 */
export const STATUS_CTA: Record<ProjectStatus, string> = {
  released: 'Open Site',
  'case-study': 'View Case Study',
  training: 'Open Site',
  'temporary-unavailable': 'View Source',
  'deployment-required': 'View Source',
  'source-only': 'View Source',
  prototype: 'View Source',
}

/** True when the status means there is something live to open. */
export function hasLiveDemo(status: ProjectStatus) {
  return status === 'released' || status === 'training'
}

/**
 * One capture in a project's screen-flow gallery.
 *
 * `width` / `height` are the file's real pixel size and are required, not
 * decorative: the frame derives its aspect ratio from them, so a capture from a
 * device with its own proportions (a watch, a phone) is never stretched or
 * cropped to fit a ratio the layout happens to prefer.
 */
export type GalleryImage = {
  src: string
  /** Alt text — describes what the screen shows, not that it is a screenshot. */
  alt: string
  /** Caption printed under the frame, in the site's language. */
  caption: string
  width: number
  height: number
}

/** An optional section appended to the shared work-detail dialog. */
export type ProjectDetailSection = {
  title: string
  body?: string
  items?: readonly string[]
}

/** A portfolio piece in Selected Works / Works Archive. */
export type Project = {
  id: string
  title: string
  /** Short uppercase kicker above the title. */
  subtitle: string
  /** Longer descriptor line, kept from the original cards. */
  category: string
  /** 2–3 lines: who it is for, what was built, how it is used. */
  summary: string
  /** One sentence: the situation the work addresses. */
  problem: string
  /** One sentence: what was built in response. */
  solution: string
  features: readonly string[]
  /** Optional safety boundary for demos in regulated or sensitive domains. */
  safety?: string
  /**
   * What was actually verified — never a projected or quantified business
   * result, which nothing here has earned the right to claim.
   */
  outcome?: readonly string[]
  /** Work personally completed for this project. */
  role?: readonly string[]
  group: Category
  projectType: ProjectType
  status: ProjectStatus
  /** Shown beside the status when the plain label leaves out something material. */
  statusNote?: string
  stack: readonly string[]
  tags?: readonly string[]
  /** Design label kept from the original cards (palette / build notes). */
  colorLabel: string
  accent: string
  tint: string
  image: string
  imageAlt?: string
  imagePosition?: string
  /**
   * How the poster image sits in the shared 16/10 frame. Cards are one size for
   * everything, so a capture that is not landscape gets `contain` and keeps its
   * own proportions inside that frame rather than being cropped to fill it.
   */
  imageFit?: 'cover' | 'contain'
  /** Ordered screen flow shown in the detail dialog instead of the single hero. */
  gallery?: readonly GalleryImage[]
  /** Intro line above the gallery, e.g. where the captures were taken. */
  galleryNote?: string
  /** Optional introduction shown before Problem in the shared detail dialog. */
  overview?: string
  /** Project-specific explanations rendered with the dialog's shared section UI. */
  detailSections?: readonly ProjectDetailSection[]
  liveUrl?: string
  githubUrl?: string
  /** Optional primary-card CTA copy when the default status label is too generic. */
  ctaLabel?: string
  /** Show a source link beside the primary CTA on the work card. */
  showGithubOnCard?: boolean
  /** Lower numbers appear first; also drives Selected Works. */
  order: number
  featured?: boolean
  year: number
  /** Card treatments defined in globals.css. */
  variant?: 'special' | 'kissa' | 'greenroot' | 'blackline' | 'velvet'
  wide?: boolean
}

/** An AI / automation build documented as a full case study. */
export type CaseStudy = {
  id: string
  title: string
  /** Uppercase kicker, e.g. "AI SYSTEM / HEALTHCARE". */
  subtitle: string
  group: Category
  projectType: ProjectType
  /** Work personally completed for this project; kept factual per repository documentation. */
  role: readonly string[]
  status: ProjectStatus
  /** Shown under the status when the deployment has a caveat worth stating. */
  statusNote?: string
  problem: string
  solution: string
  features: readonly string[]
  stack: readonly string[]
  accent: string
  detail: {
    goal: string
    proposedSolution: readonly string[]
    mvpScope: readonly string[]
    phase2: readonly string[]
    architecture: readonly string[]
    security: readonly string[]
    /** Intent, never a fabricated metric. */
    expectedImpact: readonly string[]
  }
  liveUrl?: string
  githubUrl?: string
  screenshot?: string
  screenshotAlt?: string
  order: number
  year: number
}
