import useModal from "../../hooks/useModal"
import Card from "../card"
import OptionsIcon from "../optionsIcon"
import EditPostModal from "../editPostModal"
import ProfileCircle from "../profileCircle"
import { useState, useEffect } from "react"
import { toggleLike } from "../../service/apiClient"
import "./style.css"

import emptyHeart from "../../assets/icons/empty-heart.png"
import heart from "../../assets/icons/heart.png"
import emptyComment from "../../assets/icons/empty-comment.png"
import comment from "../../assets/icons/comment.png"
import useAuth from "../../hooks/useAuth"
import CommentsList from "../CommentsList"
import { useTranslation } from "react-i18next"

const Post = ({
  userPostId,
  postId,
  name,
  date,
  content,
  likes,
  getAllPosts,
}) => {
  const { openModal, setModal } = useModal()
  const [postContent, setPostContent] = useState(null)
  const [userLiked, setUserLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes.length)
  const [isComment, setIsComment] = useState(false)

  const [formatDate, setFormatDate] = useState(null)

  const userInitials = name.match(/\b(\w)/g)

  const { userId, userRole } = useAuth()

  const { t } = useTranslation()
  const showModal = () => {
    setModal(
      t("editPost"),
      <EditPostModal
        postId={postId}
        getAllPosts={getAllPosts}
        setPostContent={setPostContent}
      />
    )
    openModal()
  }

  const likeHandler = async () => {
    try {
      await toggleLike(postId)
      setUserLiked(!userLiked)
      setLikesCount(userLiked ? likesCount - 1 : likesCount + 1)
    } catch (error) {
      console.error(t("errorLike"), error)
    }
  }

  useEffect(() => {
    const isUserLiked = likes.find(
      (like) => Number(like.userId) === Number(userId)
    )

    setUserLiked(!!isUserLiked)
    setLikesCount(likes.length)
  }, [likes, userId])

  useEffect(() => {
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = newDate.toLocaleString("en-GB", { month: "long" })
    const time = newDate.toLocaleTimeString().slice(0, 5)

    setFormatDate(`${day} ${month} at ${time}`)
  }, [date])

  useEffect(() => setPostContent(content), [content])

  const commentHandler = () => {
    setIsComment(!isComment)
  }

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <ProfileCircle initials={userInitials} />

          <div className="post-user-name">
            <p>{name}</p>
            <small>{formatDate}</small>
          </div>

          {(userPostId === userId || userRole === "TEACHER") && (
            <OptionsIcon showModel={showModal} />
          )}
        </section>

        <section className="post-content">
          <p>{postContent}</p>
        </section>

        <section className="post-interactions-container border-top">
          <div className="post-interactions">
            <div className="heart-icon icon" onClick={likeHandler}>
              <img src={userLiked ? heart : emptyHeart} alt={t("heart")} />
              <span>{t("like")}</span>
            </div>
            <div
              className={`comment-icon${isComment && "--active"} icon`}
              onClick={commentHandler}
            >
              <img
                src={isComment ? comment : emptyComment}
                alt={t("comment")}
              />
              <span>{t("comment")}</span>
            </div>
          </div>

          {likesCount > 0 ? (
            <p>
              {likesCount} {likesCount === 1 ? t("like") : t("likes")}
            </p>
          ) : (
            <p>{t("firstLike")}</p>
          )}
        </section>

        <CommentsList postId={postId} isComment={isComment} />
      </article>
    </Card>
  )
}

export default Post
