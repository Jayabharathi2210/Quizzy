// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const username = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');

    form.addEventListener('submit', function (e) {
        let valid = true;
        let messages = [];

        if (username.value.trim() === '') {
            messages.push("Username is required.");
            valid = false;
        }

        if (!validateEmail(email.value)) {
            messages.push("Enter a valid email.");
            valid = false;
        }

        if (password.value.length < 6) {
            messages.push("Password must be at least 6 characters.");
            valid = false;
        }

        if (!valid) {
            e.preventDefault();
            showAlert(messages.join('\n'));
        }
    });

    function showAlert(message) {
        const alertBox = document.getElementById('custom-alert');
        const messageBox = document.getElementById('alert-message');
        messageBox.textContent = message;
        alertBox.style.display = 'flex';
    }

    function validateEmail(email) {
        // Simple email format check
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});

    function closeAlert() {
        document.getElementById('custom-alert').style.display = 'none';
    }

