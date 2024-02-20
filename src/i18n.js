import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import translationEN from "./locales/en/translation.json"
import translationSV from "./locales/sv/translation.json"
import translationCY from "./locales/cy/translation.json"

const { REACT_APP_DEFAULT_LANGUAGE } = process.env

const resources = {
  en: {
    translation: translationEN,
  },
  sv: {
    translation: translationSV,
  },
  cy: {
    translation: translationCY,
  },
}

i18n.availableLanguages = Object.keys(resources)

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: REACT_APP_DEFAULT_LANGUAGE || "en",
  })

export default i18n
