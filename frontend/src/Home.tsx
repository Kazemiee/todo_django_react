import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tasks from "./Tasks";
import NewTask from "./NewTask";
import "./App.css";
import NextTask from "./NextTask";

function App() {
  return (
    <Router>
      <div className="container">
        <NextTask />

        {/* Link the button to the NewTask page */}
        <Link to="/new-task">
          <button className="create-btn">
            <h3>New Task</h3>
          </button>
        </Link>
        <Tasks />
      </div>
      {/* Define Routes for your pages */}
      <Routes>
        <Route path="/new-task" element={<NewTask />} />
      </Routes>
    </Router>
  );
}

export default App;
