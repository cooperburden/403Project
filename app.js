// app.js
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Enable PUT and DELETE via forms
app.set('view engine', 'ejs');

// Routes
app.use('/users', userRoutes);

// Redirect root to /users
app.get('/', (req, res) => {
    res.redirect('/users');
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
