import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../helpers/Context.js";
import Select from "./Select.js";
import Data from "../data.json";
import sortSuggestions from "../helpers/Sort.js";

let feedbackData = Data;
let myProductRequests = feedbackData["productRequests"];

const Header = (props) => {
  const adder = { from: "Link1", adder: props.adder };
  const { myRequests, setMyRequests } = useContext(Context);

  //get the number of suggestions to add to the h2 in the header
  let suggestions = [];
  let suggestionIndex = 0;
  for (let i = 0, n = myRequests.length; i < n; i++) {
    if (myRequests[i].status === "suggestion") {
      suggestions[suggestionIndex] = myRequests[i];
      suggestionIndex++;
    }
  }

  //reset sorting of suggestions when link is clicked so that when you return to the home page they are again sorted as default
  function resetSort() {
    setMyRequests(() => {
      let temp = sortSuggestions(myProductRequests, "Most Upvotes", "All");
      return [...temp];
    });
  }

  return (
    <div className="home-header">
      <div className="header-flex-container-outer">
        <div className="header-flex-container-inner">
          <img src={require(`../assets/bulb 2.png`)} alt="light bulb icon" />
          <h2>
            {suggestions.length}{" "}
            {suggestions.length === 1 ? "Suggestion" : "Suggestions"}
          </h2>
        </div>
        <div className="sortby">
          <Select name="sort" onChange={props.onChange} value={props.value}>
            <option value="Most Upvotes">Most Upvotes</option>
            <option value="Least Upvotes">Least Upvotes</option>
            <option value="Most Comments">Most Comments</option>
            <option value="Least Comments"> Least Comments</option>
          </Select>
        </div>
      </div>
      <Link to="/addfeedback" onClick={resetSort}>
        {" "}
        <button className="btn-primary">+ Add feedback</button>
      </Link>
    </div>
  );
};

export default Header;
