var video;
var videoContainer;
var sdkVideoPlayer;
var sdkVideoPlayButton;
var isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);
var isIE9 = (/MSIE 9\./i).test(navigator.userAgent);
var videoIsMuted = false;

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();
    }
}

function startAd() {
    video = document.getElementById("video");
    videoContainer = document.getElementById("video-container");
    sdkVideoPlayer = document.getElementById("sdk-video-player");
    sdkVideoPlayButton = document.getElementById("sdk-video-play-button");
    EB._sendMessage("showDimmer");
    addListeners();
    
    
    
    /*video.src = 'videos/video.mp4';
    video.currentTime = 0;
    video.play();

    console.log("video play >>>>>>>>>>>>");*/
    
    initVideo();

    if (isIOS) {
        centerWebkitVideoControls();
    }
}

function initVideo() {
    var sdkData = EB.getSDKData();
    var useSDKVideoPlayer = false;
    var sdkPlayerVideoFormat = "mp4"; // or use "webm" for the webm format

    if (sdkData !== null) {
        if (sdkData.SDKType === "MRAID" && sdkData.version > 1) {
            document.body.classList.add("sdk");

            // set sdk to use custom close button
            EB.setExpandProperties({
                useCustomClose: true
            });

            var sourceTags = video.getElementsByTagName("source");
            var videoSource = "";

            for (var i = 0; i < sourceTags.length; i++) {
                if (sourceTags[i].getAttribute("type")) {
                    if (sourceTags[i].getAttribute("type").toLowerCase() === "video/" + sdkPlayerVideoFormat) {
                        videoSource = sourceTags[i].getAttribute("src");
                    }
                }
            }

            videoContainer.removeChild(video);
            video = null;

            sdkVideoPlayButton.addEventListener("click", function() {
                if (videoSource !== "") {
                    EB.playVideoOnNativePlayer(videoSource);
                }
            });

            useSDKVideoPlayer = true;
        }
    }

    if (!useSDKVideoPlayer) {
        videoContainer.removeChild(sdkVideoPlayer);
        var videoTrackingModule = new EBG.VideoModule(video);
    }
    
    //video.style.display = "none";
    //video.style.display = "block";
    video.src = 'videos/video.mp4';
    video.currentTime = 0;
    video.play();
    
    console.log("video play >>>>>");
}

function addListeners() {
    document.getElementById("clickthrough").addEventListener("click", clickthrough); 
    document.getElementById("playpause").addEventListener("click", controlsHandler);
    document.getElementById("sound").addEventListener("click", controlsHandler);  
    video.addEventListener("ended", videoEventHandler); 
}

function colPanel() { 
    video.pause();
    document.getElementById("play").style.visibility = "visible";
    document.getElementById("pause").style.visibility = "hidden";
    
    EB._sendMessage("hideDimmer");  
    EB.collapse();    
}

function clickthrough() {
    console.log("Click_Video");
    EB.clickthrough("Click_Video");
    colPanel();
}

function controlsHandler(event) {
    switch(event.target.id) {
        case "playpause":
            if(!video.paused) {
                video.pause();
                document.getElementById("play").style.visibility = "visible";
                document.getElementById("pause").style.visibility = "hidden";
            }else{
                video.play();  
                document.getElementById("pause").style.visibility = "visible";
                document.getElementById("play").style.visibility = "hidden";
            }
            break;
        case "sound":
            if(!videoIsMuted) {
                video.muted = true;                
                document.getElementById("mute").style.visibility = "visible";
                document.getElementById("unmute").style.visibility = "hidden";
                videoIsMuted = true;
            }else{
                video.muted = false;
                document.getElementById("unmute").style.visibility = "visible";
                document.getElementById("mute").style.visibility = "hidden";
                videoIsMuted = false;
            }
            break;
    }
}

function videoEventHandler(event) {
    switch(event.type) {
        case "ended":
                //document.getElementById("play").style.visibility = "visible";
                //document.getElementById("pause").style.visibility = "hidden";
                document.getElementById("videoEnd").style.visibility = "visible";
            
            break;
    }
}

function replayVideo() {
    video.currentTime = 0;
    video.play();
    document.getElementById("videoEnd").style.visibility = "hidden";
}


function centerWebkitVideoControls() {
    document.body.classList.add("ios-center-video-controls");
}

window.addEventListener("load", initEB);
