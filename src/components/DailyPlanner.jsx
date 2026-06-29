import { useState, useEffect } from "react";
import axios from "axios";
function DailyPlanner() {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
});

   useEffect(() => {

    fetchTasks();

}, []);

const fetchTasks = async () => {

    try {

        const response =
            await axios.get(
                "http://localhost:8081/api/tasks/all"
            );

        setTasks(response.data);

    } catch (error) {

        console.log(error);

    }

};
    const addTask = async () => {

    if (task.trim() === "") {

        alert("Enter Task");
        return;

    }

    try {

        await axios.post(
            "http://localhost:8081/api/tasks/save",
            {
                text: task,
                done: false
            }
        );

        fetchTasks();

        setTask("");

    } catch (error) {

        console.log(error);

    }

};

    const toggleTask = async (item) => {

    try {

        await axios.put(
            "http://localhost:8081/api/tasks/update",
            {
                id: item.id,
                text: item.text,
                done: !item.done
            }
        );

        fetchTasks();

    } catch (error) {

        console.log(error);

    }

};
const deleteTask = async (id) => {

    try {

        await axios.delete(
            `http://localhost:8081/api/tasks/delete/${id}`
        );

        fetchTasks();

    } catch (error) {

        console.log(error);

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