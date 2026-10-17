import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS } from "./translations";

// Resources loaded synchronously into i18next from our master translations
const resources = {
  mr: {
    translation: TRANSLATIONS.mr,
  },
  hi: {
    translation: TRANSLATIONS.hi,
  },
  en: {
    translation: TRANSLATIONS.en,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "mr",
      fallbackLng: "mr",
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
