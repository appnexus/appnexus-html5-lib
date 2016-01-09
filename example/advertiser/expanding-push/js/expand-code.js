APPNEXUS.ready(function (){
		var expandingDiv = document.getElementById('expanding-div');
		var clickDiv = document.getElementById('click');
		var clickMessage = document.getElementById('click-message');
		var closeButton = document.getElementById('close-button');
		var videoDiv = document.getElementById('video-holder');
		var videoPlayer = document.getElementById('video-player');
		var twitterButton = document.getElementById('twitter-button');
		var facebookButton = document.getElementById('facebook-button');

		APPNEXUS.setExpandProperties({
				height: 272,
				expand: {
					easing: 'ease-in-out',
					duration: 1000
				},
				collapse: {
					easing: 'ease-in-out',
					duration: 500
				}
			})

		clickMessage.onclick = function (e) {
			APPNEXUS.expand();
	  	clickDiv.style.visibility = "hidden";
			clickMessage.style.opacity = "0";
	  	expandingDiv.className = "expanding-div-expanded";
	  	videoDiv.className = "video-holder-expanded";
		};

		clickDiv.onclick = function () {
			APPNEXUS.click();
			console.log('click');
		};

		closeButton.onclick = function () {
			expandingDiv.className = "";
    	videoDiv.className = "";
	  	clickDiv.style.visibility = "visible";
  		clickMessage.style.opacity = "1";
	  	APPNEXUS.collapse();
	  	videoPlayer.pause();
		};

		twitterButton.onclick = function () {
			APPNEXUS.click('Twitter', 'http://www.twitter.com');
		}

		facebookButton.onclick = function () {
			APPNEXUS.click('Facebook', 'http://www.facebook.com');
		}

});