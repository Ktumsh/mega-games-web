const apis = [
  "/data/api/editorSalePage.json",
  "/data/api/gamesCards.json",
  "/data/api/offerCards.json",
  "/data/api/tarjetasCards.json",
];
let allGames = [];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchLink = document.getElementById("store_search_link");

  // Cargar todos los juegos al cargar la página
  loadAllGames();

  // Añadir un evento input para el campo de búsqueda
  searchInput.addEventListener("input", handleSearch);
  searchLink.addEventListener("click", (event) => {
    event.preventDefault();
    handleSearch({ target: searchInput });
  });
});

function loadAllGames() {
  const resultsContainer = document.getElementById(
    "search_suggestion_contents"
  );
  resultsContainer.innerHTML = "Cargando juegos...";

  const fetchPromises = apis.map((api) =>
    fetch(api).then((response) => response.json())
  );

  Promise.all(fetchPromises)
    .then((allResults) => {
      allGames = allResults.flat();
      resultsContainer.innerHTML = ""; // Limpiar el mensaje de carga inicial
    })
    .catch((error) => {
      console.error("Error al cargar los juegos:", error);
      resultsContainer.innerHTML = "Error al cargar los juegos.";
    });
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  let filteredGames = allGames.filter(
    (game) => game.nombre && game.nombre.toLowerCase().includes(searchTerm)
  );

  // Ordenar los resultados por especificidad del texto
  filteredGames.sort((a, b) => {
    const indexA = a.nombre.toLowerCase().indexOf(searchTerm);
    const indexB = b.nombre.toLowerCase().indexOf(searchTerm);
    return indexA - indexB;
  });

  // Limitar los resultados a un máximo de 5 juegos
  filteredGames = filteredGames.slice(0, 5);

  displayResults(filteredGames);
}

function generateGameHref(game) {
  // Aquí definimos la lógica para determinar la ruta del juego
  if (game.ruta === "gift-details") {
    return `/sites/gift-details.html?name=${encodeURIComponent(
      game.nombre
    )}&id=${game.id}`;
  } else if (game.ruta === "offer-details") {
    return `/sites/offer-details.html?name=${encodeURIComponent(
      game.nombre
    )}&id=${game.id}`;
  } else if (game.ruta === "games-details") {
    return `/sites/games-details.html?name=${encodeURIComponent(
      game.nombre
    )}&id=${game.id}`;
  } else if (game.ruta === "publisher-sale-details") {
    return `/sites/publisher-sale-details.html?name=${encodeURIComponent(
      game.nombre
    )}&id=${game.id}`;
  } else {
    // Si no se cumple ninguna condición, puedes proporcionar una ruta por defecto
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
    return;
  }

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
    gameElement.href = generateGameHref(game);

    const precio = game.precioDescuento || game.precio;

    gameElement.innerHTML = `
            <div class="match_name">${game.nombre}</div>
            <div class="match_img">
                <img src="${game.imagen}" alt="${game.nombre}" />
            </div>
            <div class="match_subtitle">${precio}</div>
        `;

    suggestionsContainer.appendChild(gameElement);
  });

  resultsContainer.style.display = "block";
}
