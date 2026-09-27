/* =========================================================
   GULU PDF LIBRARY
   BACKGROUND MUSIC CONTROLLER
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       SETTINGS
    ===================================================== */

    const MUSIC_ID =
        "bgMusic";


    const STORAGE_KEY =
        "guluMusicEnabled";


    const volume =
        0.22;



    /* =====================================================
       FIND AUDIO
    ===================================================== */

    function getMusic() {

        return document.getElementById(
            MUSIC_ID
        );

    }



    /* =====================================================
       APPLY SETTINGS
    ===================================================== */

    function applyMusicSettings() {

        const music =
            getMusic();


        if (!music) {

            return;

        }


        music.volume =
            volume;

        music.loop =
            true;


        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (saved === "false") {

            music.muted =
                true;

        }

        else {

            music.muted =
                false;

        }

    }



    /* =====================================================
       START MUSIC
    ===================================================== */

    async function startMusic() {

        const music =
            getMusic();


        if (!music) {

            return;

        }


        applyMusicSettings();


        try {

            await music.play();

        }

        catch (error) {

            /*
               Browser autoplay policies may block
               audio until the user interacts.
            */

            console.log(
                "Music waiting for user interaction."
            );

        }

    }



    /* =====================================================
       FIRST USER INTERACTION
    ===================================================== */

    function enableAfterInteraction() {

        const music =
            getMusic();


        if (!music) {

            return;

        }


        startMusic();

        document.removeEventListener(
            "click",
            enableAfterInteraction
        );

        document.removeEventListener(
            "touchstart",
            enableAfterInteraction
        );

        document.removeEventListener(
            "keydown",
            enableAfterInteraction
        );

    }



    /* =====================================================
       PUBLIC TOGGLE
    ===================================================== */

    window.toggleGuluMusic =
        function () {

            const music =
                getMusic();


            if (!music) {

                return;

            }


            const currentlyMuted =
                music.muted;


            music.muted =
                !currentlyMuted;


            localStorage.setItem(
                STORAGE_KEY,
                String(!music.muted)
            );


            if (!music.muted) {

                startMusic();

            }

        };



    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initializeMusic() {

        const music =
            getMusic();


        if (!music) {

            return;

        }


        applyMusicSettings();


        startMusic();


        document.addEventListener(
            "click",
            enableAfterInteraction,
            {
                once: false,
                passive: true
            }
        );


        document.addEventListener(
            "touchstart",
            enableAfterInteraction,
            {
                once: false,
                passive: true
            }
        );


        document.addEventListener(
            "keydown",
            enableAfterInteraction,
            {
                once: false,
                passive: true
            }
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeMusic
        );

    }

    else {

        initializeMusic();

    }

})();