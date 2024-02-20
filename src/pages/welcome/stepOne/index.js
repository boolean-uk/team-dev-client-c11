import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import BasicInfo from "../../../components/basic-info"

const StepOne = ({ data, setData, setCanProgress, message, setMessage }) => {
  const { t } = useTranslation()
  const [firstNameValid, setFirstNameValid] = useState(false)
  const [lastNameValid, setLastNameValid] = useState(false)
  const [userNameValid, setUserNameValid] = useState(false)

  const onInput = (e) => {
    setData(e)
    const inputName = e.target.name
    const inputValue = e.target.value

    if (inputName === "firstName") {
      if (inputValue.length > 3) {
        setFirstNameValid(true)
      } else {
        setMessage(t("enterCharacter"))
      }
    }
    if (inputName === "lastName") {
      if (inputValue.length > 3) {
        setLastNameValid(true)
      } else {
        setMessage(t("enterCharacter"))
      }
    }
    if (inputName === "githubUsername") {
      if (inputValue.length > 3) {
        setUserNameValid(true)
      } else {
        setMessage(t("enterCharacter"))
      }
    }
  }

  useEffect(() => {
    setCanProgress(firstNameValid && lastNameValid)
  }, [firstNameValid, setCanProgress, lastNameValid, userNameValid])

  return (
    <BasicInfo
      data={data}
      onInput={onInput}
      message={message}
    />
  )
}

export default StepOne
