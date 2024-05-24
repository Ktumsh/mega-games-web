let deferredPrompt;
const isPWA = window.matchMedia("(display-mode: standalone)").matches;

window.addEventListener("beforeinstallprompt", (e) => {
  deferredPrompt = e;
});

window.addEventListener("appinstalled", () => {
  console.log("PWA instalada");
  localStorage.setItem("pwaInstalled", "true");
});

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

const body = document.body;
const downloadAppModal = document.getElementById("downloadAppModal");
const modalCtn = document.querySelector(".modal_position_content");

window.addEventListener("load", () => {
  const modalShown = sessionStorage.getItem("modalShown") === "true";

  if (isMobileDevice() && !modalShown) {
    downloadAppModal.style.display = "block";
    setTimeout(() => {
      body.classList.add("hidden_body");
      downloadAppModal.classList.add("show");
      modalCtn.classList.add("show");
    }, 2000);
    sessionStorage.setItem("modalShown", "true");
  }
});

document.querySelector(".close_button").addEventListener("click", () => {
  body.classList.remove("hidden_body");
  downloadAppModal.classList.remove("show");
  modalCtn.classList.remove("show");
  downloadAppModal.style.display = "none";
});

document.getElementById("installApp").addEventListener("click", () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
        localStorage.setItem("pwaInstalled", "true");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  } else {
    alert(
      "Aplicación ya instalada, si crees que se trata de un error, instala la app al final de la página."
    );
  }
});
