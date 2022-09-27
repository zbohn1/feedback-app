import React from "react";
import countRoadmap from "../helpers/countRoadmap.js";
import ButtonBoard from "./ButtonBoard";
import { Context } from "../helpers/Context.js";
import RoadmapPane from "./RoadmapPane.js";

const MobileMenu = ({ isOpen, onDismiss, changeFilter }) => {
  const { myRequests, setMyRequests } = React.useContext(Context);

  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <div className="mobile-menu-opacity-overlay"></div>
      <div className="mobile-menu-overlay">
        <ButtonBoard onClick={changeFilter} mobileStatus="mobile" />
        <RoadmapPane
          planned={countRoadmap(myRequests, "planned")}
          inProgress={countRoadmap(myRequests, "in-progress")}
          live={countRoadmap(myRequests, "live")}
          mobileStatus="mobile"
        />
      </div>
    </div>
  );
};

export default MobileMenu;
