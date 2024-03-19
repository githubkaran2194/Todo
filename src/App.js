import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const newTask = { id: Date.now(), title: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask("");
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      toast.success("Task added successfully!");
    } else {
      toast.error("Task title cannot be empty!");
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.error("Task deleted successfully!");
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center my-5">
        <div className="col-md-6">
          <div className="p-4 rounded-2 shadow card">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={task}
                  onChange={handleChange}
                  placeholder="Enter task"
                />
                <button className="btn btn-primary" type="submit">
                  Add Task
                </button>
              </div>
            </form>
            <hr />
            <ul className="list-group">
            <p className="text-center my-2">{tasks.length === 0 ? "No tasks" : null}</p>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <p
                    style={{
                      textDecorationLine: task.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.title}
                  </p>
                  <button
                    className="btn btn-danger ml-auto"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </li>      
                        
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
