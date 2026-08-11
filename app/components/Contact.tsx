'use client'
import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  )
}

/**
 * One reachable contact route. Rendered by `ContactCard`, which is the single
 * place the card treatment is defined — a new channel is added to
 * `contactChannels` below and inherits the exact same size, spacing and hover
 * motion as every other card.
 */
type ContactChannel = {
  href: string
  icon: ReactNode
  /** Small eyebrow: the platform. */
  label: string
  /** The line a visitor actually reads first. */
  title: string
  desc: string
  /** Brand colour, used for the icon and border on hover only. */
  accent: string
  glow: string
  border: string
  /** Full sentence for screen readers — the card opens a new tab. */
  ariaLabel: string
}

/**
 * The sales LINE official account (@862povmk). Placed first because it is the
 * lowest-friction route: no GitHub account, and nothing written into a public
 * issue thread.
 */
const lineOfficial: ContactChannel = {
  href: 'https://line.me/R/ti/p/@862povmk',
  icon: <LineIcon />,
  label: 'LINE',
  title: 'LINEでお問い合わせ',
  desc: 'ご相談、お見積もり、「こんなことできますか？」の確認まで、お気軽にどうぞ。',
  accent: '#06C755',
  glow: 'rgba(6,199,85,0.14)',
  border: 'rgba(6,199,85,0.42)',
  ariaLabel: 'LINE公式アカウントの友だち追加を新しいタブで開く',
}

const github: ContactChannel = {
  href: 'https://github.com/aicmode',
  icon: <GitHubIcon />,
  label: 'GitHub',
  title: 'GitHubで中身を見る',
  desc: 'これまでに作ったものの中身を公開しています。',
  accent: '#ffffff',
  glow: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.12)',
  ariaLabel: 'GitHubプロフィールを新しいタブで開く',
}

/** Display order. LINE first — see the note on `lineOfficial`. */
const contactChannels: ContactChannel[] = [lineOfficial, github]

const disciplines = ['作業の自動化', 'AIを使ったツール', '仕事用のWebアプリ', '医療・介護の業務改善']

const GITHUB_ISSUE_URL =
  'https://github.com/aicmode/portfolio/issues/new?title=%E3%80%90%E3%81%94%E7%9B%B8%E8%AB%87%E3%80%91'

/**
 * What to include in a first message. Removes the "I don't know what to write"
 * barrier, which is the most common reason an enquiry never gets sent.
 * Everything is optional on purpose — the note under the list says so.
 */
const inquiryChecklist = [
  { label: '現在困っていること', hint: '手作業になっている業務、対応が追いつかない場面など' },
  { label: '利用する人', hint: '社内スタッフ / 顧客 / 自分だけ、想定人数' },
  { label: 'やりたいこと', hint: '決まっていなければ「こうなったら助かる」だけで構いません' },
  { label: '希望時期', hint: '公開したい時期、動かしたいタイミング' },
  { label: '予算の目安', hint: '範囲でも構いません。範囲に合わせて構成を調整します' },
  { label: '参考にしたいもの', hint: '似ていると感じたサイトやアプリがあればURLを' },
]

const inquiries = [
  {
    title: 'AIに任せたい',
    text: '問い合わせ対応や文章作成が追いつかない仕事を、AIに任せられる形にします。',
  },
  {
    title: '手作業をなくしたい',
    text: '毎日の集計・お知らせ・共有を、自動で回る仕組みに変えます。',
  },
  {
    title: '同じ入力を何度もしている',
    text: 'サービス同士をつないで、二度入力する手間をなくします。',
  },
  {
    title: '今のソフトが合わない',
    text: '仕事のやり方に合わない部分を、専用のアプリで埋めます。',
  },
  {
    title: 'サイトから問い合わせが来ない',
    text: '来ない原因を整理したうえで、伝わるサイトに作り直します。',
  },
  {
    title: '見せ方から相談したい',
    text: '何を、誰に、どう見せるか。方向性から一緒に決めます。',
  },
]

function ContactCard({
  href,
  icon,
  label,
  title,
  desc,
  accent,
  glow,
  border,
  ariaLabel,
}: ContactChannel) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="group flex w-full flex-col items-center gap-4 px-6 py-9 text-center"
      style={{
        border: `1px solid rgba(255,255,255,0.07)`,
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        textDecoration: 'none',
        // Read back by the icon and title on hover, so the brand colour lives
        // in the data rather than in a class name per channel.
        '--contact-accent': accent,
      } as CSSProperties}
      whileHover={{
        borderColor: border,
        y: -6,
        boxShadow: `0 0 40px ${glow}, 0 12px 40px rgba(0,0,0,0.5)`,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      initial={{ borderColor: 'rgba(255,255,255,0.07)', boxShadow: 'none', y: 0 }}
    >
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8a8a8a', transition: 'color 0.3s ease, border-color 0.3s ease' }}
      >
        <span
          className="group-hover:text-[var(--contact-accent)]"
          style={{ color: 'inherit', transition: 'color 0.3s ease' }}
        >
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="mb-1.5 text-[11px] tracking-[0.24em]" style={{ color: '#7a7a7a' }}>
          {label}
        </p>
        <p className="mb-1.5 text-[15px] font-semibold tracking-wide text-white">
          {title}
        </p>
        <p className="text-[12.5px] leading-6 tracking-wide" style={{ color: '#7a7a7a' }}>
          {desc}
        </p>
      </div>
      <svg
        className="h-3.5 w-3.5 flex-shrink-0 opacity-20 transition-all duration-[350ms] group-hover:-translate-y-0.5 group-hover:opacity-60"
        style={{ color: '#888' }}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
      </svg>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-44 px-5 md:px-12 relative overflow-hidden"
      style={{ background: '#0c0c0c' }}
    >
      {/* Ambient glow bg */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(109,40,217,0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Available badge ── */}
        <AnimateIn delay={0}>
          <div className="mb-10 md:mb-14 flex items-center gap-3">
            <span
              className="flex items-center gap-2 text-[12px] tracking-[0.06em] px-3.5 py-1.5"
              style={{
                border: '1px solid rgba(109,217,109,0.25)',
                color: '#6bcb6b',
                background: 'rgba(109,217,109,0.04)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-available flex-shrink-0"
                style={{ background: '#6bcb6b', boxShadow: '0 0 8px rgba(107,203,107,0.6)' }}
              />
              お仕事のご相談を受け付けています
            </span>
          </div>
        </AnimateIn>

        {/* ── Headline ── */}
        <AnimateIn delay={80}>
          <div className="mb-6 md:mb-8">
            <p className="text-[12px] tracking-[0.24em] text-zinc-400 mb-5">お問い合わせ</p>
            <h2
              className="font-black text-white leading-[1.25]"
              style={{ fontSize: 'clamp(2rem, 5.2vw, 4rem)', letterSpacing: '-0.025em' }}
            >
              相談から、使える<br />
              <span style={{
                background: 'linear-gradient(120deg, #ffffff 0%, rgba(200,180,255,0.85) 60%, rgba(100,160,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                仕組みへ。
              </span>
            </h2>

            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2.5">
              {disciplines.map((discipline) => (
                <li
                  key={discipline}
                  className="border border-white/12 px-3 py-1.5 text-[12px] tracking-[0.04em] text-white/70"
                >
                  {discipline}
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>

        {/* ── Copy ── */}
        <AnimateIn delay={160}>
          <div className="mb-10 max-w-3xl md:mb-16">
            <p className="mb-5 text-[15px] leading-8 text-white/58 md:text-[17px]">
              何を作るか決まっていなくても大丈夫です。今困っていること、手作業になっている仕事、
              「こうなったら助かる」というイメージをお聞かせください。
            </p>
            <p className="text-[14px] leading-8" style={{ color: '#8a8a8a' }}>
              内容を整理して、いちばん合う方法をご提案します。
            </p>
          </div>
        </AnimateIn>

        {/* ── Project inquiry ── */}
        <AnimateIn delay={240}>
          <div className="mb-12 md:mb-16">
            <div className="mb-6 flex items-center justify-between gap-6">
              <p className="text-[13px] font-semibold tracking-[0.16em] text-white/70">こんなご相談が多いです</p>
              <div className="h-px flex-1 bg-gradient-to-l from-white/[0.07] to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
              {inquiries.map((item) => (
                <motion.div
                  key={item.title}
                  className="border border-white/[0.08] bg-white/[0.018] px-5 py-6 backdrop-blur-xl"
                  whileHover={{
                    y: -5,
                    borderColor: 'rgba(212,175,55,0.22)',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.42), 0 0 44px rgba(212,175,55,0.055)',
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <p className="mb-3 text-[15px] font-semibold leading-7 tracking-[0.02em] text-white/85">
                    {item.title}
                  </p>
                  <p className="text-[14px] leading-7 text-white/58">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* ── What to send ── */}
        <AnimateIn delay={280}>
          <div className="mb-12 md:mb-16">
            <div className="mb-6 flex items-center justify-between gap-6">
              <p className="text-[13px] font-semibold tracking-[0.16em] text-white/70">お伝えいただきたいこと</p>
              <div className="h-px flex-1 bg-gradient-to-l from-white/[0.07] to-transparent" />
            </div>
            <p className="mb-7 max-w-3xl text-[15px] leading-8 text-white/58">
              最初のご連絡では、分かる範囲だけで大丈夫です。足りない部分は、こちらから順番にお尋ねします。
            </p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
              {inquiryChecklist.map((item, index) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-1.5 py-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[9px] tracking-[0.2em]"
                      style={{ color: 'rgba(212,175,55,0.8)' }}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] font-semibold tracking-[0.04em] text-white/80">
                      {item.label}
                    </span>
                  </span>
                  <span className="pl-[1.7rem] text-[13px] leading-6 text-white/56">{item.hint}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.a
                href={GITHUB_ISSUE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#080808]"
                style={{
                  borderColor: 'rgba(212,175,55,0.5)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(212,175,55,0.82))',
                  boxShadow: '0 0 44px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 0 72px rgba(212,175,55,0.22), 0 0 110px rgba(109,40,217,0.10)',
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                GitHubで相談内容を送る
                <span className="sr-only">（GitHubを新しいタブで開きます）</span>
              </motion.a>
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/14 px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white"
              >
                GitHubプロフィールを見る
                <span className="sr-only">（GitHubを新しいタブで開きます）</span>
              </a>
            </div>

            {/*
              GitHub and the LINE official account are the only two contact
              routes that exist. No email address or social handle is invented
              here — and because a GitHub Issue is public, that has to be said
              out loud before someone pastes business details into one.
            */}
            <div className="mt-6 max-w-3xl border-l border-[rgba(212,175,55,0.32)] pl-4 text-[12.5px] leading-6 text-white/58">
              <p className="font-semibold text-white/76">GitHubをお持ちでない方へ</p>
              <p className="mt-2">
                下のLINE公式アカウントからそのままご相談いただけます。やり取りは非公開のため、
                詳しい内容もこちらでお伺いします。
              </p>
              <p className="mt-2">
                GitHubに書いた内容は誰でも見られる状態になります。会社名、患者さんの情報、
                個人情報、社内資料などは書かないようご注意ください。
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* ── Divider ── */}
        <AnimateIn delay={360}>
          <div className="mb-8 md:mb-10 flex items-center gap-6">
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
            <span className="whitespace-nowrap text-[12px] tracking-[0.16em] text-zinc-400">連絡先</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(255,255,255,0.06), transparent)' }} />
          </div>
        </AnimateIn>

        {/* ── Contact cards ── */}
        <AnimateIn delay={420}>
          <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
            {contactChannels.map((channel) => (
              <ContactCard key={channel.label} {...channel} />
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
