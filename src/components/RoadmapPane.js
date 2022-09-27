import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { Context } from "../helpers/Context.js";
import Data from "../data.json";
import sortSuggestions from "../helpers/Sort.js";

export default function RoadmapPane(props) {
  let feedbackData = Data;
  let myProductRequests = feedbackData["productRequests"];

  //set context
  const { myRequests, setMyRequests } = React.useContext(Context);

  //reset sorting of suggestions when link is clicked so that when you return to the home page they are again sorted as default
  function resetSort() {
    setMyRequests(() => {
      let temp = sortSuggestions(myProductRequests, "Most Upvotes", "All");
      return [...temp];
    });
  }

  return (
    <section
      className={props.mobileStatus == "mobile" ? "roadmap-m" : "roadmap"}
    >
      <div className="roadmap-spacer-header">
        <h2>Roadmap</h2>
        <Link
          to="/roadmap"
          style={{
            color: "#4661e6",
            fontSize: "13px",
            fontFamily: "Jost, sans-serif",
            fontWeight: "600",
          }}
          onClick={resetSort}
        >
          View
        </Link>
      </div>
      <div>
        <div className="roadmap-spacer-outer">
          <div className="roadmap-spacer-inner">
            <div className="roadmap-spacer-inner-inner">
              <div className="circle-one"></div>
              <p>Planned</p>
            </div>
            <p>{props.planned}</p>
          </div>
          <div className="roadmap-spacer-inner">
            <div className="roadmap-spacer-inner-inner">
              <div className="circle-two"></div>
              <p>In Progress</p>
            </div>
            <p>{props.inProgress}</p>
          </div>
          <div className="roadmap-spacer-inner">
            <div className="roadmap-spacer-inner-inner">
              <div className="circle-three"></div>
              <p>Live</p>
            </div>
            <p>{props.live}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
