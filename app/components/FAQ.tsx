'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import { faqs } from '../data/faqs'

function FaqItem({
  no,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  no: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      className="w-full overflow-hidden"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      initial={{ borderColor: 'rgba(255,255,255,0.07)' }}
      animate={{
        borderColor: isOpen
          ? 'rgba(212,175,55,0.22)'
          : 'rgba(255,255,255,0.07)',
        boxShadow: isOpen
          ? '0 0 44px rgba(212,175,55,0.05), 0 18px 60px rgba(0,0,0,0.35)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-5 sm:px-7 sm:py-6"
        style={{ background: 'transparent', cursor: 'pointer' }}
      >
        <span
          className="font-mono text-[11px] tracking-[0.1em] flex-shrink-0 w-7"
          style={{
            color: isOpen ? 'rgba(212,175,55,0.85)' : '#3a3a3a',
            transition: 'color 0.35s ease',
          }}
        >
          {no}
        </span>
        <span
          className="flex-1 text-sm font-medium tracking-wide sm:text-[15px]"
          style={{
            color: isOpen ? '#f0f0f0' : '#8a8a8a',
            transition: 'color 0.35s ease',
          }}
        >
          {question}
        </span>
        <motion.span
          className="flex-shrink-0"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4"
            style={{
              color: isOpen ? 'rgba(212,175,55,0.8)' : '#4a4a4a',
              transition: 'color 0.35s ease',
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 5v14M5 12h14"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-6 sm:px-7 sm:pb-7">
              <div
                className="mb-4 h-px w-full"
                style={{
                  background:
                    'linear-gradient(to right, rgba(255,255,255,0.07), transparent)',
                }}
              />
              <p
                className="pl-11 text-[13px] leading-7 sm:text-sm sm:leading-8"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative overflow-hidden px-5 py-20 md:px-12 md:py-40"
      style={{ background: '#0a0a0a' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '640px',
          height: '360px',
          background:
            'radial-gradient(ellipse at center, rgba(109,40,217,0.05) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Heading */}
        <AnimateIn>
          <div className="mb-12 md:mb-16">
            <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-zinc-600">
              FAQ
            </p>
            <h2
              className="font-black leading-none text-white"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              Before You Ask
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/45 md:text-[15px] md:leading-8">
              Web制作・AI開発・業務効率化について、よくある不安や疑問をまとめました。
              <br className="hidden sm:block" />
              まずは相談だけでも大丈夫です。
            </p>
          </div>
        </AnimateIn>

        {/* Accordion */}
        <div className="flex flex-col gap-3 md:gap-4">
          {faqs.map((faq, i) => (
            <AnimateIn key={faq.no} delay={80 + i * 70}>
              <FaqItem
                {...faq}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === i ? null : i))
                }
              />
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn delay={120}>
          <div className="mt-12 flex flex-col items-center gap-5 text-center md:mt-16">
            <p
              className="text-[11px] uppercase tracking-[0.4em]"
              style={{ color: '#585858' }}
            >
              Still have a question?
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center border px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#080808]"
              style={{
                borderColor: 'rgba(212,175,55,0.5)',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(212,175,55,0.82))',
                boxShadow:
                  '0 0 44px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
              whileHover={{
                y: -2,
                boxShadow:
                  '0 0 72px rgba(212,175,55,0.22), 0 0 110px rgba(109,40,217,0.10)',
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              CONTACT
            </motion.a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
