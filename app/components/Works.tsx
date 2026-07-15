'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import AnimateIn from './AnimateIn'

const ease = [0.13, 0.86, 0.18, 1] as const
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=jpg&q=80&w=1600`

const CATEGORIES = ['All', 'LP Sites', 'Websites', 'EC Sites', 'Web Apps'] as const
type Category = (typeof CATEGORIES)[number]

const projects = [
  {
    title: 'Date Calculator Tool',
    subtitle: 'UTILITY WEB APP',
    category: 'Date Calculator / Utility Web App',
    text: '基準日と任意の日数を入力するだけで、「○日後」「○日前」の日付を曜日付きで計算できるWebツールです。結果コピー、履歴保存、リセット機能にも対応し、日常業務で素早く日付を確認できます。',
    colorLabel: 'Web App / Utility Tool / Responsive',
    accent: '#8fb7e8',
    tint: '#0a1420',
    image: unsplash('1506784983877-45594efa4cbe'),
    width: 1080,
    height: 1527,
    imagePosition: 'center 50%',
    url: 'https://aicmode.github.io/date-calculator-tool/',
    buttonLabel: 'Open Site',
    githubUrl: 'https://github.com/aicmode/date-calculator-tool',
    group: 'Web Apps',
  },
  {
    title: 'NIGHT SHIFT CARE',
    subtitle: 'NURSE SHIFT WEB APP',
    category: 'Nurse Shift & Payroll Web App',
    text: '看護師向けに、夜勤回数や給与情報の入力・確認を想定して制作した簡易Webアプリ。シフト管理、勤怠メモ、給与見積もりまで操作性を重視してまとめています。',
    colorLabel: 'Web App / Dashboard UI / Responsive',
    accent: '#5fd2c2',
    tint: '#08201d',
    image: unsplash('1576091160550-2173dba999ef'),
    width: 1080,
    height: 1527,
    imagePosition: 'center 48%',
    url: 'https://aicmode.github.io/NIGHT-SHIFT-CARE/',
    buttonLabel: 'Open Site',
    group: 'Web Apps',
  },
  {
    title: 'VELVET CREAM',
    subtitle: 'Luxury Ice Cream Brand Website',
    category: 'Luxury Ice Cream Brand Website',
    text: '海外の高級デザートブランドをイメージした、プレミアムアイスクリームの大規模ブランドサイトです。フレーバー紹介、ブランドストーリー、素材紹介、ギフト導線、ショップページまで構成し、食品ブランドとしての世界観と販売導線を意識して制作しました。',
    colorLabel: 'Black / Cream / Gold / Luxury',
    accent: '#d8bd7c',
    tint: '#120d08',
    image: unsplash('1707553851664-5985b32734c0'),
    width: 1086,
    height: 1448,
    imagePosition: 'center 52%',
    url: 'https://aicmode.github.io/VELVET-CREAM/',
    buttonLabel: 'Open Site',
    tags: ['Brand Site', 'Food', 'Gift', 'Luxury', 'Multi Page'],
    isVelvetPremium: true,
    group: 'Websites',
  },
  {
    title: 'BLACKLINE DETAILING',
    subtitle: 'Premium Auto Care / Landing Page',
    category: 'Premium Auto Care / Landing Page',
    text: '黒を基調にした海外ガレージ風の高級カーケアブランドサイトです。洗車、コーティング、内装クリーニングをプレミアムに見せるため、光沢・反射・メタリック感を意識して制作しました。',
    colorLabel: 'Black / Charcoal / Silver / Metallic',
    accent: '#c7cdd3',
    tint: '#07090b',
    image: '/works/images/blackline-detailing.png',
    width: 1024,
    height: 1536,
    url: 'https://aicmode.github.io/BLACKLINE-DETAILING/',
    buttonLabel: 'Open Site',
    isBlacklinePremium: true,
    group: 'LP Sites',
  },
  {
    title: 'CORE 45',
    subtitle: 'Premium Fitness Studio',
    category: 'Premium Fitness Studio',
    text: '海外のブティックジムをイメージした、黒ベースの高級フィットネススタジオLPです。45分間の集中トレーニングを軸に、パーソナルトレーニング、ピラティス、コンディショニングを組み合わせた都会的なブランドサイトとして制作しました。',
    colorLabel: 'Black / Charcoal / Lime Green',
    accent: '#b8ff3d',
    tint: '#07110a',
    image: unsplash('1590487988256-9ed24133863e'),
    width: 1054,
    height: 1492,
    imagePosition: 'center 50%',
    url: 'https://aicmode.github.io/CORE-45/',
    buttonLabel: 'Open Site',
    group: 'LP Sites',
  },
  {
    title: 'GREENROOT ENERGY',
    subtitle: 'Renewable Energy Corporate Website',
    category: 'Renewable Energy Corporate Website',
    text: '持続可能な未来をテーマに制作した、再生可能エネルギー企業向けコーポレートサイトです。森林とテクノロジーの融合を表現し、環境配慮・革新性・信頼感を兼ね備えたブランドイメージを構築しています。',
    colorLabel: 'Dark Green / Gold / Responsive',
    accent: '#d4af37',
    tint: '#052116',
    image: unsplash('1662079347487-919f276bb6fd'),
    width: 1440,
    height: 1900,
    imagePosition: 'center 58%',
    url: 'https://aicmode.github.io/GREENROOT-ENERGY/',
    buttonLabel: 'Open Site',
    isGreenrootPremium: true,
    group: 'Websites',
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
    group: 'EC Sites',
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
    url: 'https://aicmode.github.io/SUNSET-BAGEL/',
    buttonLabel: 'Open Site',
    isSpecial: true,
    group: 'Websites',
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
    group: 'Websites',
  },
  {
    title: 'LUNA Restaurant',
    subtitle: 'RESTAURANT / FINE DINING',
    category: 'Restaurant / Fine Dining',
    text: '高級ファインダイニングレストランを想定した架空のレストランサイト。上質な料理写真と洗練された空間演出を軸に、メニュー紹介、シェフ紹介、ギャラリー、予約導線まで丁寧に設計し、特別な食体験を求めるブランドの世界観を上品に表現。',
    colorLabel: 'Champagne Gold / Noir / Fine Dining UI',
    accent: '#d7b66f',
    tint: '#1b0f13',
    image: unsplash('1414235077428-338989a2e8c0'),
    width: 1054,
    height: 1492,
    imagePosition: 'center 54%',
    url: 'https://aicmode.github.io/LUNA-Restaurant/',
    featured: true,
    group: 'LP Sites',
  },
  {
    title: 'URBN Hair Studio',
    subtitle: 'BEAUTY / HAIR SALON',
    category: 'Beauty / Hair Salon',
    text: '都会的で洗練された高級ヘアサロンをコンセプトにした架空の美容室サイト。ブラック・ホワイト・ベージュを基調に、海外サロンのような上質な空気感を表現。サービス紹介、スタイリスト紹介、スタイルギャラリー、予約導線などを実装し、実案件レベルを意識したブランドサイトとして制作。',
    colorLabel: 'Black / White / Beige',
    accent: '#d8c4a0',
    tint: '#16120d',
    image: unsplash('1633681138600-295fcd688876'),
    width: 1055,
    height: 1491,
    imagePosition: 'center 48%',
    url: 'https://aicmode.github.io/URBN-Hair-Studio/',
    group: 'LP Sites',
  },
  {
    title: 'Evergreen Medical Center',
    subtitle: 'HEALTHCARE / MEDICAL',
    category: 'Healthcare / Medical',
    text: 'アメリカの先進的な医療機関をイメージして制作したクリニックサイト。清潔感と信頼感を重視し、診療案内・医師紹介・予約導線を分かりやすく設計。海外の医療サイトらしい余白設計と洗練されたUIで、安心して利用できる医療体験を表現しています。',
    colorLabel: 'HTML / CSS / JavaScript / Medical UI',
    accent: '#7ac4dc',
    tint: '#0d1e2e',
    image: unsplash('1538108149393-fbbd81895907'),
    width: 1055,
    height: 1491,
    imagePosition: 'center 52%',
    url: 'https://aicmode.github.io/Evergreen-Medical-Center/',
    group: 'LP Sites',
  },
  {
    title: 'SWEET MEMORIES',
    subtitle: 'VINTAGE BAKERY',
    category: 'Vintage Bakery / Nostalgic Dessert Brand',
    text: '懐かしい記憶と焼き菓子をテーマにした、架空のスイーツブランドサイト。海外のヴィンテージベーカリーやポラロイド写真から着想を得て、温かみのある世界観を演出。',
    colorLabel: 'HTML / CSS / JavaScript / Vintage Design',
    accent: '#d4aa6a',
    tint: '#18100a',
    image: unsplash('1558961363-fa8fdf82db35'),
    width: 1055,
    height: 1491,
    imagePosition: 'center 55%',
    url: 'https://aicmode.github.io/Sweet-Memories/',
    group: 'EC Sites',
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
    group: 'LP Sites',
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
    group: 'LP Sites',
  },
  {
    title: 'AURA',
    subtitle: 'BEAUTY WELLNESS',
    category: 'BEAUTY RITUAL',
    text: 'ビューティーウェルネスブランドをイメージした、ファッションフィルムのようなLP。スモークバイオレットの世界観と滑らかな演出で、上質な美容体験を表現。',
    colorLabel: 'Smoke Violet / Pearl',
    accent: '#b19bc8',
    tint: '#17111d',
    image: unsplash('1585945037805-5fd82c2e60b1'),
    width: 1063,
    height: 1480,
    imagePosition: 'center 58%',
    url: 'https://aicmode.github.io/AURA/',
    group: 'LP Sites',
  },
  {
    title: 'LUMI Grooming',
    subtitle: 'GROOMING STUDIO',
    category: 'PREMIUM CARE',
    text: 'プレミアムペットグルーミングサロンを想定した、洗練されたブランドサイト。メタリックな配色と落ち着いたUIで、清潔感と高級感のあるサービス体験を演出。',
    colorLabel: 'Steel Cyan / Silver',
    accent: '#87aeb8',
    tint: '#101c22',
    image: unsplash('1561037404-61cd46aa615b'),
    width: 1055,
    height: 1491,
    imagePosition: 'center 44%',
    url: 'https://aicmode.github.io/Lumi-Tails/',
    group: 'LP Sites',
  },
  {
    title: 'LUXE MEMBERS',
    subtitle: 'REACT APP',
    category: 'Luxury Members Experience / React App',
    text: '会員制ラグジュアリーブランドをイメージした、非公開コレクション型のWebアプリ。黒とゴールドを基調に、特別感のある導線と上質な予約体験を表現。',
    colorLabel: 'React / Vite / CSS / Vercel',
    accent: '#d7b878',
    tint: '#20130f',
    image: unsplash('1595923533867-ff8a01335ff9'),
    width: 1055,
    height: 1491,
    imagePosition: 'center 50%',
    url: 'https://luxe-members.vercel.app',
    group: 'EC Sites',
  },
  {
    title: 'SAINT AVE',
    subtitle: 'LUXURY STREET EC',
    category: 'Luxury Street EC Site',
    text: '深夜の都市と静かな高級感をテーマにした、ラグジュアリーストリート系ECサイトデザイン。',
    colorLabel: 'GSAP / Lookbook / Luxury UI',
    accent: '#d6c08a',
    tint: '#17110b',
    image: unsplash('1758887261876-567e1952a31c'),
    width: 1122,
    height: 1402,
    imagePosition: 'center 48%',
    url: 'https://aicmode.github.io/saint-ave/',
    group: 'EC Sites',
  },
  {
    title: 'NOIR CAFÉ',
    subtitle: 'CAFÉ BRANDING',
    category: 'HOSPITALITY IDENTITY',
    text: '夜のカフェブランドをテーマにした、ダークでミニマルなカフェサイト。余白・光・ゴールドアクセントを活かし、落ち着いた大人のホスピタリティを表現。',
    colorLabel: 'Gold / Espresso',
    accent: '#c69b54',
    tint: '#2d1a12',
    image: unsplash('1611162458324-aae1eb4129a4'),
    width: 1054,
    height: 1492,
    imagePosition: 'center 50%',
    url: 'https://aicmode.github.io/noir-cafe/',
    group: 'LP Sites',
  },
  {
    title: 'Tsuki Usagi Wagashi',
    subtitle: 'WAGASHI STORE',
    category: 'EC Site',
    text: '和菓子ブランドの世界観を活かし、商品一覧・ギフトボックス・カート導線を備えたオンラインストア型サイト。',
    colorLabel: 'Moon Pink / Plum',
    accent: '#d99ab8',
    tint: '#24101d',
    image: unsplash('1627308595229-7830a5c91f9f'),
    width: 1055,
    height: 1491,
    imagePosition: 'center 52%',
    url: 'https://aicmode.github.io/tsuki-usagi-wagashi/',
    group: 'EC Sites',
  },
  {
    title: 'PULSE',
    subtitle: 'FESTIVAL UI',
    category: 'FESTIVAL SYSTEM',
    text: '海外クラブカルチャーをイメージした、DJ・ミュージックイベント向けのサイト。ビート感のあるレイアウトとダークな演出で、音楽の高揚感をWeb上に表現。',
    colorLabel: 'Magenta / Blue',
    accent: '#d8d8d8',
    tint: '#ff2d6b',
    image: unsplash('1630395822970-acd6a691d97e'),
    width: 1054,
    height: 1492,
    imagePosition: 'center 48%',
    url: 'https://aicmode.github.io/pulse/',
    group: 'LP Sites',
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

function getProjectMeta(project: (typeof projects)[number], index: number) {
  const isFeatured = index < 7 || ('featured' in project && project.featured)

  if ('tags' in project) {
    return { tags: project.tags, isFeatured }
  }

  return { tags: ['Responsive', 'AI Assisted'], isFeatured }
}

function WorkPoster({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const isWideFeatured = 'featured' in project && project.featured
  const isSpecial = 'isSpecial' in project && project.isSpecial
  const isKissaPremium = 'isKissaPremium' in project && project.isKissaPremium
  const isGreenrootPremium = 'isGreenrootPremium' in project && project.isGreenrootPremium
  const isBlacklinePremium = 'isBlacklinePremium' in project && project.isBlacklinePremium
  const isVelvetPremium = 'isVelvetPremium' in project && project.isVelvetPremium
  const buttonLabel = 'buttonLabel' in project ? project.buttonLabel : 'Open Site'
  const githubUrl = 'githubUrl' in project ? project.githubUrl : undefined
  const meta = getProjectMeta(project, index)

  return (
    <motion.article
      className={`work-card editorial-work-card group relative overflow-hidden bg-[#030303]${
        isWideFeatured ? ' featured-work-card' : ''
      }${isSpecial ? ' bakery-special-card' : ''}${isKissaPremium ? ' kissa-premium-card' : ''}${
        isGreenrootPremium ? ' greenroot-premium-card' : ''
      }${isBlacklinePremium ? ' blackline-premium-card' : ''}${isVelvetPremium ? ' velvet-premium-card' : ''
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

        <motion.div
          className="editorial-poster-shell relative overflow-hidden"
          variants={{
            rest: { y: 0 },
            hover: { y: -10 },
          }}
          transition={{ duration: 1.15, ease }}
        >
          {meta.isFeatured ? (
            <div className="pointer-events-none absolute left-4 top-4 z-10 border border-white/18 bg-black/70 px-3 py-2 text-[8px] font-bold uppercase leading-none tracking-[0.34em] text-white/58 backdrop-blur-md">
              FEATURED
            </div>
          ) : null}

          <Image
            src={project.image}
            alt={`${project.title} photo thumbnail`}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
            className={`editorial-poster-image${isSpecial ? ' bakery-poster-image' : ''}${
              isKissaPremium ? ' kissa-poster-image' : ''
            }`}
            style={{ objectPosition: 'imagePosition' in project ? project.imagePosition : 'center' }}
            priority={index < 2}
            unoptimized={project.image.startsWith('https://')}
          />
        </motion.div>

        <div className="editorial-work-meta flex gap-5 px-1 pt-5 sm:pt-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <p className={`${isKissaPremium || isGreenrootPremium || isBlacklinePremium || isVelvetPremium ? '' : 'truncate uppercase '}text-[10px] font-semibold tracking-[0.34em] text-[color:var(--work-accent)]${isKissaPremium ? ' kissa-premium-subtitle' : ''}${isGreenrootPremium ? ' greenroot-premium-subtitle' : ''}${isBlacklinePremium ? ' blackline-premium-subtitle' : ''}${isVelvetPremium ? ' velvet-premium-subtitle' : ''}`}>
                {project.subtitle}
              </p>
            </div>
            <h3 className={`mt-2 font-semibold tracking-[-0.02em] text-white${isKissaPremium || isGreenrootPremium || isBlacklinePremium || isVelvetPremium ? '' : ' truncate'}${isSpecial ? ' bakery-card-title' : ' text-xl sm:text-2xl tracking-[-0.01em]'}${isKissaPremium ? ' kissa-premium-title' : ''}${isGreenrootPremium ? ' greenroot-premium-title' : ''}${isBlacklinePremium ? ' blackline-premium-title' : ''}${isVelvetPremium ? ' velvet-premium-title' : ''}`}>{project.title}</h3>
            <p className="mt-2 max-w-[30rem] text-sm leading-6 text-white/48">{project.text}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="border border-[color:var(--work-accent)]/45 bg-[color:var(--work-accent)]/[0.08] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.28em] text-[color:var(--work-accent)]">
                {project.group}
              </span>
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/38"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className={`mt-3 space-y-1 text-[9px] font-semibold uppercase leading-4 tracking-[0.26em] text-white/28${isKissaPremium ? ' kissa-premium-tags' : ''}${isGreenrootPremium ? ' greenroot-premium-tags' : ''}${isBlacklinePremium ? ' blackline-premium-tags' : ''}${isVelvetPremium ? ' velvet-premium-tags' : ''}`}>
              <span className="block">{project.category}</span>
              <span className="block text-[color:var(--work-accent)] opacity-70">{project.colorLabel}</span>
            </p>
          </div>

          {githubUrl ? (
            <div className="flex shrink-0 flex-col gap-2">
              <motion.span
                className="editorial-work-button inline-flex h-11 items-center justify-center gap-2 border border-white/18 px-3 text-white/72"
                variants={{
                  rest: { borderColor: 'rgba(255,255,255,0.18)' },
                  hover: { borderColor: project.accent, color: project.accent },
                }}
                transition={{ duration: 0.9, ease }}
                aria-hidden="true"
              >
                <span className="text-[8px] font-semibold tracking-[0.18em] sm:text-[9px] sm:tracking-[0.22em]">{buttonLabel}</span>
                <ArrowIcon />
              </motion.span>
              <motion.span
                role="link"
                tabIndex={0}
                aria-label={`Open ${project.title} GitHub repository`}
                className="editorial-work-button inline-flex h-11 cursor-pointer items-center justify-center gap-2 border border-white/18 px-3 text-white/72"
                variants={{
                  rest: { borderColor: 'rgba(255,255,255,0.18)' },
                  hover: { borderColor: project.accent, color: project.accent },
                }}
                transition={{ duration: 0.9, ease }}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  window.open(githubUrl, '_blank', 'noopener,noreferrer')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    event.stopPropagation()
                    window.open(githubUrl, '_blank', 'noopener,noreferrer')
                  }
                }}
              >
                <span className="text-[8px] font-semibold tracking-[0.18em] sm:text-[9px] sm:tracking-[0.22em]">GitHub</span>
                <ArrowIcon />
              </motion.span>
            </div>
          ) : (
            <motion.span
              className="editorial-work-button inline-flex h-11 shrink-0 items-center justify-center gap-2 border border-white/18 px-3 text-white/72"
              variants={{
                rest: { borderColor: 'rgba(255,255,255,0.18)' },
                hover: { borderColor: project.accent, color: project.accent },
              }}
              transition={{ duration: 0.9, ease }}
              aria-hidden="true"
            >
              <span className="text-[8px] font-semibold tracking-[0.18em] sm:text-[9px] sm:tracking-[0.22em]">{buttonLabel}</span>
              <ArrowIcon />
            </motion.span>
          )}
        </div>
      </motion.a>
    </motion.article>
  )
}

export default function Works() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const counts = useMemo(() => {
    const map = { All: projects.length } as Record<Category, number>
    for (const category of CATEGORIES) {
      if (category === 'All') continue
      map[category] = projects.filter((project) => project.group === category).length
    }
    return map
  }, [])

  const visibleProjects = useMemo(
    () =>
      projects
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => activeCategory === 'All' || project.group === activeCategory),
    [activeCategory],
  )

  return (
    <section id="works" className="works editorial-works-section relative overflow-x-hidden bg-[#010101] px-4 py-24 sm:px-6 md:px-10 md:py-36">
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative mx-auto max-w-[1420px]">
        <div className="mb-12 flex flex-col gap-8 border-b border-white/[0.08] pb-8 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-white/38">Selected Web Design Works</p>
            <h2 className="text-[clamp(4.5rem,16vw,12rem)] font-black uppercase leading-[0.8] text-white">
              Works
            </h2>
            <p
              className="mt-4 text-[10px] md:text-[11px] uppercase tracking-[0.44em]"
              style={{ color: 'rgba(212,175,55,0.65)' }}
            >
              20+ Projects Completed
            </p>
          </div>
          <p className="max-w-xl text-sm leading-8 text-white/46 lg:text-right">
            飲食店、美容、医療、EC、ブランドサイトなど、実案件を想定して制作したWebデザイン作品です。
            見た目の美しさだけでなく、第一印象・信頼感・導線・スマホ表示まで意識して構成しています。
          </p>
        </div>

        <div className="works-tabs no-scrollbar -mx-4 mb-12 overflow-x-auto px-4 sm:mx-0 sm:px-0 md:mb-16">
          <div className="flex min-w-max items-center gap-2 sm:flex-wrap sm:gap-2.5">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`group/tab inline-flex items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.26em] transition-all duration-500 ${
                    isActive
                      ? 'border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.07)] text-[rgba(212,175,55,0.95)] shadow-[0_0_30px_rgba(212,175,55,0.08)]'
                      : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/80'
                  }`}
                >
                  {category}
                  <span
                    className={`text-[8px] font-semibold tracking-[0.1em] tabular-nums transition-colors duration-500 ${
                      isActive ? 'text-[rgba(212,175,55,0.65)]' : 'text-white/25'
                    }`}
                  >
                    {counts[category]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="editorial-poster-grid mx-auto grid grid-cols-1 items-stretch gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20 xl:grid-cols-3"
        >
          {visibleProjects.map(({ project, index }) => (
            <WorkPoster key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        <AnimateIn delay={300}>
          <div className="mt-14 flex flex-col gap-6 border-t border-white/[0.07] pt-8 md:mt-20 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/18">AICMODE</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/18">
                {new Date().getFullYear()}
              </span>
            </div>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70 transition duration-500 hover:border-[rgba(212,175,55,0.45)] hover:text-white hover:shadow-[0_0_44px_rgba(212,175,55,0.08)] sm:w-auto"
            >
              START A PROJECT
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
