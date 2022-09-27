import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { Context } from "../helpers/Context.js";
import React, { useContext } from "react";
import upVoteObject from "./buttonHelper";

export default function RoadmapItem(props) {
  let title = props.title;
  let id = props.id;
  let prevPage = "roadmap";
  const { myRequests, setMyRequests } = useContext(Context);
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

  return (
    <div className="roadmap-item-container">
      <div
        className={
          props.status == "live"
            ? "colored-line-three"
            : props.status == "in-progress"
            ? "colored-line-two"
            : "colored-line-one"
        }
      ></div>
      <div className="roadmap-spacer-2">
        <div
          className={
            props.status == "live"
              ? "circle-three"
              : props.status == "in-progress"
              ? "circle-two"
              : "circle-one"
          }
        ></div>
        <p>{props.status}</p>
      </div>

      {/* passing the title and id as props through react router link */}
      <Link
        to="/deepDive"
        state={{ title: title, id: id, prevPage: prevPage }}
        style={{ textDecoration: "none", color: "#647196" }}
      >
        <h2>{props.title} title</h2>
      </Link>
      <p>{props.feedbackDetails}</p>
      <div className="roadmap-category-style">
        <p>{props.category}</p>
      </div>
      <div className="roadmap-spacer">
        <div>
          <div
            className="roadmap-upvote-container"
            style={
              buttonPressed === true
                ? { backgroundColor: "#4661e6" }
                : { backgroundColor: "#f2f4ff" }
            }
          >
            <button
              class="roadmap-transparent-button"
              onClick={changeVotes}
            ></button>
            <img
              className="roadmap-presentation-button"
              onClick={changeVotes}
              src={
                buttonPressed === true
                  ? require(`../assets/whitearrow.png`)
                  : require(`../assets/uparrow.png`)
              }
              alt="button to change votes"
            />
            <h2
              style={
                buttonPressed === true
                  ? { color: "white" }
                  : { color: "#647196" }
              }
            >
              {props.upvotes}
            </h2>
          </div>
        </div>
        <div className="roadmap-comment-flex">
          <img src={require(`../assets/path.png`)} alt="comments icon" />
          <h2>{props.commentNumber}</h2>
        </div>
      </div>
    </div>
  );
}
