// 1. Audio Element ko dynamically HTML me add karna
const player = document.createElement('audio');
player.id = "bg-player";
player.preload = "auto";
document.body.appendChild(player);

const mySong = "hh.mp3";
player.volume = 0.45; // 45% Volume (40-50% ke beech)

function playMusic() {
    if (!player.src || !player.src.includes(mySong)) {
        player.src = mySong;

        // 🌟 localStorage ki jagah sessionStorage use kar rahe hain
        const savedTime = sessionStorage.getItem("bgTrackTime");
        const isWaiting = sessionStorage.getItem("bgTrackWaiting");

        // Agar gaana abhi 5 min wale break me hai, toh play nahi hoga
        if (isWaiting === "true") {
            return; 
        }

        if (savedTime) {
            player.addEventListener("loadedmetadata", function () {
                try {
                    player.currentTime = parseFloat(savedTime);
                } catch (error) {
                    console.log("Could not restore music time.");
                }
            }, { once: true });
        }
    }

    // Gaana play karne ki koshish
    player.play().catch((error) => {
        console.log("Autoplay blocked. User action needed to play.");
    });
}

// Har second current play time ko save karein
player.addEventListener("timeupdate", function () {
    sessionStorage.setItem("bgTrackTime", player.currentTime);
});

// Gaana khatam hone par 5 minute ka wait karega
player.addEventListener("ended", function() {
    console.log("Gaana khatam! Ab 5 minute ka break...");
    
    sessionStorage.removeItem("bgTrackTime"); 
    sessionStorage.setItem("bgTrackWaiting", "true"); // Break status save kiya
    
    // 5 minute ka loop timer
    setTimeout(function() {
        console.log("5 minute poore hue! Gaana fir se shuru ho raha hai.");
        sessionStorage.removeItem("bgTrackWaiting");
        player.currentTime = 0;
        playMusic();
    }, 300000); 
});

// Page load hote hi music start karne ki koshish karein
window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("bgTrackWaiting") !== "true") {
        playMusic();
    }
});

// Browsers ki restriction bypass karne ke liye (Click, Scroll, Touch ya Keydown par music chalu)
const startInteractions = ["click", "scroll", "touchstart", "keydown", "mousemove"];
startInteractions.forEach(event => {
    window.addEventListener(event, function handleInteraction() {
        if (player.paused && sessionStorage.getItem("bgTrackWaiting") !== "true") {
            playMusic();
        }
        window.removeEventListener(event, handleInteraction);
    });
});
