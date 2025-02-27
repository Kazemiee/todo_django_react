import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewTask() {
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = { text, difficulty };

    console.log(newTask);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        navigate("/"); // Redirect to home after task creation
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleBack = () => {
    navigate("/"); // Go back to the home page when "Back" is clicked
  };

  return (
    <div className="new-task-container">
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Task Text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>
        <label>
          Difficulty:
          <input
            type="number"
            value={difficulty}
            min="1"
            max="5"
            onChange={(e) => setDifficulty(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleBack}>
          Back
        </button>
      </form>
    </div>
  );
}

export default NewTask;
