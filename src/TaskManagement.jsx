import React, { useState } from "react";
import "./TaskManagement.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Deliver Medical Kits", assignee: "John Doe", status: "Pending" },
    { id: 2, title: "Set Up Relief Camp", assignee: "Jane Smith", status: "In Progress" },
    { id: 3, title: "Evacuate Residents", assignee: "Mike Brown", status: "Completed" },
  ]);

  const handleChangeStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAddTask = () => {
    const newTitle = prompt("Enter the task title:");
    const newAssignee = prompt("Enter the assignee's name:");
    if (newTitle && newAssignee) {
      const newTask = {
        id: tasks.length + 1,
        title: newTitle,
        assignee: newAssignee,
        status: "Pending",
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  return (
    <div className="task-management">
      <h2>Task Management</h2>
      <button onClick={handleAddTask} className="add-task-button">
        Add Task
      </button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.assignee}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleChangeStatus(task.id, "In Progress")}>
                  Start
                </button>
                <button onClick={() => handleChangeStatus(task.id, "Completed")}>
                  Complete
                </button>
                <button onClick={() => handleChangeStatus(task.id, "Pending")}>
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManagement;
