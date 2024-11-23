import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalService } from '../../services/animal.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

/**
 * Interface representing an Animal entity with its properties.
 */
interface Animal {
    _id?: string; // Optional unique identifier for the animal
    name: string; // Name of the animal
    type: string; // Type of the animal (e.g., Dog, Monkey)
    gender?: string; // Optional gender of the animal
    age: number; // Age of the animal
    weight?: number; // Optional weight of the animal
    acquisitionDate?: string | null; // Date when the animal was acquired
    acquisitionCountry?: string; // Country where the animal was acquired
    trainingStatus: string; // Current training status of the animal
    reserved?: boolean; // Whether the animal is reserved
    inServiceCountry?: string; // Country where the animal is in service
    tailLength?: number; // New field
    height?: number; // New field
    bodyLength?: number; // New field
    species?: string; // New field
}

/**
 * HomeComponent
 * Serves as the home page of the Rescue Animal Organization.
 * Displays the welcome message and allows navigation to animal-related actions.
 */
@Component({
    selector: 'app-home', // Component selector
    standalone: true, // Indicates this is a standalone component
    imports: [CommonModule, RouterModule], // Required Angular modules
    templateUrl: './home.component.html', // Path to the HTML template
    styleUrls: ['./home.component.scss'] // Path to the component's styles
})
export class HomeComponent implements OnInit {
    title = 'Welcome to the Rescue Animal Organization'; // Page title
    animals: Animal[] = []; // Array to store animal data
    showAnimalList = false; // Toggles the visibility of the animal list

    /**
     * Constructor
     * Injects the AnimalService for data management and Router for navigation.
     * 
     * @param animalService - Service to interact with animal data
     * @param router - Angular Router for navigation
     */
    constructor(private animalService: AnimalService, private router: Router) {}

    /**
     * Lifecycle hook that runs after component initialization.
     * Fetches the list of animals from the service.
     */
    ngOnInit(): void {
        this.animalService.getAnimals().subscribe(
            (data) => {
                this.animals = data; // Stores the fetched animal data
            },
            (error) => {
                console.error("Error fetching data", error); // Logs errors in fetching data
            }
        );
    }

    /**
     * Toggles the visibility of the current animal list.
     */
    viewCurrentAnimals(): void {
        this.showAnimalList = true;
    }

    /**
     * Logs an action to add a new animal.
     * Placeholder for navigation or functionality to add a new animal.
     */
    addNewAnimal(): void {
        console.log("Add New Animal button clicked");
    }

    /**
     * Navigates to the edit page for a specific animal.
     * 
     * @param id - The unique ID of the animal to be edited
     */
    editAnimal(id: string): void {
        console.log(`Navigating to edit page for ID: ${id}`);
        this.router.navigate(['/edit-animal', id]); // Navigates to the edit-animal page with the provided ID
    }

    onLoginClick(): void {
        console.log('Login button clicked');
    }
    
    onRegisterClick(): void {
        console.log('Register button clicked');
    }
}
