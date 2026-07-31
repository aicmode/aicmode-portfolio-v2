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
}

/** True when the status means there is something live to open. */
export function hasLiveDemo(status: ProjectStatus) {
  return status === 'released' || status === 'training'
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
  group: Category
  projectType: ProjectType
  status: ProjectStatus
  stack: readonly string[]
  tags?: readonly string[]
  /** Design label kept from the original cards (palette / build notes). */
  colorLabel: string
  accent: string
  tint: string
  image: string
  imageAlt?: string
  imagePosition?: string
  liveUrl?: string
  githubUrl?: string
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
