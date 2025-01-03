const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

// Toggle the menu visibility on click
menuToggle.addEventListener('click', function () {
    navigation.classList.toggle('open'); 
});

// Form submission and validation logic
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const popup = document.getElementById("successPopup");
    const closePopup = document.getElementById("closePopup");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        clearErrors();  // Clear previous error messages

        let isValid = true;

        // Validate form fields
        if (name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
            showError(document.getElementById("name"), "Please enter a valid name.");
            isValid = false;
        }

        if (email === "") {
            showError(document.getElementById("email"), "Please enter your email address.");
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(document.getElementById("email"), "Please enter a valid email address.");
            isValid = false;
        }

        if (message === "") {
            showError(document.getElementById("message"), "Please enter your message.");
            isValid = false;
        } else if (message.length < 20) {
            showError(document.getElementById("message"), "Message must be at least 20 characters long.");
            isValid = false;
        }

        if (isValid) {
            fetch('http://localhost:8080/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.text())  // Use text() if response is plain text
            .then(data => {
                if (data.includes("success")) {  // Simple check for success message in plain text response
                    popup.style.display = "flex";
                    form.reset();
                } else {
                    showError(form, "Error: " + data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showError(form, "Network error. Please try again later.");
            });
            
        }
    });

    // Close success popup when clicked
    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Close success popup when clicked outside the popup
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
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
