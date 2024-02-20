import Form from "../form"
import TextInput from "../form/textInput"
import { useTranslation } from "react-i18next"

const BasicInfo = ({ data, onInput, message, disabledText }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="welcome-formheader">
        <h3>{t("basicInfo")}</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.imageUrl}
            name="imageUrl"
            label={`${t("profileImageUrl")}`}
            placeholder={`${t("enterProfileImageUrl")}`}
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.firstName}
            name="firstName"
            label={`${t("firstName")} *`}
            placeholder={`${t("enterYourFirstName")}`}
            required
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.lastName}
            name="lastName"
            label={`${t("lastName")} *`}
            placeholder={`${t("enterYourLastName")}`}
            required
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.githubUsername}
            name="githubUsername"
            label={`${t("githubUserName")} *`}
            placeholder={`${t("enterYourGithubUser")} *`}
            required
          />
          {message && <p className="input-message">{message}</p>}
          <p className="text-blue1">{`*${t("required")}`}</p>
        </div>
      </Form>
    </>
  )
}

export default BasicInfo
