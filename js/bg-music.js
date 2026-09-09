// js/bg-music.js

// 1. Audio Element ko dynamically HTML me add karna (taaki har page pe code na likhna pade)
const player = document.createElement('audio');
player.id = "bg-player";
player.preload = "auto";
document.body.appendChild(player);

const mySong = "hh.mp3";
player.volume = 0.45; // 45% Volume

function playMusic() {
    if (!player.src || !player.src.includes(mySong)) {
        player.src = mySong;

        const savedTime = localStorage.getItem("bgTrackTime");
        const isWaiting = localStorage.getItem("bgTrackWaiting");

        // Agar gaana abhi 10 min wale break me hai, toh play nahi hoga
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

    player.play().catch(() => {
        console.log("Browser autoplay blocked. Click to play music.");
    });
}

// Har second current play time ko save karein
player.addEventListener("timeupdate", function () {
    localStorage.setItem("bgTrackTime", player.currentTime);
});

// Gaana khatam hone par 10 minute ka wait karega
player.addEventListener("ended", function() {
    console.log("Gaana khatam! Ab 10 minute ka break...");
    
    localStorage.removeItem("bgTrackTime"); 
    localStorage.setItem("bgTrackWaiting", "true"); // Break status save kiya
    
    setTimeout(function() {
        console.log("10 minute poore hue! Gaana fir se shuru ho raha hai.");
        localStorage.removeItem("bgTrackWaiting");
        player.currentTime = 0;
        playMusic();
    }, 600000); // 10 minute
});

// Page load hote hi music start karne ki koshish karein
window.addEventListener("DOMContentLoaded", () => {
    // Check karein ki pichle page se 10 min break toh nahi chal raha
    if (localStorage.getItem("bgTrackWaiting") !== "true") {
        playMusic();
    }
});

// Browser block bypass karne ke liye click handle
window.addEventListener("click", function () {
    if (player.paused && localStorage.getItem("bgTrackWaiting") !== "true") {
        playMusic();
    }
}, { once: true });
