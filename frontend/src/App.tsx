import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tasks from "./Tasks";
import NewTask from "./NewTask";
import "./App.css";
import NextTask from "./NextTask";
import NewPrereq from "./NewPrereq";

function App() {
  return (
    <Router>
      <div className="container">
        {/* Define Routes for your pages */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NextTask />
                <Link to="/new-task">
                  <button className="create-btn">
                    <h3>New Task</h3>
                  </button>
                </Link>
                <Tasks />
              </>
            }
          />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/new-prereq" element={<NewPrereq />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
