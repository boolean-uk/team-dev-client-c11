import { useState } from "react"
import useModal from "../../hooks/useModal"
import "./style.css"
import { deletePost, editPost } from "../../service/apiClient.js"
import { useTranslation } from "react-i18next"
import { Trans } from "react-i18next"
import LoggedInUser from "../loggedInUser"
import UserName from "../userName"



const EditPostModal = ({ postId, getAllPosts, setPostContent }) => {
  const { t } = useTranslation()
  const { closeModal } = useModal()
  const [message, setMessage] = useState(null)
  const [text, setText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const onChange = (e) => {
    setText(e.target.value)
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setIsDeleting(false)
  }

  const handleDeleteClick = () => {
    setIsDeleting(true)
    setIsEditing(false)
  }

  const handleConfirmDelete = async (postId) => {
    try {
      await deletePost(postId)
      closeModal()
      getAllPosts()
    } catch (error) {
      console.error("Failed to delete the post:", error.message)
      setMessage(t("failedToDeleteThePost"))
    }
  }

  const handleConfirmEdit = async () => {
    if (!text.trim()) {
      setMessage(t("cannotUpdateWithEmpty"))
      return
    }

    try {
      const editPostResponse = await editPost(postId, { content: text })
      const editedPost = editPostResponse.data.post.content
      closeModal()
      setPostContent(editedPost)
    } catch (error) {
      console.error("Failed to edit the post:", error.message)
      setMessage(t("failedToEditPost"))
    }
  }

  const handleCancelDelete = () => {
    setIsDeleting(false)
  }

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
         <LoggedInUser/>
        </div>
        <div className="post-user-name">
         <UserName/>
        </div>
      </section>

      <section className="edit-delete-buttons">
        <div className="button-container">
          <button
            className={`post__settings-button edit ${isEditing && "post__settings-button--active"}`}
            onClick={handleEditClick}
          >
            <Trans>edit</Trans>
          </button>
        </div>
        <div className="button-container">
          <button
            className={`post__settings-button delete ${isDeleting && "post__settings-button--active"}`}
            onClick={handleDeleteClick}
          >
            <Trans>delete</Trans>
          </button>
        </div>
      </section>

      {isEditing && (
        <section>
          <textarea
            onChange={onChange}
            value={text}
            placeholder={t("editYourPost")}
          ></textarea>
          <button
            className="post__settings-button second-edit"
            onClick={handleConfirmEdit}
          >
            <Trans>edit</Trans>
          </button>
        </section>
      )}

      {isDeleting && (
        <section className="delete-confirmation">
          <p>{t("areYouSureDelete")}</p>
          <button
            className="post__settings-button cancel-delete"
            onClick={handleCancelDelete}
          >
            <Trans>cancel</Trans>
          </button>
          <button
            className="post__settings-button second-delete"
            onClick={() => handleConfirmDelete(postId)}
          >
            {t("deletePost")}
          </button>
        </section>
      )}

      {message && <p>{message}</p>}
    </>
  )
}

export default EditPostModal
