import Form from "../form"
import TextInput from "../form/textInput"
import { useTranslation } from "react-i18next"

const ProfessionalInfo = ({
  data,
  setData,
  disabledText,
  message,
  classes,
}) => {
  const { t } = useTranslation()
  const onInput = (e) => {
    setData(e)
  }

  return (
    <>
      <div className="welcome-formheader">
        <h3>Professional Info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.role}
            name="role"
            label={"Role*"}
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.specialism}
            name="specialism"
            label={"Specialism*"}
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.jobTitle}
            name="jobTitle"
            label={"Job Title*"}
          />
          {message && <p className="input-message">{message}</p>}
          <p className="text-blue1">{`*${t("required")}`}</p>
        </div>
      </Form>
    </>
  )
}

export default ProfessionalInfo
