document.addEventListener("DOMContentLoaded", () => {
  //CARRUSEL OFERTAS
  const carousel1 = document.querySelector("#carouselOfertas");

  if (window.matchMedia("(min-width: 992px)").matches) {
    const carousel = new bootstrap.Carousel(carousel1, {
      interval: false,
      touch: true,
    });
    console.log("carrusel1");

    var carouselWidth1 = $(carousel1).find(".inner_carousel")[0].scrollWidth;
    console.log(carouselWidth1);
    var cardWidth1 = $(carousel1).find(".card_").width() * 5;
    console.log(cardWidth1);
    var scrollPosition1 = 0;

    $(carousel1)
      .find(".carousel-control-next")
      .on("click", () => {
        if (scrollPosition1 < carouselWidth1 - cardWidth1) {
          scrollPosition1 = scrollPosition1 + cardWidth1;
          $(carousel1)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition1 }, 100);
        }
      });

    $(carousel1)
      .find(".carousel-control-prev")
      .on("click", () => {
        if (scrollPosition1 > 0) {
          scrollPosition1 = scrollPosition1 - cardWidth1;
          $(carousel1)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition1 }, 100);
        }
      });
  } else if (window.matchMedia("(min-width: 576px)").matches) {
    const carousel = new bootstrap.Carousel(carousel1, {
      interval: false,
      touch: true,
    });

    var carouselWidth1 = $(carousel1).find(".inner_carousel")[0].scrollWidth;
    var cardWidth1 = $(carousel1).find(".card_").width() * 3;
    var scrollPosition1 = 0;

    $(carousel1)
      .find(".carousel-control-next")
      .on("click", () => {
        if (scrollPosition1 < carouselWidth1 - cardWidth1) {
          scrollPosition1 = scrollPosition1 + cardWidth1;
          $(carousel1)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition1 }, 100);
        }
      });

    $(carousel1)
      .find(".carousel-control-prev")
      .on("click", () => {
        if (scrollPosition1 > 0) {
          scrollPosition1 = scrollPosition1 - cardWidth1;
          $(carousel1)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition1 }, 100);
        }
      });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //CARRUSEL JUEGOS
  const carousel2 = document.querySelector("#carouselJuegos");

  if (window.matchMedia("(min-width: 992px)").matches) {
    const carousel = new bootstrap.Carousel(carousel2, {
      interval: false,
      touch: true,
    });
    console.log("carrusel2");

    var carouselWidth2 = $(carousel2).find(".inner_carousel")[0].scrollWidth;
    console.log(carouselWidth2);
    var cardWidth2 = $(carousel2).find(".card_").width() * 5;
    console.log(cardWidth2);
    var scrollPosition2 = 0;

    $(carousel2)
      .find(".carousel-control-next")
      .on("click", () => {
        if (scrollPosition2 < carouselWidth2 - cardWidth2) {
          scrollPosition2 = scrollPosition2 + cardWidth2;
          $(carousel2)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition2 }, 100);
        }
      });

    $(carousel2)
      .find(".carousel-control-prev")
      .on("click", () => {
        if (scrollPosition2 > 0) {
          scrollPosition2 = scrollPosition2 - cardWidth2;
          $(carousel2)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition2 }, 100);
        }
      });
  } else if (window.matchMedia("(min-width: 576px)").matches) {
    const carousel = new bootstrap.Carousel(carousel2, {
      interval: false,
      touch: true,
    });

    var carouselWidth2 = $(carousel2).find(".inner_carousel")[0].scrollWidth;
    var cardWidth2 = $(carousel2).find(".card_").width() * 3;
    var scrollPosition2 = 0;

    $(carousel2)
      .find(".carousel-control-next")
      .on("click", () => {
        if (scrollPosition2 < carouselWidth2 - cardWidth2) {
          scrollPosition2 = scrollPosition2 + cardWidth2;
          $(carousel2)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition2 }, 100);
        }
      });

    $(carousel2)
      .find(".carousel-control-prev")
      .on("click", () => {
        if (scrollPosition2 > 0) {
          scrollPosition2 = scrollPosition2 - cardWidth2;
          $(carousel2)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition2 }, 100);
        }
      });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //CARRUSEL TARJETAS
  const carousel3 = document.querySelector("#carouselTarjetas");

  if (window.matchMedia("(min-width: 992px)").matches) {
    const carousel = new bootstrap.Carousel(carousel3, {
      interval: false,
      touch: true,
    });
    console.log("carrusel3");

    var carouselWidth3 = $(carousel3).find(".inner_carousel")[0].scrollWidth;
    console.log(carouselWidth3);
    var cardWidth3 = $(carousel3).find(".card_").width() * 5;
    console.log(cardWidth3);
    var scrollPosition3 = 0;

    $(carousel3)
      .find(".carousel-control-next")
      .on("click", () => {
        if (scrollPosition3 < carouselWidth3 - cardWidth3) {
          scrollPosition3 = scrollPosition3 + cardWidth3;
          $(carousel3)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition3 }, 100);
        }
      });

    $(carousel3)
      .find(".carousel-control-prev")
      .on("click", () => {
        if (scrollPosition3 > 0) {
          scrollPosition3 = scrollPosition3 - cardWidth3;
          $(carousel3)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition3 }, 100);
        }
      });
  } else if (window.matchMedia("(min-width: 576px)").matches) {
    const carousel = new bootstrap.Carousel(carousel3, {
      interval: false,
      touch: true,
    });

    var carouselWidth3 = $(carousel3).find(".inner_carousel")[0].scrollWidth;
    var cardWidth3 = $(carousel3).find(".card_").width() * 3;
    var scrollPosition3 = 0;

    $(carousel3)
      .find(".carousel-control-next")
      .on("click", () => {
        if (scrollPosition3 < carouselWidth3 - cardWidth3) {
          scrollPosition3 = scrollPosition3 + cardWidth3;
          $(carousel3)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition3 }, 100);
        }
      });

    $(carousel3)
      .find(".carousel-control-prev")
      .on("click", () => {
        if (scrollPosition3 > 0) {
          scrollPosition3 = scrollPosition3 - cardWidth3;
          $(carousel3)
            .find(".inner_carousel")
            .animate({ scrollLeft: scrollPosition3 }, 100);
        }
      });
  } else {
    $(carousel3).addClass("slide");
  }
});

document.addEventListener("DOMContentLoaded", () => {
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
});