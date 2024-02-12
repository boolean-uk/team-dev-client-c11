import useModal from '../../hooks/useModal'
import Card from '../card'
import Comment from '../comment'
import OptionsIcon from '../optionsIcon'
import EditPostModal from '../editPostModal'
import ProfileCircle from '../profileCircle'
import { useEffect, useState } from 'react'
import './style.css'

// Icons
import emptyHeart from '../../assets/icons/empty-heart.png'
import heart from '../../assets/icons/heart.png'
import emptyComment from '../../assets/icons/empty-comment.png'
import comment from '../../assets/icons/comment.png'

const Post = ({postId, name, date, content, comments = [], likes = 0, getAllPosts}) => {
  const { openModal, setModal } = useModal()
  const [postContent, setPostContent] = useState(null)
  const [isLike, setIsLike] = useState(false)
  const [isComment, setIsComment] = useState(false)

  const [formatDate, setFormatDate] = useState(null)

  const userInitials = name.match(/\b(\w)/g)

  const showModal = () => {
    setModal('Edit post', <EditPostModal postId={postId} getAllPosts={getAllPosts} setPostContent={setPostContent}/>)
    openModal()
  }

  const likeHandler = () => {
    setIsLike(!isLike)
  }

  const commentHandler = () => {
    setIsComment(!isComment)
  }

  useEffect(() => {
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = newDate.toLocaleString('en-GB', { month: 'long' })
    const time = newDate.toLocaleTimeString().slice(0, 5)

    setFormatDate(`${day} ${month} at ${time}`)
  }, [date])

  useEffect(() => setPostContent(content), [content])

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <ProfileCircle initials={userInitials} />

          <div className="post-user-name">
            <p>{name}</p>
            <small>{formatDate}</small>
          </div>
          <OptionsIcon showModel={showModal} />
        </section>

        <section className="post-content">
          <p>{postContent}</p>
        </section>

        <section
          className={`post-interactions-container border-top ${
            comments.length ? 'border-bottom' : null
          }`}
        >
          <div className="post-interactions">
            <div className="heart-icon icon" onClick={likeHandler}>
              {isLike ? (
                <img src={heart} alt="heart" />
              ) : (
                <img src={emptyHeart} alt="heart" />
              )}
              <span>Like</span>
            </div>
            <div
              className={`comment-icon${isComment && '--active'} icon`}
              onClick={commentHandler}
            >
              {isComment ? (
                <img src={comment} alt="comment" />
              ) : (
                <img src={emptyComment} alt="comment" />
              )}

              <span>Comment</span>
            </div>
          </div>

          <p>{!likes && 'Be the first to like this'}</p>
        </section>

        <section>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.name}
              content={comment.content}
            />
          ))}
        </section>
      </article>
    </Card>
  )
}

export default Post
