import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
const router = express.Router();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersFilePath = join(__dirname, "../data/api/users.json");

function readUsersFromFile() {
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data);
}

function onlyAdmin(req, res, next) {
  const logged = reviewToken(req);
  if (logged) return next();
  return res.redirect("/login.html");
}

function onlyGuest(req, res, next) {
  const logged = reviewToken(req);
  if (logged) return next();
  return res.redirect("/store");
}

function isAuthenticated(req, res, next) {
  const logged = reviewToken(req);
  if (logged) return next();
  return res.redirect("/login.html");
}

function reviewToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(" ")[1];
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const users = readUsersFromFile();
    const userToReview = users.find(
      (user) => user.username === decoded.username
    );
    if (!userToReview) {
      return false;
    }
    console.log("Token validado");
    return true;
  } catch (err) {
    console.log("Token invalidado", err);
    return false;
  }
}

export const methods = {
  onlyAdmin,
  onlyGuest,
  isAuthenticated,
};

router.post("/logout", (req, res) => {
  res.redirect("/logout.html");
});

export default router;
