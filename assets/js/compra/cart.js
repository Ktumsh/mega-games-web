document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart_details_area");
  const pageGameBg = document.getElementById("pageGameBg");

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML =
        '<div class="empty_cart">Tu carro está vacío.</div>';
      updateTotalToPay(0);
      updateCartCount();
      document.querySelectorAll(".topay_bottom").forEach((btn) => {
        btn.classList.add("disabled");
      });
      return;
    }

    const defaultHTML = `
        <div class="cart_topay_area mobile">
            <div class="topay_area_ctn">
                <div class="topay_top">
                    <div>Total estimado</div>
                    <div class="totalToPay">CLP$0</div>
                </div>
                <div class="topay_middle">Los impuestos de venta se calcularán durante el pago (si es aplicable)</div>
                <button class="cart_page_btn topay_bottom">Continuar con el pago</button>
            </div>
        </div>
        <div class="cart_bottom_area">
            <div>
                <button class="cart_page_btn" type="button">Seguir comprando</button>
            </div>
            <div class="delete_article">Eliminar todos los artículos</div>
        </div>
        <div class="divider"></div>
    `;

    let total = 0;

    // Intentar establecer el fondo desde el primer producto con fondo válido
    setFirstValidBackground(cart);

    cart.forEach((product, index) => {
      for (let i = 0; i < product.quantity; i++) {
        const priceNumber = parseFloat(product.price.replace(".", ""));
        const formattedPrice = priceNumber.toLocaleString("es-CL", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });

        let originalPriceHTML = "";
        if (product.discount && product.originalPrice) {
          const originalPriceNumber = parseFloat(
            product.originalPrice.replace(".", "")
          );
          const formattedOriginalPrice = originalPriceNumber.toLocaleString(
            "es-CL",
            { minimumFractionDigits: 0, maximumFractionDigits: 0 }
          );
          originalPriceHTML = `
            <div class="price_label">
              <div class="original_price">CLP$${formattedOriginalPrice}</div>
              <div class="final_price">CLP$${formattedPrice}</div>
            </div>
          `;
        } else {
          originalPriceHTML = `<div class="final_price">CLP$${formattedPrice}</div>`;
        }

        let discountHTML = "";
        if (product.discount) {
          discountHTML = `<span id="discount" class="discount">${product.discount}</span>`;
        }

        const productHTML = `
            <div id="gameCard-${index}-${i}" class="cart_top_area">
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
                                    ${discountHTML}
                                    ${originalPriceHTML}
                                </span>
                            </div>
                            <div class="game_info game_additional">
                                <div class="add_delete">
                                    <div class="add" data-id="${product.id}" data-group="${product.group}" data-index="${index}" title="Añadir otra copia de este artículo a tu carro">
                                        Añadir
                                    </div>
                                    |
                                    <div class="delete" data-id="${product.id}" data-group="${product.group}" data-index="${index}-${i}">Eliminar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `;
        cartContainer.innerHTML += productHTML;
        total += priceNumber;
      }
    });

    cartContainer.innerHTML += defaultHTML;

    updateTotalToPay(total);
    updateCartCount();
    attachEventListeners();
  }

  function setFirstValidBackground(cart) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].background) {
        setBackground(cart[i].background);
        break;
      }
    }
  }

  function setBackground(backgroundUrl) {
    pageGameBg.style.backgroundImage = `url(${backgroundUrl})`;
  }

  function updateTotalToPay(total) {
    document.querySelectorAll(".totalToPay").forEach((element) => {
      element.textContent = `CLP$${total.toLocaleString("es-CL", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    });
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector(
      "#cart_status_data .cart_link"
    );

    if (cartCountElement) {
      cartCountElement.textContent = `Carro (${totalItems})`;
    }
  }

  function attachEventListeners() {
    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        removeFromCart(index);
      });
    });

    document.querySelectorAll(".add").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        const productGroup = e.target.dataset.group;
        addToCart(productId, productGroup);
      });
    });

    document.querySelector(".delete_article").addEventListener("click", () => {
      removeAllFromCart();
    });
  }

  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const [mainIndex, subIndex] = index.split("-").map(Number);
    const product = cart[mainIndex];

    if (product.quantity > 1) {
      product.quantity--;
    } else {
      cart.splice(mainIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // Devolver el stock en el servidor
    returnStock(product.id, product.group, 1);
    renderCart();
  }

  function removeAllFromCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const groupedProducts = {};

    cart.forEach((product) => {
      const key = `${product.id}-${product.group}`;
      if (!groupedProducts[key]) {
        groupedProducts[key] = { ...product, totalQuantity: product.quantity };
      } else {
        groupedProducts[key].totalQuantity += product.quantity;
      }
    });

    for (const key in groupedProducts) {
      const product = groupedProducts[key];
      returnStock(product.id, product.group, product.totalQuantity);
    }

    localStorage.removeItem("cart");
    renderCart();
  }

  function addToCart(productId, productGroup) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Obtener datos del producto de la API para verificar el stock
    fetch(
      `https://store-megagames.onrender.com/api/store/${productGroup}/${productId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.precioDescuento && !data.precioOriginal) {
          console.error("El producto no tiene precio:", data);
          return;
        }

        const productInCart = cart.find(
          (item) => item.id === productId && item.group === productGroup
        );
        const totalQuantityInCart = productInCart ? productInCart.quantity : 0;

        if (data.stock <= totalQuantityInCart) {
          alert("Este producto está agotado");
          return;
        }

        const product = {
          id: data.id,
          group: productGroup,
          name: data.nombre,
          discount: data.descuento || null,
          originalPrice: data.precioOriginal || null,
          price: data.precioDescuento || data.precioOriginal,
          img: data.imagenAlternativa || data.imagen,
          background: data.background,
          quantity: 1,
        };

        if (productInCart) {
          productInCart.quantity++;
        } else {
          cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        reduceStock(productId, productGroup, 1);
        console.log("Se ha añadido el producto al carrito");
        renderCart();
      })
      .catch((error) =>
        console.error("Error al añadir el producto al carrito:", error)
      );
  }

  function returnStock(productId, productGroup, quantity) {
    fetch(
      `https://store-megagames.onrender.com/api/store/returnStock/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group: productGroup, quantity: quantity }),
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

  function reduceStock(productId, productGroup, quantity) {
    fetch(
      `https://store-megagames.onrender.com/api/store/reduceStock/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group: productGroup, quantity: quantity }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        console.log(`Stock reducido: ${data.stock}`);
      })
      .catch((error) => console.error("Error al reducir el stock:", error));
  }

  updateCartCount();
  renderCart();
});
