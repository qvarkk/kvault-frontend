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
  },
  nav: {
    home: "Главная",
    notes: "Заметки",
    files: "Файлы",
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
  files: {
    search: "Поиск файлов...",
    download: "Скачать",
    empty: "Пока что нет файлов",
    dropHere: "Перенесите PDF файлы сюда",
    onlyPdf: "Поддерживаются только PDF файлы",
    upload: {
      first: "Загрузите ваш первый файл",
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
  common: {
    retry: "Повторить",
    cancel: "Отмена",
    create: "Создать",
    upload: "Загрузить",
    creating: "Создание...",
    saving: "Сохранение...",
    delete: "Удалить",
  },
}
