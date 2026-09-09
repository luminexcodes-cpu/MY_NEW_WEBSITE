// ========================================
// GULU SECURE PDF LIBRARY
// LOGIN SYSTEM
// ========================================

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// ----------------------------------------
// LOGIN DETAILS
// ----------------------------------------

const CORRECT_USERNAME = "GULU";
const CORRECT_PASSWORD = "5152";


// ========================================
// LOGIN FORM
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


        // --------------------------------
        // CORRECT LOGIN
        // --------------------------------

        if (
            username === CORRECT_USERNAME &&
            password === CORRECT_PASSWORD
        ) {

            // Create temporary browser session
            sessionStorage.setItem("loggedIn", "true");

            // Store login time
            sessionStorage.setItem(
                "loginTime",
                Date.now().toString()
            );

            // Open library
            window.location.replace("library.html");

        }

        // --------------------------------
        // WRONG LOGIN
        // --------------------------------

        else {

            if (message) {
                message.textContent =
                    "Invalid username or password.";
            }

            // Clear password field
            document.getElementById("password").value = "";

            // Focus username
            document.getElementById("username").focus();
        }

    });

}


// ========================================
// PROTECT PRIVATE PAGES
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