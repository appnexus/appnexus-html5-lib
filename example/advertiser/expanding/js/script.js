APPNEXUS.ready(function () {
  var isExpanded = false;
  var selectedIndex = 0;
	var expandedContainer = document.getElementById('expanded-container');
  var music = document.getElementById('music');
  var closeBtn = document.getElementById('close-btn');
  var learnMoreBtn = document.getElementById('learnmore');
  var galleryControls = document.getElementById('gallery-controls');
  var galleryScroller = document.getElementById('gallery-scroller');

  var callout3 = document.getElementById('callout-3');

  APPNEXUS.setExpandProperties({
    floating: true,
    width: 600,
    height: 400,
    expand: {
      easing: 'ease-in-out',
      duration: 700
    }
  })

	expandedContainer.addEventListener('mouseover', function () {
    if (!isExpanded) {
  		APPNEXUS.expand();
      expandedContainer.style.width = 600;
      expandedContainer.style.height = 400;
      expandedContainer.style.opacity = 1;

      music.currentTime = 0;
      music.play();

      callout3.style.opacity = 1;
      isExpanded = true;
    }
	});

  closeBtn.addEventListener('click', function () {
    if (isExpanded) {
      APPNEXUS.collapse();
      expandedContainer.style.width = 300;
      expandedContainer.style.height = 250;
      expandedContainer.style.opacity = 0;

      music.pause();
      callout3.style.opacity = 0;
      isExpanded = false;
    }
  });

  learnMoreBtn.addEventListener('click', function () {
    APPNEXUS.click();
  });


  galleryControls.addEventListener('click', function (e) {
    if (e.target.className=='thumbnail') {
      galleryControls.children[selectedIndex].classList.remove('active');
      selectedIndex = e.target.attributes.sid.value - 1;
      galleryControls.children[selectedIndex].classList.add('active');
      galleryScroller.style.left = -(300 * selectedIndex) + 'px';
    }
  });

});