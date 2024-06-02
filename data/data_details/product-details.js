import { setupLikeButton } from "../../assets/js/managment/like-manager.js";
import { setupGallery } from "../../assets/js/managment/gallery-manager.js";

document.addEventListener("DOMContentLoaded", () => {
  //OBTENER PRODUCTO SEGÚN EL PARÁMETRO URL
  const { item, group } = getProductParamsFromURL();
  if (group && item) {
    fetchProductDetails(group, item);
  } else {
    console.error("Grupo o item no especificado en la URL.");
  }

  function getProductParamsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      item: urlParams.get("item"),
      group: urlParams.get("group"),
    };
  }

  //AGREGAR INFORMACIÓN
  async function fetchProductDetails(group, item) {
    try {
      const response = await fetch(
        `https://store-megagames.onrender.com/api/store/${group}/${item}`
      );
      const product = await response.json();

      if (product.error) {
        console.error(product.error);
        return;
      }

      updateBackground(product.background);
      populateProductDetails(product);
      setupReadMoreButton();
      setupLikeButton(product.id, group);
      setupShareLink();
      setupGallery(product.galeria, product.nombreMaincap);
      setupAddToCartButton(product);
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  }

  //DECLARACIÓN CONSTANTES PRODUCTO
  function populateProductDetails(product) {
    const {
      imagen,
      nombre,
      nombreMaincap,
      likes,
      descuento,
      precioOriginal,
      precioDescuento,
      key,
      keyImg,
      keyLink,
      disponibleEn,
      descripcion,
      introduccionCaracteristicas,
      caracteristicas,
      descripcionAdicional,
      requisitos,
      detalles,
      restriccionImg,
      restriccion,
    } = product;

    document.title = nombreMaincap;

    //INFORMACIÓN PRINCIPAL
    document.getElementById("gameImage").src = imagen;
    document.getElementById("gameName").textContent = nombre;
    document.getElementById("gameLikes").textContent = likes;

    if (precioDescuento && descuento) {
      document.getElementById("discount").textContent = descuento;
      document.getElementById(
        "originalPrice"
      ).textContent = `CLP$ ${precioOriginal}`;
      document.getElementById(
        "finalPrice"
      ).textContent = `CLP$ ${precioDescuento}`;
      document.getElementById("originalPrice").style.display = "block";
      document.getElementById("finalPrice").style.display = "block";
    } else {
      document.getElementById("price").textContent = `CLP$ ${precioOriginal}`;
    }

    document.getElementById("keyAvailable").src = keyImg || "";
    document.getElementById("keyTitle").textContent = key || "";
    const keyActivation = document.getElementById("keyActivation");
    keyActivation.textContent = key || "";
    keyActivation.href = keyLink || "";
    document.getElementById("platform").innerHTML = disponibleEn
      .map(
        (platform) =>
          `<span title="Disponible en ${platform}" class="platform_img ${platform}"></span>`
      )
      .join("");

    //DESCRIPCIÓN
    if (descripcion) {
      document.getElementById("descGameName").textContent = nombre;
      document.getElementById("descGameDescription").textContent = descripcion;
    } else {
      document.getElementById("descGameName").textContent = "";
      document.getElementById("descGameDescription").textContent = "";
    }

    //CARACTERISTICAS
    document.getElementById("introCharacteristics").textContent =
      introduccionCaracteristicas || "";
    if (caracteristicas && caracteristicas.length > 0) {
      document.getElementById("characteristicsList").innerHTML = caracteristicas
        .map(
          (caracteristica) => `
        <li>• <strong>${caracteristica.titulo || ""}</strong> <span>${
            caracteristica.descripcion || ""
          }</span></li>`
        )
        .join("");
    } else {
      document.getElementById("characteristicsList").innerHTML = "";
    }

    //DESCRIPCION ADICIONAL
    if (descripcionAdicional && descripcionAdicional.length > 0) {
      document.getElementById("additionalDesc").innerHTML = descripcionAdicional
        .map(
          (adicional, index) => `
          <li>${index !== 0 ? "• " : ""}<strong>${
            adicional.titulo || ""
          }</strong> <span>${adicional.descripcion || ""}</span></li>`
        )
        .join("");
    } else {
      document.getElementById("additionalDesc").innerHTML = "";
    }

    //DETALLES
    if (detalles && detalles.length > 0) {
      const [detail] = detalles;
      if (detail.idiomas.length > 0) {
        const lenguagesList = document.querySelector(
          "#details .lenguages .detail_desc"
        );
        detail.idiomas[0].split(", ").forEach((idioma) => {
          const idiomaItem = document.createElement("li");
          idiomaItem.appendChild(document.createElement("span")).textContent =
            idioma;
          lenguagesList.appendChild(idiomaItem);
        });
      }
      document.getElementById("releaseDate").textContent =
        detail.lanzamiento || "";
      document.getElementById("publisher").textContent = detail.editor || "";
      document.getElementById("developers").textContent =
        detail.desarrolladores || "";
    }

    //REQUISITOS
    if (requisitos && requisitos.length >= 6) {
      document.getElementById("requirements").innerHTML = `
          <li><div class="detail_tlt">Soporte de 64 bits</div><div class="detail_desc">${requisitos[0]}</div></li>
          <li><div class="detail_tlt">Requisitos del sistema</div><div class="detail_desc">${requisitos[1]}</div></li>
          <li><div class="detail_tlt">Procesador</div><div class="detail_desc">${requisitos[2]}</div></li>
          <li><div class="detail_tlt">Memoria</div><div class="detail_desc">${requisitos[3]}</div></li>
          <li><div class="detail_tlt">Gráficos</div><div class="detail_desc">${requisitos[4]}</div></li>
          <li><div class="detail_tlt">Almacenamiento</div><div class="detail_desc">${requisitos[5]}</div></li>`;
    }

    //RESTRICCION
    const pegiElement = document.getElementById("pegi");
    pegiElement.src = restriccionImg;
    pegiElement.alt = restriccion;
    pegiElement.title = `Restricción: ${restriccion}`;
  }

  //LEER MÁS
  function setupReadMoreButton() {
    const readMore = document.getElementById("readMore");
    const gameDescArea = document.querySelector(".game_description_area");

    readMore.addEventListener("click", function () {
      gameDescArea.style.maxHeight = "100%";
      readMore.style.display = "none";
    });
  }

  //COMPARTIR
  function setupShareLink() {
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

  //ACTUALIZAR FONDO
  function updateBackground(backgroundUrl) {
    const pageGameBg = document.getElementById("pageGameBg");
    if (backgroundUrl) {
      pageGameBg.style.backgroundImage = `url(${backgroundUrl})`;
    }
  }

  //AGREGAR AL CARRITO
  function setupAddToCartButton(product) {
    const addToCartButton = document.querySelector(".add_to_cart button");
    addToCartButton.dataset.game = JSON.stringify({
      id: product.id,
      image: product.imagenAlternativa || product.imagen,
      title: product.nombre,
      platforms: product.disponibleEn,
      discount: product.descuento || null,
      originalPrice: product.precioOriginal || null,
      price: product.precioDescuento || product.precioOriginal,
    });
  }
});
