import React, { useEffect, useState } from "react";
import { api } from "./services/api";
import TaskItem from "./components/TaskItem";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await api.post("/tasks", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  const toggleDone = async (id: number, done: boolean) => {
    await api.put(`/tasks/${id}`, { done: done ? 1 : 0 });
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h1>📝 To-Do List</h1>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa"
          style={{ padding: 8, width: "70%", marginRight: 8 }}
        />
        <button onClick={addTask} style={{ padding: 8 }}>
          ➕
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            done={task.done}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
