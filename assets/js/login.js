const errorMsg = document.getElementById("error_msg");
const apiUrl = "https://store-megagames.vercel.app";

document.getElementById("login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const identifier = document.getElementById("username");
  const password = document.getElementById("password");
  const res = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
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
  if (resJson.redirect) {
    window.location.href = resJson.redirect;
  }
});
