import express from "express";
const router = express.Router();

router.post("/logout", (req, res) => {
  res.redirect("/logout.html");
});

export default router;

document.addEventListener("DOMContentLoaded", function () {
  if (!checkAuthentication()) {
    window.location.href = "/login.html";
  }
});

export function checkAuthentication() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated;
}
