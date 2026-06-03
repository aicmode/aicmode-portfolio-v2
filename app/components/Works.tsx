'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import AnimateIn from './AnimateIn'

const ease = [0.13, 0.86, 0.18, 1] as const

const projects = [
  {
    title: 'CORE 45',
    subtitle: 'Premium Fitness Studio',
    category: 'Premium Fitness Studio',
    text: '海外のブティックジムをイメージした、黒ベースの高級フィットネススタジオLPです。45分間の集中トレーニングを軸に、パーソナルトレーニング、ピラティス、コンディショニングを組み合わせた都会的なブランドサイトとして制作しました。',
    colorLabel: 'Black / Charcoal / Lime Green',
    accent: '#b8ff3d',
    tint: '#07110a',
    image: '/works/images/core-45.png',
    width: 1054,
    height: 1492,
    url: 'https://aicmode.github.io/CORE-45/',
    buttonLabel: 'Open Site',
    isNew: true,
  },
  {
    title: 'GREENROOT ENERGY',
    subtitle: 'Renewable Energy Corporate Website',
    category: 'Renewable Energy Corporate Website',
    text: '持続可能な未来をテーマに制作した、再生可能エネルギー企業向けコーポレートサイトです。森林とテクノロジーの融合を表現し、環境配慮・革新性・信頼感を兼ね備えたブランドイメージを構築しています。',
    colorLabel: 'Dark Green / Gold / Responsive',
    accent: '#d4af37',
    tint: '#052116',
    image: '/works/images/greenroot-energy.png',
    width: 1440,
    height: 1900,
    url: 'https://aicmode.github.io/GREENROOT-ENERGY/',
    buttonLabel: 'Open Site',
    isNew: true,
    isGreenrootPremium: true,
  },
  {
    title: 'NEW YORK PIZZA HOUSE',
    subtitle: 'PIZZA EC WEBSITE',
    category: 'Pizza EC Website',
    text: 'ニューヨークスタイルのピザ店をテーマにした、カート機能付きECサイトデモ。',
    colorLabel: 'HTML / CSS / JavaScript',
    accent: '#e8631a',
    tint: '#1a0500',
    image: '/works/images/new-york-pizza-house.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/New-York-Pizza-House/',
    buttonLabel: 'Open Site',
    isNew: true,
  },
  {
    title: 'SUNSET BAGEL',
    subtitle: 'BAKERY / CAFÉ BRAND WEBSITE',
    category: 'Bakery / Café Brand Website',
    text: 'カリフォルニア西海岸のライフスタイルから着想を得た、ベーグル専門店のブランドサイト。ベーグル、コーヒー、海辺の朝をテーマに、写真・タイポグラフィ・余白を活かした海外ベーカリー風デザインを制作。',
    colorLabel: 'HTML / CSS / JavaScript',
    accent: '#f0a04a',
    tint: '#241006',
    image: '/works/images/bagel.png',
    width: 2200,
    height: 1464,
    url: 'https://aesthetic-rolypoly-3a91ae.netlify.app/',
    buttonLabel: 'Open Site',
    isNew: true,
    isSpecial: true,
  },
  {
    title: 'BROOKLYN BREAD CO.',
    subtitle: 'BAKERY WEBSITE CONCEPT',
    category: 'Bakery Website Concept',
    text: 'ニューヨーク・ブルックリンのベーカリーカルチャーをイメージした、高級感と温かみを両立した複数ページ構成のベーカリーサイト。ブランドストーリー、メニュー、ギャラリー、アクセス情報などを掲載し、実案件を想定した6ページ構成で制作。',
    colorLabel: 'HTML / CSS / JavaScript',
    accent: '#c8923a',
    tint: '#1a0c04',
    image: '/works/images/brooklyn-bread-card.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/BROOKLYN-BREAD-CO./',
    isSpecial: true,
  },
  {
    title: 'LUNA Restaurant',
    subtitle: 'RESTAURANT / FINE DINING',
    category: 'Restaurant / Fine Dining',
    text: '高級ファインダイニングレストランを想定した架空のレストランサイト。上質な料理写真と洗練された空間演出を軸に、メニュー紹介、シェフ紹介、ギャラリー、予約導線まで丁寧に設計し、特別な食体験を求めるブランドの世界観を上品に表現。',
    colorLabel: 'Champagne Gold / Noir / Fine Dining UI',
    accent: '#d7b66f',
    tint: '#1b0f13',
    image: '/works/images/luna-restaurant.png',
    width: 1054,
    height: 1492,
    url: 'https://aicmode.github.io/LUNA-Restaurant/',
    featured: true,
  },
  {
    title: 'URBN Hair Studio',
    subtitle: 'BEAUTY / HAIR SALON',
    category: 'Beauty / Hair Salon',
    text: '都会的で洗練された高級ヘアサロンをコンセプトにした架空の美容室サイト。ブラック・ホワイト・ベージュを基調に、海外サロンのような上質な空気感を表現。サービス紹介、スタイリスト紹介、スタイルギャラリー、予約導線などを実装し、実案件レベルを意識したブランドサイトとして制作。',
    colorLabel: 'Black / White / Beige',
    accent: '#d8c4a0',
    tint: '#16120d',
    image: '/works/images/urbn-hair-studio.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/URBN-Hair-Studio/',
  },
  {
    title: 'Evergreen Medical Center',
    subtitle: 'HEALTHCARE / MEDICAL',
    category: 'Healthcare / Medical',
    text: 'アメリカの先進的な医療機関をイメージして制作したクリニックサイト。清潔感と信頼感を重視し、診療案内・医師紹介・予約導線を分かりやすく設計。海外の医療サイトらしい余白設計と洗練されたUIで、安心して利用できる医療体験を表現しています。',
    colorLabel: 'HTML / CSS / JavaScript / Medical UI',
    accent: '#7ac4dc',
    tint: '#0d1e2e',
    image: '/works/images/evergreen-medical.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/Evergreen-Medical-Center/',
  },
  {
    title: 'SWEET MEMORIES',
    subtitle: 'VINTAGE BAKERY',
    category: 'Vintage Bakery / Nostalgic Dessert Brand',
    text: '懐かしい記憶と焼き菓子をテーマにした、架空のスイーツブランドサイト。海外のヴィンテージベーカリーやポラロイド写真から着想を得て、温かみのある世界観を演出。',
    colorLabel: 'HTML / CSS / JavaScript / Vintage Design',
    accent: '#d4aa6a',
    tint: '#18100a',
    image: '/works/images/sweet-memories.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/Sweet-Memories/',
  },
  {
    title: 'KISSA MATCHA',
    subtitle: 'Kyoto Uji Luxury Matcha Brand Site',
    category: 'Luxury Matcha Brand',
    text: '京都・宇治の伝統と現代の美意識を融合した、高級抹茶ブランドLP。和モダンな配色と静かなアニメーションで、上質なブランド体験を表現。',
    colorLabel: 'HTML / CSS / JavaScript / Responsive',
    accent: '#d4bc82',
    tint: '#181008',
    image: '/works/images/kissa-matcha.png',
    width: 1536,
    height: 1024,
    url: 'https://aicmode.github.io/MATCHA/',
    isKissaPremium: true,
  },
  {
    title: 'DEERIFY',
    subtitle: 'WILDLIFE PHOTOGRAPHY',
    category: 'Wildlife Photography / Luxury Outdoor Experience',
    text: '霧島の森を舞台にした、架空のワイルドライフフォトブランド。鹿の足跡を追いながら自然の静けさと力強さを感じられる、ストーリー性のある構成。',
    colorLabel: 'HTML / CSS / JavaScript / Luxury Outdoor',
    accent: '#c9a05e',
    tint: '#16110a',
    image: '/works/images/deerify.png',
    width: 726,
    height: 1024,
    url: 'https://aicmode.github.io/Deerify/',
  },
  {
    title: 'AURA',
    subtitle: 'BEAUTY WELLNESS',
    category: 'BEAUTY RITUAL',
    text: 'ビューティーウェルネスブランドをイメージした、ファッションフィルムのようなLP。スモークバイオレットの世界観と滑らかな演出で、上質な美容体験を表現。',
    colorLabel: 'Smoke Violet / Pearl',
    accent: '#b19bc8',
    tint: '#17111d',
    image: '/works/images/aura.png',
    width: 1063,
    height: 1480,
    url: 'https://aicmode.github.io/AURA/',
  },
  {
    title: 'LUMI Grooming',
    subtitle: 'GROOMING STUDIO',
    category: 'PREMIUM CARE',
    text: 'プレミアムペットグルーミングサロンを想定した、洗練されたブランドサイト。メタリックな配色と落ち着いたUIで、清潔感と高級感のあるサービス体験を演出。',
    colorLabel: 'Steel Cyan / Silver',
    accent: '#87aeb8',
    tint: '#101c22',
    image: '/works/images/lumi-grooming.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/Lumi-Tails/',
  },
  {
    title: 'LUXE MEMBERS',
    subtitle: 'REACT APP',
    category: 'Luxury Members Experience / React App',
    text: '会員制ラグジュアリーブランドをイメージした、非公開コレクション型のWebアプリ。黒とゴールドを基調に、特別感のある導線と上質な予約体験を表現。',
    colorLabel: 'React / Vite / CSS / Vercel',
    accent: '#d7b878',
    tint: '#20130f',
    image: '/works/images/luxe-members.png',
    width: 1055,
    height: 1491,
    url: 'https://luxe-members.vercel.app',
  },
  {
    title: 'SAINT AVE',
    subtitle: 'CINEMATIC EDITORIAL',
    category: 'Luxury Fashion Brand / Cinematic Editorial',
    text: '海外ラグジュアリーブランドをイメージした、シネマティックなファッションブランドサイト。高級感・静けさ・都会的な空気感を重視し、GSAPアニメーションやLookbook演出を実装。',
    colorLabel: 'GSAP / Lookbook / Luxury UI',
    accent: '#d6c08a',
    tint: '#17110b',
    image: '/works/images/saint-ave.png',
    width: 1122,
    height: 1402,
    url: 'https://aicmode.github.io/saint-ave/',
  },
  {
    title: 'NOIR CAFÉ',
    subtitle: 'CAFÉ BRANDING',
    category: 'HOSPITALITY IDENTITY',
    text: '夜のカフェブランドをテーマにした、ダークでミニマルなカフェサイト。余白・光・ゴールドアクセントを活かし、落ち着いた大人のホスピタリティを表現。',
    colorLabel: 'Gold / Espresso',
    accent: '#c69b54',
    tint: '#2d1a12',
    image: '/works/images/noir-cafe.png',
    width: 1054,
    height: 1492,
    url: 'https://aicmode.github.io/noir-cafe/',
  },
  {
    title: 'Tsuki Usagi Wagashi',
    subtitle: 'WAGASHI STORE',
    category: 'CULTURAL COMMERCE',
    text: '月夜と季節の和菓子をテーマにした、架空の和菓子ブランドサイト。淡い月色と深い梅色を重ね、伝統の繊細さと現代的な購買体験を上品に表現。',
    colorLabel: 'Moon Pink / Plum',
    accent: '#d99ab8',
    tint: '#24101d',
    image: '/works/images/tsuki-usagi-wagashi.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/tsuki-usagi-wagashi/',
  },
  {
    title: 'PULSE',
    subtitle: 'FESTIVAL UI',
    category: 'FESTIVAL SYSTEM',
    text: '海外クラブカルチャーをイメージした、DJ・ミュージックイベント向けのサイト。ビート感のあるレイアウトとダークな演出で、音楽の高揚感をWeb上に表現。',
    colorLabel: 'Magenta / Blue',
    accent: '#d8d8d8',
    tint: '#ff2d6b',
    image: '/works/images/pulse.png',
    width: 1054,
    height: 1492,
    url: 'https://aicmode.github.io/pulse/',
  },
] as const

function ArrowIcon() {
  return (
    <motion.svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      variants={{
        rest: { x: 0, y: 0 },
        hover: { x: 5, y: -5 },
      }}
      transition={{ duration: 0.9, ease }}
    >
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

function WorkPoster({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const isFeatured = 'featured' in project && project.featured
  const isSpecial = 'isSpecial' in project && project.isSpecial
  const isNew = 'isNew' in project && project.isNew
  const isKissaPremium = 'isKissaPremium' in project && project.isKissaPremium
  const isGreenrootPremium = 'isGreenrootPremium' in project && project.isGreenrootPremium
  const buttonLabel = 'buttonLabel' in project ? project.buttonLabel : 'Open Site'

  return (
    <motion.article
      className={`work-card editorial-work-card group relative overflow-hidden bg-[#030303]${
        isFeatured ? ' featured-work-card md:col-span-2 xl:col-span-2' : ''
      }${isSpecial ? ' bakery-special-card' : ''}${isKissaPremium ? ' kissa-premium-card' : ''}${
        isGreenrootPremium ? ' greenroot-premium-card' : ''
      }`}
      style={{
        '--work-accent': project.accent,
        '--work-tint': project.tint,
      } as CSSProperties}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 1.25, delay: index * 0.08, ease }}
      whileHover="hover"
      animate="rest"
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Open ${project.title}`}
      >
        {isNew && <span className="bakery-new-badge">NEW</span>}

        <motion.div
          className="editorial-poster-shell relative overflow-hidden"
          variants={{
            rest: { y: 0 },
            hover: { y: -10 },
          }}
          transition={{ duration: 1.15, ease }}
        >
          {isSpecial ? (
            <div className="bakery-image-frame">
              <Image
                src={project.image}
                alt={`${project.title} editorial poster`}
                fill
                sizes="(min-width: 1280px) 520px, (min-width: 768px) 45vw, 92vw"
                className="bakery-poster-image"
                priority={index < 2}
              />
            </div>
          ) : isKissaPremium ? (
            <div className="kissa-image-frame">
              <Image
                src={project.image}
                alt={`${project.title} matcha photo`}
                fill
                sizes="(min-width: 1280px) 520px, (min-width: 768px) 45vw, 92vw"
                className="kissa-poster-image editorial-poster-image"
                priority={index < 2}
              />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} editorial poster`}
              width={project.width}
              height={project.height}
              sizes="(min-width: 1280px) 520px, (min-width: 768px) 45vw, 92vw"
              className="editorial-poster-image h-auto w-full"
              priority={index < 2}
            />
          )}
        </motion.div>

        <div className="editorial-work-meta flex items-start justify-between gap-5 px-1 pt-5 sm:pt-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <p className={`${isKissaPremium || isGreenrootPremium ? '' : 'truncate uppercase '}text-[10px] font-semibold tracking-[0.34em] text-[color:var(--work-accent)]${isKissaPremium ? ' kissa-premium-subtitle' : ''}${isGreenrootPremium ? ' greenroot-premium-subtitle' : ''}`}>
                {project.subtitle}
              </p>
            </div>
            <h3 className={`mt-2 font-semibold tracking-[-0.02em] text-white${isKissaPremium || isGreenrootPremium ? '' : ' truncate'}${isSpecial ? ' bakery-card-title' : ' text-xl sm:text-2xl tracking-[-0.01em]'}${isKissaPremium ? ' kissa-premium-title' : ''}${isGreenrootPremium ? ' greenroot-premium-title' : ''}`}>{project.title}</h3>
            <p className="mt-2 max-w-[30rem] text-sm leading-6 text-white/48">{project.text}</p>
            <p className={`mt-3 space-y-1 text-[9px] font-semibold uppercase leading-4 tracking-[0.26em] text-white/28${isKissaPremium ? ' kissa-premium-tags' : ''}${isGreenrootPremium ? ' greenroot-premium-tags' : ''}`}>
              <span className="block">{project.category}</span>
              <span className="block text-[color:var(--work-accent)] opacity-70">{project.colorLabel}</span>
            </p>
          </div>

          <motion.span
            className="editorial-work-button inline-flex h-11 shrink-0 items-center justify-center gap-2 border border-white/18 px-3 text-white/72"
            variants={{
              rest: { borderColor: 'rgba(255,255,255,0.18)' },
              hover: { borderColor: project.accent, color: project.accent },
            }}
            transition={{ duration: 0.9, ease }}
            aria-hidden="true"
          >
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] sm:text-[9px] sm:tracking-[0.22em]">{buttonLabel}</span>
            <ArrowIcon />
          </motion.span>
        </div>
      </motion.a>
    </motion.article>
  )
}

export default function Works() {
  return (
    <section id="works" className="works editorial-works-section relative overflow-x-hidden bg-[#010101] px-4 py-24 sm:px-6 md:px-10 md:py-36">
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative mx-auto max-w-[1420px]">
        <div className="mb-14 flex items-end justify-between gap-8 border-b border-white/[0.08] pb-8 md:mb-20">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-white/38">Web Design Works</p>
            <h2 className="text-[clamp(4.5rem,16vw,12rem)] font-black uppercase leading-[0.8] text-white">
              Works
            </h2>
            <p
              className="mt-4 text-[10px] md:text-[11px] uppercase tracking-[0.44em]"
              style={{ color: 'rgba(212,175,55,0.65)' }}
            >
              10+ Projects Completed
            </p>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-8 text-white/42 md:block">
            Dark editorial campaign posters — each a distinct visual world.
          </p>
        </div>

        <div className="editorial-poster-grid mx-auto grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20 xl:grid-cols-3">
          {projects.map((project, index) => (
            <WorkPoster key={project.title} project={project} index={index} />
          ))}
        </div>

        <AnimateIn delay={300}>
          <div className="mt-14 flex items-center gap-4 border-t border-white/[0.07] pt-8 md:mt-20">
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/18">AICMODE</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/18">
              {new Date().getFullYear()}
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
