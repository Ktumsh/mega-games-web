import { methods as authorization } from "../middlewares/authorization.js";
import { methods as authentication } from "../controllers/authentication.controller.js";
import logoutRouter from "../middlewares/authorization.js";
import express from "express";
import cookieParser from "cookie-parser";
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
    origin: (origin, callback) => {
      const ALLOWED_ORIGIN = [
        "https://store-megagames.vercel.app",
        "http://localhost:4000",
        "https://store-megagames.onrender.com",
        "https://store-megagames.onrender.com/api/login",
        "https://store-megagames.onrender.com/api/store",
        "https://store-megagames.onrender.com/api/users",
      ];
      if (ALLOWED_ORIGIN.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error("No permitido por CORS"));
    },
  })
);

// CONFIGURACION ESTATICOS
app.use("/assets", express.static(join(__dirname, "../assets")));
app.use("/data", express.static(join(__dirname, "../data")));
app.use(express.json());
app.use(cookieParser());
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

app.get("/api/store/:id", (req, res) => {
  const { id } = req.params;
  const game = apiStore["offerCards"].find((game) => game.id === parseInt(id));
  if (game) return res.json(game);
  res.status(404).json({ error: "Juego no encontrado" });
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
  authorization.isAuthenticated,
  (req, res) => {
    res.sendFile(join(__dirname, "../store/ActivisionPublisherSale2024.html"));
  }
);
app.get(
  "/store/juegos-populares",
  authorization.isAuthenticated,
  (req, res) => {
    res.sendFile(join(__dirname, "../store/juegos-populares.html"));
  }
);
app.get(
  "/store/juegos-y-tarjetas",
  authorization.isAuthenticated,
  (req, res) => {
    res.sendFile(join(__dirname, "../store/juegos-y-tarjetas.html"));
  }
);
app.get(
  "/store/ofertas-especiales",
  authorization.isAuthenticated,
  (req, res) => {
    res.sendFile(join(__dirname, "../store/ofertas-especiales.html"));
  }
);
app.get("/store/offer-details", authorization.isAuthenticated, (req, res) => {
  res.sendFile(join(__dirname, "../store/offer-details.html"));
});
app.get("/store/games-details", authorization.isAuthenticated, (req, res) => {
  res.sendFile(join(__dirname, "../store/games-details.html"));
});
app.get("/store/gift-details", authorization.isAuthenticated, (req, res) => {
  res.sendFile(join(__dirname, "../store/gift-details.html"));
});
app.get(
  "/store/publisher-sale-details",
  authorization.isAuthenticated,
  (req, res) => {
    res.sendFile(join(__dirname, "../store/publisher-sale-details.html"));
  }
);
app.get("/store/notifications", authorization.isAuthenticated, (req, res) => {
  res.sendFile(join(__dirname, "../store/notifications.html"));
});
app.get("/store/cart", authorization.isAuthenticated, (req, res) => {
  res.sendFile(join(__dirname, "../store/cart.html"));
});
app.get("/about/community", authorization.isAuthenticated, (req, res) => {
  res.sendFile(join(__dirname, "../about/community.html"));
});
app.get("/about/about", authorization.isAuthenticated, (req, res) => {
  res.sendFile(join(__dirname, "../about/about.html"));
});
app.get("/about/help", authorization.isAuthenticated, (req, res) => {
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
app.post("/api/users", authentication.register);
app.post("/api/login", authentication.login);

app.use("/", logoutRouter);
