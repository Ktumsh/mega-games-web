window.onload = () => {
  const saleSectionGrid1 = document.getElementById("sale_section_grid_1");
  const saleSectionGrid2 = document.getElementById("sale_section_grid_2");
  const saleSectionGrid3 = document.getElementById("sale_section_grid_3");
  const saleSectionGrid4 = document.getElementById("sale_section_grid_4");
  const saleSectionGrid5 = document.getElementById("sale_section_grid_5");
  const saleSectionGrid6 = document.getElementById("sale_section_grid_6");
  const saleSectionGrid7 = document.getElementById("sale_section_grid_7");
  const saleSectionGrid8 = document.getElementById("sale_section_grid_8");
  const saleSectionGrid9 = document.getElementById("sale_section_grid_9");

  const panel1 = document.getElementById("panel_1");
  const panel2 = document.getElementById("panel_2");
  const panel3 = document.getElementById("panel_3");
  const panel4 = document.getElementById("panel_4");
  const panel5 = document.getElementById("panel_5");

  const additionalDiv = document.createElement("div");
  const additionalDiv2 = document.createElement("div");
  const additionalDiv3 = document.createElement("div");
  const additionalDiv4 = document.createElement("div");

  const centeredCard1 = document.createElement("div");
  const centeredCard2 = document.createElement("div");
  const centeredCard3 = document.createElement("div");
  const centeredCard4 = document.createElement("div");

  const lastCard1 = saleSectionGrid1.lastElementChild;
  const lastCard2 = saleSectionGrid2.lastElementChild;
  const lastCard3 = saleSectionGrid3.lastElementChild;
  const lastCard4 = saleSectionGrid4.lastElementChild;
  const lastCard5 = saleSectionGrid6.lastElementChild;
  const lastCard6 = saleSectionGrid8.lastElementChild;

  const additionalSectionGrid1 = document.createElement("div");
  const additionalSectionGrid2 = document.createElement("div");
  const additionalSectionGrid3 = document.createElement("div");

  //últimas 2 cartas de section_grid_3
  const lastTwoCards1 = saleSectionGrid3.children[3];
  const secondLastTwoCards1 = saleSectionGrid3.children[4];

  //última carta de section_grid_4
  const lastTwoCards2 = saleSectionGrid4.children[3];
  const secondLastTwoCards2 = saleSectionGrid4.children[4];

  //primeras 2 cartas de section_grid_5
  const cards3 = saleSectionGrid5.querySelectorAll(".sale_section_card");
  const firstTwoCards1 = saleSectionGrid5.children[0];
  const secondFirstTwoCards1 = saleSectionGrid5.children[1];

  //primera carta de section_grid_4
  const firstCard1 = saleSectionGrid4.firstElementChild;
  function aplicarEstilos() {
    if (window.matchMedia("(max-width: 576px)").matches) {
      //panel1
      saleSectionGrid1.style.gridTemplateColumns =
        "repeat(2, minmax(0px, 1fr))";
      centeredCard1.classList.add("sale_section_grid_ctn");
      centeredCard1.style.gridTemplateColumns =
        "minmax(0px, 0.5fr) repeat(1, minmax(0px, 1fr)) minmax(0px, 0.5fr)";
      centeredCard1.appendChild(additionalDiv);
      centeredCard1.appendChild(lastCard1);
      centeredCard1.appendChild(additionalDiv2);
      panel1.appendChild(centeredCard1);

      //panel2
      saleSectionGrid2.appendChild(lastCard2);
      saleSectionGrid2.style.gridTemplateColumns =
        "repeat(2, minmax(0px, 1fr))";

      //panel3
      additionalSectionGrid1.remove();
      additionalSectionGrid2.remove();

      saleSectionGrid3.appendChild(lastTwoCards1);
      saleSectionGrid4.insertBefore(firstCard1, saleSectionGrid4.children[1]);

      saleSectionGrid3.style.gridTemplateColumns =
        "repeat(2, minmax(0px, 1fr))";
      saleSectionGrid4.style.gridTemplateColumns =
        "repeat(2, minmax(0px, 1fr))";
      additionalSectionGrid3.classList.add("sale_section_grid_ctn");
      additionalSectionGrid3.style.gridTemplateColumns =
        "repeat(2, minmax(0px, 1fr))";
      saleSectionGrid5.style.gridTemplateColumns =
        "repeat(2, minmax(0px, 1fr))";

      saleSectionGrid4.insertBefore(lastCard3, saleSectionGrid4.children[0]);

      additionalSectionGrid3.insertBefore(
        lastTwoCards2,
        additionalSectionGrid3.children[0]
      );
      additionalSectionGrid3.insertBefore(
        secondLastTwoCards2,
        additionalSectionGrid3.children[1]
      );
      additionalSectionGrid3.insertBefore(
        firstTwoCards1,
        additionalSectionGrid3.children[2]
      );
      additionalSectionGrid3.insertBefore(
        secondFirstTwoCards1,
        additionalSectionGrid3.children[3]
      );
      panel3.insertBefore(additionalSectionGrid3, panel3.children[2]);

      //panel4
      saleSectionGrid6.appendChild(lastCard5);
      saleSectionGrid6.style.gridTemplateColumns =
        "repeat(2, minmax(0px, 1fr))";

      //panel5
      saleSectionGrid8.style.gridTemplateColumns =
        "repeat(2, minmax(0px, 1fr))";
      centeredCard4.classList.add("sale_section_grid_ctn");
      centeredCard4.style.gridTemplateColumns =
        "minmax(0px, 0.5fr) repeat(1, minmax(0px, 1fr)) minmax(0px, 0.5fr)";
      centeredCard4.appendChild(additionalDiv4);
      centeredCard4.appendChild(lastCard6);
      panel5.appendChild(centeredCard4);
    } else if (window.matchMedia("(max-width: 910px)").matches) {
      //panel1
      saleSectionGrid1.appendChild(lastCard1);
      saleSectionGrid1.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";

      //panel2
      saleSectionGrid2.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";
      centeredCard2.classList.add("sale_section_grid_ctn");
      centeredCard2.style.gridTemplateColumns = "repeat(3, minmax(0px, 1fr))";
      centeredCard2.insertBefore(additionalDiv2, centeredCard2.children[0]);
      centeredCard2.appendChild(lastCard2);
      panel2.appendChild(centeredCard2);

      //panel3
      additionalSectionGrid3.remove();
      saleSectionGrid3.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";
      additionalSectionGrid1.classList.add("sale_section_grid_ctn");
      additionalSectionGrid1.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";
      saleSectionGrid4.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";
      additionalSectionGrid2.classList.add("sale_section_grid_ctn");
      additionalSectionGrid2.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";
      saleSectionGrid5.style.gridTemplateColumns =
        "minmax(0px, 0.5fr) repeat(2, minmax(0px, 1fr)) minmax(0px, 0.5fr)";
      additionalSectionGrid1.appendChild(lastTwoCards1);
      additionalSectionGrid1.appendChild(secondLastTwoCards1);
      additionalSectionGrid1.appendChild(firstCard1);
      additionalSectionGrid2.appendChild(lastCard4);
      additionalSectionGrid2.appendChild(firstTwoCards1);
      additionalSectionGrid2.appendChild(secondFirstTwoCards1);
      saleSectionGrid4.insertBefore(
        lastTwoCards2,
        saleSectionGrid4.children[2]
      );
      saleSectionGrid5.insertBefore(
        additionalDiv,
        saleSectionGrid5.children[0]
      );
      panel3.insertBefore(additionalSectionGrid1, panel3.children[1]);
      panel3.insertBefore(additionalSectionGrid2, panel3.children[3]);

      //panel4
      saleSectionGrid6.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";
      centeredCard3.classList.add("sale_section_grid_ctn");
      centeredCard3.style.gridTemplateColumns = "repeat(3, minmax(0px, 1fr))";
      centeredCard3.insertBefore(additionalDiv3, centeredCard3.children[0]);
      centeredCard3.appendChild(lastCard5);
      panel4.appendChild(centeredCard3);

      //panel5
      centeredCard4.remove();
      saleSectionGrid8.appendChild(lastCard6);
      saleSectionGrid8.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";
    } else if (window.matchMedia("(min-width: 910px)").matches) {
      //panel1
      saleSectionGrid1.appendChild(lastCard1);
      saleSectionGrid1.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";

      //panel2
      saleSectionGrid2.appendChild(lastCard2);
      saleSectionGrid2.style.gridTemplateColumns =
        "repeat(4, minmax(0px, 1fr))";

      //panel3
      additionalSectionGrid1.remove();
      additionalSectionGrid2.remove();
      additionalSectionGrid3.remove();
      saleSectionGrid3.appendChild(lastTwoCards1);
      saleSectionGrid3.appendChild(secondLastTwoCards1);
      saleSectionGrid4.insertBefore(firstCard1, saleSectionGrid4.children[0]);
      saleSectionGrid4.appendChild(lastTwoCards2);
      saleSectionGrid4.appendChild(secondLastTwoCards2);
      saleSectionGrid5.insertBefore(
        firstTwoCards1,
        saleSectionGrid5.children[1]
      );
      saleSectionGrid5.insertBefore(
        secondFirstTwoCards1,
        saleSectionGrid5.children[2]
      );
      saleSectionGrid5.insertBefore(
        additionalDiv,
        saleSectionGrid5.children[0]
      );
      saleSectionGrid3.style.gridTemplateColumns =
        "repeat(5, minmax(0px, 1fr))";
      saleSectionGrid4.style.gridTemplateColumns =
        "repeat(5, minmax(0px, 1fr))";
      saleSectionGrid5.style.gridTemplateColumns =
        "minmax(0px, 0.5fr) repeat(4, minmax(0px, 1fr)) minmax(0px, 0.5fr)";

      //panel4
      saleSectionGrid6.appendChild(lastCard5);
      saleSectionGrid6.style.gridTemplateColumns =
        "repeat(4, minmax(0px, 1fr))";

      //panel5
      centeredCard4.remove();
      saleSectionGrid8.appendChild(lastCard6);
      saleSectionGrid8.style.gridTemplateColumns =
        "repeat(3, minmax(0px, 1fr))";
    }
  }

  aplicarEstilos();

  function delay(func) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, 200);
    };
  }

  const delayAplicarEstilos = delay(aplicarEstilos);

  window.addEventListener("resize", delayAplicarEstilos);

  const body = document.querySelector(".v6");
  const modalOverlay = document.querySelector(".full_modal_overlay");
  const shareButton = document.querySelector(".social_share_button");
  const closeButton = document.querySelector(".close_button");
  const closeDialog = document.querySelector(".dialog_button");
  const alertText = document.querySelector(".void_div");

  shareButton.addEventListener("click", () => {
    modalOverlay.style = "";
    body.classList.add("hidden_body");
  });

  closeButton.addEventListener("click", () => {
    modalOverlay.style = "display: none";
    body.classList.remove("hidden_body");
    alertText.innerHTML = "";
  });

  closeDialog.addEventListener("click", () => {
    modalOverlay.style = "display: none";
    body.classList.remove("hidden_body");
    alertText.innerHTML = "";
  });

  document.getElementById("copy_button").addEventListener("click", copyText);
  document
    .getElementById("share_link_text")
    .addEventListener("click", function (event) {
      event.preventDefault();
      copyText();
    });

  function copyText() {
    var textarea = document.getElementById("share_link_text");
    textarea.select();
    document.execCommand("copy");
    textarea.setSelectionRange(0, 0);
    alertText.innerHTML = "Enlace copiado";
  }
};
