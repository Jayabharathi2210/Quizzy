document.addEventListener('DOMContentLoaded', function () { 

    const form = document.querySelector('form');
    const username = form.querySelector('input[name="username"]');
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="password"]');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
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
            showAlert(messages.join('\n'));
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.value,
                    email: email.value,
                    password: password.value
                })
            });

            const data = await response.json();
        
            if(!response.ok){
                showAlert(data.error);
            }
            else{
                showAlert(data.message);
                form.reset();
            }
            console.log(username.value, email.value, password.value);
        }
        catch (err){
            showAlert("Server error. Please try again.");
        }

    });

    function showAlert(message) {
        const alertBox = document.getElementById('custom-alert');
        const messageBox = document.getElementById('alert-message');
        messageBox.textContent = message;
        alertBox.style.display = 'flex';
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    window.closeAlert = function () {
        document.getElementById('custom-alert').style.display = 'none';
    }
});

    

