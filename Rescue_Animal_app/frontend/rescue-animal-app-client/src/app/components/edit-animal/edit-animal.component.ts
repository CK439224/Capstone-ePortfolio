import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Component for editing animal data.
 * Handles retrieving, updating, and saving animal information.
 */
@Component({
  selector: 'app-edit-animal',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.scss']
})
export class EditAnimalComponent implements OnInit {
  animal: Animal = {} as Animal; // Stores the animal's data fetched from the service
  isMonkey: boolean = false; // Indicates if the animal type is "Monkey"
  showPhaseDropdown: boolean = false; // Controls visibility of the "Phase" dropdown based on training status

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private router: Router
  ) { }

  /**
   * Initializes the component by fetching the animal data using the provided ID.
   * Also sets initial UI states based on the retrieved data.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.animalService.getAnimalById(id).subscribe((data) => {
      this.animal = { ...data };

      // Adjust date format to match the input[type="date"] format for compatibility.
      if (this.animal.acquisitionDate) {
        const dateObj = new Date(this.animal.acquisitionDate);
        this.animal.acquisitionDate = dateObj.toISOString().split('T')[0];
      }

      // Determine if the animal is a monkey and adjust related states.
      this.isMonkey = this.animal.type === 'Monkey';

      // Show the phase dropdown if the training status requires it.
      this.showPhaseDropdown = this.animal.trainingStatus === 'In Training';
    });
  }

  /**
   * Handles changes in the animal type dropdown.
   * Adjusts monkey-specific fields or clears them when type changes.
   * @param event - Event object containing the selected animal type.
   */
  onAnimalTypeChange(event: any): void {
    const selectedType = event.target.value;
    this.isMonkey = selectedType === 'Monkey';

    if (this.isMonkey) {
      // Set default values for monkey-specific attributes.
      this.animal.tailLength = this.animal.tailLength || 0;
      this.animal.height = this.animal.height || 0;
      this.animal.bodyLength = this.animal.bodyLength || 0;
      this.animal.species = this.animal.species || '';
    } else {
      // Clear monkey-specific attributes for non-monkey types.
      delete this.animal.tailLength;
      delete this.animal.height;
      delete this.animal.bodyLength;
      delete this.animal.species;
    }
  }

  /**
   * Handles changes in the training status dropdown.
   * Toggles visibility of the phase dropdown based on the selected status.
   * @param event - Event object containing the selected training status.
   */
  onTrainingStatusChange(event: any): void {
    const selectedStatus = event.target.value;
    this.showPhaseDropdown = selectedStatus === 'In Training';

    // Reset the phase value if the dropdown is hidden.
    if (!this.showPhaseDropdown) {
      this.animal.phase = this.animal.phase || '';
    }
    else {
      delete this.animal.phase;
    }
  }

  /**
   * Saves the updated animal data to the backend service.
   * On success, navigates back to the current animals list.
   */
  saveAnimal(): void {
    this.animalService.updateAnimal(this.animal._id as string, this.animal).subscribe({
      next: (updatedAnimal) => {
        //console.log('Animal updated successfully', updatedAnimal); // Uncomment for debugging
        this.router.navigate(['/current-animals']);
      },
      error: (error) => {
        console.error('Error updating animal:', error);
      },
    });
  }

  /**
   * Cancels the edit operation and navigates back to the current animals list.
   */
  cancel(): void {
    this.router.navigate(['/current-animals']);
  }
}
