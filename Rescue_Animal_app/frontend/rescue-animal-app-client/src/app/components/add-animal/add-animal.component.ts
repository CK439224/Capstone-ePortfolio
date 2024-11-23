import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Component metadata defining selector, template, styles, and imports */
@Component({
    selector: 'app-add-animal', 
    standalone: true, 
    imports: [FormsModule, CommonModule], 
    templateUrl: './add-animal.component.html', 
    styleUrls: ['./add-animal.component.scss'] 
})
export class AddAnimalComponent {
    /* Property to bind the animal form data with default initialization */
    animal: Animal = {
        name: '',
        type: '',
        gender: '',
        age: 0,
        weight: 0,
        acquisitionDate: '',
        acquisitionCountry: '',
        trainingStatus: '',
        reserved: false,
        inServiceCountry: '',
        tailLength: 0,
        height: 0,
        bodyLength: 0,
        species: ''
    };

    isMonkey: boolean = false; // State to track if "Monkey" is selected

    /* Injecting dependencies: AnimalService for CRUD operations, Router for navigation */
    constructor(private animalService: AnimalService, private router: Router) {}

    // Check if the selected animal type is "Monkey"
    onAnimalTypeChange(event: any): void {
        const selectedType = event.target.value;
        this.isMonkey = selectedType === 'Monkey';
        
        if (this.isMonkey) {
            // Initialize monkey-specific fields to default values
            this.animal.tailLength = 0;
            this.animal.height = 0;
            this.animal.bodyLength = 0;
            this.animal.species = '';
        } else {
            // Clear monkey-specific fields when type changes to something else
            delete this.animal.tailLength;
            delete this.animal.height;
            delete this.animal.bodyLength;
            delete this.animal.species;
        }
    }
    
    
    
    

    /* Method to handle adding a new animal */
    addAnimal(): void {
        console.log('Animal data before submission:', this.animal); // Add this for debugging
    
        this.animalService.addAnimal(this.animal).subscribe({
            next: (response) => {
                console.log('Animal added successfully', response);
                this.router.navigate(['/current-animals']);
            },
            error: (error) => {
                console.error('Error adding animal:', error);
            },
        });
    }
    
    

    /* Method to handle cancel action */
    cancel(): void {
        this.router.navigate(['/']); // Redirects to the home or list page
    }
}
