const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

const adminCredentials = { username: 'admin', password: 'password123' };

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'your-secret-key', // Replace with a secure key in production
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

// Serve static files
app.use(express.static('public'));

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login Attempt:', { username, password });

    if (username === adminCredentials.username && password === adminCredentials.password) {
        req.session.isAuthenticated = true;
        console.log('Login successful');
        res.json({ message: 'Login successful' });
    } else {
        console.log('Invalid credentials');
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.redirect('/login.html');
    });
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login.html');
};

// Protect dashboard route
app.use('/protected', isAuthenticated, express.static(path.join(__dirname, 'protected')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
