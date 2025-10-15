import { Router } from "express";
import { db } from "./database";

const routes = Router();

// Listar tarefas
routes.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => res.json(rows));
});

// Criar tarefa
routes.post("/tasks", (req, res) => {
  const { title } = req.body;
  db.run("INSERT INTO tasks (title, done) VALUES (?, ?)", [title, 0]);
  res.status(201).json({ message: "Task criada!" });
});

// Atualizar tarefa
routes.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  db.run("UPDATE tasks SET done = ? WHERE id = ?", [done, id]);
  res.json({ message: "Task atualizada!" });
});

// Deletar tarefa
routes.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id]);
  res.json({ message: "Task removida!" });
});

export default routes;
