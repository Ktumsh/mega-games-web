document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchInput");
  const searchLink = document.getElementById("store_search_link");
  const resultsContainer = document.getElementById("searchterm_options");

  await loadAllGames();

  searchInput.addEventListener("input", handleSearch);
  searchLink.addEventListener("click", (event) => {
    event.preventDefault();
    handleSearch({ target: searchInput });
    // Agregar al historial cuando se abre la búsqueda
    history.pushState({ searchOpen: true }, "");
  });

  document.addEventListener("click", (event) => {
    if (
      !searchInput.contains(event.target) &&
      !resultsContainer.contains(event.target)
    ) {
      resultsContainer.style.display = "none";
      if (history.state && history.state.searchOpen) {
        history.back(); // Volver al estado anterior en el historial
      }
    }
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim() !== "") {
      handleSearch({ target: searchInput });
      // Agregar al historial cuando se abre la búsqueda
      history.pushState({ searchOpen: true }, "");
    }
  });

  // Manejar el evento popstate para cerrar la búsqueda
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.searchOpen) {
      resultsContainer.style.display = "none";
    }
  });
});

let allGames = [];
let searchTimeout;

async function loadAllGames() {
  const resultsContainer = document.getElementById(
    "search_suggestion_contents"
  );
  resultsContainer.innerHTML = "Cargando juegos...";

  try {
    const response = await fetch("/data/api/apiStore.json");
    const data = await response.json();
    allGames = Object.values(data).flat();
    resultsContainer.innerHTML = "";
  } catch (error) {
    console.error("Error al cargar los juegos:", error);
    resultsContainer.innerHTML = "Error al cargar los juegos.";
  }
}

function normalizeString(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

const romanToArabicMap = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
};

function convertRomanNumerals(str) {
  return str.replace(
    /\b(I|II|III|IV|V|VI|VII|VIII|IX|X)\b/g,
    (match) => romanToArabicMap[match] || match
  );
}

function handleSearch(event) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const searchTerm = normalizeString(event.target.value);
    const resultsContainer = document.getElementById("searchterm_options");

    if (!searchTerm) {
      resultsContainer.style.display = "none";
      return;
    }

    let filteredGames = allGames.filter(
      (game) =>
        game.nombre &&
        normalizeString(convertRomanNumerals(game.nombre)).includes(searchTerm)
    );

    filteredGames.sort((a, b) => {
      const indexA = normalizeString(convertRomanNumerals(a.nombre)).indexOf(
        searchTerm
      );
      const indexB = normalizeString(convertRomanNumerals(b.nombre)).indexOf(
        searchTerm
      );
      return indexA - indexB;
    });

    filteredGames = filteredGames.slice(0, 5);

    displayResults(filteredGames);
  }, 300);
}

function generateGameHref(game) {
  switch (game.origen) {
    case "offerCards":
      return `/sites/offer-details.html?name=${encodeURIComponent(
        game.nombre
      )}&id=${game.id}`;
    case "editorSalePage":
      return `/sites/publisher-sale-details.html?name=${encodeURIComponent(
        game.nombre
      )}&id=${game.id}`;
    case "gamesCards":
      return `/sites/games-details.html?name=${encodeURIComponent(
        game.nombre
      )}&id=${game.id}`;
    case "tarjetasCards":
      return `/sites/gift-details.html?name=${encodeURIComponent(
        game.nombre
      )}&id=${game.id}`;
    default:
      return `/sites/default-details.html?name=${encodeURIComponent(
        game.nombre
      )}&id=${game.id}`;
  }
}

function displayResults(games) {
  const resultsContainer = document.getElementById("searchterm_options");
  const suggestionsContainer = document.getElementById(
    "search_suggestion_contents"
  );
  suggestionsContainer.innerHTML = "";

  if (games.length === 0) {
    resultsContainer.style.display = "none";
  } else {
    // Crear la etiqueta adicional
    const tagElement = document.createElement("a");
    tagElement.classList.add(
      "match",
      "match_tag",
      "match_v2",
      "match_category_top",
      "ds_collapse_flag"
    );
    tagElement.href = "/assets/public/search-bg.png";
    tagElement.setAttribute("data-ds-options", "0");

    tagElement.innerHTML = `
      <div class="match_background_image">
        <img src="https://store.steampowered.com/categories/searchsuggestionsimage/category/multiplayer_mmo?cc=CL&l=spanish">
      </div>
      <div class="match_name">
        <div>Etiqueta:</div>
        <span>Juegos encontrados</span>
      </div>
      <div class="match_img">
        <img src="https://store.akamai.steamstatic.com/public/images/icon_SearchTagResult.png">
      </div>
      <div class="match_subtitle">${games.length}&nbsp;juegos</div>
    `;

    suggestionsContainer.appendChild(tagElement);

    games.forEach((game) => {
      const gameElement = document.createElement("a");
      gameElement.classList.add(
        "match",
        "match_app",
        "match_v2",
        "match_category_top",
        "ds_collapse_flag",
        "app_impression_tracked"
      );
      gameElement.title = game.nombre;
      gameElement.href = generateGameHref(game);

      const precio = game.precioDescuento || game.precio;

      gameElement.innerHTML = `
        <div class="match_name">${game.nombre}</div>
        <div class="match_img">
          <img src="${game.imagen}" alt="${game.nombre}" />
        </div>
        <div class="match_subtitle">CLP$ ${precio}</div>
      `;

      suggestionsContainer.appendChild(gameElement);
    });

    resultsContainer.style.display = "block";
  }
}
