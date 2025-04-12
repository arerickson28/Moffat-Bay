function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(`${elementId}Error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function validateForm() {
    let valid = true;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value.trim();

    // Validate First Name
    if (firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        valid = false;
    }

    // Validate Last Name
    if (lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        valid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        valid = false;
    }

    // Validate Password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('password', 'Password must be at least 8 characters with at least one letter and one number');
        valid = false;
    }

    // Validate Phone Number
    const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showError('phoneNumber', 'Please enter a valid phone number');
        valid = false;
    }

    return valid;
}

let createAccountBtn = document.getElementById("submitButton")
createAccountBtn.addEventListener('click', async (event) => handleSubmit())

async function handleSubmit(event) {
    clearErrors();

    if (!validateForm()) return;

    const userData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
    };

    try {
        const response = await fetch(`/api/users/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("account created! You may now log in")
            window.location.href = '/login';
        } else {
            document.getElementById('apiError').textContent = data.message || 'Registration failed. Please try again.';
            document.getElementById('apiError').style.display = 'block';
        }
    } catch (error) {
        document.getElementById('apiError').textContent = 'Network error. Please check your connection.';
        document.getElementById('apiError').style.display = 'block';
    }
}
