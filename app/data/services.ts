/**
 * Services and capabilities.
 *
 * These two lists deliberately answer different questions and must not repeat
 * each other:
 *   - `services` starts from the client's problem ("we can't keep up with
 *     enquiries") and is what the JSON-LD offer catalog is built from.
 *   - `capabilities` starts from the deliverable ("AI chatbot", "dashboard") —
 *     the concrete thing that gets handed over.
 *
 * Nothing here claims a capability that isn't backed by a public repository
 * (see `caseStudies.ts` and `projects.ts`). RAG / vector search is intentionally
 * absent: there is no implementation to point at yet.
 */

/** Problem-first. Each `id`/`type` also feeds the Service JSON-LD nodes. */
export const services = [
  {
    id: 'reduce-support-load',
    problem: '問い合わせ対応が追いつかない',
    name: '問い合わせ対応のAI化',
    type: 'AI Support Automation',
    desc: 'よくある質問への一次対応をAIに任せ、人が判断すべき問い合わせだけを手元に残します。営業時間外の初期応答も確保します。',
    description:
      'AIチャットによる一次対応と有人対応への引き継ぎを設計し、問い合わせ対応の負担を減らす仕組みを構築します。',
  },
  {
    id: 'automate-manual-work',
    problem: '毎日同じ手作業に時間が消える',
    name: '業務の自動化',
    type: 'Business Automation',
    desc: '取得・要約・集計・通知・保存といった定型作業を洗い出し、自動で回る部分から順に仕組み化します。',
    description:
      '手作業・集計・通知・共有の工程を整理し、APIとスクリプトで自動化するワークフローを設計・実装します。',
  },
  {
    id: 'organize-scattered-information',
    problem: '必要な情報が散らばって探せない',
    name: '情報の集約と整理',
    type: 'Information Consolidation',
    desc: '複数のツールに散った情報を1か所へ集め、検索と絞り込みで辿れる形に整えます。蓄積先はスプレッドシートでもアプリでも構成できます。',
    description:
      '複数ツールに分散した情報を集約し、検索・絞り込み・蓄積ができる状態に整えるシステムを構築します。',
  },
  {
    id: 'visualize-numbers',
    problem: '判断に必要な数字がすぐ出てこない',
    name: '数値の可視化',
    type: 'Custom Dashboard',
    desc: '合計・平均・構成比・推移といった指標を1画面に集約し、集計作業なしで読み取れるダッシュボードを用意します。',
    description:
      '売上・進捗・支出などの指標を自動集計し、グラフとテーブルで一画面に集約するダッシュボードを開発します。',
  },
  {
    id: 'connect-existing-tools',
    problem: 'ツール間の転記や二重入力が残っている',
    name: 'API連携',
    type: 'API Integration',
    desc: 'Google APIs、LINE Messaging API、Slack API、Discord APIなど、すでに使っているツール同士を自動でつなぎます。運用は変えずに、転記だけをなくします。',
    description:
      'Google APIs、LINE Messaging API、Slack API、Discord API、REST APIを用いて、既存ツール間のデータ連携を実装します。',
  },
  {
    id: 'increase-web-enquiries',
    problem: 'Webサイトから問い合わせが来ない',
    name: 'Webサイト・LP制作',
    type: 'Web Design',
    desc: '第一印象・信頼感・導線を設計し直し、見た人が次に何をすればよいか迷わないサイトへ整えます。',
    description:
      '店舗・クリニック・中小企業・個人事業主・ブランド向けに、信頼感と問い合わせ導線を設計したWebサイト・ランディングページを制作します。',
  },
  {
    id: 'build-purpose-specific-app',
    problem: '既存のツールが業務の進め方に合わない',
    name: 'Webアプリ開発',
    type: 'Web Application Development',
    desc: '必要な機能だけに絞った専用アプリを、Next.js・TypeScript・Pythonで開発します。まずMVPを決めてから広げます。',
    description:
      'Next.js・React・TypeScript・Pythonを用いて、業務に合わせた目的特化型のWebアプリケーションを開発します。',
  },
] as const

/** Deliverable-first: what actually gets handed over. */
export const capabilities = [
  {
    id: '01',
    title: 'AI Chatbot',
    desc: '一次対応と有人切り替えを含むチャット。会話の継続、リセット、エラー時の挙動まで実装します。',
  },
  {
    id: '02',
    title: 'AI Text Processing',
    desc: '要約・分類・整形をAPI経由で組み込みます。出力形式を固定し、検証を通してから使う構成にします。',
  },
  {
    id: '03',
    title: 'Automation Workflow',
    desc: '取得・加工・保存・通知を通すスクリプト。事前確認モードとログを備え、段ごとに再実行できます。',
  },
  {
    id: '04',
    title: 'Custom Dashboard',
    desc: '指標カード・グラフ・明細を1画面に集約。検索、絞り込み、並び替え、CSV出力まで含みます。',
  },
  {
    id: '05',
    title: 'Web Application',
    desc: '入力・一覧・編集・削除を備えた業務用アプリ。バリデーションとスマホ表示を前提に実装します。',
  },
  {
    id: '06',
    title: 'API Integration',
    desc: 'Google / LINE / Slack / Discord / REST APIとの接続、Webhook受信、署名検証、環境変数管理まで。',
  },
  {
    id: '07',
    title: 'Brand Website',
    desc: '複数ページのブランドサイト。世界観・情報設計・回遊導線をまとめて設計・実装します。',
  },
  {
    id: '08',
    title: 'Landing Page',
    desc: '訴求・根拠・導線を1ページに整理。申し込みまでの離脱を減らす構成で制作します。',
  },
] as const

/** Delivery process, shown in the Process section. */
export const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    desc: '目的、現状の業務、利用者、課題、優先順位を整理します。作るものより先に、解くべきことを決めます。',
  },
  {
    step: '02',
    title: 'Scope & Proposal',
    desc: 'MVPの範囲、Phase 2、スケジュール、費用、制約を明確にします。ここで合意してから着手します。',
  },
  {
    step: '03',
    title: 'Design & Build',
    desc: '画面、データ、API、権限、運用フローを設計し、実装します。途中で確認できる状態を保ちます。',
  },
  {
    step: '04',
    title: 'Test & Launch',
    desc: 'Type Check、Lint、Build、主要操作、スマホ表示、Console Errorを確認したうえで公開します。',
  },
] as const

/** Shown as a supporting row under the four-column process grid. */
export const processFollowUp = {
  step: '05',
  title: 'Operate & Improve',
  desc: '公開後の運用、改善、機能追加、トラブル対応を継続して支援します。範囲と対応方法は事前に決めておきます。',
} as const
