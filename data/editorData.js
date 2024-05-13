fetch("/data/api/editorSalePage.json")
  .then((response) => response.json())
  .then((tarjetas) => {
    const cardsPanels = Array.from({ length: 5 }, (_, i) =>
      document.getElementById(`panel_${i + 1}`)
    );

    const gridColumns = [
      "repeat(3, minmax(0px, 1fr))",
      "repeat(4, minmax(0px, 1fr))",
      "repeat(5, minmax(0px, 1fr))",
      "repeat(5, minmax(0px, 1fr))",
      "minmax(0px, 0.5fr) repeat(4, minmax(0px, 1fr)) minmax(0px, 0.5fr)",
      "repeat(4, minmax(0px, 1fr))",
      "repeat(2, minmax(0px, 1fr))",
      "repeat(3, minmax(0px, 1fr))",
      "repeat(2, minmax(0px, 1fr))",
    ];

    const saleSectionGrids = gridColumns.map((columns, index) => {
      const saleSectionGrid = document.createElement("div");
      saleSectionGrid.id = `sale_section_grid_${index + 1}`;
      saleSectionGrid.classList.add("sale_section_grid_ctn");
      saleSectionGrid.style.gridTemplateColumns = columns;
      return saleSectionGrid;
    });

    saleSectionGrids.forEach((grid, index) => {
      if (index < 2) {
        cardsPanels[index].appendChild(grid);
      } else if (index >= 2 && index < 5) {
        cardsPanels[2].appendChild(grid);
      } else if (index === 5) {
        console.log(saleSectionGrids[4]);
        cardsPanels[3].appendChild(grid);
      } else if (index >= 6) {
        cardsPanels[4].appendChild(grid);
      }
    });

    function regularCard(tarjeta) {
      const gameName = tarjeta.nombre;
      const pageName = gameName;
      return `
        <div class="sale_section_card">
          <div class="sale_section_card_ctn">
            <a href="publisher-sale-details.html?name=${pageName}&id=${tarjeta.id}" style="display: block; cursor: pointer">
              <div class="capsule_decorators"></div>
              <div class="hero_capsule_image_ctn">
                <img class="hero_image" src="${tarjeta.imagen}" alt="${tarjeta.nombre}">
              </div>
              <div class="capsule_bottom_bar">
                <span class="platform_label">
                  <span class="platform_img ${tarjeta.plataforma}"></span>
                </span>
                <span class="price_ctn">
                  <div class="disconunt_label">
                    <div class="discount">${tarjeta.descuento}</div>
                    <div class="price_label">
                      <div class="original_price">${tarjeta.precioOriginal}</div>
                      <div class="final_price">${tarjeta.precioDescuento}</div>
                    </div>
                  </div>
                </span>
              </div>
            </a>
          </div>
        </div>
      `;
    }

    function specialCard(tarjeta) {
      const gameName = tarjeta.nombre;
      const pageName = gameName;
      return `
        <div class="sale_section_card">
          <div class="sale_section_card_ctn">
            <a href="publisher-sale-details.html?name=${pageName}&id=${tarjeta.id}" style="display: block; cursor: pointer">
              <div class="capsule_decorators"></div>
              <div class="hero_capsule_image_ctn">
                <div class="hero_capsule_image" style="background-image: url('${tarjeta.imagen}');"></div>
                <img class="hero_image_diff" src="${tarjeta.imagen}" alt="${tarjeta.nombre}">
              </div>
              <div class="capsule_bottom_bar">
                <span class="price_ctn">
                  <div class="disconunt_label">
                    <div class="discount">${tarjeta.descuento}</div>
                    <div class="price_label">
                      <div class="original_price">${tarjeta.precioOriginal}</div>
                      <div class="final_price">${tarjeta.precioDescuento}</div>
                    </div>
                  </div>
                </span>
              </div>
            </a>
          </div>
        </div>
      `;
    }

    function regularCard2(tarjeta) {
      const gameName = tarjeta.nombre;
      const pageName = gameName;
      return `
    <div class="sale_section_card">
      <div class="sale_section_card_ctn">
        <a
          href="publisher-sale-details.html?name=${pageName}&id=${tarjeta.id}"
          style="display: block; cursor: pointer"
        >
          <div class="capsule_decorators"></div>
          <div class="capsule_image_ctn">
            <img
              src="${tarjeta.imagen}"
              alt="${tarjeta.nombre}"
            />
          </div>
          <div class="capsule_bottom_bar">
            <span class="platform_label">
              <span
                class="platform_img ${tarjeta.plataforma} me-1"
              ></span>
              <span
                class="platform_img ${tarjeta.plataforma2}"
              ></span>
            </span>
            <span class="price_ctn">
              <div class="disconunt_label">
                <div class="discount">${tarjeta.descuento}</div>
                <div class="price_label">
                  <div class="original_price">${tarjeta.precioOriginal}</div>
                  <div class="final_price">${tarjeta.precioDescuento}</div>
                </div>
              </div>
            </span>
          </div>
        </a>
      </div>
    </div>
  `;
    }

    function addCardsToPanel(
      panel,
      tarjetas,
      order,
      isSpecial = false,
      removePlatform = false
    ) {
      order.forEach((index) => {
        const cardContainer = document.createElement("div");
        const cardHTML = isSpecial
          ? specialCard(tarjetas[index])
          : regularCard(tarjetas[index]);

        if (!isSpecial && removePlatform) {
          cardContainer.innerHTML = cardHTML.replace("platform_img", "");
        } else {
          cardContainer.innerHTML = cardHTML;
        }

        panel.appendChild(cardContainer);
      });
    }

    function addCardsToPanel2(
      panel,
      tarjetas,
      order,
      isSpecial = false,
      removePlatform = false
    ) {
      order.forEach((index) => {
        const cardContainer = document.createElement("div");
        const cardHTML = isSpecial
          ? specialCard(tarjetas[index])
          : regularCard2(tarjetas[index]);

        if (!isSpecial && removePlatform) {
          cardContainer.innerHTML = cardHTML.replace("platform_img", "");
        } else {
          cardContainer.innerHTML = cardHTML;
        }

        panel.appendChild(cardContainer);
      });
    }

    addCardsToPanel(saleSectionGrids[0], tarjetas, [0, 1]);
    addCardsToPanel(saleSectionGrids[0], [tarjetas[2]], [0], true);
    addCardsToPanel(saleSectionGrids[1], tarjetas.slice(3, 7), [0, 1, 2, 3]);
    addCardsToPanel(
      saleSectionGrids[2],
      tarjetas.slice(0, 7),
      [0, 4, 6, 5, 3],
      false,
      true
    );
    addCardsToPanel(
      saleSectionGrids[3],
      tarjetas.slice(2, 12),
      [0, 5, 6, 7, 8],
      true
    );
    addCardsToPanel(
      saleSectionGrids[4],
      tarjetas.slice(11, 15),
      [0, 1, 2, 3],
      true
    );
    addCardsToPanel(
      saleSectionGrids[5],
      tarjetas.slice(1, 16),
      [0, 14],
      false,
      true
    );
    addCardsToPanel(saleSectionGrids[5], tarjetas.slice(16, 18), [0, 1], true);
    addCardsToPanel2(saleSectionGrids[6], tarjetas.slice(18, 20), [0, 1]);
    addCardsToPanel2(
      saleSectionGrids[7],
      tarjetas.slice(20, 23),
      [0, 1, 2],
      false,
      true
    );
    addCardsToPanel2(saleSectionGrids[8], tarjetas.slice(23, 25), [0, 1]);
  })
  .catch((error) => console.error("Error al cargar las tarjetas:", error));
