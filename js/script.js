// ========================================
// GULU SECURE PDF LIBRARY - LOGIN SYSTEM
// ========================================

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// Correct login details
const CORRECT_USERNAME = "GULU";
const CORRECT_PASSWORD = "5152";


// ========================================
// LOGIN
// ========================================

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;


        // Clear previous message
        if (message) {
            message.textContent = "";
        }


        // Check login details
        if (
            username === CORRECT_USERNAME &&
            password === CORRECT_PASSWORD
        ) {

            // Create temporary session
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("loginTime", Date.now().toString());

            // Open library
            window.location.replace("library.html");

        } else {

            // Wrong login
            if (message) {
                message.textContent =
                    "Invalid username or password.";
            }

            // Clear password
            document.getElementById("password").value = "";
        }

    });

}


// ========================================
// PROTECT LIBRARY / OTHER PAGES
// ========================================

function protectPage() {

    const loggedIn =
        sessionStorage.getItem("loggedIn");

    if (loggedIn !== "true") {

        window.location.replace("index.html");
    }
}


// ========================================
// LOGOUT
// ========================================

function logoutUser() {

    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("loginTime");

    window.location.replace("index.html");
}