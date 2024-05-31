import { methods as authentication } from "../controllers/authentication.controller.js";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import apiStore from "../data/api/apiStore.json" assert { type: "json" };
import users from "../data/api/users.json" assert { type: "json" };
import login from "../data/api/login.json" assert { type: "json" };
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT ?? 4000;
const app = express();

// SERVER
app.set("port", PORT);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// CONFIGURACION ESTATICOS
app.use("/assets", express.static(join(__dirname, "../assets")));
app.use("/data", express.static(join(__dirname, "../data")));
app.use("/middlewares", express.static(join(__dirname, "../middlewares")));
app.use(express.json());

app.get("/manifest.json", (req, res) => {
  res.sendFile(join(__dirname, "../manifest.json"));
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/login", (req, res) => {
  res.json(login);
});

app.get("/api/store", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredGames = apiStore["offerCards"].filter((game) =>
      game.generos.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredGames);
  }
  res.json(apiStore);
});

app.get("/api/store/:collection/:id", (req, res) => {
  const { collection, id } = req.params;
  const gameId = parseInt(id);

  if (!apiStore[collection]) {
    return res.status(404).json({ error: "Colección no encontrada" });
  }

  const game = apiStore[collection].find((game) => game.id === gameId);

  if (game) {
    return res.json(game);
  } else {
    return res.status(404).json({ error: "Juego no encontrado" });
  }
});

// GESTION DE RUTAS
app.get("/login.html", (req, res) => {
  res.sendFile(join(__dirname, "../login.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "../login.html"));
});
app.get("/join.html", (req, res) => {
  res.sendFile(join(__dirname, "../join.html"));
});
app.get("/join", (req, res) => {
  res.sendFile(join(__dirname, "../join.html"));
});
app.get("/logout", (req, res) => {
  res.sendFile(join(__dirname, "../logout.html"));
});
app.get("/store", (req, res) => {
  res.sendFile(join(__dirname, "../store/index.html"));
});
app.get("/", (req, res) => {
  res.redirect("/store");
});
app.get("/store/ActivisionPublisherSale2024", (req, res) => {
  res.sendFile(join(__dirname, "../store/ActivisionPublisherSale2024.html"));
});
app.get("/store/juegos-populares", (req, res) => {
  res.sendFile(join(__dirname, "../store/juegos-populares.html"));
});
app.get("/store/juegos-y-tarjetas", (req, res) => {
  res.sendFile(join(__dirname, "../store/juegos-y-tarjetas.html"));
});
app.get("/store/ofertas-especiales", (req, res) => {
  res.sendFile(join(__dirname, "../store/ofertas-especiales.html"));
});
app.get("/store/offer-details", (req, res) => {
  res.sendFile(join(__dirname, "../store/offer-details.html"));
});
app.get("/store/games-details", (req, res) => {
  res.sendFile(join(__dirname, "../store/games-details.html"));
});
app.get("/store/gift-details", (req, res) => {
  res.sendFile(join(__dirname, "../store/gift-details.html"));
});
app.get("/store/publisher-sale-details", (req, res) => {
  res.sendFile(join(__dirname, "../store/publisher-sale-details.html"));
});
app.get("/store/notifications", (req, res) => {
  res.sendFile(join(__dirname, "../store/notifications.html"));
});
app.get("/store/cart", (req, res) => {
  res.sendFile(join(__dirname, "../store/cart.html"));
});
app.get("/about/community", (req, res) => {
  res.sendFile(join(__dirname, "../about/community.html"));
});
app.get("/about/about", (req, res) => {
  res.sendFile(join(__dirname, "../about/about.html"));
});
app.get("/about/help", (req, res) => {
  res.sendFile(join(__dirname, "../about/help.html"));
});

// API
app.post("/api/users", authentication.register);
app.post("/api/login", authentication.login);
