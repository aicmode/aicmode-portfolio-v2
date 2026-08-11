'use client'

import Link from 'next/link'
import AnimateIn from './AnimateIn'

export default function HomeAbout() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#0c0c0c] px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-6 border-b border-white/[0.08] pb-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">自己紹介</p>
              <h2 className="text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-[1.2] tracking-[-0.025em] text-white">
                AICMODE
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-white/58 md:justify-self-end">
              現場の困りごとを整理し、使い続けられる仕組みにします。
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className="mt-8 grid gap-6 border border-white/[0.08] bg-[#090909] p-5 sm:grid-cols-[9rem_1fr] sm:p-7 md:grid-cols-[11rem_1fr_auto] md:items-center">
            <div
              aria-hidden="true"
              className="min-h-32 border border-dashed border-white/10 bg-gradient-to-br from-white/[0.025] to-transparent sm:min-h-40"
            />
            <div className="space-y-3">
              <p className="text-[15px] leading-8 text-white/72">
                看護師として約9年間勤務した経験を活かし、仕事の困りごとを整理して、AIやWebアプリで解決します。
              </p>
              <p className="text-[14px] leading-7 text-white/52">
                ご相談から制作、公開まで一人で担当します。
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex min-h-12 w-full items-center justify-center border border-white/14 px-5 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/68 transition hover:border-[rgba(212,175,55,0.45)] hover:text-white md:w-auto"
            >
              自己紹介を詳しく見る
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
