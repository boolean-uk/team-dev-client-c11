import { useEffect, useState } from "react"
import TickIcon from "../../assets/tickIcon"
import "./style.css"

const SnackBar = ({
  setSnackBarOpen,
  labelText,
  actionText,
  actionOnClick,
  actionConfirmationText,
}) => {
  const [actionClicked, setActionClicked] = useState(false)

  const handleClick = () => {
    actionOnClick()
    setActionClicked(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setSnackBarOpen(false)
    }, 5000)
  }, [setSnackBarOpen])

  return (
    <section className="snack-bar bg-blue boxshadow">
      <TickIcon height={48} width={48} />
      {!actionClicked && (
        <>
          <div className="text-white">{labelText}</div>
          <div className="text-green pointer" onClick={handleClick}>
            {actionText}
          </div>
        </>
      )}
      {actionClicked && (
        <div className="text-green">{actionConfirmationText}</div>
      )}
    </section>
  )
}

export default SnackBar
