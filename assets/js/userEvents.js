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

document.addEventListener("DOMContentLoaded", function () {
  const headerNotification = document.getElementById(
    "header_notification_area"
  );
  const accountName = document.getElementById("account_name");
  const sessionLink = document.getElementById("session_link");
  const accountPulldown = document.getElementById("account_pulldown");
  const logoutLink = document.getElementById("logout_link");
  const jwtToken = localStorage.getItem("jwt");

  if (jwtToken) {
    const payload = parseJwt(jwtToken);
    accountPulldown.textContent = payload.username;
    sessionLink.style.display = "none";
    headerNotification.style.display = "inline-block";
    accountPulldown.style.display = "inline-block";
    accountName.textContent = payload.username;

    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("jwt");
      window.location.href = "/logout";
    });
  } else {
    sessionLink.style.display = "inline-block";
    headerNotification.style.display = "none";
    accountPulldown.style.display = "none";
  }
});
