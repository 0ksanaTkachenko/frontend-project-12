import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      general: {
        notFoundTitle: 'Page not found',
        notFoundMessage: 'But you can go',
        mainPageLink: 'to the main page',
        loading: 'Loading...',
        connectionLost: 'Connection lost',
        cancel: 'Cancel',
        add: 'Add',
        delete: 'Delete',
        rename: 'Rename',
        areYouSure: 'Are you sure?',
        send: 'Send',
      },
      auth: {
        register: 'Register',
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        usernameLabel: 'Your username',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
        login: 'Login',
        logout: 'Logout',
      },
      messages: {
        messages_one: '{{count}} message',
        messages_other: '{{count}} messages',
        enterMessage: 'Enter a message...',
        newMessage: 'New message',
      },
      channels: {
        channels: 'Channels',
        manageChannel: 'Manage Channel',
        addChannel: 'Add Channel',
        editChannel: 'Edit Channel',
        deleteChannel: 'Delete Channel',
        channelName: 'Enter channel name',
      },
      errors: {
        userExists: 'User with this username already exists',
        errorOccurred: 'An error occurred. Please try again.',
        channelsLoadError: 'Failed to load channels',
        sendMessageError: 'Failed to send the message',
      },
      validation: {
        usernameMin: 'Username must be at least 3 characters',
        usernameMax: 'Username must be no more than 20 characters',
        usernameRequired: 'Please enter your username',
        passwordMin: 'Password must be at least 6 characters',
        passwordRequired: 'Please enter your password',
        passwordMismatch: 'Passwords must match',
        reEnteredPasswordRequired: 'Please re-enter your password',
        channelNameMin: 'Channel name must be at least 3 characters long',
        channelNameMax: 'Channel name must not exceed 20 characters',
        channelNameRequired: 'Channel name is required',
        channelNameExists: 'Channel already exists',
      },
    },
  },
  ru: {
    translation: {
      general: {
        notFoundTitle: 'Страница не найдена',
        notFoundMessage: 'Но вы можете перейти',
        mainPageLink: 'на главную страницу',
        loading: 'Загрузка...',
        connectionLost: 'Соединение потеряно',
        cancel: 'Отменить',
        add: 'Добавить',
        delete: 'Удалить',
        rename: 'Переименовать',
        areYouSure: 'Уверены?',
        send: 'Отправить',
      },
      auth: {
        register: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        usernameLabel: 'Ваш ник',
        noAccount: 'Нет аккаунта?',
        signUp: 'Зарегистрироваться',
        login: 'Войти',
        logout: 'Выйти',
      },
      messages: {
        messages_one: '{{count}} сообщение',
        messages_few: '{{count}} сообщения',
        messages_many: '{{count}} сообщений',
        enterMessage: 'Введите сообщение...',
        newMessage: 'Новое сообщение',
      },
      channels: {
        channels: 'Каналы',
        manageChannel: 'Управление каналом',
        addChannel: 'Добавить канал',
        editChannel: 'Редактировать канал',
        deleteChannel: 'Удалить канал',
        channelName: 'Введите имя канала',
      },
      errors: {
        userExists: 'Пользователь с таким именем уже существует',
        errorOccurred: 'Произошла ошибка. Попробуйте снова',
        channelsLoadError: 'Ошибка загрузки каналов',
        sendMessageError: 'Не удалось отправить сообщение',
      },
      validation: {
        usernameMin: 'Ник должен содержать не менее 3 символов',
        usernameMax: 'Ник должен содержать не больше 20 символов',
        usernameRequired: 'Введите ваш ник',
        passwordMin: 'Пароль должен содержать не менее 6 символов',
        passwordRequired: 'Введите ваш пароль',
        passwordMismatch: 'Пароли должны совпадать',
        reEnteredPasswordRequired: 'Введите ваш пароль повторно',
        channelNameMin: 'Название канала должно содержать не менее 3 символов',
        channelNameMax: 'Название канала должно содержать не более 20 символов',
        channelNameRequired: 'Название канала обязательно',
        channelNameExists: 'Канал уже существует',
      },
    },
  },
};

const i18nInit = () => {
  return i18next.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const t = i18next.t.bind(i18next);
export default i18nInit;
