import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Metadata describing the component, including its template and styles */
@Component({
    selector: 'app-add-animal',
    imports: [FormsModule, CommonModule],
    templateUrl: './add-animal.component.html',
    styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent {
    /* Object to hold form data for a new animal, with default values */
    animal: Animal = {
        name: '',
        type: '',
        gender: '',
        age: 0,
        weight: 0,
        acquisitionDate: '',
        acquisitionCountry: '',
        trainingStatus: '',
        phase: '',
        reserved: false,
        inServiceCountry: '',
        tailLength: 0,
        height: 0,
        bodyLength: 0,
        species: ''
    };

    // Tracks if the selected type is "Monkey"
    isMonkey: boolean = false;
    // Controls the visibility of the "Phase" dropdown menu
    showPhaseDropdown: boolean = false;

    /* Dependencies injected for CRUD operations and navigation */
    constructor(private animalService: AnimalService, private router: Router) { }

    /* Updates state when the animal type changes */
    onAnimalTypeChange(event: any): void {
        const selectedType = event.target.value;
        this.isMonkey = selectedType === 'Monkey';

        if (this.isMonkey) {
            // Reset monkey-specific fields
            this.animal.tailLength = 0;
            this.animal.height = 0;
            this.animal.bodyLength = 0;
            this.animal.species = '';
        } else {
            // Remove monkey-specific fields for non-monkey types
            delete this.animal.tailLength;
            delete this.animal.height;
            delete this.animal.bodyLength;
            delete this.animal.species;
        }
    }

    /* Updates visibility of the "Phase" dropdown based on training status */
    onTrainingStatusChange(event: any): void {
        const selectedStatus = event.target.value;
        this.showPhaseDropdown = selectedStatus === 'In Training'; // Show dropdown if "In Training"

        if (!this.showPhaseDropdown) {
            this.animal.phase = ''; // Clears the phase if not applicable
        }
    }


    /* Submits the animal data to the service and navigates back to the animal list */
    addAnimal(): void {
        //console.log('Animal data before submission:', this.animal); // Uncomment for debugging

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



    /* Cancels the operation and navigates to the home page */
    cancel(): void {
        this.router.navigate(['/']);
    }
}
