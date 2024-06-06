import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_URL = "https://store-megagames.onrender.com/api/users";

async function fetchUsers() {
  const response = await axios.get(API_URL);
  return response.data;
}

async function saveUser(user) {
  await axios.post(API_URL, user);
}

async function login(req, res) {
  console.log(req.body.identifier);
  const identifier = req.body.identifier;
  const password = req.body.password;
  if (!identifier || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  const users = await fetchUsers();
  const userToReview = users.find(
    (user) => user.username === identifier || user.email === identifier
  );
  if (!userToReview) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error al ingresar." });
  }
  const correctLogin = await bcryptjs.compare(password, userToReview.password);
  if (!correctLogin) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error al ingresar." });
  }
  console.log("Login successful, user authenticated");
  res.send({
    status: "ok",
    message: "Usuario logeado",
    username: userToReview.username,
    email: userToReview.email,
  });
}

async function register(req, res) {
  console.log(req.body);
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password || !email) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  const users = await fetchUsers();
  const userToReview = users.find((user) => user.username === username);
  if (userToReview) {
    return res
      .status(400)
      .json({ error: "El usuario ya existe, por favor inicia sesión" });
  }
  const salt = await bcryptjs.genSalt(5);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const newUser = {
    id: users.length + 1,
    email,
    username,
    password: hashedPassword,
    role: "user",
    createdAt: new Date().toISOString(),
    isActive: true,
    lastLogin: null,
  };

  await saveUser(newUser);
  res.status(201).send({
    status: "ok",
    message: `Usuario ${newUser.username} registrado`,
    redirect: "/login",
  });
}

export const methods = {
  login,
  register,
};
