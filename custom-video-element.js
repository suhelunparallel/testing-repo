    // Select all elements with the attribute 'data-video' set to 'player'
    const videoPlayerWrapper = document.querySelectorAll("[data-video='player']");
    // Iterate over each video player element
    videoPlayerWrapper.forEach((player)=>{
        const {autoplay, videoLink} = player.dataset;
        // Select the video element within the player
        const videoPlayer = player.querySelector("video");
        // Select the control button element within the player
        const videoControlBtn = player.querySelector("a");
        // Select the placeholder element within the player
        const placeholder = player.querySelector(".placeholder");
        // Select the source element within the player
        const videoSource = player.querySelector("source");

        // Load the video only when all the content on the page is already loaded
        window.addEventListener("load", (event) => {
            videoSource.src = videoLink;
            videoPlayer.load(); 
        });

        // Hide the placeholder image for the video when video data is loaded
        //videoPlayer.addEventListener('loadeddata', function() {
          //  videoControlBtn.style.display= 'flex';
        //});
        
        //handling autoplay for the videos
        if(autoplay==='true'){
        videoPlayer.autoplay = true;
        placeholder.style.display = 'none'; 
        }

        // Change the text of the button when the video ends
        videoPlayer.addEventListener('ended', function() {
            videoControlBtn.textContent = "Replay";
        });

        // Handle click event on the control button to play/pause the video
        videoControlBtn.addEventListener("click", function(){
            placeholder.style.display = 'none'; 
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            videoPlayer.dispatchEvent(clickEvent);
        });

        // Efficiently play and pause the video on click
        let totalClicks = 0;
        videoPlayer.addEventListener("click", function() {
            placeholder.style.display = 'none'; 
            totalClicks++;
            if(totalClicks === 1){
                videoControlBtn.textContent = "Pause";
                videoPlayer.muted = false;
                videoPlayer.currentTime = 0;
                videoPlayer.play();
            } else{
                if (videoPlayer.paused) {
                    videoControlBtn.textContent = "Pause";
                    videoPlayer.play();
                } else {
                    videoControlBtn.textContent = "Play";
                    videoPlayer.pause();
                }
            }
        });

        // Pause the video when it goes out of the viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.bottom > 0 &&
                rect.right > 0 &&
                rect.left < (window.innerWidth ||               document.documentElement.clientWidth) &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight)
            );
        }

        window.addEventListener("scroll", function() {
            if (!isInViewport(videoPlayer)) {
                videoControlBtn.textContent = "Play";
                videoPlayer.pause();
            }
        });
    })
