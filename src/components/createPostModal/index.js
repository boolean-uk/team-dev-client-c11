import { useState } from "react";
import useModal from "../../hooks/useModal";
import "./style.css";
import Button from "../button";
import useAuth from "../../hooks/useAuth"
import { postPost } from "../../service/apiClient";
import { useTranslation } from "react-i18next";
import LoggedInUser from "../loggedInUser";
import UserName from "../userName";



const CreatePostModal = ({ getAllPosts }) => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();
  const { t } = useTranslation();

  const [message, setMessage] = useState(null)
  const [text, setText] = useState("")

  const { userId } = useAuth()

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = () => {
    const newPost = {
      content: text,
      userId,
    }

    const createPost = (newPost) => {
      postPost(newPost).then(getAllPosts)
    }

    try {
      createPost(newPost)
      setMessage(t("closingModal"));
      closeModal()
    } catch (e) {
      if (e.codeStatus === 400) {
        setMessage(t("oopsEmptyPost"));
      }
    }
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
      <section>
        <textarea
          onChange={onChange}
          value={text}
          placeholder={t("whatsOnYourMind")}
        ></textarea>
      </section>
      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text={t("post")}
          classes={`${text.length ? "blue" : "offwhite"} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  )
}

export default CreatePostModal
