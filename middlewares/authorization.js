document.addEventListener("DOMContentLoaded", function () {
  if (!checkAuthentication()) {
    window.location.href = "/login";
  }
});

export function checkAuthentication() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated;
}
