'use client'

import Link from 'next/link'
import AnimateIn from './AnimateIn'

const steps = [
  { step: '01', title: '相談', desc: '困っていることや、今の仕事の流れをお聞きします。' },
  { step: '02', title: '内容・費用を確認', desc: '作る範囲、期間、費用を確認してから始めます。' },
  { step: '03', title: '制作', desc: '途中の状態も共有しながら、使える形に仕上げます。' },
  { step: '04', title: '確認・公開', desc: '動きと見え方を一緒に確認し、問題がなければ公開します。' },
] as const

export default function HomeProcess() {
  return (
    <section id="process" className="scroll-mt-20 bg-[#0c0c0c] px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">ご相談の流れ</p>
          <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-black leading-[1.2] tracking-[-0.025em] text-white">
            ご相談から公開まで
          </h2>
        </AnimateIn>

        <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <AnimateIn key={item.step} delay={100 + index * 70}>
              <article className="h-full border-t border-white/10 bg-gradient-to-b from-white/[0.018] to-transparent p-6">
                <p className="font-mono text-[10px] tracking-[0.3em] text-[rgba(212,175,55,0.78)]">{item.step}</p>
                <h3 className="mt-4 text-[17px] font-semibold leading-7 text-white/90">{item.title}</h3>
                <p className="mt-3 text-[13.5px] leading-7 text-white/56">{item.desc}</p>
              </article>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={360}>
          <aside
            id="about"
            aria-labelledby="home-profile-title"
            className="mt-10 scroll-mt-24 border border-white/[0.08] bg-[#090909] p-5 sm:p-7"
          >
            <div className="grid gap-6 sm:grid-cols-[9rem_1fr] sm:items-stretch md:grid-cols-[11rem_1fr_auto] md:items-center">
              <div
                aria-hidden="true"
                className="min-h-28 border border-dashed border-white/10 bg-gradient-to-br from-white/[0.025] to-transparent sm:min-h-36"
              />
              <div>
                <p className="text-[11px] tracking-[0.18em] text-zinc-400">自己紹介</p>
                <h2 id="home-profile-title" className="mt-3 text-xl font-semibold text-white">AIC</h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-7 text-white/58">
                  看護師として約9年。鹿児島を拠点に、AIや業務効率化の制作をしています。オンラインで対応できます。
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex min-h-12 w-full items-center justify-center border border-white/14 px-5 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/68 transition hover:border-white/30 hover:text-white md:w-auto"
              >
                詳しい自己紹介を見る
              </Link>
            </div>
          </aside>
        </AnimateIn>
      </div>
    </section>
  )
}
