import Bio from "../../../components/bio"

const StepFour = ({ data, setData, disabledText, classes }) => {
  const onInput = (e) => {
    setData(e)
  }

  const splitWord = data.bio.trim(/\s+/g, "").length

  return (
    <Bio
      data={data}
      onInput={onInput}
      splitWord={splitWord}
      disabledText={disabledText}
      classes={classes}
    />
  )
}

export default StepFour
