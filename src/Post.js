import React, { useState, useEffect } from "react";
import "./Post.css";
import { db } from "./firebase";
import firebase from "firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";

import Avatar from "@material-ui/core/Avatar";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Post({ postId, caption, user, username, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [openAllComments, setOpenAllComments] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
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

      <img className="post__image" src={imageUrl} alt="Image_Posted" />

      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>
      {/* ********************************************************************* */}

      <Modal open={openAllComments} onClose={() => setOpenAllComments(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="post__allComments">
            <h1>All Comments</h1>
          </div>
          <div className="post__comments post__modalComments">
            {comments.map((comment) => (
              <p>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            ))}
          </div>
        </div>
      </Modal>

      <div className="post__commentCount">
        {comments.length > 2 ? (
          <>
            <Button onClick={() => setOpenAllComments(true)}>
              <p>View all {comments.length} comments </p>
            </Button>
            {/* {comments.map((comment) => (
              <p>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            ))} */}
          </>
        ) : (
          <div className="post__comments">
            {comments.map((comment) => (
              <p>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            ))}
          </div>
        )}
      </div>
      {/* ************************************************************************ */}

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
