import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Tasks() {
  const [tasks, setTasks] = useState<
    { id: number; text: string; difficulty: number }[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const completeTask = (taskId: number) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
          );
        } else {
          console.error("Failed to complete task.");
        }
      })
      .catch((error) => console.error("Error completing task:", error));
  };

  return (
    <div className="tasks-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Text</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.text}</td>
              <td>{task.difficulty}</td>
              <td>
                <button
                  className="complete-btn"
                  onClick={() => completeTask(task.id)}
                >
                  Complete
                </button>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;
