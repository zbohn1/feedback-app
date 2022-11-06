import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { Context } from "../helpers/Context.js";
import React, { useContext } from "react";
import upVoteObject from "./buttonHelper";
import Data from "../data.json";
import sortSuggestions from "../helpers/Sort.js";

export default function Suggestion(props) {
  let feedbackData = Data;
  let myProductRequests = feedbackData["productRequests"];

  const { myRequests, setMyRequests } = useContext(Context);
  let title = props.title;
  let id = props.id;
  let prevPage = "home";
  let description = props.description;

  //set button state based on previous upvote history (or lack thereof)
  const [buttonPressed, setButtonPressed] = React.useState(upVoteObject[title]);

  //update the vote count when the button is clicked, but only the first time, use the buttonpressed state to update and the upvote object to hold the value regardless of whether the page is reloaded or still on the same load
  function changeVotes() {
    for (let i = 0, n = myRequests.length; i < n; i++) {
      if (myRequests[i].title === title && buttonPressed === undefined) {
        let temp = myRequests;
        temp[i].upvotes = temp[i].upvotes + 1;
        setMyRequests((temp) => {
          return [...temp];
        });
        upVoteObject[title] = true;
        setButtonPressed(upVoteObject[title]);
        break;
      }
    }
  }

  //reset sorting of suggestions when link is clicked so that when you return to the home page they are again sorted as default
  function resetSort() {
    setMyRequests(() => {
      let temp = sortSuggestions(myRequests, "Most Upvotes", "All");
      return [...temp];
    });
  }

  return (
    <article className="suggestion">
      <div className="flex-spacer">
        <div>
          <div
            className="upvote-container"
            style={
              buttonPressed === true
                ? { backgroundColor: "#4661e6" }
                : { backgroundColor: "#f2f4ff" }
            }
          >
            <button class="transparent-button" onClick={changeVotes}></button>
            <img
              className="presentation-button"
              onClick={changeVotes}
              src={
                buttonPressed === true
                  ? require(`../assets/whitearrow.png`)
                  : require(`../assets/uparrow.png`)
              }
              alt="button to change votes"
            />
            <p
              style={
                buttonPressed === true
                  ? { color: "white" }
                  : { color: "#647196" }
              }
            >
              {props.upvotes}
            </p>
          </div>
        </div>
        <div>
          <Link
            to="/deepDive"
            state={{
              title: title,
              id: id,
              prevPage: prevPage,
              description: description,
            }}
            style={{ textDecoration: "none", color: "#647196" }}
            onClick={resetSort}
          >
            <h2>{props.title}</h2>
          </Link>
          <p>{props.description}</p>
          <div className="flex-spacer2">
            <div className="category-style">
              <p>{props.category} </p>
            </div>
          </div>
        </div>
      </div>
      <div className="comment-flex">
        <img src={require(`../assets/path.png`)} alt="comment icon" />
        <p>{props.commentNumber}</p>
      </div>
    </article>
  );
}
