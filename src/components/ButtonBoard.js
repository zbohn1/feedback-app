export default function ButtonBoard(props) {
  return (
    <div
      className={
        props.mobileStatus == "mobile" ? "button-board-m" : "button-board"
      }
    >
      <div className="button-board-flex-spacer">
        <h2>Filter By Category</h2>
        <button className="hidden">All</button>
      </div>
      <button
        name="All"
        value="All"
        onClick={props.onClick}
        className="btn-secondary"
        autoFocus
      >
        All
      </button>
      <button
        name="UI"
        value="UI"
        onClick={props.onClick}
        className="btn-secondary"
      >
        UI
      </button>
      <button
        name="UX"
        value="UX"
        onClick={props.onClick}
        className="btn-secondary"
      >
        UX
      </button>
      <button
        name="Enhancement"
        value="Enhancement"
        onClick={props.onClick}
        className="btn-secondary"
      >
        Enhancement
      </button>
      <button
        name="Bug"
        value="Bug"
        onClick={props.onClick}
        className="btn-secondary"
      >
        Bug
      </button>
      <button
        name="Feature"
        value="Feature"
        onClick={props.onClick}
        className="btn-secondary"
      >
        Feature
      </button>
    </div>
  );
}
