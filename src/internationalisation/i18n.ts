import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './locales/en/translation.json';
import french from './locales/fr/translation.json';
console.table(french)
console.table(english)

export const i18nInit = async () => i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'fr',
    lng: 'en',
    load: 'all',
    ns: ["translation"],
    defaultNS: "translation",
    resources: { en: {translation: english}, fr: {translation: french} },
    react: { wait: true },
    interpolation: { escapeValue: false },
  });

export default i18n;
