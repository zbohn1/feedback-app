import React from "react";
import ReactDOM from "react-dom/client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../helpers/Context.js";
import Select2 from "../components/Select2.js";

export default function EditRequest(props) {
  //getting the title passed from the link
  const location = useLocation();
  const title = location.state.title;
  const id = location.state.id;
  const description = location.state.description;
  const prevPage = location.state.prevPage;

  //create state for the custom selects
  const [selectValue2, setSelectValue2] = React.useState("Feature");
  const [selectValue3, setSelectValue3] = React.useState("Suggestion");

  const [edit, setEdit] = React.useState({
    title: "",
    category: "feature",
    updateStatus: "suggestion",
    feedbackDetails: "",
  });

  const navigate = useNavigate();

  //create state for when the screen size is narrow
  const [isNarrowScreen, setIsNarrowScreen] = React.useState(false);

  //adding the state variable for suggestions and roadmap from the global context;
  const { myRequests, setMyRequests } = React.useContext(Context);
  function handleChange(event) {
    //   use object destructuring to get the name and value for the event, then feed it into the set function to update the state. the brackets around name are so the computer doesn't think it's a string.
    const { name, value } = event.target;
    setEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //take first select value and update set-edit
  function setFeedbackOnSelect(sv) {
    setEdit((prev) => {
      return {
        ...prev,
        category: sv,
      };
    });
  }

  //take second select value and update set-edit
  function setFeedbackOnSelect2(sv) {
    setEdit((prev) => {
      return {
        ...prev,
        updateStatus: sv,
      };
    });
  }

  //get value of first select
  function handleSelect(event) {
    setSelectValue2(event.target.value);
  }

  //get value of second select
  function handleSelect2(event) {
    setSelectValue3(event.target.value);
  }

  //because multiple states are often chained together, the use effect hook is needed - it runs when selectValue Changes (or selectValue2)
  React.useEffect(() => {
    setFeedbackOnSelect(selectValue2);
  }, [selectValue2]);

  React.useEffect(() => {
    setFeedbackOnSelect2(selectValue3);
  }, [selectValue3]);

  function editRequest(e) {
    //update the request
    e.preventDefault();
    //use a temporary variable since state should be immutable, then update with the categories that were typed in
    setMyRequests((prev) => {
      let temp = prev;
      for (let request of temp) {
        if (request.title === title) {
          request.category = edit.category;
          request.description = edit.feedbackDetails;
          request.status = edit.updateStatus;
          request.title = edit.title;
        }
      }
      return [...temp];
    });
    // passes state and navigates after form submits, rather than propogating form event through a link, which cancels it
    navigate("/deepDive", { state: { title: edit.title, prevPage: prevPage } });
  }

  function deleteRequest() {
    //loop through requests and ensure the title is the same
    setMyRequests((prev) => {
      let temp = prev;
      for (let i = 0, n = temp.length; i < n; i++) {
        if (temp[i].title === title) {
          //splice takes index and deletecount
          temp.splice(i, 1);
          break;
        }
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
  return (
    <div>
      <nav className="add-feedback-header">
        <Link
          to="/deepDive"
          style={{
            width: "max-content",
            height: "25px",
            position: "relative",
          }}
          state={{
            title: edit["title"] != "" ? edit["title"] : title,
            prevPage: prevPage,
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
      </nav>
      <div className="ovalparent">
        <img
          className="ovalimg"
          src={require(`../assets/editicon.png`)}
          alt="edit icon"
        />
        <div className="add-feedback-outer">
          <h1 className="add-feedback-title">Editing “{title}”</h1>
          <form className="form-flex" action="editform" onSubmit={editRequest}>
            <div className="add-feedback-inner-container-1">
              <h2>Title</h2>
              <label htmlFor="title">Add a short, descriptive headline</label>
              <input
                name="title"
                id="title"
                type="text'"
                value={edit.title}
                onChange={handleChange}
                placeholder={title}
                required
              />
            </div>
            <div className="add-feedback-inner-container-2">
              <h2>Category</h2>
              <label htmlFor="category">
                Choose a category for your feedback
              </label>
              <Select2
                name="category"
                value={selectValue2}
                onChange={handleSelect}
              >
                <option value="Feature">Feature</option>
                <option value="UI">UI</option>
                <option value="UX">UX</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Bug">Bug</option>
              </Select2>
            </div>
            <div className="add-feedback-inner-container-2">
              <h2>Status</h2>
              <label htmlFor="status">Choose a status</label>
              <Select2
                name="updateStatus"
                value={selectValue3}
                onChange={handleSelect2}
              >
                <option value="Suggestion">suggestion</option>
                <option value="Planned">planned</option>
                <option value="In-Progress">in-progress</option>
                <option value="Live">live</option>
              </Select2>
            </div>
            <div className="add-feedback-inner-container-3">
              <h2>Feedback Detail</h2>
              <label htmlFor="feedback details">
                Include any specific comments on what should be improved, added,
                etc.
              </label>
              <textarea
                name="feedbackDetails"
                value={edit.feedbackDetails}
                onChange={handleChange}
                required
                placeholder={description}
              />
            </div>
            <div className="button-flex" style={{ "margin-top": "30px" }}>
              {!isNarrowScreen ? (
                <Link to="/">
                  <button
                    className="btn-five-with-media"
                    onClick={deleteRequest}
                  >
                    Delete
                  </button>
                </Link>
              ) : (
                <button
                  className="btn-primary-with-media"
                  onClick={editRequest}
                  type="submit"
                >
                  Add Feedback
                </button>
              )}

              <Link to="/deepDive" state={{ title: title, prevPage: prevPage }}>
                <button className="btn-quad-with-media">Cancel</button>
              </Link>

              {!isNarrowScreen ? (
                <button className="btn-primary-with-media" type="submit">
                  Add Feedback
                </button>
              ) : (
                <Link to="/">
                  <button
                    className="btn-five-with-media"
                    onClick={deleteRequest}
                  >
                    Delete
                  </button>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
