import express from "express";
import dotenv from "dotenv";
import fs from "fs";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Leer datos de estudiantes desde students.json
const students = JSON.parse(fs.readFileSync("students.json", "utf-8"));

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Script Cardenal. Usa /user-info/:id para consultar estudiantes.");
});


// Endpoint dinámico
app.get("/user-info/:id", (req, res) => {
  const { id } = req.params;

  // Validar que el ID sea un número entero positivo
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

  // Buscar estudiante en el array
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  res.json(student);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

