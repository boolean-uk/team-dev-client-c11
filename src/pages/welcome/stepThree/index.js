import { useState, useEffect } from "react"
import TrainingInfo from "../../../components/trainingInfo"

const StepThree = ({
  data,
  setData,
  message,
  setCanProgress,
  setMessage,
  disabledText,
  classes,
}) => {
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
    <TrainingInfo
      data={data}
      onInput={onInput}
      message={message}
      disabledText={disabledText}
      classes={classes}
    />
  )
}

export default StepThree
