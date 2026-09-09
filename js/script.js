// ===============================
// SECURE PDF LIBRARY LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

const CORRECT_USERNAME = "Gulu";
const CORRECT_PASSWORD = "5152";


// --------------------------------
// CHECK IF USER IS ALREADY LOGGED IN
// --------------------------------

if (sessionStorage.getItem("loggedIn") === "true") {
    // User already has an active session
    // Keep login page from being shown again
}


// --------------------------------
// LOGIN SYSTEM
// --------------------------------

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;


        // Clear old message
        if (message) {
            message.textContent = "";
        }


        // Check username + password
        if (
            username === CORRECT_USERNAME &&
            password === CORRECT_PASSWORD
        ) {

            // Create temporary login session
            sessionStorage.setItem("loggedIn", "true");

            // Optional: remember when session started
            sessionStorage.setItem(
                "loginTime",
                Date.now().toString()
            );

            // Open PDF library
            window.location.replace("library.html");

        } else {

            if (message) {
                message.textContent =
                    "Invalid username or password.";
            }

            // Clear password field
            document.getElementById("password").value = "";

            // Put cursor back into username field
            document.getElementById("username").focus();
        }
    });
}


// --------------------------------
// PREVENT DIRECT LIBRARY ACCESS
// --------------------------------

function protectPage() {

    const loggedIn =
        sessionStorage.getItem("loggedIn");

    if (loggedIn !== "true") {

        window.location.replace("index.html");
    }
}


// --------------------------------
// LOGOUT
// --------------------------------

function logoutUser() {

    // Remove session information
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("loginTime");

    // Return to login page
    window.location.replace("index.html");
}