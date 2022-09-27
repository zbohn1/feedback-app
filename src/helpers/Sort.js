// function to sort the requests - it takes an array and the value from the select, then checks that value to decide which way to sort it and uses the two values that are constantly passed to the sort function to check their properties against. For comments, I had to check whether they had them and then if they didn't have them set that value to 0 so that the logic wouldn't be break and it would be set to the lowest number

export default function sortSuggestions(suggestions, select, filter) {
  // filtering is here, first
  if (filter != "All") {
    suggestions = suggestions.filter(
      (request) => request["category"] == filter
    );
  }

  // sorting is below
  if (select == "Most Upvotes") {
    return suggestions.sort((value1, value2) => {
      return value2["upvotes"] - value1["upvotes"];
    });
  } else if (select == "Least Upvotes") {
    return suggestions.sort((value1, value2) => {
      return value1["upvotes"] - value2["upvotes"];
    });
  } else if (select == "Most Comments") {
    return suggestions.sort((value1, value2) => {
      if (value1["comments"] == undefined && value2["comments"] == undefined) {
        value1 = 0;
        value2 = 0;
        return value2 - value1;
      } else if (value1["comments"] == undefined) {
        value1 = 0;
        return value2["comments"].length - value1;
      } else if (value2["comments"] == undefined) {
        value2 = 0;
        return value2 - value1["comments"].length;
      } else {
        return value2["comments"].length - value1["comments"].length;
      }
    });
  } else {
    return suggestions.sort((value1, value2) => {
      if (value1["comments"] == undefined && value2["comments"] == undefined) {
        value1 = 0;
        value2 = 0;
        return value1 - value2;
      } else if (value1["comments"] == undefined) {
        value1 = 0;
        return value1 - value2["comments"].length;
      } else if (value2["comments"] == undefined) {
        value2 = 0;
        return value1["comments"].length - value2;
      } else {
        return value1["comments"].length - value2["comments"].length;
      }
    });
  }
}
