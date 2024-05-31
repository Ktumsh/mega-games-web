document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart_details_area");

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    cart.forEach((product) => {
      const pageBg = document.getElementById("pageGameBg");
      pageBg.style.backgroundImage = `${product.background}`;

      const productHTML = `
          <div id="gameCard" class="cart_top_area">
              <div class="game_area_ctn">
                  <div class="top_area">
                      <div class="game_image">
                          <a href="">
                              <img src="${product.img}" alt="${product.name}" />
                          </a>
                      </div>
                      <div class="game_info_ctn">
                          <div class="game_info game_title">
                              <div class="title">${product.name}</div>
                          </div>
                          <div class="game_info game_platform">
                              <div id="platform" class="platform_label">
                                  <span title="Disponible en win" class="platform_img win"></span>
                                  <span title="Disponible en xbox" class="platform_img xbox"></span>
                                  <span title="Disponible en playstation" class="platform_img playstation"></span>
                              </div>
                          </div>
                          <div class="game_price">
                              <span class="price">
                                  <div>CLP$${product.price}</div>
                              </span>
                          </div>
                          <div class="game_info game_additional">
                              <div class="add_delete">
                                  <div class="add" data-id="${product.id}" title="Añadir otra copia de este artículo a tu carro">
                                      Añadir
                                  </div>
                                  |
                                  <div class="delete" data-id="${product.id}" data-name="${product.name}">Eliminar</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
              `;
      cartContainer.innerHTML += productHTML;
    });

    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        const productName = e.target.dataset.name;
        removeFromCart(productId, productName);
      });
    });

    document.querySelectorAll(".add").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
      });
    });
  }

  function removeFromCart(productId, productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((product) => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));

    returnStock(productId, productName);
    renderCart();
  }

  function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find((item) => item.id === productId);
    if (product) {
      product.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }

  function returnStock(productId, productName) {
    fetch(
      `https://store-megagames.onrender.com/api/store/returnStock/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: productName }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        console.log(`Stock devuelto: ${data.stock}`);
      })
      .catch((error) => console.error("Error al devolver el stock:", error));
  }

  renderCart();
});
