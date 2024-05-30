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
  const logged = reviewCookie(req);
  if (logged) return next();
  return res.redirect("/login.html");
}

function onlyGuest(req, res, next) {
  const logged = reviewCookie(req);
  if (!logged) return next();
  return res.redirect("/store");
}

function isAuthenticated(req, res, next) {
  const logged = reviewCookie(req);
  if (logged) return next();
  return res.redirect("/login.html");
}

function reviewCookie(req) {
  try {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const users = readUsersFromFile();
    const userToReview = users.find(
      (user) => user.username === decoded.username
    );
    console.log(decoded, userToReview);
    if (!userToReview) {
      return false;
    }
    console.log("cookie validada");
    return true;
  } catch {
    console.log("cookie invalidada");
    return false;
  }
}

export const methods = {
  onlyAdmin,
  onlyGuest,
  isAuthenticated,
};

router.post("/logout", (req, res) => {
  console.log("cookie eliminada");
  res.clearCookie("jwt");
  res.redirect("/logout.html");
});

export default router;
