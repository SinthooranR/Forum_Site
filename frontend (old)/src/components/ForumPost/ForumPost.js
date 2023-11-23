import React, { useContext } from "react";
import { MainContext } from "../../main_context";
import classes from "./ForumPost.module.css";

const ForumPost = (props) => {
  const mainContext = useContext(MainContext);
  let postColor;
  let postViewColor;

  if (!mainContext.themeSwitch) {
    postColor = classes.LightPost;
    postViewColor = classes.LightView;
  } else {
    postColor = classes.DarkPost;
    postViewColor = classes.DarkView;
  }

  let post;

  if (props.forumPost) {
    post = (
      <div
        className={[classes.Post, postColor].join(" ")}
        onClick={props.onClick}
      >
        <p>Posted By: {props.author}</p>
        <h2>{props.title}</h2>
        <p>{props.post}</p>
      </div>
    );
  }

  if (props.reply) {
    post = (
      <div
        className={[classes.Reply, postColor].join(" ")}
        onClick={props.onClick}
      >
        <p>Replied By: {props.author}</p>
        <p>{props.replyPost}</p>
      </div>
    );
  }

  if (props.postView) {
    post = (
      <div
        className={[classes.Post, postViewColor].join(" ")}
        onClick={props.onClick}
      >
        <p>Posted By: {props.author}</p>
        <h2>{props.title}</h2>
        <p>{props.post}</p>
      </div>
    );
  }

  return <React.Fragment>{post}</React.Fragment>;
};

export default ForumPost;
