// models/RescueAnimal.js
const mongoose = require('mongoose');

// Schema for RescueAnimal model.
// This schema defines the structure for storing information about rescued animals in the database.
const RescueAnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    acquisitionDate: { type: Date, required: true },
    acquisitionCountry: { type: String, required: true },
    trainingStatus: { type: String, required: true },
    phase: {type: String }, // In-Training status specific field
    reserved: { type: Boolean, required: true },
    inServiceCountry: { type: String, required: true },
    // Fields specific to monkey species
    tailLength: { type: Number },
    height: { type: Number },
    bodyLength: { type: Number },
    species: { type: String },
});

module.exports = mongoose.model('RescueAnimal', RescueAnimalSchema);
