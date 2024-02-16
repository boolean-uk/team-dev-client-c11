import { useState, useEffect } from "react"
import Form from "../../../components/form"
import TextInput from "../../../components/form/textInput"
import { useTranslation } from "react-i18next"

const StepThree = ({ data, setData, message, setCanProgress, setMessage }) => {
  
  const { t } = useTranslation()
  const [isRoleValid, setIsRoleValid] = useState(false)
  const [isSpecialismValid, setIsSpecialismValid] = useState(false)
  const [isCohortValid, setIsCohortValid] = useState(false)
  const [isStartDateValid, setIsStartDateValid] = useState(false)
  const [isEndDateValid, setIsEndDateValid] = useState(false)

  const onInput = (e) => {
    setData(e)
    const inputName = e.target.name
    const inputValue = e.target.value

    if (inputName === "role") {
      if (inputValue.length > 3) {
        setIsRoleValid(true)
      } else {
        setMessage("Enter 3 charachter or more")
      }
    }
    if (inputName === "specialism") {
      if (inputValue.length > 3) {
        setIsSpecialismValid(true)
      } else {
        setMessage("Enter 3 charachter or more")
      }
    }
    if (inputName === "cohort") {
      if (inputValue.length > 3) {
        setIsCohortValid(true)
      } else {
        setMessage("Enter 3 charachter or more")
      }
    }
    if (inputName === "startDate") {
      if (inputValue.length > 3) {
        setIsStartDateValid(true)
      } else {
        setMessage("Enter 3 charachter or more")
      }
    }
    if (inputName === "endDate") {
      if (inputValue.length > 3) {
        setIsEndDateValid(true)
      } else {
        setMessage("Enter 3 charachter or more")
      }
    }
  }

  useEffect(() => {
    setCanProgress(
      isRoleValid && isSpecialismValid,
      isCohortValid,
      isStartDateValid,
      isEndDateValid
    )
  }, [
    isRoleValid,
    isSpecialismValid,
    isCohortValid,
    isStartDateValid,
    isEndDateValid,
    setCanProgress,
  ])

  return (
    <>
      <div className="welcome-formheader">
        <h3>Training Info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={onInput}
            value={data.role}
            name="role"
            label={"Role*"}
          />
          <TextInput
            onChange={onInput}
            value={data.specialism}
            name="specialism"
            label={"Specialism*"}
          />
          <TextInput
            onChange={onInput}
            value={data.cohort}
            name="cohort"
            label={"Cohort*"}
          />
          <TextInput
            onChange={onInput}
            value={data.startDate}
            name="startDate"
            label={"Start date*"}
          />
          <TextInput
            onChange={onInput}
            value={data.endDate}
            name="endDate"
            label={"End date*"}
          />
          {message && <p className="input-message">{message}</p>}
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  )
}

export default StepThree
