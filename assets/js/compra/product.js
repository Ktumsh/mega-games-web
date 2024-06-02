document.addEventListener("DOMContentLoaded", () => {
  const { item, group } = getProductParamsFromURL();
  if (group) {
    fetchProductDetails(group, item);
  } else {
    console.error("Grupo no especificado en la URL.");
  }

  function getProductParamsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      item: urlParams.get("item"),
      group: urlParams.get("group"),
    };
  }

  function fetchProductDetails(group, item) {
    fetch(`https://store-megagames.onrender.com/api/store/${group}/${item}`)
      .then((response) => response.json())
      .then((product) => {
        if (product.error) {
          console.error(product.error);
          return;
        }
        setupAddToCartButton(product, group);
      })
      .catch((error) =>
        console.error("Error al obtener los detalles del producto:", error)
      );
  }

  function setupAddToCartButton(product, group) {
    const addToCartButton = document.querySelector(".add_to_cart button");

    addToCartButton.addEventListener("click", () => {
      if (product.stock <= 0) {
        alert("Este producto está agotado");
        return;
      }

      const cartItem = {
        id: product.id,
        group: group,
        name: product.nombre,
        discount: product.descuento || null,
        originalPrice: product.precioOriginal || null,
        price: product.precioDescuento || product.precioOriginal,
        img: product.imagenAlternativa || product.imagen,
        background: product.background,
        platform: product.disponibleEn,
        quantity: 1,
      };

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find(
        (item) => item.id === cartItem.id && item.group === cartItem.group
      );

      const totalQuantityInCart = existingProduct
        ? existingProduct.quantity
        : 0;

      fetch(
        `https://store-megagames.onrender.com/api/store/${group}/${product.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.stock <= totalQuantityInCart) {
            alert("Este producto está agotado");
            return;
          }

          if (existingProduct) {
            existingProduct.quantity++;
          } else {
            cart.push(cartItem);
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount();

          reduceStock(cartItem.id, cartItem.group, 1);
        })
        .catch((error) =>
          console.error("Error al verificar el stock del producto:", error)
        );
    });
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

  updateCartCount();
});
