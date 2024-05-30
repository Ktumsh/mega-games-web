import { methods as authentication } from "../controllers/authentication.controller.js";
import { methods as authorization } from "../middlewares/authorization.js";
import logoutRouter from "../middlewares/authorization.js";
import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 4000;
const app = express();

// SERVER
app.set("port", PORT);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// CONFIGURACION ESTATICOS
app.use("/assets", express.static(join(__dirname, "../assets")));
app.use("/data", express.static(join(__dirname, "../data")));
app.use(express.json());
app.use(cookieParser());
app.get("/manifest.json", (req, res) => {
  res.sendFile(join(__dirname, "../manifest.json"));
});

//GESTION DE RUTAS
app.get("/login.html", authorization.onlyGuest, (req, res) => {
  res.sendFile(join(__dirname, "../login.html"));
});
app.get("/login", authorization.onlyGuest, (req, res) => {
  res.sendFile(join(__dirname, "../login.html"));
});
app.get("/join.html", authorization.onlyGuest, (req, res) => {
  res.sendFile(join(__dirname, "../join.html"));
});
app.get("/join", authorization.onlyGuest, (req, res) => {
  res.sendFile(join(__dirname, "../join.html"));
});
app.get("/logout", authorization.onlyGuest, (req, res) => {
  res.sendFile(join(__dirname, "../logout.html"));
});
app.get("/store", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/index.html"));
});
app.get("/", (req, res) => {
  res.redirect("/store");
});
app.get(
  "/store/ActivisionPublisherSale2024",
  authorization.onlyAdmin,
  (req, res) => {
    res.sendFile(join(__dirname, "../store/ActivisionPublisherSale2024.html"));
  }
);
app.get("/store/juegos-populares", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/juegos-populares.html"));
});
app.get("/store/juegos-y-tarjetas", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/juegos-y-tarjetas.html"));
});
app.get("/store/ofertas-especiales", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/ofertas-especiales.html"));
});
app.get("/store/offer-details", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/offer-details.html"));
});
app.get("/store/games-details", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/games-details.html"));
});
app.get("/store/gift-details", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/gift-details.html"));
});
app.get(
  "/store/publisher-sale-details",
  authorization.onlyAdmin,
  (req, res) => {
    res.sendFile(join(__dirname, "../store/publisher-sale-details.html"));
  }
);
app.get("/store/notifications", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/notifications.html"));
});
app.get("/store/cart", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../store/cart.html"));
});
app.get("/about/community", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../about/community.html"));
});
app.get("/about/about", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../about/about.html"));
});
app.get("/about/help", authorization.onlyAdmin, (req, res) => {
  res.sendFile(join(__dirname, "../about/help.html"));
});

//USAR TODAS LAS PAGINAS SI ESTA AUTENTICADO
app.use(
  "/store",
  authorization.isAuthenticated,
  express.static(join(__dirname, "../store"))
);
app.use(
  "/about",
  authorization.isAuthenticated,
  express.static(join(__dirname, "../about"))
);

// API
app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);

app.use("/", logoutRouter);
