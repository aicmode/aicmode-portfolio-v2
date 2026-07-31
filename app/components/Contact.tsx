'use client'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

const github = {
  href: 'https://github.com/aicmode',
  icon: <GitHubIcon />,
  label: 'GitHub',
  handle: 'aicmode',
  desc: 'Code · Web Applications · AI Systems',
  glow: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.12)',
}

const disciplines = [
  'AI Systems',
  'Business Automation',
  'Web Applications',
  'API Integration',
  'Dashboard Development',
  'Creative Web Design',
]

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
  { label: '希望する機能', hint: '決まっていなければ「やりたいこと」だけでも構いません' },
  { label: '希望時期', hint: '公開したい時期、動かしたいタイミング' },
  { label: '予算の目安', hint: '範囲でも構いません。範囲に合わせて構成を調整します' },
  { label: '参考サービス', hint: '似ていると感じたサイト・ツールのURL' },
]

const inquiries = [
  {
    title: 'AI Systems',
    text: '対応や文章作成が追いつかない業務を、AIに任せられる形にします。',
  },
  {
    title: 'Business Automation',
    text: '毎日の手作業・集計・通知・共有を、自動で回る仕組みに変えます。',
  },
  {
    title: 'API Integration',
    text: 'ツール間の転記や二重入力をなくし、今の環境のままつなぎます。',
  },
  {
    title: 'Web Applications',
    text: '既存ツールでは業務に合わない部分を、専用アプリで埋めます。',
  },
  {
    title: 'Website / LP',
    text: '問い合わせが増えない、信頼されない。その原因から整理して作り直します。',
  },
  {
    title: 'Creative Direction',
    text: '何を、誰に、どう見せるか。伝わる方向性から一緒に決めます。',
  },
]

function SocialCard({
  href,
  icon,
  label,
  handle,
  desc,
  glow,
  border,
}: typeof github) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}プロフィールを新しいタブで開く`}
      className="group flex w-full flex-col items-center gap-4 px-6 py-9 text-center"
      style={{
        border: `1px solid rgba(255,255,255,0.07)`,
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        textDecoration: 'none',
      }}
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
        <span className="group-hover:text-white" style={{ color: 'inherit', transition: 'color 0.3s ease' }}>
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="mb-1.5 text-[9px] uppercase tracking-[0.4em]" style={{ color: '#7a7a7a' }}>
          {label}
        </p>
        <p className="mb-1.5 text-sm font-semibold tracking-wide text-white">
          {handle}
        </p>
        <p className="text-[10px] tracking-wide" style={{ color: '#7a7a7a' }}>
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
              className="flex items-center gap-2 text-[9px] tracking-[0.45em] uppercase px-3.5 py-1.5"
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
              Available for Freelance Projects
            </span>
          </div>
        </AnimateIn>

        {/* ── Headline ── */}
        <AnimateIn delay={80}>
          <div className="mb-6 md:mb-8">
            <p className="text-[10px] tracking-[0.55em] text-zinc-400 mb-5 uppercase">
              Contact
            </p>
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)', letterSpacing: '-0.025em' }}
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

            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {disciplines.map((discipline) => (
                <li
                  key={discipline}
                  className="text-[9px] uppercase tracking-[0.3em] text-white/56 md:text-[10px]"
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
            <p className="mb-5 text-sm leading-7 text-white/58 md:text-base md:leading-8">
              まだ仕様が決まっていなくても問題ありません。現在の課題、手作業になっている業務、作りたいサービスのイメージをお聞かせください。
              内容を整理し、Webサイト・AIシステム・業務自動化・API連携のどれが適しているかをご提案します。
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-2" style={{ color: '#8a8a8a' }}>
              Business First × Technology × Creative Direction
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: '#7a7a7a' }}>
              AI Development · Web Design · Business Automation
            </p>
          </div>
        </AnimateIn>

        {/* ── Project inquiry ── */}
        <AnimateIn delay={240}>
          <div className="mb-12 md:mb-16">
            <div className="mb-6 flex items-center justify-between gap-6">
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/58">
                Project Inquiry
              </p>
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
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/76">
                    {item.title}
                  </p>
                  <p className="text-sm leading-7 text-white/58">
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
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/58">What To Include</p>
              <div className="h-px flex-1 bg-gradient-to-l from-white/[0.07] to-transparent" />
            </div>
            <p className="mb-7 max-w-3xl text-sm leading-7 text-white/58">
              初回のご連絡では、以下のうち分かる範囲だけで構いません。すべて埋まっていなくても、こちらから必要な点を伺いながら整理します。
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
                    <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/78">
                      {item.label}
                    </span>
                  </span>
                  <span className="pl-[1.7rem] text-[12px] leading-6 text-white/56">{item.hint}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.a
                href={GITHUB_ISSUE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#080808]"
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
                className="inline-flex items-center justify-center border border-white/14 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white"
              >
                GitHubプロフィールを見る
                <span className="sr-only">（GitHubを新しいタブで開きます）</span>
              </a>
            </div>

            {/*
              GitHub is currently the only contact route that exists. No email
              address or social handle is invented here — and because a GitHub
              Issue is public, that has to be said out loud before someone pastes
              business details into one.
            */}
            <div className="mt-6 max-w-3xl border-l border-[rgba(212,175,55,0.32)] pl-4 text-[12.5px] leading-6 text-white/58">
              <p className="font-semibold text-white/76">GitHubをお持ちでない方へ</p>
              <p className="mt-2">
                現在、正式な問い合わせフォームを準備中です。商工会議所などで直接ご案内した方には、
                個別に非公開の連絡方法をお伝えします。
              </p>
              <p className="mt-2">
                GitHub Issueは公開されるため、社名、患者情報、個人情報、APIキー、社内資料などは記載しないでください。
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* ── Divider ── */}
        <AnimateIn delay={360}>
          <div className="mb-8 md:mb-10 flex items-center gap-6">
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
            <span className="text-[9px] tracking-[0.45em] text-zinc-400 uppercase whitespace-nowrap">Connect</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(255,255,255,0.06), transparent)' }} />
          </div>
        </AnimateIn>

        {/* ── Social card ── */}
        <AnimateIn delay={420}>
          <div className="mx-auto w-full max-w-lg">
            <SocialCard {...github} />
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
