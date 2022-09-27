import React from "react";
import ReactDOM from "react-dom/client";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../helpers/Context.js";
import Suggestion from "./Suggestion.js";

export default function Comment(props) {
  //was having trouble using the userImage prop as the src so I used the below code to get their first name by looping through their full name and then added this firstname into the image src string to get the image
  let name = props.name;
  let firstName = "";
  for (let i = 0; i < name.length; i++) {
    // look for the sp aces and break the loop after the end of the first name
    if (name[i] === " ") {
      break;
    }
    firstName = firstName + name[i].toLowerCase();
  }

  //state to show and hide the add reply field
  const [reply, setReply] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");

  //show the reply field when reply is clicked on
  function handleClick() {
    setReply(true);
  }

  //get the new value from the post reply input field
  function handleChange(e) {
    let value = e.target.value;
    setInputValue((prev) => {
      prev = value;
      return [...prev];
    });
  }

  //helper function is so function doesn't run every time. adds inputValue and content + anne valentine name to be processed by handleReply
  function handleReplyHelper() {
    props.handleReply(
      inputValue,
      props.userImage,
      "Anne Valentine",
      "annev1990e",
      props.commentNumber,
      props.replyNumber,
      props.category
    );
    setReply(false);
  }
  return (
    <article
      className="comment-wrapper"
      style={{
        paddingLeft: props.padding,
        paddingBottom: props.padding2,
        paddingTop: props.padding3,
      }}
    >
      <div className="comment-header">
        <div className="comment-header-user-outer">
          <img
            src={require(`../assets/user-images/image-${firstName}.jpg`)}
            style={{ borderRadius: "50%" }}
            width="40px"
            height="40px"
            alt="user image"
          />
          <div className="comment-header-user-inner">
            <h2>{props.name}</h2>
            <p>@{props.userName}e</p>
          </div>
        </div>
        <button onClick={handleClick} className="reply">
          {" "}
          Reply
        </button>
      </div>
      <p className="comment-content">{props.content}</p>
      <div
        className="comment-reply-container"
        style={reply == false ? { display: "none" } : { display: "flex" }}
      >
        <input
          name="commentReplyField"
          id="commentReplyField"
          onChange={handleChange}
        />
        <button className="btn-tertiary" onClick={handleReplyHelper}>
          Post Reply
        </button>
      </div>
    </article>
  );
}
