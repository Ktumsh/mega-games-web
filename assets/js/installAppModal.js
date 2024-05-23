let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  deferredPrompt = e;
});

window.addEventListener("appinstalled", () => {
  console.log("PWA instalada");
});

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

const body = document.body;
const downloadAppModal = document.getElementById("downloadAppModal");
const modalCtn = document.querySelector(".modal_position_content");

window.addEventListener("load", () => {
  if (isMobileDevice()) {
    if (!window.matchMedia("(display-mode: standalone)").matches) {
      downloadAppModal.style.display = "block";
      setTimeout(() => {
        body.classList.add("hidden_body");
        downloadAppModal.classList.add("show");
        modalCtn.classList.add("show");
      }, 2000);
    } else {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        alert("La aplicación está instalada. Ábrela desde tu dispositivo.");
      }
    }
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
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  } else {
    alert("PWA no instalada");
  }
});
