const multipleItemCarousel = document.querySelector("#carouselExample");

if (window.matchMedia("(min-width: 992px)").matches) {
  const carousel = new bootstrap.Carousel(multipleItemCarousel, {
    interval: false,
    touch: false,
  });

  var carouselWidth = $(" .carousel-cards .carousel-inner")[0].scrollWidth;
  var cardWidth = $(".carousel-cards .carousel-item").width() * 5;
  var scrollPosition = 0;

  $(".carousel-cards .carousel-control-next").on("click", () => {
    if (scrollPosition < carouselWidth - cardWidth) {
      scrollPosition = scrollPosition + cardWidth;
      $(".carousel-cards .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });

  $(".carousel-cards .carousel-control-prev").on("click", () => {
    if (scrollPosition > 0) {
      scrollPosition = scrollPosition - cardWidth;
      $(".carousel-cards .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
} else if (window.matchMedia("(min-width: 576px)").matches) {
  const carousel = new bootstrap.Carousel(multipleItemCarousel, {
    interval: false,
    touch: false,
  });

  var carouselWidth = $(" .carousel-cards .carousel-inner")[0].scrollWidth;
  var cardWidth = $(".carousel-cards .carousel-item").width() * 3;
  var scrollPosition = 0;

  $(".carousel-cards .carousel-control-next").on("click", () => {
    if (scrollPosition < carouselWidth - cardWidth) {
      scrollPosition = scrollPosition + cardWidth;
      $(".carousel-cards .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });

  $(".carousel-cards .carousel-control-prev").on("click", () => {
    if (scrollPosition > 0) {
      scrollPosition = scrollPosition - cardWidth;
      $(".carousel-cards .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
} else {
  $(multipleItemCarousel).addClass("slide");
}
