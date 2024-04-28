window.onload = () => {
  const carousel = document.getElementById("carouselMaincap");

  const items = carousel.querySelectorAll(
    ".carousel_items .store_main_capsule"
  );
  const thumbs = carousel.querySelectorAll(".carousel_thumbs div");

  function activateItem(index) {
    items.forEach((item) => item.classList.remove("active"));
    thumbs.forEach((thumb) => thumb.classList.remove("active"));

    items[index].classList.add("active");
    thumbs[index].classList.add("active");
  }

  function nextItem() {
    const current = carousel.querySelector(
      ".carousel_items .store_main_capsule.active"
    );
    const currentIndex = Array.from(items).indexOf(current);
    const nextIndex = (currentIndex + 1) % items.length;
    activateItem(nextIndex);
  }

  function prevItem() {
    const current = carousel.querySelector(
      ".carousel_items .store_main_capsule.active"
    );
    const currentIndex = Array.from(items).indexOf(current);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    activateItem(prevIndex);
  }

  carousel
    .querySelector(".maincap .arrow.left")
    .addEventListener("click", prevItem);
  carousel
    .querySelector(".maincap .arrow.right")
    .addEventListener("click", nextItem);

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      activateItem(index);
    });
  });

  activateItem(0);

  let intervalId;
  function startAutoSlide() {
    intervalId = setInterval(nextItem, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  startAutoSlide();

  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  //CARRUSEL OFERTAS
  const carousel1 = document.querySelector("#carouselOfertas");

  if (window.matchMedia("(min-width: 992px)").matches) {
    const carousel = new bootstrap.Carousel(carousel1, {
      interval: false,
      touch: true,
    });

    var carouselWidth1 = $(carousel1).find(".inner_carousel")[0].scrollWidth;
    var cardWidth1 = $(carousel1).find(".card_").width() * 4 + 80;
    var scrollPosition1 = 0;

    $(carousel1)
      .find(".arrow.right")
      .on("click", () => {
        if (scrollPosition1 < carouselWidth1 - cardWidth1) {
          scrollPosition1 = scrollPosition1 + cardWidth1;
          $(carousel1)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition1 }, 0);
        }
      });

    $(carousel1)
      .find(".arrow.left")
      .on("click", () => {
        if (scrollPosition1 > 0) {
          scrollPosition1 = scrollPosition1 - cardWidth1;
          $(carousel1)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition1 }, 0);
        }
      });
  } else if (window.matchMedia("(min-width: 576px)").matches) {
    const carousel = new bootstrap.Carousel(carousel1, {
      interval: false,
      touch: true,
    });

    var carouselWidth1 = $(carousel1).find(".inner_carousel")[0].scrollWidth;
    var cardWidth1 = $(carousel1).find(".card_").width() * 3 + 60;
    var scrollPosition1 = 0;

    $(carousel1)
      .find(".arrow.right")
      .on("click", () => {
        if (scrollPosition1 < carouselWidth1 - cardWidth1) {
          scrollPosition1 = scrollPosition1 + cardWidth1;
          $(carousel1)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition1 }, 0);
        }
      });

    $(carousel1)
      .find(".arrow.left")
      .on("click", () => {
        if (scrollPosition1 > 0) {
          scrollPosition1 = scrollPosition1 - cardWidth1;
          $(carousel1)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition1 }, 0);
        }
      });
  }

  //CARRUSEL JUEGOS
  const carousel2 = document.querySelector("#carouselJuegos");

  if (window.matchMedia("(min-width: 992px)").matches) {
    const carousel = new bootstrap.Carousel(carousel2, {
      interval: false,
      touch: true,
    });

    var carouselWidth2 = $(carousel2).find(".inner_carousel")[0].scrollWidth;
    var cardWidth2 = $(carousel2).find(".card_").width() * 4 + 80;
    var scrollPosition2 = 0;

    $(carousel2)
      .find(".arrow.right")
      .on("click", () => {
        if (scrollPosition2 < carouselWidth2 - cardWidth2) {
          scrollPosition2 = scrollPosition2 + cardWidth2;
          $(carousel2)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition2 }, 0);
        }
      });

    $(carousel2)
      .find(".arrow.left")
      .on("click", () => {
        if (scrollPosition2 > 0) {
          scrollPosition2 = scrollPosition2 - cardWidth2;
          $(carousel2)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition2 }, 0);
        }
      });
  } else if (window.matchMedia("(min-width: 576px)").matches) {
    const carousel = new bootstrap.Carousel(carousel2, {
      interval: false,
      touch: true,
    });

    var carouselWidth2 = $(carousel2).find(".inner_carousel")[0].scrollWidth;
    var cardWidth2 = $(carousel2).find(".card_").width() * 3 + 60;
    var scrollPosition2 = 0;

    $(carousel2)
      .find(".arrow.right")
      .on("click", () => {
        if (scrollPosition2 < carouselWidth2 - cardWidth2) {
          scrollPosition2 = scrollPosition2 + cardWidth2;
          $(carousel2)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition2 }, 0);
        }
      });

    $(carousel2)
      .find(".arrow.left")
      .on("click", () => {
        if (scrollPosition2 > 0) {
          scrollPosition2 = scrollPosition2 - cardWidth2;
          $(carousel2)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition2 }, 0);
        }
      });
  }

  //CARRUSEL TARJETAS
  const carousel3 = document.querySelector("#carouselTarjetas");

  if (window.matchMedia("(min-width: 992px)").matches) {
    const carousel = new bootstrap.Carousel(carousel3, {
      interval: false,
      touch: true,
    });

    var carouselWidth3 = $(carousel3).find(".inner_carousel")[0].scrollWidth;
    var cardWidth3 = $(carousel3).find(".card_").width() * 4 + 80;
    var scrollPosition3 = 0;

    $(carousel3)
      .find(".arrow.right")
      .on("click", () => {
        if (scrollPosition3 < carouselWidth3 - cardWidth3) {
          scrollPosition3 = scrollPosition3 + cardWidth3;
          $(carousel3)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition3 }, 0);
        }
      });

    $(carousel3)
      .find(".arrow.left")
      .on("click", () => {
        if (scrollPosition3 > 0) {
          scrollPosition3 = scrollPosition3 - cardWidth3;
          $(carousel3)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition3 }, 0);
        }
      });
  } else if (window.matchMedia("(min-width: 576px)").matches) {
    const carousel = new bootstrap.Carousel(carousel3, {
      interval: false,
      touch: true,
    });

    var carouselWidth3 = $(carousel3).find(".inner_carousel")[0].scrollWidth;
    var cardWidth3 = $(carousel3).find(".card_").width() * 3 + 60;
    var scrollPosition3 = 0;

    $(carousel3)
      .find(".arrow.right")
      .on("click", () => {
        if (scrollPosition3 < carouselWidth3 - cardWidth3) {
          scrollPosition3 = scrollPosition3 + cardWidth3;
          $(carousel3)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition3 }, 0);
        }
      });

    $(carousel3)
      .find(".arrow.left")
      .on("click", () => {
        if (scrollPosition3 > 0) {
          scrollPosition3 = scrollPosition3 - cardWidth3;
          $(carousel3)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition3 }, 0);
        }
      });
  }

  const loadBtn = document.getElementById("load-more-generos");
  const generosContainer = document.getElementById("genCardContainer");
  const loader = document.getElementById("loader");

  loadBtn.addEventListener("click", () => {
    loader.style.display = "block";
    setTimeout(function () {
      var hiddenElements = generosContainer.getElementsByClassName("gen-card");
      for (var i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].classList.remove("d-none");
      }
      loader.style.display = "none";
      loadBtn.style.display = "none";
    }, 300);
  });

  const StoreNavSearchTerm = document.getElementById("store_nav_search_term");

  StoreNavSearchTerm.addEventListener("focus", (event) => {
    event.stopPropagation();
    StoreNavSearchTerm.classList.remove("default");
  });

  StoreNavSearchTerm.addEventListener("focus", (event) => {
    StoreNavSearchTerm.placeholder = "";
  });

  document.addEventListener("click", (event) => {
    if (!StoreNavSearchTerm.contains(event.target)) {
      if (StoreNavSearchTerm.value === "") {
        StoreNavSearchTerm.classList.add("default");
        if (StoreNavSearchTerm.value === "") {
          StoreNavSearchTerm.placeholder = "Buscar";
        }
      } else {
        StoreNavSearchTerm.classList.remove("default");
        StoreNavSearchTerm.placeholder = "";
      }
    }
  });
};
