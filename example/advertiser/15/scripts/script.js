APPNEXUS.ready(function () {
    console.log("READY")
    var expandButton = document.getElementById("expand-btn");
    var clickthrough = document.getElementById("clickthrough");

    function startAnimation() {
        TweenMax.to(".text-1", 0.5, {opacity:"1", delay: 0.5});
        TweenMax.to(".text-1", 0.5, {opacity:"0", delay: 2.5});
        TweenMax.to(".text-2", 0.5, {opacity:"1", delay: 3.5});
        TweenMax.to(".tree", 0.5, {opacity:"0", delay: 6});
        TweenMax.to(".tree", 0.5, {visibility:"hidden", delay: 6.5});

        TweenMax.to(".bg-collapse", 0, {visibility:"visible", delay: 6.5});
        TweenMax.from(".bg-collapse", 0.5, {opacity:"0", delay: 6.5});

        TweenMax.to("#expand-btn", 0, {visibility:"visible", delay: 6});
        TweenMax.from("#expand-btn", 0.5, {opacity:"1", delay: 6.5});

        TweenMax.from(".product-details", 0.5, {opacity:"0", delay: 7});
        TweenMax.from(".cta", 0.5, {opacity:"0", delay: 7.5});
        TweenMax.from(".footer-text", 0.5, {opacity:"0", delay: 8});
    }

    expandButton.addEventListener("click", function () {
        APPNEXUS.expand({});
    });

    clickthrough.addEventListener("click", function () {
        APPNEXUS.click();
    });

    startAnimation();
});

// function initEB() {
//     if (!EB.isInitialized()) {
//         EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
//     } else {
//         startAd();
//     }
// }

// function startAd() {
//     addEventListeners();
//     startAnimation();
// }

// function addEventListeners() {
//     document.getElementById("expand-btn").addEventListener("click", expand);
//     document.getElementById("clickthrough").addEventListener("click", clickthrough);
// }

// function expand() {
//     console.log("expand");
//     var expansionParams = {x: 0,y: 0,width: 965,height: 600,actionType: EBG.ActionType.USER,panelName:"panel"};
//     EB.expand(expansionParams);
// }

// function clickthrough() {
//     console.log("Click_Default");
//     EB.clickthrough("Click_Default");
// }



// window.addEventListener("load", initEB);
