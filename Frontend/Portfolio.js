const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuToggle.addEventListener('click', function () {
    navigation.classList.toggle('open'); 
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        clearErrors();

        let isValid = true;

        if (name.value.trim() === "") {
            showError(name, "Please enter your name.");
            isValid = false;
        }

        if (email.value.trim() === "") {
            showError(email, "Please enter your email address.");
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        if (message.value.trim() === "") {
            showError(message, "Please enter your message.");
            isValid = false;
        } else if (message.value.trim().length < 20) {
            showError(message, "Message must be at least 20 characters long.");
            isValid = false;
        }


        if (isValid) {
            // Form can be submitted here (e.g., AJAX or form.submit())
            console.log("Form is valid. You can submit data to the server.");
        }
    });

    // Function to show error message
    function showError(inputElement, message) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.innerText = message;
        inputElement.insertAdjacentElement("afterend", errorMessage);
    }

    // Function to clear previous error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(function(error) {
            error.remove();
        });
    }

    // Email validation regex
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const popup = document.getElementById("successPopup");
    const closePopup = document.getElementById("closePopup");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Form validation (basic)
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name && email && message.length >= 20) {
            popup.style.display = "flex";
            form.reset();
        } else {
            alert("Please fill out all fields correctly.");
        }
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});




