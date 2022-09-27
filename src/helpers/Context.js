import React, { useState } from "react";
import sortSuggestions from "./Sort.js";
import Data from "../data.json";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  //loading the initial data, getting the product requests specific data
  let feedbackData = Data;
  let myProductRequests = feedbackData["productRequests"];

  let sort = "Most Upvotes";
  let filter = "All";

  //set the requests state variable
  const [myRequests, setMyRequests] = useState(
    sortSuggestions(myProductRequests, "Most Upvotes", "All")
  );

  //Context Provider component is wrapped around other components in index.js so that they can use them
  return (
    <Context.Provider
      value={{
        myRequests,
        setMyRequests,
      }}
    >
      {children}
    </Context.Provider>
  );
};
