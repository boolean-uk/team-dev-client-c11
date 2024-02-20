import { useEffect, useState } from "react"

import i18n from "../../i18n"
import Menu from "../menu"

import "./style.css"

const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const fallbackLng = i18n.options.fallbackLng[0]

  useEffect(() => {
    if (i18n.availableLanguages.includes(selectedLanguage)) {
      i18n.changeLanguage(selectedLanguage)
    } else {
      i18n.changeLanguage(fallbackLng)
    }
  }, [selectedLanguage, fallbackLng])

  return (
    <div
      className="language-select relative"
      onClick={() => setIsMenuVisible(!isMenuVisible)}
    >
      <div className="language-display text-blue1 bg-offwhite">{selectedLanguage}</div>
      {isMenuVisible && (
        <Menu className={"absolute boxshadow"}>
          <LanguageOptions selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
        </Menu>
      )}
    </div>
  )
}

const LanguageOptions = ({selectedLanguage, setSelectedLanguage}) => {
  const languageOptions = i18n.availableLanguages

  const handleClick = (language) => {
    setSelectedLanguage(language)
  }

  return (
    <>
      {languageOptions.map((language) => (
        <li key={`language-option${language}`} onClick={() => handleClick(language)}>{language}</li>
      ))}
    </>
  )
}

export default LanguageSelect
