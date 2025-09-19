import express from "express";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Datos de estudiantes en memoria
const students = [
  {
    id: "1",
    name: "Daniel",
    lastName: "Sanabria",
    email: "daniel.sanabria@universidad.edu",
    id_universidad: "123456"
  },
  {
    "id": "2",
    "name": "Camilo",
    "lastName": "Gutierrez",
    "email": "camiloguba@unisabana.edu.co",
    "universityId": "338758"
  }
];

// ✅ Endpoint raíz con mensaje de bienvenida
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Script Cardenal. Usa /user-info/:id para consultar estudiantes.");
});

// Endpoint dinámico
app.get("/user-info/:id", (req, res) => {
  const { id } = req.params;

  // Validar que el ID sea un número
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

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


