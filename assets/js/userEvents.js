function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function toggleMenu() {
  const dropdown = document.getElementById("account_dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const headerNotification = document.getElementById(
    "header_notification_area"
  );
  const accountName = document.getElementById("account_name");
  const sessionLink = document.getElementById("session_link");
  const accountPulldown = document.getElementById("account_pulldown");
  const logoutLink = document.getElementById("logout_link");
  const jwtToken = getCookie("jwt");

  if (jwtToken) {
    const payload = parseJwt(jwtToken);
    accountPulldown.textContent = payload.username;
    sessionLink.style.display = "none";
    headerNotification.style.display = "inline-block";
    accountPulldown.style.display = "inline-block";
    accountName.textContent = payload.username;

    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/logout";
    });
  } else {
    sessionLink.style.display = "inline-block";
    headerNotification.style.display = "none";
    accountPulldown.style.display = "none";
  }
});
