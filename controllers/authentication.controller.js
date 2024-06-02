import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersFilePath = join(__dirname, "../data/api/users.json");

function readUsersFromFile() {
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data);
}

function writeUsersToFile(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

async function login(req, res) {
  console.log(req.body.identifier);
  const identifier = req.body.identifier;
  const password = req.body.password;
  if (!identifier || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  const users = readUsersFromFile();
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
  const users = readUsersFromFile();
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

  users.push(newUser);
  writeUsersToFile(users);
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
