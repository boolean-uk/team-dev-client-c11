const ConfirmationDialog = ({ bodyText, buttonChildrenArray }) => {
  return (
    <>
      <section>
        <p>{bodyText}</p>
      </section>
      <section className="flex gap-20">{buttonChildrenArray}</section>
    </>
  )
}

export default ConfirmationDialog
