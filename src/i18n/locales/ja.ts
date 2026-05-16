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
    notes: "ノート",
    note: "ノート",
    files: "ファイル",
    about: "アプリについて",
  },
  nav: {
    home: "マイページ",
    notes: "ノート",
    files: "ファイル",
    about: "このアプリについて",
    account: "アカウント",
    settings: "設定",
    logout: "ログアウト",
  },
  errors: {
    network: {
      title: "ネットワークエラー",
      detail: "サーバーに接続できません。接続状況を確認してください。",
    },
    internal: {
      title: "内部エラー",
      detail: "しばらくしてからもう一度お試しください",
    },
    notFound: {
      message: "見つかりませんでした",
    },
  },
  home: {
    greeting: "おかえりなさい",
    subtitle: "前回の続きますはこちらです",
    viewAll: "全てのノートを表示",
  },
  notes: {
    backToNotes: "ノート一覧に戻る",
    search: "ノートを検索...",
    empty: "ノートはまだありません",
    create: {
      title: "新規ノート",
      placeholder: "ノートのタイトル...",
      created: "ノートを作成しました",
      first: "最初のノートを作成しましょう",
    },
    update: {
      saved: "保存しました",
      unsaved: "未保存",
      autotag: "自動タグ生成",
      titleChanged: "タイトルを正常に変更しました",
    },
    delete: {
      title: "ノートを削除しますか？",
      description: "このノートはゴミ箱に移動されます。",
      deleted: "ノートをゴミ箱に移動しました",
    },
    sort: {
      updatedAt: "更新日時",
      createdAt: "作成日時",
      title: "タイトル",
    },
    tags: {
      add: "追加",
      create: "「{name}」を作成",
      filter: "タグ",
      search: "タグを検索...",
      none: "タグがみつかりません",
      clear: "クリア",
      generate: "生成",
    },
    editor: {
      exportPdfTitle: "PDFとしてエクスポート",
      exportPdfButton: "エクスポート",
      exportPdfSuccess: "PDFを正常にエクスポートしました",
      exportPdfErrorTitle: "予期しないエラー",
      exportPdfErrorDescription:
        "PDFのエクスポート中に不明なエラーが発生しました",
    },
  },
  shortcuts: {
    title: "キーボードショートカット",
    hide: {
      action: "隠す",
      undo: "元に戻す",
      message: {
        title: "ショートカットを非表示にしました",
        description: "この設定設定画面から変更できます。",
      },
    },
    actions: {
      bold: "太字",
      italic: "斜体",
      underline: "下線",
      strikethrough: "取り消し線",
      subscript: "下付き文字",
      superscript: "上付き文字",
      undo: "元に戻す",
      redo: "やり直す",
      ul: "番号なし箇条書き",
      ol: "番号付の箇条書き",
      link: "リンク",
    },
  },
  files: {
    search: "ファイルを検索...",
    download: "ダウンロード",
    empty: "ファイルはまだありません",
    dropHere: "ここにPDFファイルをドロップしてください",
    onlyPdf: "PDFファイルのみアップロード可能です",
    upload: {
      first: "最初のファイルをアップロードしましょう",
      uploaded: "ファイルは正常にアップロードしました",
    },
    delete: {
      title: "ファイルを削除しますか？",
      description: "このファイルはゴミ箱の移動されます.",
      deleted: "ファイルはゴミ箱に移動しました",
    },
    status: {
      ready: "準備完了",
      uploading: "アップロード中",
      processing: "処理中",
      error: "エラー",
    },
    sort: {
      createdAt: "アップロード日時",
      name: "名前",
      size: "サイズ",
    },
  },
  settings: {
    title: "設定",
    tabs: {
      account: "アカウント",
      stopwords: "ストップワード",
      tags: "タグ",
    },
    account: {
      description: "アカウント設定",
      email: "メールアドレス",
      editor: {
        title: "エディタ設定",
        hideShortcuts: "ショートカットメニューを非表示にする",
      },
      apiKey: {
        name: "APIキー",
        title: "APIキーを再生成",
        description: "APIキーを再生成すると、現在のキーは無効になります。",
        refresh: "再生成",
        refreshed: "APIキーを再生成しました",
      },
      password: {
        title: "パスワード変更",
        description: "アカウントのパスワードを変更します。",
        action: "変更",
        old: "現在のパスワード",
        new: "新しいパスワード",
        changed: "パスワード正常に変更しました",
      },
      delete: {
        title: "アカウント削除",
        description:
          "この操作を行うと、ノート、ファイル、タグを含むすべてのデータが完全に削除されます",
        action: "削除",
        iUnderstand: "リスクを理解して同意する",
        password: "パスワード",
        forever: "永久に削除",
        deleted: "アカウントを削除しました",
      },
    },
    stopwords: {
      description:
        "自動タグ生成から除外される単語です。デフォルトを無効にするか、独自の単語を追加してください。",
      search: "ストップワードを検索...",
      empty: "ストップワードが見つかりません",
      sources: {
        all: "すべてのソース",
        user: "ユーザー",
        default: "デフォルト",
      },
      sort: {
        word: "単語",
        source: "ソース",
        updatedAt: "更新日時",
      },
      add: {
        placeholder: "新しいストップワードを追加...",
      },
    },
    tags: {
      description: "タグ名をクリックすると変更できます。",
      search: "タグを検索...",
      empty: "タグが見つかりません",
      fields: {
        noteCount: "{count}個のノート",
      },
      sort: {
        name: "名前",
        updatedAt: "更新日時",
        createdAt: "作成日時",
      },
      add: {
        placeholder: "新しいタグを追加...",
      },
    },
  },
  about: {
    tagline: "セルフホスト型の個人向けナレッジベース",
    what: {
      title: "何々",
      description:
        "kvaultは、商用のノートアプリに代わる、無料のセルフホスト型代替手段です。ノートを保存、自動タグ生成、ファイルの管理をすべて自身のインフラ上でおこなえます。サブスクリプションなし、テレメトリーなし、ロックインなし。",
    },
    details: {
      title: "詳細仕様",
      version: "バージョン",
      license: "ライセンス",
      deployment: "デプロイ環境",
      storage: "ストレージ",
    },
    stack: "使用技術",
    repositories: "リポジトリ",
    selfHosting: {
      title: "セルフホスト",
      description: "レポジトリをクローンし、",
      description2: "ファイルを設定して、実行します：",
    },
    alpha: {
      title: "アルファ版ソフトウェア",
      warning: "バージョン間で破壊的変更が発生する可能性があります。",
    },
  },
  common: {
    retry: "リトライ",
    cancel: "キャンセル",
    create: "作成",
    upload: "アップロード",
    save: "保存",
    add: "追加",
    creating: "作成中...",
    saving: "保存中...",
    delete: "削除",
    open: "開く",
    openInNewTab: "新しいタブで開く",
  },
}
