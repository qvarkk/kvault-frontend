export default {
  auth: {
    login: {
      action: "ログイン",
      title: "アカウントにログインする",
      message: "おかえりなさい！ 情報を入力してください。",
    },
    signUp: {
      action: "新規登録",
      title: "アカウントを登録する",
      message: "データはあなたのもの。すぐに始められます。",
    },
    success: "ログインしました",
    email: "メールアドレス",
    password: "パスワード",
  },
  validation: {
    email: "メールアドレスを確認してください",
    password: {
      min: "パスワードは{min}文字以上で入力してください",
    },
  },
  head: {
    login: "ログイン",
    signUp: "新規登録",
    home: "マイページ",
  },
  nav: {
    home: "マイページ",
    notes: "ノート",
    files: "ファイル",
    account: "アカウント",
    settings: "設定",
    logout: "ログアウト",
  },
  errors: {
    network: {
      title: "ネットワークエラー",
      detail: "サーバーに接続できません。接続状況を確認してください。",
    },
  },
  home: {
    greeting: "おかえりなさい",
    subtitle: "前回の続きますはこちらです",
    empty: "ノートはまだありません",
    createFirst: "最初のノートを作成しましょう",
    viewAll: "全てのノートを表示",
  },
  notes: {
    search: "ノートを検索...",
    sort: {
      updatedAt: "更新日時",
      createdAt: "作成日時",
      title: "タイトル",
    },
    tags: {
      filter: "タグ",
      search: "タグを検索...",
      none: "タグがみつかりません",
      clear: "クリア",
    },
  },
  common: {
    retry: "リトライ",
  },
}
