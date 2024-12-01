// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for User with essential fields and their constraints
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to hash passwords before saving them to the database
// Why: Ensures that user passwords are securely stored and protected from potential breaches
UserSchema.pre('save', async function (next) {
    // Skip hashing if the password hasn't been modified
    if (!this.isModified('password')) return next();

    try {
        // Generate a salt and hash the password with it
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        // Pass errors to the next middleware
        next(err);
    }
});

// Export the User model based on the defined schema
module.exports = mongoose.model('User', UserSchema);
