// routes/animals.js
const express = require('express');
const router = express.Router();
const RescueAnimal = require('../models/RescueAnimal');

/**
 * Fetch and return all animals from the database.
 * Useful for displaying the entire inventory of rescue animals.
 */
router.get('/', async (req, res) => {
    const animals = await RescueAnimal.find();
    res.json(animals);
});

/**
 * Fetch and return details of a specific animal by ID.
 * This endpoint allows users to view detailed information about a particular rescue animal.
 */
router.get('/:id', async (req, res) => {
    try {
        const animal = await RescueAnimal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching animal' });
    }
});


/**
 * Add a new rescue animal to the database.
 * Expects animal data to be sent in the request body.
 * Validates and stores the data in the RescueAnimal model.
 */
router.post('/', async (req, res) => {
    try {
        const animalData = req.body;

        // Uncomment the following line to debug the incoming animal data.
        // console.log('Incoming animal data:', animalData);

        const animal = new RescueAnimal(animalData);
        await animal.save();
        res.status(201).json(animal);
    } catch (error) {
        console.error('Error adding new animal:', error);
        res.status(500).json({ message: 'Error adding new animal' });
    }
});

/**
 * Update an existing rescue animal in the database by ID.
 * Updates only the fields provided in the request body.
 * Ensures validation and returns the updated document.
 */
router.put('/:id', async (req, res) => {
    try {
        const updateData = {};

        // Construct the update data object from provided fields in the request body.
        for (const [key, value] of Object.entries(req.body)) {
            if (value !== undefined) {
                updateData[key] = value;
            }
        }

        const animal = await RescueAnimal.findByIdAndUpdate(
            req.params.id,
            { $set: updateData }, // Only updates fields provided by the client.
            { new: true, runValidators: true } // Ensures returned data is up-to-date and valid.
        );

        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        
        res.json(animal);
    } catch (error) {
        console.error("Error updating animal:", error);
        res.status(500).json({ message: 'Error updating animal' });
    }
});

/**
 * Delete a rescue animal from the database by ID.
 * Once deleted, the animal is no longer retrievable.
 */
router.delete('/:id', async (req, res) => {
    await RescueAnimal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Animal deleted' });
});

module.exports = router;
