// login.js

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the form from submitting normally

    // Sample username and password (you can change this to a real check)
    const correctUsername = 'admin';
    const correctPassword = 'password123';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        // Redirect to the admin dashboard if login is successful
        window.location.href = 'dashboard.html';
    } else {
        // Show an error message if login fails
        document.getElementById('errorMessage').style.display = 'block';
    }
});

// dashboard.js

// Add User Modal
const addUserBtn = document.getElementById('addUserBtn');
const addUserModal = document.getElementById('addUserModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Show and hide the Add User modal
addUserBtn.onclick = function() {
    addUserModal.style.display = 'block';
}
closeModalBtn.onclick = function() {
    addUserModal.style.display = 'none';
}

// Simulate adding a new user
document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;

    // Add new user to the list (in reality, this would be done via a backend)
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newUsername}</td>
        <td>${newEmail}</td>
        <td><button class="remove-btn">Remove</button></td>
    `;
    document.getElementById('userList').appendChild(newRow);

    // Close the modal
    addUserModal.style.display = 'none';
});

// Remove User
document.getElementById('userList').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        event.target.closest('tr').remove();
    }
});

// Profile Form submission (simulated)
document.getElementById()
