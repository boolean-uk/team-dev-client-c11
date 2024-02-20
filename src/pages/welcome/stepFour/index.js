import Bio from "../../../components/bio"

const StepFour = ({ data, setData }) => {
  const onInput = (e) => {
    setData(e)
  }

  const splitWord = data.bio.trim(/\s+/g, "").length

  return (
    <Bio
      data={data}
      onInput={onInput}
      splitWord={splitWord}
    />
  )
}

export default StepFour
