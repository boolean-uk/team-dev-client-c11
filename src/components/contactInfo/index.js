import Form from "../form"
import TextInput from "../form/textInput"
import { useTranslation } from "react-i18next"

const ContactInfo = ({ data, onInput, disabledText, message, classes }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="welcome-formheader">
        <h3>{t("contactInfo")}</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.email}
            name="email"
            label={`${t("email")} *`}
            type="text"
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.mobile}
            name="mobile"
            label={`${t("mobile")} *`}
            type="text"
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.password}
            name="password"
            label={`${t("password")} *`}
            type="password"
          />
          {message && <p className="input-message">{message}</p>}
          <p className="text-blue1">{`*${t("required")}`}</p>
        </div>
      </Form>
    </>
  )
}

export default ContactInfo
