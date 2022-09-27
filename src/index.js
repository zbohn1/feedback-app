import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./helpers/Context";
import AddFeedback from "./pages/AddFeedback.js";
import DeepDive from "./pages/DeepDive.js";
import EditRequest from "./pages/EditRequest.js";
import Roadmap from "./pages/Roadmap.js";
import ScrollToTop from "./ScrollToTop.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <HashRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/addfeedback" element={<AddFeedback />} />
            <Route path="/deepDive" element={<DeepDive />} />
            <Route path="/editRequest" element={<EditRequest />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </ScrollToTop>
      </HashRouter>
    </ContextProvider>
  </React.StrictMode>
);
