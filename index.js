import express from "express";
import dotenv from "dotenv";
import { students } from "./students.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Script Cardenal. Usa /user-info/:id para consultar estudiantes.");
});

// Endpoint dinámico
app.get("/user-info/:id", (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  res.json(student);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



