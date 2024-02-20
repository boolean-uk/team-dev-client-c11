import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ContactInfo from "../../../components/contactInfo"

const StepTwo = ({ data, setData, setCanProgress, message, setMessage, disabledText, classes }) => {
  const { t } = useTranslation()

  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const onInput = (e) => {
    setData(e)
    const inputName = e.target.name
    const inputValue = e.target.value

    if (inputName === "email" && inputValue.includes("@")) {
      if (inputValue.length > 3) {
        setIsEmailValid(true)
      } else {
        setMessage(`${t("enterCharacter")}`)
      }
    }
    if (inputName === "password") {
      if (inputValue.length > 3) {
        setIsPasswordValid(true)
      } else {
        setMessage(`${t("enterCharacter")}`)
      }
    }
  }

  useEffect(() => {
    setCanProgress(isEmailValid && isPasswordValid)
  }, [isEmailValid, setCanProgress, isPasswordValid])

  return (
    <ContactInfo
      data={data}
      onInput={onInput}
      disabledText={disabledText}
      message={message}
      classes={classes}
    />
  )
}

export default StepTwo
