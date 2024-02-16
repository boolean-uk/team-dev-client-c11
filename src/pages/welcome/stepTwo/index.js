import { useEffect, useState } from "react"
import Form from "../../../components/form"
import TextInput from "../../../components/form/textInput"
import { useTranslation } from "react-i18next"

const StepTwo = ({ data, setData, setCanProgress, message, setMessage }) => {
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
    <>
      <div className="welcome-formheader">
        <h3>{t("contactInfo")}</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={onInput}
            value={data.email}
            name="email"
            label={`${t("email")} *`}
            type="text"
          />
          <TextInput
            onChange={onInput}
            value={data.mobile}
            name="mobile"
            label={`${t("mobile")} *`}
            type="text"
          />
          <TextInput
            onChange={onInput}
            value={data.password}
            name="password"
            label={`${t("password")} *`}
            type="password"
          />
          {message && <p className="input-message">{message}</p>}
          <p className="text-blue1">*{t("required")}</p>
        </div>
      </Form>
    </>
  )
}

export default StepTwo
