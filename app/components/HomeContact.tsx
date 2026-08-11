'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'

const LINE_URL = 'https://line.me/R/ti/p/@862povmk'
const GITHUB_URL = 'https://github.com/aicmode'

export default function HomeContact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-[#080808] px-5 py-20 md:px-12 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(109,40,217,0.08), transparent 68%)' }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <AnimateIn>
          <p className="mb-5 text-[12px] tracking-[0.24em] text-zinc-400">お問い合わせ</p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black leading-[1.22] tracking-[-0.025em] text-white">
            まずは困っていることを
            <br />
            教えてください。
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-8 text-white/62 md:text-[16px]">
            何を作るか決まっていなくても大丈夫です。
            <br className="hidden sm:block" />
            今の仕事で時間がかかっていることから一緒に整理します。
          </p>
        </AnimateIn>

        <AnimateIn delay={160}>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 border border-[#06C755]/45 bg-[#06C755] px-7 text-[14px] font-bold tracking-[0.06em] text-[#04140a] sm:w-auto"
              whileHover={{ y: -2, boxShadow: '0 0 50px rgba(6,199,85,0.2)' }}
            >
              LINEで相談する
              <span className="sr-only">（新しいタブで開きます）</span>
            </motion.a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center border border-white/14 px-7 text-[13px] font-semibold tracking-[0.06em] text-white/62 transition hover:border-white/30 hover:text-white sm:w-auto"
            >
              GitHubで制作内容を見る
              <span className="sr-only">（新しいタブで開きます）</span>
            </a>
          </div>
          <Link href="/contact" className="mt-6 inline-block text-[12px] tracking-[0.06em] text-white/42 underline decoration-white/20 underline-offset-4 transition hover:text-white/75">
            お問い合わせについて詳しく見る
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}
