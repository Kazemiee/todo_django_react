import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tasks from "./Tasks";
import "./App.css";

function NextTask() {
  const [task, setTask] = useState<{
    id: number;
    text: string;
    difficulty: number;
  } | null>(null);

  const navigate = useNavigate();

  const completeTask = (taskId: number) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        alert("Error deleting task.");
      });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/next-task/")
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) setTask(data);
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, []);

  return (
    <div className="container">
      <h1>Next Task</h1>
      {task ? (
        <div className="next-task">
          <div className="task-info">
            <p>ID: {task.id}</p>
            <p>Difficulty: {task.difficulty}</p>
          </div>
          <p className="task-text">{task.text}</p>
          <div>
            <button
              className="complete-btn"
              onClick={() => completeTask(task.id)}
            >
              Complete
            </button>
          </div>
          <div>
            <button
              className="prereq-btn"
              onClick={() =>
                navigate("/new-prereq", {
                  state: { task }, // Pass the task data to the NewPrereq page
                })
              }
            >
              Add Prerequisite
            </button>
          </div>
        </div>
      ) : (
        <p>No available tasks.</p>
      )}
    </div>
  );
}

export default NextTask;
