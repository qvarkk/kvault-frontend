export default {
  auth: {
    login: {
      action: "Вход",
      title: "Войдите в свой аккаунт",
      message: "С возвращением! Приступим к работе?",
    },
    signUp: {
      action: "Регистрация",
      title: "Создать аккаунт",
      message: "Ваши заметки - ваша крепость. Начните прямо сейчас.",
    },
    success: "Успешный вход",
    email: "Эл. Почта",
    password: "Пароль",
  },
  validation: {
    email: "Введите существующую эл. почту",
    password: {
      min: "Пароль должен быть не короче {min} символов",
    },
  },
  head: {
    login: "Вход",
    signUp: "Регистрация",
    home: "Главная",
    notes: "Заметки",
    note: "Заметка",
    files: "Файлы",
    about: "О приложении",
  },
  nav: {
    home: "Главная",
    notes: "Заметки",
    files: "Файлы",
    about: "О приложении",
    account: "Аккаунт",
    settings: "Настройки",
    logout: "Выход",
  },
  errors: {
    network: {
      title: "Ошибка подключения",
      detail:
        "Не удалось получить ответ от сервера. Проверьте свое соединение.",
    },
    internal: {
      title: "Внутренняя ошибка",
      detail: "Пожалуйста, попробуйте еще раз позже.",
    },
    notFound: {
      message: "Не найдено",
    },
  },
  home: {
    greeting: "С возвращением",
    subtitle: "Продолжим там, где вы закончили",
    viewAll: "Все заметки",
  },
  notes: {
    backToNotes: "Назад к заметкам",
    search: "Поиск заметок...",
    empty: "Пока что нет заметок",
    create: {
      title: "Новая заметка",
      placeholder: "Заголовок заметки...",
      created: "Заметка создана",
      first: "Создайте свою первую заметку",
    },
    update: {
      saved: "Заметка сохранена",
      unsaved: "Не сохранено",
      autotag: "Автотеги",
      titleChanged: "Заголовок был успешно изменен",
    },
    delete: {
      title: "Удалить заметку?",
      description: "Эта заметка будет перенесена в корзину.",
      deleted: "Заметка перенесена в корзину",
    },
    sort: {
      updatedAt: "Последнее обновление",
      createdAt: "Время создания",
      title: "Заголовок",
    },
    tags: {
      add: "Добавить",
      create: 'Создать "{name}"',
      filter: "Теги",
      search: "Поиск тегов...",
      none: "Ничего не найдено",
      clear: "Очистить выбор",
      generate: "Сгенерировать",
    },
    editor: {
      exportPdfTitle: "Экпорт в PDF",
      exportPdfButton: "Экспорт",
      exportPdfSuccess: "PDF успешно экспортирован",
      exportPdfErrorTitle: "Внутренняя ошибка",
      exportPdfErrorDescription:
        "Неизвестная ошибка произошла при экспорте PDF",
    },
  },
  shortcuts: {
    title: "горячие клавиши",
    hide: {
      action: "убрать",
      undo: "Отмена",
      message: {
        title: "Горячие клавишы убраны",
        description: "Это может быть изменено в настройках.",
      },
    },
    actions: {
      bold: "Жирный",
      italic: "Курсив",
      underline: "Подчеркнутый",
      strikethrough: "Зачеркнутый",
      subscript: "Нижний индекс",
      superscript: "Верхний индекс",
      undo: "Отмена",
      redo: "Вернуть",
      ul: "Упорядоченный список",
      ol: "Неупорядоченный список",
      link: "Ссылка",
    },
  },
  files: {
    search: "Поиск файлов...",
    download: "Скачать",
    empty: "Пока что нет файлов",
    dropHere: "Перенесите PDF файлы сюда",
    onlyPdf: "Поддерживаются только PDF файлы",
    upload: {
      first: "Загрузите ваш первый файл",
      uploaded: "Файл успешно загружен",
    },
    delete: {
      title: "Удалить файл?",
      description: "Этот файл будет перемещен в корзину.",
      deleted: "Файл перенесен в корзину",
    },
    status: {
      ready: "Готов",
      uploading: "Загружается",
      processing: "Обрабатывается",
      error: "Ошибка",
    },
    sort: {
      createdAt: "Дата загрузки",
      name: "Название",
      size: "Размер",
    },
  },
  settings: {
    title: "Настройки",
    tabs: {
      account: "Аккаунт",
      stopwords: "Стоп-слова",
      tags: "Теги",
    },
    account: {
      description: "Настройки аккаунта",
      email: "Эл. Почта",
      editor: {
        title: "Настройки редактора",
        hideShortcuts: "Спрятать меню горячих клавиш",
      },
      apiKey: {
        name: "API Ключ",
        title: "Обновить API Ключ",
        description: "Обновление API ключа деактивирует текущий ключ.",
        refresh: "Обновить",
        refreshed: "API ключ обновлен",
      },
      password: {
        title: "Сменить пароль",
        description: "Обновление пароля вашего аккаунта.",
        action: "Сменить",
        old: "Текущий Пароль",
        new: "Новый Пароль",
        changed: "Пароль успешно изменен",
      },
      delete: {
        title: "Удалить аккаунт",
        description:
          "Это действие удалит всю вашу информацию навсегда, включая файлы, заметки и теги.",
        action: "Удалить",
        iUnderstand: "Я понимаю последствия",
        password: "Пароль",
        forever: "Удалить навсегда",
        deleted: "Аккаунт удален",
      },
    },
    stopwords: {
      description:
        "Слова, исключенные из автотегирования. Отключайте стандартные или добавляйте свои.",
      search: "Поиск стоп-слов...",
      empty: "Стоп-слов не найдено",
      sources: {
        all: "Все источники",
        user: "Пользовательские",
        default: "Стандартые",
      },
      sort: {
        word: "Слово",
        source: "Источник",
        updatedAt: "Дата обновления",
      },
      add: {
        placeholder: "Добавить новое стоп-слово...",
      },
    },
    tags: {
      description: "Нажмите на название тега, чтобы переименовать его.",
      search: "Поиск тегов...",
      empty: "Тегов не найдно",
      fields: {
        noteCount: "{count} заметок",
      },
      sort: {
        name: "Название",
        updatedAt: "Последнее обновление",
        createdAt: "Дата создания",
      },
      add: {
        placeholder: "Добавить новый тег...",
      },
    },
  },
  about: {
    tagline: "Self-hosted персональная база знаний",
    what: {
      title: "Что это такое",
      description:
        "kvault это бесплатная, self-hosted альтернатива коммерческим приложениям заметок. Храните заметки, автоматически прикрепляйте к ним теги, и храните свои файлы — все на своей инфраструктуре. Никаких подписок, телеметрии и привязок к платформе.",
    },
    details: {
      title: "Подробнее",
      version: "Версия",
      license: "Лицензия",
      deployment: "Деплой",
      storage: "Хранилище",
    },
    stack: "Стек технологий",
    repositories: "Репозитории",
    selfHosting: {
      title: "Self-hosting",
      description: "Склонируйте репозиторий, настройте",
      description2: "файлы, и выполните команду",
    },
    alpha: {
      title: "Alpha версия",
      warning: "Ожидайте обратную несовместимость между версиями",
    },
  },
  common: {
    retry: "Повторить",
    cancel: "Отмена",
    create: "Создать",
    upload: "Загрузить",
    save: "Сохранить",
    add: "Добавить",
    creating: "Создание...",
    saving: "Сохранение...",
    delete: "Удалить",
    open: "Открыть",
    openInNewTab: "Открыть в новой вкладке",
  },
}
