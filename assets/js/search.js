function addStoreNavSearchEvents() {
  const $storeNavSearchTerms = $(".store_nav_search_term");

  $storeNavSearchTerms.each(function () {
    const $input = $(this);

    $input.on("focus", function (event) {
      event.stopPropagation();
      $input.removeClass("default");
      $input.attr("placeholder", "");
    });

    $(document).on("click", function (event) {
      if (!$input.is(event.target) && $input.has(event.target).length === 0) {
        if ($input.val() === "") {
          $input.addClass("default");
          $input.attr("placeholder", "buscar");
        } else {
          $input.removeClass("default");
          $input.attr("placeholder", "");
        }
      }
    });
  });
}

function addSearchEvents() {
  $(document).ready(async function () {
    const $searchInput = $("#searchInput");
    const $searchLink = $("#store_search_link");
    const $resultsContainer = $("#searchterm_options");
    let selectedIndex = -1;

    let allGames = [];

    await loadAllGames();

    $searchInput.on("input", handleSearch);

    $searchInput.on("keydown", function (event) {
      const $results = $("#search_suggestion_contents a.match_app");
      if (event.key === "Enter") {
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < $results.length) {
          window.location.href = $results.eq(selectedIndex).attr("href");
        } else {
          $searchLink.click();
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (selectedIndex < $results.length - 1) {
          selectedIndex++;
          updateSelectedResult($results);
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (selectedIndex > 0) {
          selectedIndex--;
          updateSelectedResult($results);
        }
      }
    });

    $searchLink.on("click", function (event) {
      event.preventDefault();
      if ($searchLink.attr("href") !== "#") {
        window.location.href = $searchLink.attr("href");
      }
    });

    $(document).on("click", function (event) {
      if (
        !$searchInput.is(event.target) &&
        !$resultsContainer.is(event.target)
      ) {
        $resultsContainer.hide();
        if (history.state && history.state.searchOpen) {
          history.back();
        }
      }
    });

    $searchInput.on("focus", function () {
      if ($.trim($searchInput.val()) !== "") {
        handleSearch({ target: $searchInput[0] });
        history.pushState({ searchOpen: true }, "");
      }
    });

    $(window).on("popstate", function (event) {
      if (event.state && event.state.searchOpen) {
        $resultsContainer.hide();
      }
    });

    let searchTimeout;

    async function loadAllGames() {
      const $resultsContainer = $("#search_suggestion_contents");
      try {
        const response = await fetch("/data/api/apiStore.json");
        const data = await response.json();
        allGames = Object.values(data).flat();
        $resultsContainer.empty();
      } catch (error) {
        console.error("Error al cargar los juegos:", error);
      }
    }

    function normalizeString(str) {
      return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    }

    const romanNumerals = {
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
        function (match) {
          return romanNumerals[match] || match;
        }
      );
    }

    function handleSearch(event) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function () {
        const searchTerm = normalizeString(event.target.value);
        const $resultsContainer = $("#searchterm_options");
        const $suggestionsContainer = $("#search_suggestion_contents");
        selectedIndex = -1;

        if (!searchTerm) {
          $resultsContainer.hide();
          $suggestionsContainer.empty();
          $("#store_search_link").attr("href", "#");
          return;
        }

        const filteredGames = allGames.filter(function (game) {
          return (
            game.nombre &&
            normalizeString(convertRomanNumerals(game.nombre)).includes(
              searchTerm
            )
          );
        });

        const totalGamesFound = filteredGames.length;

        filteredGames.sort(function (a, b) {
          const indexA = normalizeString(
            convertRomanNumerals(a.nombre)
          ).indexOf(searchTerm);
          const indexB = normalizeString(
            convertRomanNumerals(b.nombre)
          ).indexOf(searchTerm);
          return indexA - indexB;
        });

        const displayedGames = filteredGames.slice(0, 5);

        displayResults(displayedGames, totalGamesFound);
        updateSearchLinkHref(displayedGames);
      }, 300);
    }

    function generateGameHref(game) {
      switch (game.origen) {
        case "offerCards":
          return (
            "/sites/offer-details.html?game=" +
            encodeURIComponent(game.nombre) +
            "&item=" +
            game.id
          );
        case "editorSalePage":
          return (
            "/sites/publisher-sale-details.html?game=" +
            encodeURIComponent(game.nombre) +
            "&item=" +
            game.id
          );
        case "gamesCards":
          return (
            "/sites/games-details.html?game=" +
            encodeURIComponent(game.nombre) +
            "&item=" +
            game.id
          );
        case "giftCards":
          return (
            "/sites/gift-details.html?game=" +
            encodeURIComponent(game.nombre) +
            "&item=" +
            game.id
          );
        default:
          return (
            "/default-details?game=" +
            encodeURIComponent(game.nombre) +
            "&item=" +
            game.id
          );
      }
    }

    function displayResults(games, totalGamesFound) {
      const $resultsContainer = $("#searchterm_options");
      const $suggestionsContainer = $("#search_suggestion_contents");
      $suggestionsContainer.empty();

      if (games.length === 0) {
        $resultsContainer.hide();
      } else {
        const $tagElement = $("<a></a>")
          .addClass(
            "match match_tag match_v2 match_category_top ds_collapse_flag"
          )
          .attr("href", "javascript:void(0)")
          .attr("data-ds-options", "0").html(`
              <div class="match_background_image">
                  <img src="/assets/public/search-bg.webp">
              </div>
              <div class="match_name">
                  <div>Etiqueta:</div>
                  <span>Juegos encontrados</span>
              </div>
              <div class="match_img">
                  <img src="https://store.akamai.steamstatic.com/public/images/icon_SearchTagResult.webp">
              </div>
              <div class="match_subtitle">${totalGamesFound}&nbsp;juegos</div>
          `);

        games.forEach(function (game) {
          const $gameElement = $("<a></a>")
            .addClass(
              "match match_app match_v2 match_category_top ds_collapse_flag app_impression_tracked"
            )
            .attr("title", game.nombre)
            .attr("href", generateGameHref(game)).html(`
                  <div class="match_name">${game.nombre}</div>
                  <div class="match_img">
                      <img src="${game.imagen}" alt="${game.nombre}">
                  </div>
                  <div class="match_subtitle">CLP$ ${
                    game.precioDescuento || game.precioOriginal
                  }</div>
              `);

          $suggestionsContainer.append($gameElement);
        });

        $suggestionsContainer.append($tagElement);

        $resultsContainer.show();
      }
    }

    function updateSelectedResult($results) {
      $results.removeClass("selected");
      if (selectedIndex >= 0) {
        $results.eq(selectedIndex).addClass("selected");
      }
    }

    function updateSearchLinkHref(games) {
      if (games.length > 0) {
        const firstResultHref = generateGameHref(games[0]);
        $("#store_search_link").attr("href", firstResultHref);
      } else {
        $("#store_search_link").attr("href", "#");
      }
    }
  });
}
