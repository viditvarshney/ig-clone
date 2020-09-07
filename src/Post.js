import React from "react";
import "./Post.css";

import Avatar from "@material-ui/core/Avatar";

function Post({ caption, username, imageUrl }) {
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
    </div>
  );
}

export default Post;
