document.addEventListener("DOMContentLoaded", function () {
  if (!checkAuthentication()) {
    window.location.href = "/login.html";
  }
});

export function checkAuthentication() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated;
}
