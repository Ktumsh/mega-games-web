async function loadGames() {
  try {
    const response = await fetch("/data/api/apiStore.json");
    const apiStore = await response.json();
    const carruselContainer = document.getElementById("carouselMaincapItems");

    const selectedGames = [
      { id: 8, origen: "offerCards" },
      { id: 10, origen: "offerCards" },
      { id: 1, origen: "editorSalePage" },
      { id: 41, origen: "gamesCards" },
      { id: 42, origen: "gamesCards" },
      { id: 41, origen: "offerCards" },
      { id: 42, origen: "offerCards" },
      { id: 43, origen: "gamesCards" },
      { id: 43, origen: "offerCards" },
      { id: 44, origen: "gamesCards" },
      { id: 2, origen: "editorSalePage" },
      { id: 45, origen: "offerCards" },
    ];

    selectedGames.forEach((selection) => {
      const { id, origen } = selection;
      const juego = apiStore[origen].find((j) => j.id === id);

      if (juego) {
        carruselContainer.innerHTML += generateGameHTML(juego);
      }
    });

    initializeCarousel();
  } catch (error) {
    console.error("Error al cargar los juegos:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadGames);

function generateGameHTML(juego) {
  const gameName = juego.nombre;
  const pageName = gameName;
  const pageOrigin =
    juego.origen === "offerCards"
      ? "offer-details.html"
      : juego.origen === "editorSalePage"
      ? "publisher-sale-details.html"
      : "games-details.html";

  let precioHTML = "";

  if (juego.descuento && juego.precioOriginal && juego.precioDescuento) {
    precioHTML = `
      <div class="discount_block discount_block_inline">
        <div class="discount_pct">${juego.descuento}</div>
        <div class="discount_prices">
          <div class="discount_original_price">CLP$ ${juego.precioOriginal}</div>
          <div class="discount_final_price">CLP$ ${juego.precioDescuento}</div>
        </div>
      </div>
    `;
  } else {
    precioHTML = `
      <div class="discount_block no_discount discount_block_inline">
        <div class="discount_prices">
          <div class="discount_final_price">CLP$ ${juego.precioOriginal}</div>
        </div>
      </div>
    `;
  }

  return `
    <a class="store_main_capsule" href="/sites/${pageOrigin}?game=${pageName}&item=${
    juego.id
  }" data-bs-interval="5000">
      <div class="capsule main_capsule" style="background-image: url(${
        juego.imagenAlternativa
      });"></div>
      <div class="info">
        <div class="app_name">
          <div>${juego.nombreMaincap}</div>
        </div>
        <div class="screenshots">
          ${juego.galeria
            .slice(0, 4)
            .map(
              (imagen) => `
            <div>
              <div style="background-image: url(${imagen});"></div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="reason">
          <div class="main default">Ya disponible</div>
          <div class="additional">
            <div class="bg-gradient blur">Lo más vendido</div>
          </div>
        </div>
        ${precioHTML}    
        <div class="platforms">
          ${juego.disponibleEn
            .map(
              (plataforma) => `
            <span class="platform_img ${plataforma}"></span>
          `
            )
            .join("")}
        </div>
      </div>
    </a>
  `;
}
