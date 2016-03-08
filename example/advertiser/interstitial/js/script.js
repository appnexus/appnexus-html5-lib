APPNEXUS.ready(function () {
  var videoIsMuted = false;
  var video = document.getElementById("video");

  var playPauseButton = document.getElementById("playpause");
  var soundMuteButton = document.getElementById("sound");

  var playImage = document.getElementById("play");
  var pauseImage = document.getElementById("pause");
  var footerDiv = document.getElementById("footer");
  var logoDov = document.getElementById("logo");
  var closeButton = document.getElementById("close-btn");

  // video play/pause action
  playPauseButton.addEventListener('click', function () {
    if(!video.paused) {
      video.pause();
      playImage.style.visibility = "visible";
      pauseImage.style.visibility = "hidden";
    }else{
      video.play();
      pauseImage.style.visibility = "visible";
      playImage.style.visibility = "hidden";
    }
    isPlaying = !isPlaying;
  });

  // video mute action
  soundMuteButton.addEventListener('click', function () {
    if(!videoIsMuted) {
      video.muted = true;
      document.getElementById("mute").style.visibility = "visible";
      document.getElementById("unmute").style.visibility = "hidden";
    }else{
      video.muted = false;
      document.getElementById("unmute").style.visibility = "visible";
      document.getElementById("mute").style.visibility = "hidden";
    }
    videoIsMuted = !videoIsMuted;
  });

  // close button actions
  closeButton.addEventListener("click", function () {
    video.pause();
    APPNEXUS.collapse();
  });

  footerDiv.addEventListener('click', function () { APPNEXUS.click(); });
  logoDov.addEventListener('click', function () { APPNEXUS.click(); });

  // video ended actions
  video.addEventListener("ended", function () {
    APPNEXUS.collapse();
  });

  // request expand and overlay
  APPNEXUS.setExpandProperties({
    interstitial : true
  });
  APPNEXUS.expand();
});
