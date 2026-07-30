/**
 * Skills, grouped so a client can find what they were looking for.
 *
 * Inclusion rule: every entry is traceable to a public repository under
 * github.com/aicmode or to this codebase. Notably NOT listed, because there is
 * no implementation to back them yet: Supabase, vector search / RAG, and an
 * automated test suite. They can be added the moment a repo exists.
 */

export type TechSkill = { label: string; icon: string }

export type SkillGroupData = {
  title: string
  /** Why a client would care about this group. */
  note: string
  items: readonly TechSkill[]
}

export const skillGroups: readonly SkillGroupData[] = [
  {
    title: 'Frontend',
    note: '画面と操作性',
    items: [
      { label: 'HTML', icon: '</>' },
      { label: 'CSS', icon: '{ }' },
      { label: 'JavaScript', icon: 'JS' },
      { label: 'TypeScript', icon: 'TS' },
      { label: 'React', icon: '◎' },
      { label: 'Next.js', icon: 'N' },
      { label: 'Tailwind CSS', icon: '≋' },
      { label: 'Framer Motion', icon: '∿' },
      { label: 'Recharts', icon: '▥' },
      { label: 'Responsive Design', icon: '▤' },
    ],
  },
  {
    title: 'Backend & Data',
    note: 'サーバー側とデータの置き場所',
    items: [
      { label: 'Node.js', icon: '⬡' },
      { label: 'Express', icon: 'Ex' },
      { label: 'Python', icon: 'Py' },
      { label: 'Flask', icon: 'Fl' },
      { label: 'REST API', icon: '⇄' },
      { label: 'Google Sheets', icon: '▦' },
      { label: 'LocalStorage', icon: '▣' },
    ],
  },
  {
    title: 'AI & Automation',
    note: 'AIを業務に組み込む部分',
    items: [
      { label: 'OpenAI API', icon: '✳' },
      { label: 'Whisper API', icon: '◍' },
      { label: 'Dify API', icon: '◈' },
      { label: 'Prompt Engineering', icon: '⌘' },
      { label: 'Workflow Automation', icon: '⟳' },
      { label: 'Web Scraping', icon: '⌗' },
      { label: 'AI Assisted Development', icon: '✧' },
    ],
  },
  {
    title: 'Integrations',
    note: '既存ツールとつなぐ部分',
    items: [
      { label: 'Google APIs', icon: 'G' },
      { label: 'Google Apps Script', icon: 'GS' },
      { label: 'LINE Messaging API', icon: 'L' },
      { label: 'Slack API', icon: '#' },
      { label: 'Discord API', icon: '◇' },
      { label: 'Gmail API', icon: '✉' },
      { label: 'Webhook', icon: '↯' },
    ],
  },
  {
    title: 'Development & Deployment',
    note: '公開と運用の部分',
    items: [
      { label: 'Git', icon: '⑂' },
      { label: 'GitHub', icon: '⊙' },
      { label: 'Vercel', icon: '▲' },
      { label: 'Render', icon: '◐' },
      { label: 'GitHub Pages', icon: '⊞' },
      { label: 'Environment Variables', icon: '⚿' },
      { label: 'Type Check / Lint / Build', icon: '✓' },
    ],
  },
]

/**
 * Ordered for a client reading top-to-bottom: what gets thought about before
 * any code exists comes first, craft comes after.
 */
export const creativeSkills = [
  {
    title: 'Business Thinking',
    description: '集客・運用・コストまで踏まえ、事業として成立する形を提案。作って終わりにしない。',
    icon: '◫',
  },
  {
    title: 'Problem Solving',
    description: '「何を作るか」の前に「何が課題か」を整理。必要な打ち手だけに絞って形にする。',
    icon: '✦',
  },
  {
    title: 'AI System Design',
    description: '業務のどこにAIを組み込めば効果が出るかを見極め、機能・データの流れ・API連携までを設計。',
    icon: '⊟',
  },
  {
    title: 'Automation Design',
    description: '手作業・集計・通知・共有を洗い出し、自動化できる工程から仕組み化して人の時間を戻す。',
    icon: '⟳',
  },
  {
    title: 'Workflow Optimization',
    description: '現場の業務フローを整理し、重複や無駄な工程を削減。運用が続く形に組み直す。',
    icon: '⟐',
  },
  {
    title: 'UI / UX Thinking',
    description: '使う人の目線で導線と操作性を設計。\nスマホ表示と、迷わせない構成を重視。',
    icon: '⊞',
  },
  {
    title: 'Creative Direction',
    description: 'コンセプト設計からデザイン監修まで担当。\nブランドの魅力を最大限に引き出す方向づけ。',
    icon: '⬒',
  },
  {
    title: 'Prompt Engineering',
    description: 'AIへの指示を設計し、出力の精度と再現性を安定させる。実務で使える品質まで詰める。',
    icon: '◈',
  },
] as const
