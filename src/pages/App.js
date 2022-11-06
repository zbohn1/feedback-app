import Data from "../data.json";
import Suggestion from "../components/Suggestion.js";
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.js";
import ButtonBoard from "../components/ButtonBoard";
import sortSuggestions from "../helpers/Sort.js";
import { Context } from "../helpers/Context.js";
import RoadmapPane from "../components/RoadmapPane.js";
import countRoadmap from "../helpers/countRoadmap.js";
import output from "../css/output.css";
import MobileMenu from "../components/MobileMenu.js";

function App() {
  let feedbackData = Data;
  let myProductRequests = feedbackData["productRequests"];
  let sort = "Most Upvotes";
  let filter = "All";

  const { myRequests, setMyRequests } = useContext(Context);

  //set state for mobile menu so that it starts out not showing
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  //create state for the custom select
  const [selectValue, setSelectValue] = React.useState("Most Upvotes");

  //used myProductRequests because state needs to be immutable (i.e. I can't change the state variable directly. This function sorts (using the values from the select)
  function changeSort(e) {
    setSelectValue(e.target.value);
    sort = e.target.value;
    setMyRequests(() => {
      let temp = sortSuggestions(myProductRequests, sort, filter);
      return [...temp];
    });
  }

  //this function filters (using the values from the buttons)
  function changeFilter(e) {
    filter = e.target.value;
    setMyRequests(sortSuggestions(myProductRequests, sort, filter));
  }

  return (
    <div className="home">
      <section className="homeLeftPanel">
        <div className="home-title">
          <h1>Product Feedback Board</h1>
          <img
            src={require(`../assets/hamburger.png`)}
            onClick={() => setShowMobileMenu(true)}
            style={
              showMobileMenu == true ? { display: "none" } : { margin: "0px" }
            }
            alt="mobile menu button"
          />
          <img
            src={require(`../assets/xbutton.png`)}
            style={
              showMobileMenu == true
                ? { display: "inline" }
                : { display: "none" }
            }
            onClick={() => setShowMobileMenu(false)}
            alt="close menu button"
          />
        </div>
        <MobileMenu
          isOpen={showMobileMenu}
          changeFilter={changeFilter}
          mobileStatus="notMobile"
        />
        <ButtonBoard onClick={changeFilter} mobileStatus="notMobile" />
        <RoadmapPane
          planned={countRoadmap(myRequests, "planned")}
          inProgress={countRoadmap(myRequests, "in-progress")}
          live={countRoadmap(myRequests, "live")}
        />
      </section>
      <section className="homeRightPanel">
        <Header onChange={changeSort} value={selectValue} />
        {/* if there are comments, return suggestions including the comments 
      prop, otherwise return suggestions without comment prop */}
        {myRequests
          .filter(
            (request) =>
              request["status"] == "suggestion" ||
              request["status"] == "Suggestion"
          )
          .map((request, index) => {
            {
              return (
                <Suggestion
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
                  description={request["description"]}
                />
              );
            }
          })}
      </section>
    </div>
  );
}

export default App;
