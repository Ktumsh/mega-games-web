const errorMsg = document.getElementById("error_display");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const apiUrl = "https://store-megagames.onrender.com";

document
  .getElementById("create_account")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/api/users`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        username: username.value,
        password: password.value,
      }),
    });
    if (!res.ok) {
      errorMsg.classList.toggle("hidden", false);
      username.classList.add("error");
      email.classList.add("error");
      password.classList.add("error");
    }

    const resJson = await res.json();
    if (resJson.redirect) {
      window.location.href = resJson.redirect;
    }
  });
