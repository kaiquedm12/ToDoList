import React from "react";

interface TaskItemProps {
  id: number;
  title: string;
  done: boolean;
  toggleDone: (id: number, done: boolean) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, done, toggleDone, deleteTask }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
      <input
        type="checkbox"
        checked={done}
        onChange={() => toggleDone(id, !done)}
        style={{ marginRight: 8 }}
      />
      <span style={{ flex: 1, textDecoration: done ? "line-through" : "none" }}>{title}</span>
      <button onClick={() => deleteTask(id)}>❌</button>
    </div>
  );
};

export default TaskItem;
