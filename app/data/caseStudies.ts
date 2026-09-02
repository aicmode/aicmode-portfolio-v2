import type { CaseStudy } from '../types/project'

/**
 * AI & automation case studies.
 *
 * Every entry here is backed by a public repository under github.com/aicmode
 * that was read before writing this file: the problem, feature list, stack and
 * architecture notes all come from that repository's own README / design doc.
 * `status` was set from an actual HTTP check of the URL, not from an assumption.
 *
 * Deliberately absent from this file:
 *   - client names, revenue figures, user counts, testimonials
 *   - quantified impact ("cuts work by 50%"). `expectedImpact` states intent,
 *     which is all that can honestly be claimed for work that has not been run
 *     inside a client's operation.
 */
export const caseStudies: readonly CaseStudy[] = [
  {
    id: 'medibrief-ai',
    title: '受診メモ作成ツール',
    subtitle: 'MediBrief',
    plainSummary: '話したいことを書くだけで、病院で伝えやすいメモに整理してくれるツール。',
    group: 'AI Systems',
    projectType: 'Self-directed Project',
    role: ['企画', '要件整理', '設計', '開発', '動作確認'],
    status: 'released',
    problem:
      '診察時間は短く、患者は緊張して伝えたいことを忘れるため、医師が判断に必要な情報が揃わない。',
    solution:
      '話し言葉の自由入力を、診察で伝えやすい7項目の受診メモへ自動で整理するWebアプリを設計・実装しました。',
    plainFeatures: [
      '話し言葉で書いた内容を、伝わる順番に整理',
      'いつから、どんな症状かを時系列でまとめる',
      '医師に聞きたいことを質問文にする',
    ],
    features: [
      '自由入力から7項目の受診メモを生成',
      '時期と症状を組にした経過の整理',
      '医師に尋ねる質問文の組み立て',
      '空欄は推測で埋めず「書き足し方」だけを案内',
      'コピー・印刷での持ち出し',
      'ルールベースとAI経路を差し替え可能な構成',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'OpenAI API (optional)', 'Vercel'],
    accent: '#5fd2c2',
    detail: {
      goal:
        '受診前の数分で「何を、どの順番で伝えるか」を確定させ、限られた診察時間を症状の説明ではなく相談に使える状態にすること。',
      proposedSolution: [
        '話し言葉のまま書ける単一の入力欄に絞り、フォーム入力の負担をなくす',
        '入力を文単位に分解し、症状・時期・変化・状況・服薬・質問へ振り分ける',
        '医学的判断（病名・薬・緊急度）は一切行わず、整理だけに機能を限定する',
        '拾えなかった項目は空欄のまま残し、補い方だけを提示する',
      ],
      mvpScope: [
        '自由入力 → 7項目の受診メモ生成',
        '入力例3件による動作確認',
        'コピー／印刷／クリア',
        'ブラウザ内処理（APIキー設定なしで動作）',
        'スマホ・PC両対応のレイアウト',
      ],
      phase2: [
        'AI経路（OpenAI API）を既定にした精度改善',
        '生成結果の項目ごとの手直しと保存',
        '経過を複数回分並べて比較する表示',
        '家族・介助者が代理入力する場合の項目追加',
      ],
      architecture: [
        '整理ロジックを `MemoOrganizer` インターフェースで抽象化し、実装を差し替え可能に',
        '既定は依存ライブラリなしのルールベース（`lib/organizer/rule-based.ts`）',
        'AI経路は `/api/organize` のRoute Handler経由。応答は受け取り側で検証',
        'APIキー未設定・API失敗時はサーバー側でルールベースへフォールバック',
      ],
      security: [
        '既定ではブラウザ内だけで処理し、入力を外部送信・保存しない',
        'APIキーはサーバー側の環境変数のみ。クライアントへは渡さない',
        'システムプロンプトでも病名・薬・緊急度の出力を明示的に禁止',
        '体調は機微情報のため、AI経路を使う場合は送信先の規約確認を前提とする',
        '「診断ではありません」の注意書きを画面とコピー結果の両方に固定表示',
      ],
      expectedImpact: [
        '伝え忘れを減らし、診察で症状の経過を言葉にできる状態を目指す',
        '医師が把握するまでの時間短縮を想定',
        '問診票への転記・二重入力を減らす設計',
      ],
    },
    liveUrl: 'https://medibrief-ai.vercel.app',
    githubUrl: 'https://github.com/aicmode/medibrief-ai',
    screenshot: '/works/case-studies/medibrief-ai.png',
    screenshotAlt: 'MediBriefの画面。自由入力から7項目の受診メモが生成されている',
    order: 1,
    year: 2026,
  },
  {
    id: 'slack-line-summary',
    title: '連絡まとめ通知ツール',
    subtitle: 'Slack / LINE 連携',
    plainSummary: '大事な連絡をAIがまとめて、LINEへ届ける仕組み。',
    group: 'Automation',
    projectType: 'Training Project',
    role: ['開発', '動作確認', '説明書づくり'],
    status: 'source-only',
    statusNote: 'Slack / OpenAI / LINE の各APIキーを設定して実行する構成のため、公開デモは用意していません。',
    problem:
      'Slackの流量が多い現場では重要な連絡が流れてしまい、期限や対応依頼の見落としが起きる。',
    solution:
      '指定チャンネルの最新メッセージをAIで日本語要約し、LINEへ自動送信するツールをPythonで実装しました。',
    plainFeatures: [
      'たくさんの連絡から大事な部分だけを抜き出す',
      '「対応すること」「期限」に絞ってまとめる',
      'まとめた内容をLINEに自動で送る',
    ],
    features: [
      'Slack Web APIによるチャンネル履歴の取得',
      'OpenAI APIで「重要事項・対応事項・期限」に絞った要約',
      'LINE Messaging APIのPush Messageで送信',
      'DRY_RUNモードで送信前に内容を確認',
      '各ステップの成否をログ出力',
      '取得件数・モデル・送信先を環境変数で切り替え',
    ],
    stack: ['Python', 'Slack Web API', 'OpenAI API', 'LINE Messaging API', 'python-dotenv'],
    accent: '#8b7cf6',
    detail: {
      goal:
        'Slackを常時見ていなくても、対応が必要な内容だけが手元のLINEに届く状態をつくること。',
      proposedSolution: [
        '通知の全転送ではなく、AIで要約してから送ることで読む量を減らす',
        '要約の観点を「重要事項・対応事項・期限」に固定し、出力を安定させる',
        '送信先をLINEにして、Slackを開かずに把握できる導線にする',
        '実行はまずDRY_RUNで検証し、内容を確認してから本番送信に切り替える',
      ],
      mvpScope: [
        '1チャンネルの最新N件の取得',
        '日本語要約の生成',
        '指定ユーザーへのLINE送信',
        'DRY_RUNによる事前確認',
        'エラー内容と対処を切り分けられるログ',
      ],
      phase2: [
        '複数チャンネル・複数送信先への対応',
        '定期実行（スケジューラ）による日次・週次サマリー',
        '緊急度による送信先や通知方法の振り分け',
        'Gmailなど他チャネルからの取り込み',
        '要約結果のスプレッドシート蓄積',
      ],
      architecture: [
        '責務ごとにモジュール分割：`slack_client.py` / `summarizer.py` / `line_sender.py`',
        '`config.py` が環境変数を読み込み、起動時に不足を検証',
        '`main.py` が 取得 → 要約 → 送信 の順で実行し、各段の結果を出力',
        '同期的な一方向パイプラインなので、失敗した段を切り分けて再実行できる',
      ],
      security: [
        'トークン・APIキーはすべて `.env`（`.gitignore` 対象）で管理し、コードに書かない',
        'Slack Botの権限は `channels:history` など必要最小限のスコープのみ',
        'DRY_RUNを既定の検証手段とし、意図しない外部送信を防ぐ',
        '要約対象はチャンネル単位で限定し、取得範囲を広げない',
      ],
      expectedImpact: [
        '重要な連絡の見落としを減らすことを目指す',
        'Slackを都度確認する回数の削減を想定',
        '「読む量」を減らして判断に必要な情報だけを届ける設計',
      ],
    },
    githubUrl: 'https://github.com/aicmode/slack-line-summary-tool',
    order: 2,
    year: 2026,
  },
  {
    id: 'dify-ai-chat',
    title: 'AIチャット窓口',
    subtitle: 'Dify AI Chat',
    plainSummary: 'よくある質問にAIが自動で答える、サイト用のチャット窓口。',
    group: 'AI Systems',
    projectType: 'Training Project',
    role: ['要件整理', '設計', '開発', '動作確認'],
    status: 'released',
    statusNote:
      '無料プランのホスティングを使用しているため、アクセスがない時間帯は初回表示に起動待ちが発生する場合があります。',
    problem:
      '問い合わせ対応をAIで補助したいが、APIキーの扱いと会話の継続方法が分からず自社サイトに置けない。',
    solution:
      'Dify Chat APIをサーバー側で中継し、ブラウザから会話できるチャットUIをNode.js・Expressで実装・公開しました。',
    plainFeatures: [
      'サイト上でAIと会話できる',
      '前の質問を覚えたまま会話が続く',
      '話をリセットして最初から聞き直せる',
    ],
    features: [
      'Dify Chat APIとの連携（blockingモード）',
      'conversation_idによる会話の継続',
      'New Chatでの会話リセット',
      'ローディング表示と二重送信防止',
      '日本語のエラーメッセージ表示',
      'APIキーをブラウザへ一切露出させないサーバー構成',
    ],
    stack: ['Node.js', 'Express', 'Dify Chat API', 'HTML / CSS / JavaScript', 'Render'],
    accent: '#5b8cff',
    detail: {
      goal:
        'AIチャットを自社ドメインに置く際の最小構成を、そのまま運用に載せられる形で示すこと。',
      proposedSolution: [
        'ブラウザからAI APIを直接呼ばず、Expressをプロキシにしてキーをサーバー側へ閉じ込める',
        '`conversation_id` を保持して文脈を継続し、リセット操作を明示的に用意する',
        '通信中・失敗時の状態を画面上で分かる形にする',
        'Difyのアプリ側でプロンプトとナレッジを管理し、コード変更なしで応答を調整できるようにする',
      ],
      mvpScope: [
        'メッセージ送信とAI応答の表示',
        '会話の継続とリセット',
        'ローディング状態と二重送信防止',
        'エラー時の日本語表示',
        'PC・スマートフォン対応',
      ],
      phase2: [
        'ストリーミング表示（`response_mode: streaming`）',
        'Markdown応答の整形表示',
        '会話履歴の保存と復元',
        'ユーザーごとの識別',
        'レートリミットと認証による本番運用対応',
      ],
      architecture: [
        'ブラウザ → Express（`server.js`）→ Dify `POST /v1/chat-messages` の3層',
        '静的ファイルは `public/` から配信し、フロントはフレームワーク非依存',
        '会話継続は `conversation_id` の受け渡しのみで実現',
        'デプロイはRender。環境変数はホスティング側で設定',
      ],
      security: [
        'APIキーはサーバーの環境変数のみで保持し、レスポンスにも含めない',
        '`.env` は `.gitignore` 対象。READMEにも実値を書かない',
        '空文字送信と二重送信を入口で弾き、無駄なAPI呼び出しを防ぐ',
        '本番運用ではレートリミットと認証の追加が必要（Phase 2として明示）',
      ],
      expectedImpact: [
        '一次対応をAIに任せ、問い合わせ対応の負担軽減を想定',
        '営業時間外の初期応答を確保することを目指す',
        'よくある質問への回答を人が繰り返し書く手間を減らす設計',
      ],
    },
    liveUrl: 'https://dify-ai-chatbot-web-app.onrender.com',
    githubUrl: 'https://github.com/aicmode/dify-ai-chatbot-web-app',
    screenshot: '/works/case-studies/dify-ai-chat.png',
    screenshotAlt: 'Dify AI Chatの画面。AIアシスタントとの会話UIが表示されている',
    order: 3,
    year: 2026,
  },
  {
    id: 'smart-expense-tracker',
    title: '支出まとめ画面',
    subtitle: 'Smart Expense Tracker',
    plainSummary: 'お金の使い方を記録すると、合計やグラフが自動で出てくるツール。',
    group: 'Web Applications',
    projectType: 'Self-directed Project',
    role: ['企画', '設計', '開発', '動作確認'],
    status: 'released',
    problem:
      '支出の記録と分析が別々のツールに分かれているため、合計や偏りを知るのに毎回集計し直すことになる。',
    solution:
      '記録・検索・集計・グラフ・CSV出力を1画面にまとめたダッシュボード型Webアプリを設計・実装しました。',
    plainFeatures: [
      '合計・件数・平均を自動で計算',
      '何にいくら使ったかをグラフで表示',
      '記録をまとめて書き出せる',
    ],
    features: [
      '合計額・件数・平均額・最大カテゴリの自動集計',
      'Rechartsによるカテゴリ別円グラフと月別推移グラフ',
      'タイトル・メモを対象にしたリアルタイム検索',
      'カテゴリ絞り込みと4種類の並び替え',
      'UTF-8 BOM付きCSVエクスポート',
      'データがない場合の専用Empty State',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Recharts', 'LocalStorage'],
    accent: '#a78bfa',
    detail: {
      goal:
        '判断に必要な数字（合計・平均・偏り・推移）を、集計作業なしで一画面から読み取れる状態にすること。',
      proposedSolution: [
        '入力・一覧・集計・可視化を同じ画面に置き、画面遷移をなくす',
        '指標カードで全体像、グラフで構成比と推移、一覧で明細という3段構成にする',
        '検索・絞り込み・並び替えを一覧の上部に集約する',
        '外部に出したい場合はCSVで持ち出せるようにする',
      ],
      mvpScope: [
        '支出の追加・編集・削除（削除前確認あり）',
        '入力バリデーション',
        '4指標の自動集計',
        'カテゴリ別・月別のグラフ',
        'CSVエクスポート',
        'Desktop / Tablet / Mobile対応',
      ],
      phase2: [
        '月次予算とカテゴリ別上限の設定',
        'CSVインポートとバックアップ復元',
        '定期支出の自動登録',
        '前月比・前年比・トレンド分析',
        '認証付きのクラウド同期モード',
      ],
      architecture: [
        '状態は `use-expenses` フックに集約し、LocalStorageと同期',
        '集計・検索・並び替え・検証は `lib/expense-utils.ts` に分離し、UIから独立',
        'CSV生成は `lib/csv.ts` に分離',
        'LocalStorageの読み書きはマウント後のみ実行し、SSR結果との不一致を回避',
      ],
      security: [
        'データはブラウザのLocalStorageのみに保存し、外部サーバーへ送信しない',
        '保存キーをバージョン付き（`...expenses.v1`）にし、形式変更時の破損を防ぐ',
        'デモデータは明示操作でのみ投入し、実データと混在させない',
        'サイトデータ消去で失われる前提をREADMEに明記し、CSVバックアップを案内',
      ],
      expectedImpact: [
        '判断に必要な情報を一画面へ集約することを目指す',
        '月次の集計作業をなくす設計',
        '偏りに気づくまでの時間短縮を想定',
      ],
    },
    liveUrl: 'https://smart-expense-tracker-zeta-lac.vercel.app',
    githubUrl: 'https://github.com/aicmode/smart-expense-tracker',
    screenshot: '/works/case-studies/smart-expense-tracker.png',
    screenshotAlt: 'Smart Expense Trackerのダッシュボード。カテゴリ別円グラフと月別推移グラフ、明細一覧',
    order: 4,
    year: 2026,
  },
  {
    id: 'ai-subscription-doctor',
    title: '固定費チェックツール',
    subtitle: 'AI Subscription Doctor',
    plainSummary: '毎月の固定費をLINEに送ると、AIが年間いくらか計算して見直し案を返す仕組み。',
    group: 'AI Systems',
    projectType: 'Architecture Study',
    role: ['企画', '要件整理', '全体設計'],
    status: 'case-study',
    statusNote: '設計完了・実装準備中の案件です。設計書のみ公開しており、稼働中のBotはありません。',
    problem:
      'サブスクや固定費は1件が少額なため増えても気づきにくく、年間でいくら払っているかが把握できない。',
    solution:
      'LINEに固定費一覧を送るだけでAIが分類・年額換算・見直し提案を返し、スプレッドシートへ蓄積する仕組みを設計しました。',
    plainFeatures: [
      '送った内容から金額と項目を読み取る',
      '1年でいくら払うかを自動で計算',
      '見直したほうがよいものを順番に提案',
    ],
    features: [
      'テキストからサービス名と金額を分解',
      'カテゴリの自動分類',
      '月間合計と年額換算の算出',
      '用途が重複するサービスの指摘',
      '見直し候補と優先度（高・中・低）の提示',
      'Googleスプレッドシートへの自動保存',
    ],
    stack: ['Google Apps Script', 'LINE Messaging API', 'Claude API / OpenAI API', 'Google Sheets'],
    accent: '#6bcb6b',
    detail: {
      goal:
        '「何に・いくら払っているか」を送信するだけで可視化し、どこから見直すべきかの優先順位まで出すこと。',
      proposedSolution: [
        '入力を「1行＝1サービス」に限定し、フォームもアプリも作らずLINEだけで完結させる',
        '集計はコードで確定させ、AIには分類と見直し提案という判断の部分だけを任せる',
        '月額ではなく年額換算を主表示にして、金額の実感を持てるようにする',
        '結果をスプレッドシートに蓄積し、次回との比較を可能にする',
      ],
      mvpScope: [
        'テキスト入力の解析（サービス名＋金額）',
        'カテゴリ自動分類',
        '月間合計・年額換算',
        '重複検出と見直し候補の提示',
        '優先度付けと一言アドバイス',
        'スプレッドシート保存',
        'ヘルプ（使い方）応答',
      ],
      phase2: [
        '画面キャプチャからの読み取り',
        '推移のグラフ化',
        '複数ユーザー・世帯単位での管理',
        '定期リマインドによる見直しの習慣化',
      ],
      architecture: [
        'LINE → Webhook（GASの `doPost`）で受信',
        'GASがテキストを整形し、AI APIへリクエスト',
        '結果をLINEへ返信し、同時にスプレッドシートへ追記',
        'サーバーを持たない構成にすることで、運用コストと管理対象を減らす',
      ],
      security: [
        'APIキー・トークンはGASのスクリプトプロパティで管理し、コードに書かない',
        '保存先スプレッドシートの共有範囲を限定する前提',
        '金額情報を扱うため、AIへ渡す内容を必要な範囲に限定する',
        '実装前の設計段階であることを明示し、稼働中と誤認させない',
      ],
      expectedImpact: [
        '固定費の全体像を把握できる状態を目指す',
        '見直しの優先順位づけにかかる判断の負担軽減を想定',
        '記録ではなく提案まで返すことで、実際に見直しへ動ける設計',
      ],
    },
    githubUrl: 'https://github.com/aicmode/AI-SUBSCRIPTION-DOCTOR',
    order: 6,
    year: 2026,
  },
]
