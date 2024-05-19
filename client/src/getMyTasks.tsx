import { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://api.example.com/tasks"); // Replace with your API endpoint
        setTasks(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Render tasks, loading state, or error message
}
export default TaskList;
