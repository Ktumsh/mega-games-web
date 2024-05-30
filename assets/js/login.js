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
  if (resJson.token) {
    localStorage.setItem("jwt", resJson.token);
    window.location.href = "/store";
  }
});
