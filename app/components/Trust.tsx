'use client'

import AnimateIn from './AnimateIn'

const trustPoints = [
  {
    title: '目的から確認します',
    description: '機能の話より先に、何のために、誰が使うのかを確かめます。',
  },
  {
    title: '小さく始めます',
    description: 'はじめから大きく作らず、いちばん困っているところから作ります。',
  },
  {
    title: 'できないことも言います',
    description: 'AIが得意でないこと、費用がかかること、向いていないことも先にお伝えします。',
  },
  {
    title: '公開前に必ず確認します',
    description: '主な操作、スマホでの見え方、表示の崩れがないかを確認してから公開します。',
  },
  {
    title: '情報の扱いに気をつけます',
    description: '大事な情報が外に出ない作りにし、個人情報の扱いは事前に相談して決めます。',
  },
] as const

export default function Trust() {
  return (
    <section id="trust" className="border-t border-white/[0.06] bg-[#0a0a0a] px-5 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">大切にしていること</p>
              <h2 className="text-[clamp(1.9rem,4.6vw,3.6rem)] font-black leading-[1.2] tracking-[-0.02em] text-white">
                使い続けられる
                <br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
                  ものを作ります。
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-white/58 md:justify-self-end">
              作って終わりではなく、現場で無理なく使い続けられることを大切にしています。
              進め方や決めごとは、先にお伝えします。
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
          {trustPoints.map((point, index) => (
            <AnimateIn key={point.title} delay={100 + index * 70}>
              <article className="h-full border-t border-white/[0.09] py-6">
                <p className="text-[15px] font-semibold leading-7 tracking-[0.02em] text-white/85">
                  {point.title}
                </p>
                <p className="mt-3 text-[13.5px] leading-7 text-white/58">{point.description}</p>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
