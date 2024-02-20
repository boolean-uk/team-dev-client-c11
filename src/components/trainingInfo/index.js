import Form from "../form"
import TextInput from "../form/textInput"
import { useTranslation } from "react-i18next"

const TrainingInfo = ({ data, onInput, disabledText, message, classes }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="welcome-formheader">
        <h3>Training Info</h3>
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
            value={data.cohort}
            name="cohort"
            label={"Cohort*"}
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.startDate}
            name="startDate"
            label={"Start date*"}
          />
          <TextInput
            disabled={disabledText}
            onChange={onInput}
            value={data.endDate}
            name="endDate"
            label={"End date*"}
          />
          {message && <p className="input-message">{message}</p>}
          <p className="text-blue1">{`*${t("required")}`}</p>
        </div>
      </Form>
    </>
  )
}

export default TrainingInfo
