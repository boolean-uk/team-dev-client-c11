import { useState } from "react"
import "./style.css"
import sendIcon from "../../assets/icons/send.png"
import { postComment } from "../../service/apiClient"
import { useTranslation } from "react-i18next"
import LoggedInUser from "../loggedInUser"

const CommentInput = ({ postId, refreshAllComments }) => {
  const { t } = useTranslation()
  const [content, setContent] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    postComment({ postId, content }).then(refreshAllComments)
    setContent("")
  }

  const changeHandler = (e) => {
    setContent(e.target.value)
  }

  return (
    <section className="commentInput">
      <LoggedInUser/>
      <form onSubmit={submitHandler} className="commentInput__content">
        <input
          type="text"
          placeholder={t("addAComment")}
          className="commentInput__content-input"
          value={content}
          onChange={changeHandler}
          required
        />
        <button className="commentInput__content-button">
          <img src={sendIcon} alt={t("sendMessage")} />
        </button>
      </form>
    </section>
  )
}

export default CommentInput
