'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Honours the OS "reduce motion" setting for every framer-motion animation on
 * the site.
 *
 * CSS `@media (prefers-reduced-motion)` cannot reach these: framer-motion
 * animates inline styles from JavaScript, so the only way to opt out is through
 * its own config. `reducedMotion="user"` keeps opacity transitions (content
 * still reveals itself, nothing stays invisible) while dropping transform and
 * layout movement.
 *
 * `children` are still server-rendered — passing them through a client
 * component does not move the tree to the client.
 */
export default function MotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
