const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "gulu" && password === "5152") {
        window.location.href = "library.html";
    } else {
        message.textContent = "Invalid username or password.";
    }
});