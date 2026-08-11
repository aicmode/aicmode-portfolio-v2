'use client'

import Link from 'next/link'
import AnimateIn from './AnimateIn'
import { serviceEntrances } from '../data/services'

export default function HomeServices() {
  return (
    <section id="services" className="scroll-mt-20 bg-[#0a0a0a] px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-6 border-b border-white/[0.08] pb-8 md:grid-cols-[0.9fr_1.1fr] md:items-end md:pb-10">
            <div>
              <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">できること</p>
              <h2 className="text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-[1.2] tracking-[-0.025em] text-white">
                仕事の負担を、
                <br />
                仕組みで軽くします。
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-white/58 md:justify-self-end">
              何を作るか決まっていなくても大丈夫です。今、時間がかかっている仕事から整理します。
            </p>
          </div>
        </AnimateIn>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {serviceEntrances.map((service, index) => (
            <AnimateIn key={service.no} delay={100 + index * 80}>
              <article className="flex h-full flex-col border border-white/[0.08] bg-white/[0.018] p-6 md:p-7">
                <p className="font-mono text-[10px] tracking-[0.3em] text-[rgba(212,175,55,0.78)]">
                  {service.no}
                </p>
                <h3 className="mt-4 text-xl font-semibold leading-[1.45] text-white">{service.title}</h3>
                <p className="mt-4 text-[14px] leading-7 text-white/60">{service.body}</p>
              </article>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={320}>
          <div className="mt-8 flex justify-end">
            <Link
              href="/services"
              className="inline-flex min-h-12 w-full items-center justify-center border border-white/14 px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/68 transition hover:border-[rgba(212,175,55,0.45)] hover:text-white sm:w-auto"
            >
              できることを詳しく見る
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
