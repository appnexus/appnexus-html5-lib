APPNEXUS.ready(function () {
  var clickthrough = document.getElementById("clickthrough");

  function startAnimation() {
    TweenMax.to(".text-1", 0.5, {opacity:"1", delay: 0.5});
    TweenMax.to(".text-1", 0.5, {opacity:"0", delay: 2.5});
    TweenMax.to(".text-2", 0.5, {opacity:"1", delay: 3.5});
    TweenMax.to(".tree", 0.5, {opacity:"0", delay: 6});
    TweenMax.to(".tree", 0.5, {visibility:"hidden", delay: 6.5});

    TweenMax.to(".bg-collapse", 0, {visibility:"visible", delay: 6.5});
    TweenMax.from(".bg-collapse", 0.5, {opacity:"0", delay: 6.5});

    TweenMax.from(".product-details", 0.5, {opacity:"0", delay: 7});
    TweenMax.from(".cta", 0.5, {opacity:"0", delay: 7.5});
    TweenMax.from(".footer-text", 0.5, {opacity:"0", delay: 8});
  }

  clickthrough.addEventListener("click", function () {
    APPNEXUS.click();
  });

  startAnimation();
});