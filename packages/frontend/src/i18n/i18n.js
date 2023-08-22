import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

const initI18n = () => {
  const i18n = i18next.createInstance();

  i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      fallbackLng: 'ru',
      debug: true,
      resources,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    })
    .catch((err) => console.error(err));

  return i18n;
};

export default initI18n;
