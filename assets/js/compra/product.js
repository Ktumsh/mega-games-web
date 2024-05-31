document.addEventListener("DOMContentLoaded", () => {
  const { item, game } = getProductIdFromURL();
  fetchProductDetails(game, item);

  function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      item: urlParams.get("item"),
      game: urlParams.get("game"),
    };
  }

  function fetchProductDetails(game, item) {
    fetch(`https://store-megagames.onrender.com/api/store/${game}/${item}`)
      .then((response) => response.json())
      .then((product) => {
        if (product.error) {
          console.error(product.error);
          return;
        }
        setupAddToCartButton(product);
      })
      .catch((error) =>
        console.error("Error al obtener los detalles del producto:", error)
      );
  }

  function setupAddToCartButton(product) {
    const addToCartButton = document.querySelector(".add_to_cart button");

    addToCartButton.addEventListener("click", () => {
      if (product.stock <= 0) {
        alert("Este producto está agotado");
        return;
      }

      const price = product.precioDescuento || product.precioOriginal;
      const cartItem = {
        id: product.id,
        name: product.nombre,
        price: price,
        img: product.imagen,
        background: product.background,
        quantity: 1,
      };

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find((item) => item.id === cartItem.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Reducir el stock en el servidor
      reduceStock(product.id);

      alert("Producto añadido al carrito");
    });
  }

  function reduceStock(productId) {
    fetch(
      `https://store-megagames.onrender.com/api/store/reduceStock/${productId}`,
      {
        method: "POST",
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
});
