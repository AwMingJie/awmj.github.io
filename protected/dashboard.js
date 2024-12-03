document.addEventListener("DOMContentLoaded", function () {
    const userList = document.getElementById("userList");
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const addUserForm = document.getElementById('addUserForm');

    // Fetch users from the server
    function fetchUsers() {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                const users = data.users;
                userList.innerHTML = `
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                `;
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td><button class="remove-btn" data-username="${user.username}">Remove</button></td>
                    `;
                    userList.appendChild(row);
                });
            });
    }

    // Show and hide the Add User modal
    addUserBtn.onclick = function () {
        addUserModal.style.display = 'block';
    }

    closeModalBtn.onclick = function () {
        addUserModal.style.display = 'none';
    }

    // Add a new user
    addUserForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const newUsername = document.getElementById('newUsername').value;
        const newEmail = document.getElementById('newEmail').value;

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername, email: newEmail })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchUsers(); // Refresh the user list
                addUserModal.style.display = 'none';
            });
    });

    // Remove a user
    userList.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-btn')) {
            const username = event.target.getAttribute('data-username');
            fetch(`/api/users/${username}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    fetchUsers(); // Refresh the user list
                });
        }
    });
    document.getElementById('logoutBtn').addEventListener('click', function() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login.html';  // Redirect to login page
            } else {
                alert('Logout failed');
            }
        });
    });
    

    // Initial fetch of users
    fetchUsers();
});
