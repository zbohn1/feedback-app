import React from "react";
import ReactDOM from "react-dom/client";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../helpers/Context.js";
import Suggestion from "../components/Suggestion.js";
import Comment from "../components/Comment.js";

//still need to add addComment and Post Reply

export default function DeepDive() {
  //get the title passed from the link through the state variable and title object
  const location = useLocation();

  //get title, id, and page from the state prop from link
  const title = location.state.title;
  const id = location.state.id;
  const prevPage = location.state.prevPage;
  const description = location.state.description;

  //grab state from context
  const { myRequests, setMyRequests } = React.useContext(Context);
  //create state for when the screen size is narrow
  const [isNarrowScreen, setIsNarrowScreen] = React.useState(false);

  //state for comment textarea
  const [inputValue, setInputValue] = React.useState("");

  //   filter the request to just the one request that was clicked on
  let filteredRequest = myRequests.filter((request) => request.title == title);
  //get both the comments AND the replies and put them into an array
  let commentsAndReplies = [];
  let spacer = 0;
  if (filteredRequest[0].comments != undefined) {
    for (let i = 0; i < filteredRequest[0].comments.length; i++) {
      //if there are no replies for this comment
      if (filteredRequest[0].comments[i].replies === undefined) {
        //array gets the comment (using spacer for replies and tracks comment number)
        commentsAndReplies[i + spacer] = filteredRequest[0].comments[i];
        //commentNumber, replyNumber, and category are all for the "add reply function"
        commentsAndReplies[i + spacer].category = "comment";
        commentsAndReplies[i + spacer].commentNumber = i;
        commentsAndReplies[i + spacer].replyNumber = "NA";
      } else {
        commentsAndReplies[i + spacer] = filteredRequest[0].comments[i];
        commentsAndReplies[i + spacer].category = "comment";
        commentsAndReplies[i + spacer].commentNumber = i;
        commentsAndReplies[i + spacer].replyNumber = "NA";
        //increase spacer for each reply, add replies to array
        for (
          let j = 0;
          j < filteredRequest[0].comments[i].replies.length;
          j++
        ) {
          spacer++;
          commentsAndReplies[i + spacer] =
            filteredRequest[0].comments[i].replies[j];
          commentsAndReplies[i + spacer].category = "reply";
          commentsAndReplies[i + spacer].commentNumber = i;
          commentsAndReplies[i + spacer].replyNumber = j;
        }
      }
    }
  }

  const [newCommentReply, setNewCommentReply] = React.useState(0);

  function handleReply(
    content,
    userImage,
    name,
    userName,
    commentNumber,
    replyNumber,
    category
  ) {
    //get the index of the element that has the same title in the requests array
    const findFiltered = (element) => element.title == title;
    let filteredIndex = myRequests.findIndex(findFiltered);
    setMyRequests((prev) => {
      let temp = prev;

      //if the category is a comment and has a reply, splice into the replies
      if (
        category == "comment" &&
        temp[filteredIndex].comments[commentNumber]["replies"]
      ) {
        temp[filteredIndex].comments[commentNumber]["replies"].splice(0, 0, {
          content: content,
          user: {
            image: userImage,
            name: name,
            username: userName,
          },
        });
      }

      //if the category is a comment and has no replies, add a replies array and add the new reply to the array
      else if (category == "comment") {
        temp[filteredIndex].comments[commentNumber]["replies"] = [];
        temp[filteredIndex].comments[commentNumber]["replies"][0] = {
          content: content,
          user: {
            image: userImage,
            name: name,
            username: userName,
          },
        };

        //if the array is a reply, splice in the reply one ahead of the reply number
      } else if (category == "reply") {
        temp[filteredIndex].comments[commentNumber]["replies"].splice(
          replyNumber + 1,
          0,
          {
            content: content,
            user: {
              image: userImage,
              name: name,
              username: userName,
            },
          }
        );
      }

      return [...temp];
    });
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

  function handleCommentChange(e) {
    let value = e.target.value;
    setInputValue((prev) => {
      prev = value;
      return [...prev];
    });
  }

  function handleCommentClick() {
    //get the index of the element that has the same title in the requests array
    const findFiltered = (element) => element.title == title;
    let filteredIndex = myRequests.findIndex(findFiltered);
    setMyRequests((prev) => {
      let temp = prev;
      console.log(temp);

      //splice into the last comments
      if (temp[filteredIndex].comments) {
        temp[filteredIndex].comments.splice(
          temp[filteredIndex].comments.length,
          0,
          {
            content: inputValue,
            user: {
              name: "Anne Valentine",
              username: "annev1990e",
            },
          }
        );
      } else {
        temp[filteredIndex]["comments"] = [
          {
            content: inputValue,
            user: { name: "Anne Valentine", username: "annev1990e" },
          },
        ];
      }
      return [...temp];
    });
  }

  return (
    <div className="outer-container">
      <div className="deep-dive-header">
        <Link
          to={prevPage == "home" ? "/" : "/roadmap"}
          style={{
            width: "max-content",
            height: "25px",
            position: "relative",
          }}
        >
          <img
            className="back-arrow"
            src={require(`../assets/backarrow.png`)}
            alt="back-arrow"
          />
          <p className="back-text">Go Back</p>
          <button className="transparent-button-2">back</button>
        </Link>
        <Link
          to="/editRequest"
          state={{
            title: title,
            id: id,
            description: description,
            prevPage: prevPage,
          }}
        >
          <button className="btn-primary">Edit Feedback</button>
        </Link>
      </div>
      {filteredRequest.map((request, index) => {
        {
          return (
            <div>
              {/* display the suggestion that was clicked on */}
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
            </div>
          );
        }
      })}
      {/* if there are comments, display the number before the suggestion */}
      <div className="outer-comment-wrapper">
        <div>
          <h2
            className="comment-number"
            style={
              commentsAndReplies[0] == undefined
                ? { display: "none" }
                : { display: "static" }
            }
          >
            {commentsAndReplies[0] != undefined
              ? commentsAndReplies.length + " Comments"
              : ""}
          </h2>
          {commentsAndReplies[0] != undefined ? (
            <Comment
              content={commentsAndReplies[0].content}
              userImage={commentsAndReplies[0].user.image}
              name={commentsAndReplies[0].user.name}
              userName={commentsAndReplies[0].user.username}
              handleReply={handleReply}
              category={commentsAndReplies[0].category}
              commentNumber={commentsAndReplies[0].commentNumber}
              replyNumber={commentsAndReplies[0].replyNumber}
              padding={
                commentsAndReplies[0].category == "comment"
                  ? "30px"
                  : isNarrowScreen
                  ? "55px"
                  : "95px"
              }
              padding2={
                commentsAndReplies[0 + 1] != undefined &&
                commentsAndReplies[0 + 1].category != "comment"
                  ? "5px"
                  : "30px"
              }
              padding3={
                commentsAndReplies[0].category === undefined ? "5px" : "30px"
              }
            />
          ) : (
            ""
          )}
          <hr
            className="divider"
            style={
              commentsAndReplies[1] != undefined &&
              commentsAndReplies[1].category == "comment"
                ? { display: "static" }
                : { display: "none" }
            }
          />
        </div>

        {/* render comment and reply components if there are comments  */}

        {commentsAndReplies[0] != undefined
          ? commentsAndReplies.map((comment, index) => {
              if (comment != commentsAndReplies[0]) {
                return (
                  <div>
                    <Comment
                      content={comment.content}
                      userImage={comment.user.image}
                      name={comment.user.name}
                      userName={comment.user.username}
                      handleReply={handleReply}
                      category={comment.category}
                      commentNumber={comment.commentNumber}
                      replyNumber={comment.replyNumber}
                      padding={
                        comment.category == "comment"
                          ? "30px"
                          : isNarrowScreen
                          ? "55px"
                          : "95px"
                      }
                      padding2={
                        commentsAndReplies[index + 1] != undefined &&
                        commentsAndReplies[index + 1].category != "comment"
                          ? "5px"
                          : "30px"
                      }
                      padding3={comment.category === undefined ? "5px" : "30px"}
                    />
                    <hr
                      className="divider"
                      style={
                        commentsAndReplies[index + 1] != undefined &&
                        commentsAndReplies[index + 1].category == "comment"
                          ? { margin: "0px 25px" }
                          : { display: "none" }
                      }
                    />
                  </div>
                );
              }
            })
          : ""}
      </div>
      <section className="add-comment-wrapper">
        <h2>Add Comment</h2>
        <textarea onChange={handleCommentChange}></textarea>
        <button className="btn-primary" onClick={handleCommentClick}>
          Post Comment
        </button>
      </section>
    </div>
  );
}
