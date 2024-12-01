const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// Endpoint to handle user registration
router.post('/register', async (req, res) => {
    //console.log('Request Body:', req.body); // Uncomment for debugging
    const { username, email, password } = req.body;
    try {
        // Validate that all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        // Save the new user to the database
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Log and handle any errors during the registration process
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});




// Endpoint to handle user login and token generation
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    // Validate the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });
    // Generate a JWT token for authenticated access
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    // Respond with the generated token and user details
    res.status(200).json({
        token,
        username: user.username, 
        message: 'Login successful'
    });
});




module.exports = router;
