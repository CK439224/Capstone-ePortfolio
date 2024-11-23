import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-edit-animal',
    imports: [FormsModule, CommonModule],
    templateUrl: './edit-animal.component.html',
    styleUrls: ['./edit-animal.component.scss']
})
export class EditAnimalComponent implements OnInit {
  animal: Animal = {} as Animal; // Holds the animal's data
  isMonkey: boolean = false; // Tracks if "Monkey" is selected

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.animalService.getAnimalById(id).subscribe((data) => {
      this.animal = { ...data };

      // Format acquisitionDate to match the input type="date" format
      if (this.animal.acquisitionDate) {
        const dateObj = new Date(this.animal.acquisitionDate);
        this.animal.acquisitionDate = dateObj.toISOString().split('T')[0];
      }

      // Set `isMonkey` state based on the retrieved type
      this.isMonkey = this.animal.type === 'Monkey';
    });
  }

  // Check if the selected animal type is "Monkey"
  onAnimalTypeChange(event: any): void {
    const selectedType = event.target.value;
    this.isMonkey = selectedType === 'Monkey';

    if (this.isMonkey) {
      // Initialize monkey-specific fields to default values
      this.animal.tailLength = this.animal.tailLength || 0;
      this.animal.height = this.animal.height || 0;
      this.animal.bodyLength = this.animal.bodyLength || 0;
      this.animal.species = this.animal.species || '';
    } else {
      // Clear monkey-specific fields when type changes to something else
      delete this.animal.tailLength;
      delete this.animal.height;
      delete this.animal.bodyLength;
      delete this.animal.species;
    }
  }

  // Save the updated animal data
  saveAnimal(): void {
    this.animalService.updateAnimal(this.animal._id as string, this.animal).subscribe({
      next: (updatedAnimal) => {
        console.log('Animal updated successfully', updatedAnimal);
        this.router.navigate(['/current-animals']);
      },
      error: (error) => {
        console.error('Error updating animal:', error);
      },
    });
  }

  // Cancel the edit operation
  cancel(): void {
    this.router.navigate(['/current-animals']);
  }
}
