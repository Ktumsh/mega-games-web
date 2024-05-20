document.addEventListener("DOMContentLoaded", function () {
  const queryParams = new URLSearchParams(window.location.search);
  const gameTitle = queryParams.get("name");
  const gameId = parseInt(queryParams.get("id"));
  document.title = gameTitle;

  fetch("/data/api/apiStore.json")
    .then((response) => response.json())
    .then((apiStore) => {
      const games = apiStore.gamesCards;
      const gameFound = games.find((game) => game.id === gameId);

      const gameImage = document.getElementById("gameImage");
      const gameName = document.getElementById("gameName");
      const discount = document.getElementById("discount");
      const price = document.getElementById("price");
      const platform = document.getElementById("platform");
      const keyAvailable = document.getElementById("keyAvailable");
      const keyTitle = document.getElementById("keyTitle");
      const keyActivation = document.getElementById("keyActivation");
      const gameLikes = document.getElementById("gameLikes");

      const genderList = document.getElementById("genderList");

      const descGameName = document.getElementById("descGameName");
      const descCharacteristicsGameName = document.getElementById(
        "descCharacteristicsGameName"
      );
      const descGameDescription = document.getElementById(
        "descGameDescription"
      );
      const introCharacteristics = document.getElementById(
        "introCharacteristics"
      );
      const characteristicsList = document.getElementById(
        "characteristicsList"
      );

      const additionalDesc = document.getElementById("additionalDesc");
      const additionalDescText = document.getElementById("additionalDescText");

      const galery = document.getElementById("galery");

      const detailDesc = document.querySelectorAll(
        "#requirements .detail_desc"
      );

      const releaseDate = document.getElementById("releaseDate");
      const publisher = document.getElementById("publisher");
      const developers = document.getElementById("developers");

      const restriction = document.getElementById("pegi");
      if (gameFound) {
        gameImage.src = gameFound.imagen;
        gameName.textContent = gameFound.nombre;
        price.textContent = `CLP$ ${gameFound.precio}`;
        gameFound.disponibleEn.forEach((plataforma) => {
          const availableIn = document.createElement("span");
          availableIn.title = `Disponible en ${plataforma}`;
          availableIn.classList.add("platform_img");
          availableIn.classList.add(plataforma);
          platform.appendChild(availableIn);
        });
        keyAvailable.src = gameFound.keyImg;
        keyTitle.textContent = gameFound.key;
        keyActivation.href = gameFound.keyLink;
        keyActivation.textContent = gameFound.key;

        const galeria = gameFound.galeria;
        galeria.forEach((imagen) => {
          const galeryItem = document.createElement("div");
          galeryItem.classList.add("galery_item");
          galeryItem.innerHTML = `
              <div class="galery_image">
                <button type="button">
                  <img class="gameGaleryImage" src="${imagen}" alt="${gameFound.nombre}" />
                </button>
              </div>
            `;
          galery.appendChild(galeryItem);
        });

        gameLikes.textContent = gameFound.likes;

        descGameName.textContent = gameFound.nombre;
        const adicional = gameFound.adicional;
        if (adicional) {
          descCharacteristicsGameName.textContent = `Características de ${gameFound.nombre}`;
        }
        descGameDescription.textContent = gameFound.descripcion;
        introCharacteristics.textContent = gameFound.introCaracteristicas;

        const generos = gameFound.generos;
        generos.forEach((genero) => {
          const linkItem = document.createElement("a");
          linkItem.classList.add("gameType");
          linkItem.href = "";
          linkItem.textContent = genero;
          const listItem = document.createElement("li");
          listItem.classList.add("gender");
          listItem.appendChild(linkItem);
          genderList.appendChild(listItem);
        });

        const caracteristicas = gameFound.caracteristicas;
        caracteristicas.forEach((caracteristica) => {
          const charactTitle = document.createElement("strong");
          charactTitle.textContent = caracteristica.titulo;

          const descripcionElement = document.createElement("span");
          descripcionElement.textContent = caracteristica.descripcion;

          const listItem = document.createElement("li");
          listItem.textContent = "• ";
          listItem.appendChild(charactTitle);
          listItem.appendChild(descripcionElement);

          characteristicsList.appendChild(listItem);
        });

        const descripcionAdicional = gameFound.descripcionAdicional;
        descripcionAdicional.forEach((adicional) => {
          additionalDesc.textContent = adicional.titulo;
          additionalDescText.textContent = adicional.descripcion;
        });

        detailDesc.forEach((element, index) => {
          element.textContent = gameFound.requisitos[index];
        });

        const detalles = gameFound.detalles;
        if (detalles.length > 0 && detalles[0].idiomas.length > 0) {
          const lenguagesList = document.querySelector(
            "#details .lenguages .detail_desc"
          );
          const idiomas = detalles[0].idiomas[0].split(", ");
          idiomas.forEach((idioma) => {
            const idiomaItem = document.createElement("li");
            const spanIdioma = document.createElement("span");
            spanIdioma.textContent = idioma;
            idiomaItem.appendChild(spanIdioma);
            lenguagesList.appendChild(idiomaItem);
          });
        }
        releaseDate.textContent = detalles[0].lanzamiento;
        publisher.textContent = detalles[0].editor;
        developers.textContent = detalles[0].desarrolladores;

        restriction.src = gameFound.restriccionImg;
        restriction.alt = gameFound.restriccion;
        restriction.title = `Restricción: ${gameFound.restriccion}`;
      } else {
        console.log("Juego no encontrado");
      }
    })
    .catch((error) =>
      console.error("Error al cargar los datos del juego:", error)
    );
  const readMore = document.getElementById("readMore");
  const gameDescArea = document.querySelector(".game_description_area");

  readMore.addEventListener("click", function () {
    gameDescArea.style.maxHeight = "100%";
    readMore.style.display = "none";
  });
});

function giveALike() {
  const queryParams = new URLSearchParams(window.location.search);
  const gameId = parseInt(queryParams.get("id"));

  fetch("/data/api/apiStore.json")
    .then((response) => response.json())
    .then((apiStore) => {
      const gameFound = apiStore.gamesCards.find((game) => game.id === gameId);
      if (gameFound) {
        const gameLikes = document.getElementById("gameLikes");
        if (gameLikes) {
          gameLikes.textContent = gameFound.likes;
        }
      }
    })
    .catch((error) =>
      console.error("Error al cargar los datos del juego:", error)
    );

  const showLikeAlert = (liked) => {
    const likeAlert = document.getElementById("likeAlert");

    if (liked) {
      likeAlert.textContent = "¡Te gusta este juego!";
      likeAlert.classList.remove("dislike");
      likeAlert.classList.add("like");
      likeAlert.classList.add("active1");
      setTimeout(() => {
        likeAlert.classList.remove("active1");
      }, 2000);
    } else {
      likeAlert.textContent = "Ya no te gusta este juego";
      likeAlert.classList.remove("like");
      likeAlert.classList.add("dislike");
      likeAlert.classList.add("active2");
      setTimeout(() => {
        likeAlert.classList.remove("active2");
      }, 2000);
    }
  };

  const likesButton = document.querySelector(".likes_button");
  let liked = false;

  likesButton.addEventListener("click", function () {
    fetch("/data/api/apiStore.json")
      .then((response) => response.json())
      .then((apiStore) => {
        const gameFound = apiStore.gamesCards.find(
          (game) => game.id === gameId
        );
        if (gameFound) {
          if (liked) {
            gameFound.likes;
            liked = false;
          } else {
            gameFound.likes++;
            liked = true;
          }

          const gameLikes = document.getElementById("gameLikes");
          if (gameLikes) {
            gameLikes.textContent = gameFound.likes;
          }

          const loadingHtml = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 64" width="4.8em">
              <mask id="b420f7127dd971eda66fe536093197e2__a" fill="currentColor">
                <path fill-rule="evenodd" d="M48 0H0v64l24-17.87L48 64V0Z" clip-rule="evenodd"></path>
              </mask>
              <path fill="currentColor" fill-rule="evenodd" d="M48 0H0v64l24-17.87L48 64V0Z" clip-rule="evenodd" class="P14KYS"></path>
              <path fill="currentColor" d="M0 0v-1h-1v1h1Zm48 0h1v-1h-1v1ZM0 64h-1v2l1.6-1.2L0 64Zm24-17.87.6-.8-.6-.44-.6.44.6.8ZM48 64l-.6.8L49 66v-2h-1ZM0 1h48v-2H0v2Zm1 63V0h-2v64h2Zm-.4.8 24-17.86-1.2-1.6-24 17.86 1.2 1.6Zm22.8-17.86 24 17.86 1.2-1.6-24-17.87-1.2 1.6ZM47 0v64h2V0h-2Z" mask="url(#b420f7127dd971eda66fe536093197e2__a)" class="xNZEk7"></path>
            </svg>
            <span class="loader" id="loader"></span>
            `;

          const likesSpan = document.querySelector(".likes_span");

          let newSvg = "";
          if (liked) {
            newSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 64" width="4.8em">
                <mask id="b420f7127dd971eda66fe536093197e2__a" fill="currentColor">
                  <path fill-rule="evenodd" d="M48 0H0v64l24-17.87L48 64V0Z" clip-rule="evenodd"></path>
                </mask>
                <path fill="currentColor" fill-rule="evenodd" d="M48 0H0v64l24-17.87L48 64V0Z" clip-rule="evenodd" class="P14KYS"></path>
                <path fill="currentColor" d="M0 0v-1h-1v1h1Zm48 0h1v-1h-1v1ZM0 64h-1v2l1.6-1.2L0 64Zm24-17.87.6-.8-.6-.44-.6.44.6.8ZM48 64l-.6.8L49 66v-2h-1ZM0 1h48v-2H0v2Zm1 63V0h-2v64h2Zm-.4.8 24-17.86-1.2-1.6-24 17.86 1.2 1.6Zm22.8-17.86 24 17.86 1.2-1.6-24-17.87-1.2 1.6ZM47 0v64h2V0h-2Z" mask="url(#b420f7127dd971eda66fe536093197e2__a)" class="xNZEk7"></path>
                <path d="M 26.753 8.912 C 27.491 8.666 28.274 8.604 29.039 8.731 C 29.804 8.859 30.53 9.172 31.157 9.645 C 31.783 10.119 32.294 10.739 32.646 11.456 L 32.648 11.459 C 33.109 12.408 33.268 13.485 33.103 14.535 C 32.938 15.582 32.457 16.548 31.731 17.294 L 24.411 25.152 C 24.304 25.268 24.155 25.333 24 25.333 C 23.845 25.333 23.696 25.268 23.588 25.152 L 16.268 17.296 C 15.542 16.55 15.062 15.584 14.897 14.537 C 14.731 13.488 14.89 12.411 15.352 11.461 L 15.353 11.459 C 15.705 10.742 16.216 10.121 16.842 9.647 C 17.469 9.174 18.194 8.86 18.959 8.732 C 19.724 8.605 20.508 8.666 21.246 8.912 C 21.98 9.157 22.649 9.577 23.198 10.139 L 24 10.899 L 24.802 10.139 C 25.351 9.577 26.019 9.157 26.753 8.912 Z" fill="currentColor" class="dZR92M"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7531 8.91171C27.4909 8.66565 28.2741 8.60385 29.0393 8.73134C29.8044 8.85883 30.5298 9.172 31.1565 9.64544C31.7833 10.1189 32.2937 10.7392 32.6464 11.4561L32.6477 11.4588C33.1089 12.4082 33.2682 13.4852 33.1027 14.5347C32.9375 15.5818 32.4574 16.5476 31.7314 17.2937L24.4114 25.1521C24.3035 25.268 24.1549 25.3334 23.9997 25.3334C23.8445 25.3334 23.696 25.268 23.588 25.1522L16.268 17.2962C15.5419 16.5501 15.0618 15.5842 14.8967 14.5371C14.7311 13.4876 14.8904 12.4106 15.3516 11.4612L15.3529 11.4587C15.7053 10.7416 16.2156 10.121 16.8422 9.64731C17.4688 9.17361 18.1942 8.86015 18.9593 8.7324C19.7244 8.60465 20.5078 8.6662 21.2457 8.91206C21.9799 9.15667 22.6485 9.57683 23.1978 10.1387L23.9996 10.8989L30.9125 16.461C30.9156 16.4577 30.9187 16.4544 30.9219 16.4511C31.4779 15.8813 31.8456 15.1429 31.9719 14.3421C32.0981 13.5419 31.9768 12.7207 31.6254 11.9966Z" fill="currentColor"></path>
                <text x="50%" y="40" text-anchor="middle" fill="currentColor" class="likes">${gameFound.likes}</text>
              </svg>
            `;

            likesButton.classList.add("disabled");
            likesSpan.classList.add("loading");

            likesSpan.innerHTML = loadingHtml;
            const loader = document.getElementById("loader");
            loader.style.display = "block";
            setTimeout(() => {
              likesButton.classList.remove("disabled");
              loader.style.display = "none";
              likesSpan.classList.remove("loading");
              likesSpan.innerHTML = newSvg;
              likesSpan.classList.add("active");
              showLikeAlert(true);
            }, 1000);
          } else {
            newSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 64" width="4.8em">
              <mask id="b420f7127dd971eda66fe536093197e2__a" fill="currentColor">
                <path fill-rule="evenodd" d="M48 0H0v64l24-17.87L48 64V0Z" clip-rule="evenodd"></path>
              </mask>
              <path fill="currentColor" fill-rule="evenodd" d="M48 0H0v64l24-17.87L48 64V0Z" clip-rule="evenodd" class="P14KYS"></path>
              <path fill="currentColor" d="M0 0v-1h-1v1h1Zm48 0h1v-1h-1v1ZM0 64h-1v2l1.6-1.2L0 64Zm24-17.87.6-.8-.6-.44-.6.44.6.8ZM48 64l-.6.8L49 66v-2h-1ZM0 1h48v-2H0v2Zm1 63V0h-2v64h2Zm-.4.8 24-17.86-1.2-1.6-24 17.86 1.2 1.6Zm22.8-17.86 24 17.86 1.2-1.6-24-17.87-1.2 1.6ZM47 0v64h2V0h-2Z" mask="url(#b420f7127dd971eda66fe536093197e2__a)" class="xNZEk7"></path>
              <path d="M 26.753 8.912 C 27.491 8.666 28.274 8.604 29.039 8.731 C 29.804 8.859 30.53 9.172 31.157 9.645 C 31.783 10.119 32.294 10.739 32.646 11.456 L 32.648 11.459 C 33.109 12.408 33.268 13.485 33.103 14.535 C 32.938 15.582 32.457 16.548 31.731 17.294 L 24.411 25.152 C 24.304 25.268 24.155 25.333 24 25.333 C 23.845 25.333 23.696 25.268 23.588 25.152 L 16.268 17.296 C 15.542 16.55 15.062 15.584 14.897 14.537 C 14.731 13.488 14.89 12.411 15.352 11.461 L 15.353 11.459 C 15.705 10.742 16.216 10.121 16.842 9.647 C 17.469 9.174 18.194 8.86 18.959 8.732 C 19.724 8.605 20.508 8.666 21.246 8.912 C 21.98 9.157 22.649 9.577 23.198 10.139 L 24 10.899 L 24.802 10.139 C 25.351 9.577 26.019 9.157 26.753 8.912 Z" fill="currentColor" class="dZR92M"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7531 8.91171C27.4909 8.66565 28.2741 8.60385 29.0393 8.73134C29.8044 8.85883 30.5298 9.172 31.1565 9.64544C31.7833 10.1189 32.2937 10.7392 32.6464 11.4561L32.6477 11.4588C33.1089 12.4082 33.2682 13.4852 33.1027 14.5347C32.9375 15.5818 32.4574 16.5476 31.7314 17.2937L24.4114 25.1521C24.3035 25.268 24.1549 25.3334 23.9997 25.3334C23.8445 25.3334 23.696 25.268 23.588 25.1522L16.268 17.2962C15.5419 16.5501 15.0618 15.5842 14.8967 14.5371C14.7311 13.4876 14.8904 12.4106 15.3516 11.4612L15.3529 11.4587C15.7053 10.7416 16.2156 10.121 16.8422 9.64731C17.4688 9.17361 18.1942 8.86015 18.9593 8.7324C19.7244 8.60465 20.5078 8.6662 21.2457 8.91206C21.9799 9.15667 22.6485 9.57683 23.1978 10.1387L23.9997 10.8989L24.8015 10.1388C25.3506 9.57681 26.0191 9.15651 26.7531 8.91171ZM31.6254 11.9966C31.3547 11.447 30.9633 10.9714 30.4827 10.6084C30.0017 10.2451 29.445 10.0047 28.8578 9.90687C28.2706 9.80903 27.6695 9.85646 27.1033 10.0453C26.5371 10.2341 26.0217 10.5591 25.599 10.9937C25.5935 10.9993 25.5879 11.0049 25.5822 11.0103L24.3859 12.1445C24.1671 12.3519 23.8322 12.3519 23.6135 12.1445L22.4172 11.0103C22.4115 11.0049 22.4059 10.9994 22.4004 10.9938C21.9776 10.5592 21.4621 10.2344 20.8958 10.0457C20.3295 9.85707 19.7283 9.80983 19.1411 9.90787C18.5539 10.0059 17.9973 10.2465 17.5164 10.61C17.0358 10.9733 16.6445 11.4491 16.374 11.9989C16.0226 12.723 15.9012 13.5442 16.0275 14.3445C16.1538 15.1453 16.5214 15.8837 17.0775 16.4535C17.0806 16.4567 17.0838 16.46 17.0868 16.4633L23.9996 23.8822L30.9125 16.461C30.9156 16.4577 30.9187 16.4544 30.9219 16.4511C31.4779 15.8813 31.8456 15.1429 31.9719 14.3421C32.0981 13.5419 31.9768 12.7207 31.6254 11.9966Z" fill="currentColor"></path>
              <text id="gameLikes" x="50%" y="40" text-anchor="middle" fill="currentColor" class="likes">${gameFound.likes}</text>
            </svg>
            `;

            likesButton.classList.add("disabled");
            likesSpan.classList.add("loading");

            likesSpan.innerHTML = loadingHtml;
            const loader = document.getElementById("loader");
            loader.style.display = "block";
            setTimeout(() => {
              likesButton.classList.remove("disabled");
              loader.style.display = "none";
              likesSpan.classList.remove("loading");
              likesSpan.innerHTML = newSvg;
              likesSpan.classList.remove("active");
              showLikeAlert(false);
            }, 500);
          }
        }
      })
      .catch((error) => console.error("Error al actualizar los likes:", error));
  });
}

function shareLink() {
  const shareButton = document.querySelector(".share_btn button");

  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  shareButton.addEventListener("click", function () {
    const pageUrl = window.location.href;
    if (isMobile() && navigator.share) {
      navigator
        .share({
          title: document.title,
          url: pageUrl,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(pageUrl)
        .then(() => {
          const shareBadge = document.querySelector(".share_copy_badge");
          shareBadge.classList.add("active");
          setTimeout(() => {
            shareBadge.classList.remove("active");
          }, 2000);
        })
        .catch(console.error);
    }
  });
}

document.addEventListener("DOMContentLoaded", giveALike);
document.addEventListener("DOMContentLoaded", shareLink);
