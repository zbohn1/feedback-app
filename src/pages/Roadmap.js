import React from "react";
import ReactDOM from "react-dom/client";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../helpers/Context.js";
import RoadmapItem from "../components/RoadmapItem.js";

export default function Roadmap() {
  //getting state
  const { myRequests, setMyRequests } = React.useContext(Context);

  //create state for when the screen size is narrow
  const [isNarrowScreen, setIsNarrowScreen] = React.useState(false);

  //create state for mobile view where it only shows one status
  const [showStatus, setShowStatus] = React.useState("planned");

  //creating separate arrays for planned, in-progress, and liverequests using the filter function
  let plannedRequests = myRequests.filter(
    (request) => request.status === "planned"
  );
  let inProgressRequests = myRequests.filter(
    (request) => request.status === "in-progress"
  );
  let liveRequests = myRequests.filter((request) => request.status === "live");

  function updateStatus(e) {
    let name = e.target.name;
    setShowStatus(e.target.name);
  }

  //check to see if screen is narrow and update isNarrowScreen appropriately
  React.useEffect(() => {
    //set initial value
    const mediaWatcher = window.matchMedia("(max-width: 650px)");
    setIsNarrowScreen(mediaWatcher.matches);

    //watch for updates, including add event listener and backwards compatibility
    function updateIsNarrowScreen(e) {
      setIsNarrowScreen(e.matches);
    }
    if (mediaWatcher.addEventListener) {
      mediaWatcher.addEventListener("change", updateIsNarrowScreen);
      return function cleanup() {
        mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
      };
    } else {
      mediaWatcher.addListener("change", updateIsNarrowScreen);
      //clean up after ourselves
      return function cleanup() {
        mediaWatcher.removeListener("change", updateIsNarrowScreen);
      };
    }
  });

  return (
    <div>
      <nav className="roadmap-header">
        <div className="roadmap-header-inner">
          <Link
            to="/"
            style={{
              width: "max-content",
              height: "25px",
              position: "relative",
            }}
          >
            <img
              className="back-arrow"
              src={require(`../assets/whitebackarrow.png`)}
              alt="back-arrow"
            />
            <p className="back-text">Go Back</p>
            <button className="transparent-button-2">back</button>
          </Link>
          <h2>Roadmap</h2>
        </div>
        <Link to="/addfeedback">
          <button className="btn-primary">+ Add Feedback</button>
        </Link>
      </nav>
      <section className="roadmap-mobile-button-container">
        <div
          className="planned-button-div"
          style={
            showStatus == "planned"
              ? { borderBottom: "5px solid #ad1fea" }
              : { borderBottom: "none", opacity: "0.3" }
          }
        >
          <button name="planned" onClick={updateStatus}>
            Planned ({plannedRequests.length})
          </button>
        </div>
        <div
          className="in-progress-button-div"
          style={
            showStatus == "in-progress"
              ? { borderBottom: "5px solid #f49f85" }
              : { borderBottom: "none", opacity: "0.3" }
          }
        >
          <button name="in-progress" onClick={updateStatus}>
            In-progress ({inProgressRequests.length})
          </button>
        </div>
        <div
          className="live-button-div"
          style={
            showStatus == "live"
              ? { borderBottom: "5px solid #62bcfa" }
              : { borderBottom: "none", opacity: "0.3" }
          }
        >
          <button name="live" onClick={updateStatus}>
            Live ({liveRequests.length})
          </button>
        </div>
      </section>

      <div className="roadmap-flex-outer-container">
        <section
          className="roadmap-flex-category-container"
          style={
            isNarrowScreen && showStatus == "planned"
              ? { display: "flex" }
              : isNarrowScreen
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <div>
            <h2>Planned ({plannedRequests.length})</h2>
            <p>Ideas prioritized for research</p>
          </div>
          {/* for each of the next three maps I'm mapping in the roadmap components for planned, in-progress, and live - I use pretty much the same format I used for suggestions */}
          {plannedRequests.map((request, index) => {
            return (
              <RoadmapItem
                key={index}
                id={index}
                commentNumber={
                  request["comments"] != undefined
                    ? request["comments"].length
                    : 0
                }
                upvotes={request["upvotes"]}
                title={request["title"]}
                category={request["category"]}
                status={request["status"]}
                feedbackDetails={request["description"]}
              />
            );
          })}
        </section>
        <section
          className="roadmap-flex-category-container"
          style={
            isNarrowScreen && showStatus == "in-progress"
              ? { display: "flex" }
              : isNarrowScreen
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <div>
            <h2>In-Progress ({inProgressRequests.length})</h2>
            <p>Currently being developed</p>
          </div>
          {inProgressRequests.map((request, index) => {
            return (
              <RoadmapItem
                key={index}
                id={index}
                commentNumber={
                  request["comments"] != undefined
                    ? request["comments"].length
                    : 0
                }
                upvotes={request["upvotes"]}
                title={request["title"]}
                category={request["category"]}
                status={request["status"]}
                feedbackDetails={request["description"]}
              />
            );
          })}{" "}
        </section>
        <section
          className="roadmap-flex-category-container"
          style={
            isNarrowScreen && showStatus == "live"
              ? { display: "flex" }
              : isNarrowScreen
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <div>
            <h2>Live ({liveRequests.length})</h2>
            <p>Released Features</p>
          </div>
          {liveRequests.map((request, index) => {
            return (
              <RoadmapItem
                key={index}
                id={index}
                commentNumber={
                  request["comments"] != undefined
                    ? request["comments"].length
                    : 0
                }
                upvotes={request["upvotes"]}
                title={request["title"]}
                category={request["category"]}
                status={request["status"]}
                feedbackDetails={request["description"]}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}
