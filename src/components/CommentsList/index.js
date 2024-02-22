import { useCallback, useEffect, useState } from "react"
import Comment from "../comment"
import { getCommentsByPostId } from "../../service/apiClient"
import CommentInput from "../commentInput"

const CommentsList = ({ postId, isComment }) => {
  const [comments, setComments] = useState([])

  const refreshAllComments = useCallback(() => {
    getCommentsByPostId(postId).then(setComments)
  }, [postId])

  useEffect(() => {
    refreshAllComments()
  }, [refreshAllComments])

  const checkEmptyComments = () => {
    return (
      <>
        {!!comments.length ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.name}
              content={comment.content}
              user={comment.author}
            />
          ))
        ) : (
          <p>No comments...</p>
        )}
      </>
    )
  }

  return (
    <>
      {isComment && (
        <section className={`comments ${comments.length > 0 && "border-top"}`}>
          {checkEmptyComments()}
        </section>
      )}

      <CommentInput postId={postId} refreshAllComments={refreshAllComments} />
    </>
  )
}

export default CommentsList
