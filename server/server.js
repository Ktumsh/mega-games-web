const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../assets")));
app.use(express.static(path.join(__dirname, "../netlify/functions")));

// Ruta para la API
app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "../data/api/apiStore.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error al leer la API");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Ruta de ejemplo para la API
app.get("/api/hello", (req, res) => {
  res.send("Hola desde la API!");
});

// Manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).send("Página no encontrada");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
