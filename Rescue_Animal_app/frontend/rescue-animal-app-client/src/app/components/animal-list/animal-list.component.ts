import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../../services/auth.service';

/**
 * Component to manage and display a list of animals.
 * This includes sorting and filtering functionality for better user experience.
 */
@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  isLoggedIn: boolean = false;
  @Input() animals: Animal[] = [];
  dogList: Animal[] = [];
  monkeyList: Animal[] = [];
  originalDogList: Animal[] = []; // To store the original order of dogs
  originalMonkeyList: Animal[] = []; // To store the original order of monkeys
  showAnimalList: boolean = true;
  showDogsOnly: boolean = false;
  showMonkeysOnly: boolean = false;
  showAllAnimalsAbleToBeReserved: boolean = false;
  activeButton: string = '';

  // Properties for managing sorting for dogs and monkeys separately
  dogSortKey: keyof Animal | '' = '';
  dogSortDirection: 'asc' | 'desc' | '' = '';
  monkeySortKey: keyof Animal | '' = '';
  monkeySortDirection: 'asc' | 'desc' | '' = '';

  constructor(private router: Router, private animalService: AnimalService, private authService: AuthService) { }

  /**
  * Initializes the component, sets up authentication and fetches animal data.
  */
  ngOnInit(): void {
    // Subscribes to login state changes to determine user access
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      //console.log('isLoggedIn in AnimalListComponent:', this.isLoggedIn); // Uncomment for debugging
    });

    // Fetches the list of animals and initializes filters for dogs and monkeys
    this.animalService.getAnimals().subscribe((data: Animal[]) => {
      this.animals = data;
      this.dogList = this.animals.filter(animal => animal.type.toLowerCase() === 'dog');
      this.monkeyList = this.animals.filter(animal => animal.type.toLowerCase() === 'monkey');
      //console.log('isLoggedIn in AnimalListComponent:', this.isLoggedIn); // Uncomment for debugging


      // Store the original lists for sorting reset
      this.originalDogList = [...this.dogList];
      this.originalMonkeyList = [...this.monkeyList];
    });
  }

  /**
   * Configures sorting for the dog list. Toggles between ascending, descending, and original order.
   */
  setDogSort(key: keyof Animal): void {
    if (this.dogSortKey === key) {
      if (this.dogSortDirection === 'asc') {
        this.dogSortDirection = 'desc';
      } else if (this.dogSortDirection === 'desc') {
        this.dogSortDirection = '';
        this.dogList = [...this.originalDogList]; // Reset to original order
        return;
      } else {
        this.dogSortDirection = 'asc';
      }
    } else {
      this.dogSortKey = key;
      this.dogSortDirection = 'asc';
    }
    this.applyDogSort();
  }

  /**
   * Applies the sorting logic for the dog list based on the selected key and direction.
   */
  applyDogSort(): void {
    if (this.dogSortKey && this.dogSortDirection) {
      this.dogList.sort((a, b) => {
        const aValue = a[this.dogSortKey as keyof Animal];
        const bValue = b[this.dogSortKey as keyof Animal];
        if (aValue == null) return this.dogSortDirection === 'asc' ? 1 : -1;
        if (bValue == null) return this.dogSortDirection === 'asc' ? -1 : 1;
        if (aValue < bValue) return this.dogSortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.dogSortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

  isDogActiveSort(key: keyof Animal): boolean {
    return this.dogSortKey === key;
  }

  getDogSortArrow(key: keyof Animal): string {
    if (this.dogSortKey === key) {
      return this.dogSortDirection === 'asc' ? '↑' : this.dogSortDirection === 'desc' ? '↓' : '';
    }
    return '';
  }

  /**
   * Configures sorting for the monkey list. Toggles between ascending, descending, and original order.
   */
  setMonkeySort(key: keyof Animal): void {
    if (this.monkeySortKey === key) {
      if (this.monkeySortDirection === 'asc') {
        this.monkeySortDirection = 'desc';
      } else if (this.monkeySortDirection === 'desc') {
        this.monkeySortDirection = '';
        this.monkeyList = [...this.originalMonkeyList]; // Reset to original order
        return;
      } else {
        this.monkeySortDirection = 'asc';
      }
    } else {
      this.monkeySortKey = key;
      this.monkeySortDirection = 'asc';
    }
    this.applyMonkeySort();
  }

  /**
   * Applies the sorting logic for the monkey list based on the selected key and direction.
   */
  applyMonkeySort(): void {
    if (this.monkeySortKey && this.monkeySortDirection) {
      this.monkeyList.sort((a, b) => {
        const aValue = a[this.monkeySortKey as keyof Animal];
        const bValue = b[this.monkeySortKey as keyof Animal];
        if (aValue == null) return this.monkeySortDirection === 'asc' ? 1 : -1;
        if (bValue == null) return this.monkeySortDirection === 'asc' ? -1 : 1;
        if (aValue < bValue) return this.monkeySortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.monkeySortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

  isMonkeyActiveSort(key: keyof Animal): boolean {
    return this.monkeySortKey === key;
  }

  getMonkeySortArrow(key: keyof Animal): string {
    if (this.monkeySortKey === key) {
      return this.monkeySortDirection === 'asc' ? '↑' : this.monkeySortDirection === 'desc' ? '↓' : '';
    }
    return '';
  }

  /**
   * Navigates to the homepage of the application.
   */
  goToHomepage(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Filters dogs that are eligible for reservation based on training status.
   */
  filterDogAbleToBeReserved(): void {
    this.activeButton = 'dogs';
    //console.log('Active Button: ', this.activeButton); // Uncomment for debugging
    this.showDogsOnly = true;
    this.showMonkeysOnly = false;
    this.showAllAnimalsAbleToBeReserved = false;
    this.dogList = this.originalDogList.filter(
      (dog) => !dog.reserved && dog.trainingStatus === "Training Completed"
    );
  }

  /**
   * Filters monkeys that are eligible for reservation based on training status.
   */
  filterMonkeyAbleToBeReserved(): void {
    this.activeButton = 'monkeys';
    //console.log('Active Button: ', this.activeButton); // Uncomment for debugging
    this.showDogsOnly = false;
    this.showMonkeysOnly = true;
    this.showAllAnimalsAbleToBeReserved = false;
    this.monkeyList = this.originalMonkeyList.filter(
      (monkey) => !monkey.reserved && monkey.trainingStatus === "Training Completed"
    );
  }

  /**
   * Filters all animals that are eligible for reservation based on training status.
   */
  filterAllAnimalsAbleToBeReserved(): void {
    this.activeButton = 'all';
    //console.log('Active Button: ', this.activeButton); // Uncomment for debugging
    this.showDogsOnly = false;
    this.showMonkeysOnly = false;
    this.showAllAnimalsAbleToBeReserved = true;
    this.dogList = this.originalDogList.filter(
      (dog) => !dog.reserved && dog.trainingStatus === 'Training Completed'
    );
    this.monkeyList = this.originalMonkeyList.filter(
      (monkey) => !monkey.reserved && monkey.trainingStatus === 'Training Completed'
    );
  }

  /**
   * Resets filters to original state.
   */
  resetFilters(): void {
    this.activeButton = '';
    //console.log('Active Button: ', this.activeButton); // Uncomment for debugging
    this.showDogsOnly = false;
    this.showMonkeysOnly = false;
    this.showAllAnimalsAbleToBeReserved = false;
    this.dogList = [...this.originalDogList];
    this.monkeyList = [...this.originalMonkeyList];
  }
}

