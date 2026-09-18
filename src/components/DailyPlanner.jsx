import { useState, useEffect, useCallback } from "react";
import api, { getApiErrorMessage } from "../services/api";
function DailyPlanner() {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError("");

    try {
        const response = await api.get("/api/tasks/all");
        setTasks(response.data);
    } catch (error) {
        setError(getApiErrorMessage(error, "Unable to load planner tasks. Please try again."));
    } finally {
        setLoading(false);
    }
}, []);
   useEffect(() => {
    void Promise.resolve().then(fetchTasks);

}, [fetchTasks]);
    const addTask = async () => {

    if (task.trim() === "") {

        alert("Enter Task");
        return;

    }

    try {
        setError("");
        await api.post("/api/tasks/save", {
                text: task,
                done: false
        });
        await fetchTasks();

        setTask("");

    } catch (error) {
        setError(getApiErrorMessage(error, "Unable to save this task."));
    }

};

    const toggleTask = async (item) => {

    try {
        setError("");
        await api.put("/api/tasks/update", {
                id: item.id,
                text: item.text,
                done: !item.done
        });
        await fetchTasks();

    } catch (error) {
        setError(getApiErrorMessage(error, "Unable to update this task."));
    }

};
const deleteTask = async (id) => {

    try {
        setError("");
        await api.delete(`/api/tasks/delete/${id}`);
        await fetchTasks();

    } catch (error) {
        setError(getApiErrorMessage(error, "Unable to delete this task."));
    }

};
   return (

    <div className="dashboard">

        <h1>🗓 Daily Planner</h1>

        <input
            value={task}
            placeholder="Today's Task"
            onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>
            Add
        </button>

        {error && <p role="alert">{error}</p>}
        {loading && <p>Loading tasks...</p>}
        {!loading && !error && tasks.length === 0 && <p>No planner tasks yet.</p>}

        <br /><br />

        {tasks.map((item) => (

            <div
                key={item.id}
                className="card"
            >

                <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleTask(item)}
                />

                {item.done ? (
                    <s>{item.text}</s>
                ) : (
                    item.text
                )}

                <br /><br />

                <button
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                >
                    Delete
                </button>

            </div>

        ))}

    </div>

);

}

export default DailyPlanner;