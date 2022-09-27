import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Context } from "../helpers/Context.js";
import Select2 from "../components/Select2.js";

export default function AddFeedback(props) {
  //create state for the custom select
  const [selectValue, setSelectValue] = React.useState("Feature");

  //create state to track the additional feedback
  const [fullFeedback, setFullFeedback] = React.useState({
    title: "",
    category: "Feature",
    feedbackDetails: "",
  });

  const navigate = useNavigate();

  //adding the state variable for requests from the global context;
  const { myRequests, setMyRequests } = useContext(Context);

  function handleChange(event) {
    //   use object destructuring to get the name and value for the event, then feed it into the set function to update the state. the brackets around name are so the computer doesn't think it's a string.
    const { name, value } = event.target;
    setFullFeedback((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // update the feedback state with the custom select
  function setFeedbackOnSelect(sv) {
    setFullFeedback((prev) => {
      return {
        ...prev,
        category: sv,
      };
    });
  }

  //get the value in the select once changed
  function handleSelect(event) {
    setSelectValue(event.target.value);
  }

  //because multiple states are often chained together, the use effect hook is needed - it runs when selectValue Changes
  React.useEffect(() => {
    setFeedbackOnSelect(selectValue);
  }, [selectValue]);

  //saving the previous state to a temporary variable and pushing the value from add feedback onto the end of the array
  function feedbackAdder(e) {
    e.preventDefault();
    setMyRequests((prev) => {
      let temp = prev.push({
        id: prev.length + 1,
        category: fullFeedback.category,
        description: fullFeedback.feedbackDetails,
        status: "suggestion",
        title: fullFeedback.title,
        upvotes: 0,
      });
      return [...prev];
    });

    // passes state and navigates after form submits, rather than propogating form event through a link, which cancels it
    navigate("/", { replace: true });
  }

  return (
    <div>
      <nav
        className="deep-dive-header"
        style={{ marginLeft: "19vw", marginBottom: "7vh" }}
      >
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
          src={require(`../assets/oval.png`)}
          alt="category colored circle"
        />
        <div className="add-feedback-outer">
          <h1 className="add-feedback-title">Create New Feedback</h1>
          {/* track the current state of each of the form elements by setting the value to the use state object */}
          <form
            action="addfeedback"
            className="form-flex"
            onSubmit={feedbackAdder}
          >
            <div className="add-feedback-inner-container-1">
              <h2>Feedback Title</h2>
              <label htmlFor="title">Add a short, descriptive headline</label>
              <input
                name="title"
                id="title"
                type="text'"
                value={fullFeedback.title}
                onChange={handleChange}
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
                onChange={handleSelect}
                value={fullFeedback.category}
              >
                <option value="Feature">Feature</option>
                <option value="UI">UI</option>
                <option value="UX">UX</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
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
                value={fullFeedback.feedbackDetails}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-flex">
              <button className="btn-primary-with-media" type="submit">
                Add Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
