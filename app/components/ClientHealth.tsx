'use client'
import { useEffect } from 'react'

/**
 * Confirms to the inline BootRecovery script that the bundle actually booted,
 * and clears any stale browser state that could keep serving an old build.
 *
 * This site registers no Service Worker and uses no Cache Storage, so anything
 * found here is left over from an earlier deployment on the same origin and can
 * only cause stale HTML/assets. Every step is feature-detected and wrapped, so
 * an unsupported or storage-blocked browser is a no-op rather than an error.
 */

declare global {
  interface Window {
    /** Set on mount so the inline BootRecovery script knows the bundle ran. */
    __aicBooted?: boolean
  }
}

const CLEANUP_KEY = 'aic:legacy-cleanup-v1'
const RECOVERY_KEY = 'aic:boot-recovery'

function safeGet(storage: 'localStorage' | 'sessionStorage', key: string) {
  try {
    return window[storage].getItem(key)
  } catch {
    return null
  }
}

function safeSet(storage: 'localStorage' | 'sessionStorage', key: string, value: string) {
  try {
    window[storage].setItem(key, value)
  } catch {
    /* Private mode or blocked storage — nothing to do. */
  }
}

function safeRemove(storage: 'localStorage' | 'sessionStorage', key: string) {
  try {
    window[storage].removeItem(key)
  } catch {
    /* Private mode or blocked storage — nothing to do. */
  }
}

async function removeLegacyServiceWorkers() {
  if (!('serviceWorker' in navigator)) return
  try {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map((r) => r.unregister().catch(() => false)))
  } catch {
    /* getRegistrations can reject in some privacy modes. */
  }
}

async function removeLegacyCaches() {
  if (!('caches' in window)) return
  try {
    const keys = await caches.keys()
    await Promise.all(keys.map((k) => caches.delete(k).catch(() => false)))
  } catch {
    /* Cache Storage is unavailable in some privacy modes. */
  }
}

export default function ClientHealth() {
  useEffect(() => {
    // The bundle ran: cancel BootRecovery's failure timer and drop the
    // one-shot reload guard so a genuine future failure can still recover.
    window.__aicBooted = true
    safeRemove('sessionStorage', RECOVERY_KEY)

    // If a fallback fired before the bundle finished loading, undo it so the
    // real animations take over.
    document.documentElement.classList.remove('aic-boot-failed', 'aic-boot-degraded')

    if (safeGet('localStorage', CLEANUP_KEY)) return

    void (async () => {
      await removeLegacyServiceWorkers()
      await removeLegacyCaches()
      // Mark last, so a cleanup interrupted by a closed tab retries next visit.
      safeSet('localStorage', CLEANUP_KEY, '1')
    })()
  }, [])

  return null
}
