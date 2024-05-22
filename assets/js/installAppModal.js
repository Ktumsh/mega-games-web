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
  if (
    isMobileDevice() &&
    !window.matchMedia("(display-mode: standalone)").matches
  ) {
    downloadAppModal.style.display = "block";
    setTimeout(() => {
      body.classList.add("hidden_body");
      downloadAppModal.classList.add("show");
      modalCtn.classList.add("show");
    }, 2000);
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
    deferredPrompt = null;
  }
});
