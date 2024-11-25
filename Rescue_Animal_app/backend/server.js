const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path'); // Import path module
const favicon = require('serve-favicon'); // Import serve-favicon
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const animalRoutes = require('./routes/animals'); // Import animal routes

const app = express();

// Set Content-Security-Policy
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "http://localhost:3000"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:3000"],
        },
    },
}));

// Enable CORS
app.use(cors());

// Parse incoming requests
app.use(bodyParser.json());

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/rescue_animals')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log('Database connection error:', error));

// API Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api/animals', animalRoutes); // Animal-related routes

// Default route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Rescue Animal App</h1>');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
