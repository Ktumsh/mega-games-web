//CARRUSEL OFERTAS
const carousel1 = document.querySelector("#carouselOfertas");

if (window.matchMedia("(min-width: 992px)").matches) {
  const carousel = new bootstrap.Carousel(carousel1, {
    interval: false,
    touch: true,
  });

  var carouselWidth1 = $(carousel1).find(".carousel-inner")[0].scrollWidth;
  var cardWidth1 = $(carousel1).find(".carousel-item").width() * 5;
  var scrollPosition1 = 0;

  $(carousel1)
    .find(".carousel-control-next")
    .on("click", () => {
      if (scrollPosition1 < carouselWidth1 - cardWidth1) {
        scrollPosition1 = scrollPosition1 + cardWidth1;
        $(carousel1)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition1 }, 600);
      }
    });

  $(carousel1)
    .find(".carousel-control-prev")
    .on("click", () => {
      if (scrollPosition1 > 0) {
        scrollPosition1 = scrollPosition1 - cardWidth1;
        $(carousel1)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition1 }, 600);
      }
    });
} else if (window.matchMedia("(min-width: 576px)").matches) {
  const carousel = new bootstrap.Carousel(carousel1, {
    interval: false,
    touch: true,
  });

  var carouselWidth1 = $(carousel1).find(".carousel-inner")[0].scrollWidth;
  var cardWidth1 = $(carousel1).find(".carousel-item").width() * 3;
  var scrollPosition1 = 0;

  $(carousel1)
    .find(".carousel-control-next")
    .on("click", () => {
      if (scrollPosition1 < carouselWidth1 - cardWidth1) {
        scrollPosition1 = scrollPosition1 + cardWidth1;
        $(carousel1)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition1 }, 600);
      }
    });

  $(carousel1)
    .find(".carousel-control-prev")
    .on("click", () => {
      if (scrollPosition1 > 0) {
        scrollPosition1 = scrollPosition1 - cardWidth1;
        $(carousel1)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition1 }, 600);
      }
    });
} else {
  $(carousel1).addClass("slide");
}

//CARRUSEL JUEGOS
const carousel2 = document.querySelector("#carouselJuegos");

if (window.matchMedia("(min-width: 992px)").matches) {
  const carousel = new bootstrap.Carousel(carousel2, {
    interval: false,
    touch: true,
  });

  var carouselWidth2 = $(carousel2).find(".carousel-inner")[0].scrollWidth;
  var cardWidth2 = $(carousel2).find(".carousel-item").width() * 5;
  var scrollPosition2 = 0;

  $(carousel2)
    .find(".carousel-control-next")
    .on("click", () => {
      if (scrollPosition2 < carouselWidth2 - cardWidth2) {
        scrollPosition2 = scrollPosition2 + cardWidth2;
        $(carousel2)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition2 }, 600);
      }
    });

  $(carousel2)
    .find(".carousel-control-prev")
    .on("click", () => {
      if (scrollPosition2 > 0) {
        scrollPosition2 = scrollPosition2 - cardWidth2;
        $(carousel2)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition2 }, 600);
      }
    });
} else if (window.matchMedia("(min-width: 576px)").matches) {
  const carousel = new bootstrap.Carousel(carousel2, {
    interval: false,
    touch: true,
  });

  var carouselWidth2 = $(carousel2).find(".carousel-inner")[0].scrollWidth;
  var cardWidth2 = $(carousel2).find(".carousel-item").width() * 3;
  var scrollPosition2 = 0;

  $(carousel2)
    .find(".carousel-control-next")
    .on("click", () => {
      if (scrollPosition2 < carouselWidth2 - cardWidth2) {
        scrollPosition2 = scrollPosition2 + cardWidth2;
        $(carousel2)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition2 }, 600);
      }
    });

  $(carousel2)
    .find(".carousel-control-prev")
    .on("click", () => {
      if (scrollPosition2 > 0) {
        scrollPosition2 = scrollPosition2 - cardWidth2;
        $(carousel2)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition2 }, 600);
      }
    });
} else {
  $(carousel2).addClass("slide");
}

//CARRUSEL TARJETAS
const carousel3 = document.querySelector("#carouselTarjetas");

if (window.matchMedia("(min-width: 992px)").matches) {
  const carousel = new bootstrap.Carousel(carousel3, {
    interval: false,
    touch: true,
  });

  var carouselWidth3 = $(carousel3).find(".carousel-inner")[0].scrollWidth;
  var cardWidth3 = $(carousel3).find(".carousel-item").width() * 5;
  var scrollPosition3 = 0;

  $(carousel3)
    .find(".carousel-control-next")
    .on("click", () => {
      if (scrollPosition3 < carouselWidth3 - cardWidth3) {
        scrollPosition3 = scrollPosition3 + cardWidth3;
        $(carousel3)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition3 }, 600);
      }
    });

  $(carousel3)
    .find(".carousel-control-prev")
    .on("click", () => {
      if (scrollPosition3 > 0) {
        scrollPosition3 = scrollPosition3 - cardWidth3;
        $(carousel3)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition3 }, 600);
      }
    });
} else if (window.matchMedia("(min-width: 576px)").matches) {
  const carousel = new bootstrap.Carousel(carousel3, {
    interval: false,
    touch: true,
  });

  var carouselWidth3 = $(carousel3).find(".carousel-inner")[0].scrollWidth;
  var cardWidth3 = $(carousel3).find(".carousel-item").width() * 3;
  var scrollPosition3 = 0;

  $(carousel3)
    .find(".carousel-control-next")
    .on("click", () => {
      if (scrollPosition3 < carouselWidth3 - cardWidth3) {
        scrollPosition3 = scrollPosition3 + cardWidth3;
        $(carousel3)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition3 }, 600);
      }
    });

  $(carousel3)
    .find(".carousel-control-prev")
    .on("click", () => {
      if (scrollPosition3 > 0) {
        scrollPosition3 = scrollPosition3 - cardWidth3;
        $(carousel3)
          .find(".carousel-inner")
          .animate({ scrollLeft: scrollPosition3 }, 600);
      }
    });
} else {
  $(carousel3).addClass("slide");
}
