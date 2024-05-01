document.addEventListener("DOMContentLoaded", () => {
  const footerSlot = document.querySelector(".FooterSlot");
  const footerContainer = document.createElement("div");
  footerContainer.classList.add("container");

  footerContainer.innerHTML = `
      <footer class="pt-5">
        <div class="row justify-content-center">
          ${generateFooterColumn("Sobre Mega Games", [
            { text: "Sobre nosotros", href: "#" },
            { text: "Contáctanos", href: "#" },
            { text: "Vacantes", href: "#" },
          ])}
          ${generateFooterColumn("Comprar", [
            { text: "Cómo comprar", href: "#" },
            { text: "Lista de juegos", href: "#" },
            { text: "Colecciones", href: "#" },
            { text: "Programa de fidelidad", href: "#" },
          ])}
          ${generateFooterColumn("Ayuda", [
            { text: "Preguntas frecuentes", href: "#" },
            { text: "Cómo activar tus juegos", href: "#" },
            { text: "Crear un ticket", href: "#" },
            { text: "Política de devoluciones", href: "#" },
          ])}
          ${generateFooterColumn("Comunidad", [
            { text: "Blog", href: "#" },
            { text: "Sorteos", href: "#" },
            { text: "Conviértete en afiliado", href: "#" },
          ])}
          ${generateFooterColumn("Negocios", [
            { text: "Vende en Mega Games", href: "#" },
          ])}
          <div class="d-flex justify-content-end col-6 col-md-2">
            <div class="app-badge d-flex flex-column opacity-75 gap-3">
              <h5 class="fs-6 mb-0">Descarga la app</h5>
              <a href="#">
                <img src="/assets/public/icons/appAndroidCTA.svg" alt="Google play badge" />
              </a>
              <a href="#">
                <img src="/assets/public/icons/appAppleCTA.svg" alt="Apple badge" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div class="col-md-5 mb-1">
            <form>
              <h5 class="fs-6 mb-2 pb-1">Obtén ofertas personalizadas de videojuegos</h5>
              <div class="d-flex flex-column flex-sm-row w-100 bg-base rounded-2 overflow-hidden">
                <label for="newsletter1" class="visually-hidden">Correo electrónico</label>
                <input
                  id="newsletter1"
                  type="text"
                  class="form-control border-0 bg-transparent fs-6 focus-none text-white rounded-0"
                  placeholder="Ingresa tu email"
                />
                <button class="btn bg-p05 btn-hover-p1 rounded-0 text-white border-0" type="button">
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
          <p class="fs-sm col-md-9 opacity-75">
            Puedes darte de baja en cualquier momento. Visita el apartado
            <a class="text-white text-decoration-underline footer_link2" href="#">Aviso de Privacidad</a>
            para más información
          </p>
        </div>
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 mt-4 border-top fs-sm opacity-75">
          <p class="opacity-75 mb-4">
            Copyright © 2024 Mega Games. Todos los derechos reservados.
          </p>
          <div class="d-flex gap-3">
            <a class="text-decoration-none text-white fw-medium opacity-75 footer_link2 mb-4" href="#">Términos y condiciones</a>
            <a class="text-decoration-none text-white fw-medium opacity-75 footer_link2 mb-4" href="#">Aviso de privacidad</a>
          </div>
          <ul class="list-unstyled d-flex mb-4">
            <li class="ms-3">
              <a class="footer_link text-white opacity-75" href="https://www.instagram.com/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
                  <path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Zm6.296 5.618c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm4.32 7.188c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"
                ></path>
              </svg>
              </a>
            </li>
            <li class="ms-3">
              <a class="footer_link text-white opacity-75" href="https://twitter.com/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 1200 1227">
                  <path fill="currentColor" d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"></path>
                </svg>
              </a>
            </li>
            <li class="ms-3">
              <a class="footer_link text-white opacity-75" href="https://github.com/Ktumsh/mega-games-web" target="_blank">
                <svg viewBox="0 0 256 250" width="21" height="21" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                  <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      `;

  footerSlot.appendChild(footerContainer);
});

function generateFooterColumn(title, items) {
  return `
      <div class="col-6 col-md-2 pb-3">
        <h5 class="fs-6 mb-3">${title}</h5>
        <ul class="nav flex-column opacity-75">
          ${items
            .map(
              (item) =>
                `<li class="nav-item mb-2"><a href="${item.href}" class="nav-link p-0 text-white fs-sm footer_link">${item.text}</a></li>`
            )
            .join("")}
        </ul>
      </div>
    `;
}
