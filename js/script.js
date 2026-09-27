/* =========================================================
   GULU PDF LIBRARY
   GLOBAL ENHANCEMENT SCRIPT
   Professional behavior for all pages
========================================================= */

(function () {
    "use strict";

    function $(selector) {
        return document.querySelector(selector);
    }

    function $all(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    function isCurrentPage(name) {
        const current = window.location.pathname.split("/").pop() || "index.html";
        return current.toLowerCase() === name.toLowerCase();
    }

    function setupScrollProgress() {
        const bar = document.getElementById("pageProgressBar");
        if (!bar) {
            return;
        }

        const update = function () {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
            bar.style.width = progress + "%";
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
    }

    function setupMenu() {
        const sideMenu = $("#sideMenu");
        const menuToggle = $("#menuToggle");

        if (!sideMenu || !menuToggle) {
            return;
        }

        menuToggle.addEventListener("click", function () {
            const open = sideMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(open));
        });

        document.addEventListener("click", function (event) {
            if (!sideMenu.contains(event.target)) {
                sideMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    function highlightActiveNav() {
        const links = $all(".side-menu-panel a");
        if (!links.length) {
            return;
        }

        links.forEach(function (link) {
            const href = link.getAttribute("href");
            if (!href || href === "#") {
                return;
            }

            const pageName = href.split("/").pop().toLowerCase();
            if (isCurrentPage(pageName)) {
                link.classList.add("active");
            }
        });
    }

    function bindEnterLibraryButtons() {
        const buttons = $all("#enterLibraryBtn, #enterLibraryBtnHome");

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                window.location.href = "classes.html";
            });
        });
    }

    function setupToast() {
        let toast = document.getElementById("guluToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "guluToast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }

        return toast;
    }

    function showToast(message) {
        const toast = setupToast();
        toast.textContent = message;
        toast.classList.add("visible");

        clearTimeout(showToast._timer);
        showToast._timer = setTimeout(function () {
            toast.classList.remove("visible");
        }, 2200);
    }

    function setupContactForm() {
        const form = $("#contactForm");
        if (!form) {
            return;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const button = form.querySelector("button[type='submit']");
            if (!button) {
                return;
            }

            const originalText = button.textContent;
            button.textContent = "Message sent";
            button.disabled = true;

            setTimeout(function () {
                button.textContent = originalText;
                button.disabled = false;
                form.reset();
                showToast("Your message has been recorded successfully.");
            }, 1800);
        });
    }

    function setupRevealAnimations() {
        const animatedNodes = $all(".class-card, .subject-card, .pdf-card, .info-panel, .feature-box-large, .value-card, .trust-card, .mission-card, .support-step, .timeline-item");

        if (!animatedNodes.length) {
            return;
        }

        animatedNodes.forEach(function (node, index) {
            node.style.animationDelay = (index * 60) + "ms";
            node.classList.add("soft-reveal");
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.12 });

        animatedNodes.forEach(function (node) {
            observer.observe(node);
        });
    }

    function setupFeatureCards() {
        const cards = $all(".feature-showcase .feature-box-large, .stat-item, .process-card, .faq-item-home");
        cards.forEach(function (card, index) {
            card.style.animationDelay = (index * 80) + "ms";
            card.classList.add("soft-reveal");
        });
    }

    function setupPageBadges() {
        const topRight = $(".top-right");
        if (!topRight) {
            return;
        }

        const year = new Date().getFullYear();
        topRight.setAttribute("title", "Updated for " + year);
    }

    function setupGlobalHelpers() {
        const librarySession = {
            clear: function () {
                sessionStorage.removeItem("selectedClass");
                sessionStorage.removeItem("selectedSubject");
                sessionStorage.removeItem("subjectUnlocked");
            },
            goToClasses: function () {
                window.location.replace("classes.html");
            },
            goToLibrary: function () {
                window.location.replace("library.html");
            }
        };

        window.guluLibrarySession = librarySession;
    }

    function init() {
        setupScrollProgress();
        setupMenu();
        highlightActiveNav();
        bindEnterLibraryButtons();
        setupContactForm();
        setupRevealAnimations();
        setupFeatureCards();
        setupPageBadges();
        setupGlobalHelpers();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

window.addEventListener("error", function (event) {
    console.error("Gulu Library Error:", event.error || event.message);
});