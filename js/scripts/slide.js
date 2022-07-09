{
  var slideHero = new Swiper('.slide-hero', {
    effect: 'fade',
    pagination: {
      el: '.slide-hero .swiper-slide .main-area .area-explore .swiper-pagination',
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}
