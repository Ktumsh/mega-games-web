let lastCard = 0;
let isLoading = false;

function updateCounter(total) {
  const counterElement = document.getElementById("counter");
  counterElement.textContent = total;
}

function loadInitialCards() {
  fetch("/data/api/offerCards.json")
    .then((response) => response.json())
    .then((tarjetas) => {
      const cardsContainer = document.getElementById("gameOfferCardsContainer");

      updateCounter(tarjetas.length);

      const maxCards = 8;
      const cardsForLoad = tarjetas.slice(lastCard, lastCard + maxCards);

      cardsForLoad.forEach((tarjeta) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card_");
        const gameName = tarjeta.nombre;
        const pageName = gameName;

        const dlcSpan = tarjeta.dlc ? `<span class="dlc_span">DLC</span>` : "";
        const cardContent = `
          <div class="card_struct active border-p3">
            <div class="card_content">
              <div class="card_img">
                <div class="img_card_content">
                  <picture>
                    <img class="img_card" src="${tarjeta.imagen}" alt="${tarjeta.nombre}">
                  </picture>
                </div>
              </div>
              <div class="card_top_body">
                <div class="card_title">
                  <span>${dlcSpan}${tarjeta.nombre}</span>
                </div>
              </div>
              <div class="card_bottom_body">
                <a class="card_link" href="offer-details.html?name=${pageName}&id=${tarjeta.id}">
                  <div class="fs-sm d-flex flex-row flex-lg-column gap-sm-2">
                    <div class="d-flex align-items-center h-100">
                      <span class="descuento_label p-1">${tarjeta.descuento}</span>
                    </div>
                    <div>
                      <div class="d-inline-flex flex-row flex-sm-column flex-lg-row p-1 gap-1 bg-p1">
                        <p class="descuento-precio mb-0 position-relative">${tarjeta.precioOriginal}</p>
                        <p class="mb-0 fw-semibold text-p3 motiva-sans">${tarjeta.precioDescuento}</p>
                      </div>
                    </div>
                  </div>
                  <div class="like_badge">
                    <span class="like_span">
                      <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="like_icon" style="max-width: 16px; min-width: 16px; height: auto;">
                        <path d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293h0a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474h0a5.673,5.673,0,0,1-1.062,6.548Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                      <span class="like_count">${tarjeta.likes}</span>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        `;
        cardElement.innerHTML = cardContent;
        cardsContainer.appendChild(cardElement);
      });

      lastCard += cardsForLoad.length;
      window.addEventListener("scroll", loadCards);
    })
    .catch((error) => console.error("Error al cargar las tarjetas:", error));
}

document.addEventListener("DOMContentLoaded", loadInitialCards);

function loadCards() {
  if (
    isLoading ||
    document.body.offsetHeight - (window.innerHeight + window.scrollY) > 500
  ) {
    return;
  }

  isLoading = true;

  setTimeout(() => {
    fetch("/data/api/offerCards.json")
      .then((response) => response.json())
      .then((tarjetas) => {
        const cardsContainer = document.getElementById(
          "gameOfferCardsContainer"
        );
        const loader = document.getElementById("loader");

        const maxCards = 8;
        const cardsForLoad = tarjetas.slice(lastCard, lastCard + maxCards);

        cardsForLoad.forEach((tarjeta) => {
          const cardElement = document.createElement("div");
          cardElement.classList.add("card_");

          const gameName = tarjeta.nombre;
          const pageName = gameName;

          const dlcSpan = tarjeta.dlc
            ? `<span class="dlc_span">DLC</span>`
            : "";
          const cardContent = `
            <div class="card_struct active border-p3">
              <div class="card_content">
                <div class="card_img">
                  <div class="img_card_content">
                    <picture>
                      <img class="img_card" src="${tarjeta.imagen}" alt="${tarjeta.nombre}">
                    </picture>
                  </div>
                </div>
                <div class="card_top_body">
                  <div class="card_title">
                    <span>${dlcSpan}${tarjeta.nombre}</span>
                  </div>
                </div>
                <div class="card_bottom_body">
                  <a class="card_link" href="offer-details.html?name=${pageName}&id=${tarjeta.id}">
                    <div class="fs-sm d-flex flex-row flex-lg-column gap-sm-2">
                      <div class="d-flex align-items-center h-100">
                        <span class="descuento_label p-1">${tarjeta.descuento}</span>
                      </div>
                      <div>
                        <div class="d-inline-flex flex-row flex-sm-column flex-lg-row p-1 gap-1 bg-p1">
                          <p class="descuento-precio mb-0 position-relative ">${tarjeta.precioOriginal}</p>
                          <p class="mb-0 fw-semibold text-p3 motiva-sans">${tarjeta.precioDescuento}</p>
                        </div>
                      </div>
                    </div>
                    <div class="like_badge">
                      <span class="like_span">
                        <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="like_icon" style="max-width: 16px; min-width: 16px; height: auto;">
                          <path d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293h0a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474h0a5.673,5.673,0,0,1-1.062,6.548Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span class="like_count">${tarjeta.likes}</span>
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          `;

          cardElement.innerHTML = cardContent;
          cardsContainer.appendChild(cardElement);
        });

        lastCard += cardsForLoad.length;

        if (lastCard >= tarjetas.length) {
          loader.style.display = "none";
        }

        isLoading = false;
      })
      .catch((error) => {
        console.error("Error al cargar las tarjetas:", error);
        loader.style.display = "none";
      });
  }, 500);
}