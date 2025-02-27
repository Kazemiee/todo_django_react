import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface Task {
  id: number;
  text: string;
}

const CreatePrerequisite: React.FC = () => {
  const location = useLocation();
  const { task } = location.state || {};
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/potential-prerequisites/${task.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data.potential_prerequisites);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [task.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskId) return;

    const response = await fetch("http://127.0.0.1:8000/api/task-orderings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_task: selectedTaskId,
        second_task: task.id,
      }),
    });

    if (response.ok) {
      navigate("/");
    } else {
      console.error("Failed to create prerequisite");
    }
  };

  const handleBack = () => {
    navigate("/"); // Go back to the home page when "Back" is clicked
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Create Prerequisite for {task.text}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Select prerequisite task:
          <select
            className="w-full p-2 border rounded mt-1"
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
          >
            <option value="">-- Select a task --</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.text}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        <button type="button" onClick={handleBack}>
          Back
        </button>
      </form>
    </div>
  );
};

export default CreatePrerequisite;
