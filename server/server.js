import { methods as authentication } from "../controllers/authentication.controller.js";
import { reduceStock, returnStock } from "../controllers/stock.js";
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

app.set("view engine", "ejs");

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

//OBTENER LA ID DE LOS JUEGOS
app.get("/api/store/:group/:id", (req, res) => {
  const { group, id } = req.params;
  const gameId = parseInt(id);

  if (!apiStore[group]) {
    return res.status(404).json({ error: "Grupo no encontrado" });
  }

  const game = apiStore[group].find((game) => game.id === gameId);

  if (game) {
    return res.json(game);
  } else {
    return res.status(404).json({ error: "Juego no encontrado" });
  }
});

// MANEJAR STOCK
app.post("/api/store/reduceStock/:id", reduceStock);
app.post("/api/store/returnStock/:id", returnStock);

// GESTION DE RUTAS
app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "../login.html"));
});
app.get("/join", (req, res) => {
  res.sendFile(join(__dirname, "../join.html"));
});
app.get("/logout", (req, res) => {
  res.sendFile(join(__dirname, "../logout.html"));
});
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../store/index.html"));
});
app.get("/store", (req, res) => {
  res.redirect("/");
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
app.get("/profiles/notifications", (req, res) => {
  res.sendFile(join(__dirname, "../profiles/notifications.html"));
});
app.get("/store/cart", (req, res) => {
  res.sendFile(join(__dirname, "../store/cart.html"));
});
app.get("/community", (req, res) => {
  res.sendFile(join(__dirname, "../about/community.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(join(__dirname, "../about/about.html"));
});
app.get("/help", (req, res) => {
  res.sendFile(join(__dirname, "../about/help.html"));
});
app.get("/profile/:username", (req, res) => {
  res.sendFile(join(__dirname, "../profiles/profile.html"));
});

// API
app.post("/api/users", authentication.register);
app.post("/api/login", authentication.login);

//(404)
app.use((req, res, next) => {
  res.status(404).render("404", { url: req.originalUrl });
});

//OTROS ERRORES
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
