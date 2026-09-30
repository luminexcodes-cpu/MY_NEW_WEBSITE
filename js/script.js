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

    function setupLiveUserCounter() {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const storageKey = "guluLiveUsers";
        const clientIdKey = "guluLiveClientId";
        const activeLimit = 20000;

        let clientId = sessionStorage.getItem(clientIdKey);
        if (!clientId) {
            clientId = "gulu-" + Date.now() + "-" + Math.random().toString(16).slice(2, 10);
            sessionStorage.setItem(clientIdKey, clientId);
        }

        function getUsers() {
            try {
                return JSON.parse(localStorage.getItem(storageKey) || "{}");
            } catch (error) {
                return {};
            }
        }

        function saveUsers(users) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(users));
            } catch (error) {
                console.warn("Could not save active user count.", error);
            }
        }

        function cleanupStaleUsers() {
            const users = getUsers();
            const now = Date.now();
            const freshUsers = {};

            Object.keys(users).forEach(function (id) {
                const user = users[id];
                if (!user) {
                    return;
                }

                if (now - user.updatedAt <= activeLimit) {
                    freshUsers[id] = user;
                }
            });

            saveUsers(freshUsers);
            renderCount();
        }

        function getPageUsers(users) {
            const now = Date.now();
            const pageUsers = {};

            Object.keys(users).forEach(function (id) {
                const user = users[id];
                if (!user || user.page !== currentPage) {
                    return;
                }

                if (now - user.updatedAt <= activeLimit) {
                    pageUsers[id] = user;
                }
            });

            return pageUsers;
        }

        function renderCount() {
            const users = getUsers();
            const pageUsers = getPageUsers(users);
            const count = Object.keys(pageUsers).length;

            let badge = document.getElementById("gulu-live-user-counter");
            if (!badge) {
                badge = document.createElement("div");
                badge.id = "gulu-live-user-counter";
                badge.setAttribute("aria-live", "polite");
                badge.style.cssText = "position: fixed; top: 18px; right: 20px; z-index: 9999; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 999px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(148, 163, 184, 0.35); color: #ffffff; font-family: Arial, sans-serif; font-size: 13px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);";
                document.body.appendChild(badge);
            }

            badge.innerHTML = '<span style="width: 10px; height: 10px; border-radius: 50%; background: #2ecc71; box-shadow: 0 0 8px rgba(46, 204, 113, 0.9); display: inline-block;"></span><span>Online Users: <strong id="gulu-live-user-number" style="color: #ffffff; font-weight: 700;">' + count + '</strong></span>';
        }

        function syncState() {
            const users = getUsers();
            users[clientId] = {
                id: clientId,
                page: currentPage,
                updatedAt: Date.now()
            };
            saveUsers(users);
            renderCount();
        }

        function removeCurrentUser() {
            const users = getUsers();
            if (users[clientId]) {
                delete users[clientId];
                saveUsers(users);
            }
            renderCount();
        }

        if ("BroadcastChannel" in window) {
            const channel = new BroadcastChannel("gulu-live-user-sync");
            channel.onmessage = function () {
                renderCount();
            };
            window.addEventListener("beforeunload", function () {
                channel.close();
            });
        }

        window.addEventListener("storage", function (event) {
            if (event.key === storageKey) {
                renderCount();
            }
        });

        window.addEventListener("beforeunload", removeCurrentUser);
        window.addEventListener("pagehide", removeCurrentUser);

        syncState();
        cleanupStaleUsers();

        window.setInterval(function () {
            syncState();
        }, 5000);

        window.setInterval(function () {
            cleanupStaleUsers();
        }, 12000);
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
        setupLiveUserCounter();
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