# AICMODE Portfolio

鹿児島を拠点に、AIシステム開発・業務自動化・API連携・Webアプリ開発を中心に扱う、フリーランス開発者の営業型ポートフォリオサイトです。

黒を基調としたダークエディトリアルデザインで、AI・自動化のケーススタディ6件と、Webアプリ・Webサイト・LP・ECサイトの制作物26件を掲載しています。

公開URL: https://aicmode-portfolio.vercel.app/

## 掲載内容について

掲載しているプロジェクトは、すべて自主制作または学習課題として制作したものです。実在するクライアントの受託案件ではありません。

そのため、このサイトには次のものを一切掲載していません。

- クライアント名・企業名
- 売上・導入実績・利用者数
- お客様の声・レビュー・評価

各カードの `Status` は、実際にURLへアクセスして確認した状態を表示しています。

| Status | 意味 |
| --- | --- |
| `Released` | 公開中で、アクセスできる状態 |
| `Case Study` | 設計・ドキュメントのみで、稼働している環境はない |
| `Training Project` | 学習課題として制作し、公開しているもの |
| `Demo Temporarily Unavailable` | 以前は公開していたが、現在アクセスできない |
| `Deployment Required` | 実装済みだが、まだデプロイしていない |
| `Source Code Available` | APIキーを設定してローカル実行する構成。ソースのみ公開 |

Status の定義は [`app/types/project.ts`](app/types/project.ts) で一元管理しており、ボタンのラベルもここから決まります。公開先がないプロジェクトに「Open Site」が表示されることはありません。

## 主な特徴

- **AI Systems & Automation Case Studies** — 課題・目的・MVP範囲・Phase 2・アーキテクチャ・セキュリティ制約までをモーダルで表示
- **Healthcare × AI** — 看護師として約9年間の現場経験に基づく、医療・介護分野での要件整理と安全設計の方針
- **Three Service Entrances** — AI・自動化、業務Webアプリ、医療デジタル支援の3分類から相談内容を選べる構成
- **How I Work** — MVP、制約共有、公開前テスト、セキュリティ確認の方針
- **Selected Works** — 営業上重要な8件を初期表示
- **Works Archive** — 全26件をカテゴリー別に絞り込み表示
- **Project Detail Modal** — フォーカストラップ、Escapeで閉じる、閉じたあとのフォーカス復帰に対応
- **Responsive Design** — 375px から 1440px 以上まで対応
- **Accessible Interactions** — スキップリンク、`aria-expanded` / `aria-controls` 付きアコーディオン、`:focus-visible` のフォーカス表示
- **Reduced Motion** — OSの「視差効果を減らす」設定を尊重（CSSアニメーションと framer-motion の両方）
- **Boot Recovery** — JSバンドルの読み込みに失敗した場合の復帰処理をインラインスクリプトで実装
- **SEO** — `metadataBase` / canonical / Open Graph / Twitter Card / 構造化データ（Person・ProfessionalService・FAQPage・ItemList）/ robots / sitemap / 自動生成OG画像

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion
- Vercel (ホスティング)

開発時の確認用に Playwright を devDependencies に含めています（アプリ本体では使用しません）。

## Local Setup

Node.js は Next.js 16 の要件に合わせてください。

```bash
npm install
npm run dev
```

http://localhost:3000 を開きます。

## Quality Checks

公開前に以下を実行します。

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # 本番ビルド
```

ビルドの成功だけでは確認完了としていません。合わせて次を確認します。

- トップページの初期表示（エラーUIが出ないこと）
- Hero の CTA が Services / Selected Works へ遷移すること
- Works Archive のカテゴリー絞り込み
- Case Study / Work の詳細モーダルの開閉（Escape・フォーカス復帰）
- FAQ アコーディオンの開閉
- モバイルメニューの開閉
- 外部リンクのHTTPステータス
- Console Error の有無
- 375 / 390 / 768 / 1024 / 1440px での横スクロールの有無

## Project Structure

```text
app/
├── components/
│   ├── Nav.tsx                # 固定ナビ + モバイルメニュー
│   ├── Hero.tsx               # ファーストビュー
│   ├── CaseStudies.tsx        # AI & Automation ケーススタディ
│   ├── HealthcareAI.tsx       # 医療現場経験と安全設計の方針
│   ├── SelectedWorks.tsx      # 厳選8件
│   ├── WorksArchive.tsx       # 全26件 + カテゴリー絞り込み
│   ├── WorkPoster.tsx         # 作品カード + 詳細モーダルの中身
│   ├── DetailModal.tsx        # アクセシブルなダイアログ
│   ├── Services.tsx           # 課題起点のServices + 成果物起点のCapabilities
│   ├── About.tsx              # プロフィール + 6つの強み
│   ├── Process.tsx            # 制作フロー（01–05）
│   ├── Trust.tsx              # How I Work / 依頼前の安心材料
│   ├── Skills.tsx             # カテゴリ別スキル
│   ├── FAQ.tsx                # アコーディオン
│   ├── Contact.tsx            # 問い合わせ導線
│   ├── Footer.tsx
│   ├── AnimateIn.tsx          # スクロール連動フェードイン
│   ├── MotionPreferences.tsx  # prefers-reduced-motion への対応
│   ├── BootRecovery.tsx       # バンドル読み込み失敗時の復帰処理
│   └── ClientHealth.tsx       # 起動確認と古いキャッシュの掃除
├── data/
│   ├── projects.ts            # 作品26件
│   ├── caseStudies.ts         # ケーススタディ6件
│   ├── services.ts            # Services / Capabilities / Process
│   ├── skills.ts              # スキル一覧
│   └── faqs.ts                # FAQ（FAQPage構造化データと共用）
├── types/
│   └── project.ts             # Status / ProjectType / カテゴリーの型とラベル
├── hooks/
│   └── useInView.ts
├── layout.tsx                 # メタデータ・フォント・スキップリンク
├── page.tsx                   # セクション構成 + 構造化データ
├── opengraph-image.tsx        # OG画像（ビルド時に生成）
├── twitter-image.tsx
├── robots.ts
├── sitemap.ts
├── error.tsx                  # ルートエラーバウンダリ
├── global-error.tsx
└── globals.css
public/
└── works/                     # 作品サムネイルとケーススタディのスクリーンショット
```

コンテンツは `app/data/` に分離してあるため、作品やケーススタディの追加はデータファイルの編集だけで完結します。カテゴリー・ステータス・CTAラベルは型定義側で管理されているため、表示のずれが起きません。

## Deployment

Vercel に GitHub リポジトリを接続して自動デプロイしています。

`next.config.ts` では、`/` のHTMLドキュメントに `Cache-Control: public, max-age=0, must-revalidate` を設定しています。これは、古いデプロイのHTMLがブラウザに残り、すでに存在しない `/_next/static` のハッシュ付きチャンクを読み込んで白画面になる問題を防ぐためです。ハッシュ付きアセット自体のヘッダーは上書きしていません。

## 利用上の注意

このリポジトリはポートフォリオサイトのソースコードです。デザイン・文章・掲載作品の内容は、そのままの再利用を想定していません。

APIキーやトークンはこのリポジトリに含まれていません。掲載しているプロジェクト側でも、認証情報はすべて環境変数で管理しています。
