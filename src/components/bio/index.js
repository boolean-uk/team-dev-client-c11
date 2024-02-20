import { useTranslation } from "react-i18next"
import Form from "../form"

const Bio = ({ data, disabledText, splitWord, onInput, classes }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className={"welcome-form"}>
        <p>{t("bio")}</p>
        <div className="welcome-form-inputs">
          <textarea
            disabled={disabledText}
            onChange={onInput}
            value={data.bio}
            name="bio"
            placeholder={t("tellUsAboutYourselfMessage")}
            label={t("bio")}
            type={"textarea"}
            maxLength={3000}
          />

          <p className="word-count">{splitWord}/3000</p>
        </div>
      </Form>
    </>
  )
}

export default Bio
