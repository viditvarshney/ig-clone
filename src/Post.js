import React, { useState, useEffect } from "react";
import "./Post.css";
import { db } from "./firebase";

import Avatar from "@material-ui/core/Avatar";

function Post({ postId, caption, username, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {};
  return (
    <div className="post">
      <div className="post__header">
        {/* header - Avatar & username */}
        <Avatar
          className="post__avatar"
          src={
            "https://cdn4.iconfinder.com/data/icons/flatfaces-everyday-people-circular/125/flatfaces8-512.png"
          }
        />
        <h3>
          <strong>{username}</strong>
          <p>Delhi, India</p>
        </h3>
      </div>

      <img className="post__image" src={imageUrl} alt="first_ post" />

      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      <form className="post__commentBox">
        <input
          type="text"
          className="post__input"
          value={comment}
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
