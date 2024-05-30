document.addEventListener("DOMContentLoaded", function () {
  const headerNotification = document.getElementById(
    "header_notification_area"
  );
  const accountName = document.getElementById("account_name");
  const sessionLink = document.getElementById("session_link");
  const accountPulldown = document.getElementById("account_pulldown");
  const logoutLink = document.getElementById("logout_link");

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const username = localStorage.getItem("username");

  if (isAuthenticated) {
    accountPulldown.textContent = username;
    sessionLink.style.display = "none";
    headerNotification.style.display = "inline-block";
    accountPulldown.style.display = "inline-block";
    accountName.textContent = username;

    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      window.location.href = "/logout";
    });
  } else {
    sessionLink.style.display = "inline-block";
    headerNotification.style.display = "none";
    accountPulldown.style.display = "none";
  }
});
