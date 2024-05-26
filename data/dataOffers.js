let lastCard = 0;
let isLoading = false;
let cardData = [];
let currentSlideIndex = 0;
const maxImages = 10;
const transitionTime = 5000;

function getMaxCards() {
  const isTablet = window.innerWidth <= 1024 && window.innerWidth >= 768;
  return isTablet ? 9 : 8;
}

async function fetchCardData() {
  try {
    const response = await fetch("/data/api/apiStore.json");
    const apiStore = await response.json();
    cardData = apiStore.offerCards.slice(0, maxImages);
    renderCarouselItems();
    updateBackground();
    updateScrollBar();
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

function renderCarouselItems() {
  const sliderTray = document.getElementById("sliderTray");
  sliderTray.innerHTML = "";

  cardData.forEach((card, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel_item");
    carouselItem.setAttribute("data-index", index);
    carouselItem.style.width = "10%";
    carouselItem.style.paddingBottom = "unset";
    carouselItem.style.height = "unset";

    const lanzamiento =
      card.detalles && card.detalles.length > 0
        ? card.detalles[0].lanzamiento
        : "Fecha no disponible";
    const dlcSpan = card.dlc ? `<span class="dlc_span">DLC</span>` : "";
    carouselItem.innerHTML = `
      <div class="slider_inner" style="position: unset">
        <div>
          <div class="carousel_capsule">
            <div class="ImpressionTrackedElement">
              <div class="capsule">
                <div class="background_capsule">
                  <div class="background" style="background-image: url('${
                    card.background
                  }');"></div>
                </div>
                <div class="capsule_ctn">
                  <a href="#" class="capsule_img_ctn">
                    <div class="capsule_decorators"></div>
                    <div class="capsule_img">
                      <img src="${card.imagen}" alt="${card.nombreMaincap}" />
                    </div>
                    <div>
                      <div class="capsule_bottom_bar">
                        <span class="platform_label">
                          <span class="platform_img battlenet"></span>
                        </span>
                        <span class="price_ctn">
                          <div class="disconunt_label">
                            <div class="discount">${card.descuento}</div>
                            <div class="price_label">
                              <div class="original_price">CLP$${
                                card.precioOriginal
                              }</div>
                              <div class="final_price">CLP$${
                                card.precioDescuento
                              }</div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  </a>
                  <div class="capsule_body_ctn">
                    <div class="capsule_top">
                      <div class="capsule_top_ctn">
                        <a href="#" class="capsule_title">
                          ${dlcSpan}${card.nombreMaincap}
                        </a>
                        <div class="release_date">Fecha de lanzamiento: <span>${lanzamiento}</span></div>
                        <div class="review">
                          <a href="#" class="review_link" target="_blank">
                            <div class="review_ctn">
                              <div>Mayormente positivas</div>
                              <div class="review_likes">| ${
                                card.likes
                              } Reseñas de usuarios</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="capsule_tags">
                      ${card.generos
                        .map(
                          (tag) => `<a href="#" class="widget_tag">${tag}</a>`
                        )
                        .join("")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    sliderTray.appendChild(carouselItem);
  });

  updateVisibleItems();
}

function updateVisibleItems() {
  const sliderTray = document.getElementById("sliderTray");
  const translateXValue = -(currentSlideIndex * 10);
  sliderTray.style.transform = `translateX(${translateXValue}%) translateX(0px)`;
  updateScrollBar();
}

function updateBackground() {
  const pageGameBg = document.getElementById("pageGameBg");
  if (cardData[currentSlideIndex]) {
    const imageUrl = cardData[currentSlideIndex].background;
    preloadImage(imageUrl)
      .then(() => {
        pageGameBg.style.backgroundImage = `url(${imageUrl})`;
      })
      .catch((error) => {
        console.error("Error al cargar la imagen de fondo:", error);
      });
  }
}

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = reject;
  });
}

function updateScrollBar() {
  const leftBar = document.getElementById("leftBar");
  const rightBar = document.getElementById("rightBar");
  const barThumb = document.querySelector(".bar_thumb");

  const scrollPercentage =
    (currentSlideIndex / (cardData.length - 1)) * 85.7143;
  barThumb.style.left = `${scrollPercentage}%`;
  barThumb.style.right = `${85.7143 - scrollPercentage}%`;
  leftBar.style.width = `${7.14286 + scrollPercentage}%`;
  rightBar.style.width = `${92.8571 - scrollPercentage}%`;

  if (currentSlideIndex === 0) {
    leftBar.style.width = `7.14286%`;
    rightBar.style.width = `92.8571%`;
    barThumb.style.left = `0%`;
    barThumb.style.right = `85.7143%`;
  }
}

document.getElementById("carouselBackButton").addEventListener("click", () => {
  currentSlideIndex =
    (currentSlideIndex - 1 + cardData.length) % cardData.length;
  updateVisibleItems();
  updateBackground();
});

document.getElementById("carouselNextButton").addEventListener("click", () => {
  currentSlideIndex = (currentSlideIndex + 1) % cardData.length;
  updateVisibleItems();
  updateBackground();
});

document.getElementById("leftBar").addEventListener("click", () => {
  currentSlideIndex =
    (currentSlideIndex - 1 + cardData.length) % cardData.length;
  updateVisibleItems();
  updateBackground();
});

document.getElementById("rightBar").addEventListener("click", () => {
  currentSlideIndex = (currentSlideIndex + 1) % cardData.length;
  updateVisibleItems();
  updateBackground();
});

document.addEventListener("DOMContentLoaded", fetchCardData);

let cardImages = [];

async function loadInitialCards() {
  try {
    const response = await fetch("/data/api/apiStore.json");
    const apiStore = await response.json();
    const tarjetas = apiStore.offerCards;
    const cardsContainer = document.getElementById("gameOfferCardsContainer");

    const maxCards = getMaxCards();
    const cardsForLoad = tarjetas.slice(lastCard, lastCard + maxCards);

    renderCards(cardsForLoad, cardsContainer);

    lastCard += cardsForLoad.length;

    cardImages = tarjetas.slice(0, maxImages).map((tarjeta) => tarjeta.imagen);

    preloadImages(cardImages);

    window.addEventListener("scroll", loadCardsOnScroll);
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

function preloadImages(images) {
  return Promise.all(
    images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );
}

document.addEventListener("DOMContentLoaded", loadInitialCards);

async function loadCardsOnScroll() {
  if (isLoading) {
    return;
  }

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - window.innerHeight * 0.5;
  if (scrollPosition < threshold) {
    return;
  }

  isLoading = true;

  try {
    const response = await fetch("/data/api/apiStore.json");
    const apiStore = await response.json();
    const tarjetas = apiStore.offerCards;
    const cardsContainer = document.getElementById("gameOfferCardsContainer");
    const loader = document.getElementById("loader");

    const maxCards = getMaxCards();
    const cardsForLoad = tarjetas.slice(lastCard, lastCard + maxCards);

    renderCards(cardsForLoad, cardsContainer);

    lastCard += cardsForLoad.length;

    if (lastCard >= tarjetas.length) {
      loader.style.display = "none";
      window.removeEventListener("scroll", loadCardsOnScroll);
    }

    isLoading = false;
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
    loader.style.display = "none";
    isLoading = false;
  }
}

function renderCards(cardsForLoad, cardsContainer) {
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
                <img class="img_card" src="${tarjeta.imagen}" alt="${tarjeta.nombre}" loading="lazy">
              </picture>
            </div>
          </div>
          <div class="card_top_body">
            <div class="card_title">
              <span>${dlcSpan}${tarjeta.nombre}</span>
            </div>
          </div>
          <div class="card_bottom_body">
            <a class="card_link" href="offer-details?game=${pageName}&item=${tarjeta.id}">
              <div class="fs-sm d-flex flex-row flex-lg-column gap-sm-2">
                <div class="d-flex align-items-center h-100">
                  <span class="descuento_label p-1">${tarjeta.descuento}</span>
                </div>
                <div>
                  <div class="d-inline-flex flex-row flex-sm-column flex-lg-row p-1 gap-1 bg-p1">
                    <p class="descuento-precio mb-0 position-relative motiva-sans">CLP$ ${tarjeta.precioOriginal}</p>
                    <p class="mb-0 fw-semibold text-p3 motiva-sans">CLP$ ${tarjeta.precioDescuento}</p>
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
}
