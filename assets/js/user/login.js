const errorMsg = document.getElementById("error_msg");

document.getElementById("login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const identifier = document.getElementById("username");
  const password = document.getElementById("password");
  const res = await fetch("https://store-megagames.onrender.com/api/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: identifier.value,
      password: password.value,
    }),
  });

  if (!res.ok) {
    errorMsg.classList.toggle("hidden", false);
    identifier.classList.add("error");
    password.classList.add("error");
  }

  const resJson = await res.json();
  if (resJson.status === "ok") {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", resJson.username);
    localStorage.setItem("email", resJson.email);
    window.location.href = "/";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (isAuthenticated) {
    window.location.href = "/";
    console.error("Error al iniciar sesión");
  }
});
