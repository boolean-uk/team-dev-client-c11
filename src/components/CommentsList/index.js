import { useEffect, useState } from "react"
import Comment from "../comment"
import { getCommentsByPostId } from "../../service/apiClient"

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getCommentsByPostId(postId).then(setComments)
  }, [postId])

  const checkEmptyComments = () => {
    return (
      <>
        {!!comments.length ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.name}
              content={comment.content}
            />
          ))
        ) : (
          <p>No comments...</p>
        )}
      </>
    )
  }

  return (
    <section className={`comments ${comments.length > 0 && "border-top"}`}>
      {checkEmptyComments()}
    </section>
  )
}

export default CommentsList