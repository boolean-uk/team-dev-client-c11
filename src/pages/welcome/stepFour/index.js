import Form from "../../../components/form"
import { useTranslation } from "react-i18next"

const StepFour = ({ data, setData }) => {
  const { t } = useTranslation()

  const splitWord = data.bio.trim(/\s+/g, "").length

  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className={"welcome-form"}>
        <p>{t("bio")}</p>
        <div className="welcome-form-inputs">
          <textarea
            onChange={setData}
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

export default StepFour
