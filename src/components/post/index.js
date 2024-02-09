import useModal from "../../hooks/useModal";
import Card from "../card";
import Comment from "../comment";
import OptionsIcon from "../optionsIcon";
import EditPostModal from "../editPostModal";
import ProfileCircle from "../profileCircle";
import { useState, useEffect } from "react";
import { toggleLike } from "../../service/apiClient";
import "./style.css";

import emptyHeart from "../../assets/icons/empty-heart.png";
import heart from "../../assets/icons/heart.png";
import emptyComment from "../../assets/icons/empty-comment.png";
import comment from "../../assets/icons/comment.png";

const Post = ({
  postId,
  name,
  date,
  content,
  comments = [],
  likes = [],
  refreshPosts,
}) => {
  const { openModal, setModal } = useModal();
  const [userLiked, setUserLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [isComment, setIsComment] = useState(false);

  const userInitials = name.match(/\b(\w)/g);

  const showModal = () => {
    setModal(
      "Edit post",
      <EditPostModal postId={postId} refreshPosts={refreshPosts} />
    );
    openModal();
  };

  const likeHandler = async () => {
    try {
      await toggleLike(postId);
      setUserLiked(!userLiked);
      setLikesCount(userLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    setLikesCount(likes);
  }, [likes]);

  const commentHandler = () => {
    setIsComment(!isComment);
  };

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <ProfileCircle initials={userInitials} />

          <div className="post-user-name">
            <p>{name}</p>
            <small>{date}</small>
          </div>
          <OptionsIcon showModel={showModal} />
        </section>

        <section className="post-content">
          <p>{content}</p>
        </section>

        <section
          className={`post-interactions-container border-top ${
            comments.length ? "border-bottom" : ""
          }`}
        >
          <div className="post-interactions">
            <div className="heart-icon icon" onClick={likeHandler}>
              <img src={userLiked ? heart : emptyHeart} alt="heart" />
              <span>Like</span>
            </div>
            <div
              className={`comment-icon ${isComment ? "comment-icon--active" : ""} icon`}
              onClick={commentHandler}
            >
              <img src={isComment ? comment : emptyComment} alt="comment" />
              <span>Comment</span>
            </div>
          </div>

          {likesCount > 0 ? (
            <p>
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </p>
          ) : (
            <p>Be the first to like this</p>
          )}
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
  );
};

export default Post;
