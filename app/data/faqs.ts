// Shared between the FAQ accordion and the FAQPage JSON-LD in app/page.tsx,
// so the structured data can never drift from what the page actually shows.
export type Faq = {
  no: string
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    no: '01',
    question: '依頼するか決まっていなくても相談できますか？',
    answer:
      'まだ依頼するか決まっていない段階でも、目的やイメージの相談から可能です。Webサイトなのか、AIを使った仕組みなのか、まずは方向性の整理から一緒に進められます。',
  },
  {
    no: '02',
    question: 'AIを使ったシステムも作れますか？',
    answer:
      'OpenAI APIなどを活用したAIチャット、AIアシスタント、文章生成・要約・分類などの仕組みを、Webアプリとして構築できます。AIを組み込むこと自体が目的ではなく、どの業務のどこに効くかを見極めたうえで、要件整理・設計・実装・運用まで一貫して担当します。',
  },
  {
    no: '03',
    question: '業務効率化ツールは作れますか？',
    answer:
      '日々の手作業や集計、通知、予約管理、社内共有などを想定した業務効率化ツール・社内向けダッシュボードを制作します。まず現在の業務フローを整理し、自動化できる部分から提案します。',
  },
  {
    no: '04',
    question: '既存のシステムやツールと連携できますか？',
    answer:
      'Google スプレッドシート、LINE、Slack、Discordなど、すでにお使いのツールと連携する形で構築できます。今の運用を大きく変えずに、自動化だけを足していく進め方も可能です。',
  },
  {
    no: '05',
    question: 'API連携やAPI開発は対応できますか？',
    answer:
      'REST APIの連携、外部サービスのAPI接続、必要に応じたAPIの実装まで対応します。OpenAI API、Google APIs、LINE Messaging API、Discord API、Slack APIなどの実装経験があります。',
  },
  {
    no: '06',
    question: 'スマホ対応のサイトやアプリも作れますか？',
    answer:
      'スマホ表示を意識しながら、PC・スマホどちらでも見やすいWebサイト・Webアプリを制作します。第一印象と使いやすさの、両方を大切にします。',
  },
  {
    no: '07',
    question: '制作にAIを使用していますか？',
    answer:
      'AIを活用して構成・文章・ビジュアル案・実装を効率化しながら、最終的な見せ方と品質は丁寧に調整します。AIを使うことで、スピードとクオリティを両立させています。',
  },
  {
    no: '08',
    question: '公開・運用までサポートしてもらえますか？',
    answer:
      'Vercel、GitHub Pagesなどを使った公開までの流れもサポートします。公開前の確認、軽い微調整、公開後の修正まで対応できます。',
  },
  {
    no: '09',
    question: 'どんな案件が得意ですか？',
    answer:
      '病院・クリニックなどの医療分野、店舗、中小企業、個人事業主、ブランドなど、信頼感と現場の運用の両方が問われる案件が得意です。AIシステム開発、業務改善システム、SaaS、Webアプリ、Webサイト制作まで、設計・実装・運用を一人で通して担当できるため、複数の外注先に分ける必要がありません。',
  },
]
