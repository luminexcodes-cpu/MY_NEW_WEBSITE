// ========================================
// GULU SECURE PDF LIBRARY
// LOGIN / SESSION SYSTEM
// ========================================

const loginForm =
    document.getElementById("loginForm");

const message =
    document.getElementById("message");


// ========================================
// LOGIN DETAILS
// ========================================

const CORRECT_USERNAME = "GULU";
const CORRECT_PASSWORD = "5152";


// ========================================
// LOGIN FORM
// ========================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            if (message) {
                message.textContent = "";
            }


            if (
                username === CORRECT_USERNAME &&
                password === CORRECT_PASSWORD
            ) {

                // Login session
                sessionStorage.setItem(
                    "loggedIn",
                    "true"
                );


                sessionStorage.setItem(
                    "loginTime",
                    Date.now().toString()
                );


                // Clear old selections
                sessionStorage.removeItem(
                    "selectedClass"
                );

                sessionStorage.removeItem(
                    "selectedSubject"
                );

                sessionStorage.removeItem(
                    "subjectUnlocked"
                );


                // Go to class selection
                window.location.replace(
                    "classes.html"
                );

            }

            else {

                if (message) {

                    message.textContent =
                        "Invalid username or password.";

                }


                document.getElementById(
                    "password"
                ).value = "";


                document.getElementById(
                    "username"
                ).focus();

            }

        }
    );

}


// ========================================
// PROTECT PAGE
// ========================================

function protectPage() {

    const loggedIn =
        sessionStorage.getItem(
            "loggedIn"
        );


    if (loggedIn !== "true") {

        window.location.replace(
            "index.html"
        );

    }

}


// ========================================
// LOGOUT
// ========================================

function logoutUser() {

    sessionStorage.removeItem(
        "loggedIn"
    );


    sessionStorage.removeItem(
        "loginTime"
    );


    sessionStorage.removeItem(
        "selectedClass"
    );


    sessionStorage.removeItem(
        "selectedSubject"
    );


    sessionStorage.removeItem(
        "subjectUnlocked"
    );


    window.location.replace(
        "index.html"
    );

}