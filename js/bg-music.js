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

        const savedTime = localStorage.getItem("bgTrackTime");
        const isWaiting = localStorage.getItem("bgTrackWaiting");

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
    localStorage.setItem("bgTrackTime", player.currentTime);
});

// 🌟 GAANA KHATAM HONE PAR AB 5 MINUTE KA WAIT KAREGA
player.addEventListener("ended", function() {
    console.log("Gaana khatam! Ab 5 minute ka break...");
    
    localStorage.removeItem("bgTrackTime"); 
    localStorage.setItem("bgTrackWaiting", "true"); // Break status save kiya
    
    // 5 minute = 5 * 60 * 1000 = 300,000 milliseconds
    setTimeout(function() {
        console.log("5 minute poore hue! Gaana fir se shuru ho raha hai.");
        localStorage.removeItem("bgTrackWaiting");
        player.currentTime = 0;
        playMusic();
    }, 300000); 
});

// Page load hote hi music start karne ki koshish karein
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("bgTrackWaiting") !== "true") {
        playMusic();
    }
});

// 🔥 BROWSERS KI BLOCKING DOOR KARNE KE LIYE (CLICK, SCROLL YA TOUCH PAR MUSIC CHALU)
const startInteractions = ["click", "scroll", "touchstart", "keydown"];
startInteractions.forEach(event => {
    window.addEventListener(event, function handleInteraction() {
        if (player.paused && localStorage.getItem("bgTrackWaiting") !== "true") {
            playMusic();
        }
        // Ek baar chalne ke baad is listener ko hata dete hain taaki baar-baar load na pade
        window.removeEventListener(event, handleInteraction);
    });
});
