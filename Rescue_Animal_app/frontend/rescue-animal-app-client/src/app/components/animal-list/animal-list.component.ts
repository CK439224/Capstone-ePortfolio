import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../../services/auth.service';

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

  // Separate sorting properties for dogs and monkeys
  dogSortKey: keyof Animal | '' = '';
  dogSortDirection: 'asc' | 'desc' | '' = ''; // Add '' for no sorting
  monkeySortKey: keyof Animal | '' = '';
  monkeySortDirection: 'asc' | 'desc' | '' = ''; // Add '' for no sorting

  constructor(private router: Router, private animalService: AnimalService, private authService: AuthService) {}



  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log('isLoggedIn in AnimalListComponent:', this.isLoggedIn);
  });

    this.animalService.getAnimals().subscribe((data: Animal[]) => {
      this.animals = data;
      this.dogList = this.animals.filter(animal => animal.type.toLowerCase() === 'dog');
      this.monkeyList = this.animals.filter(animal => animal.type.toLowerCase() === 'monkey');
      console.log('isLoggedIn in AnimalListComponent:', this.isLoggedIn);


      // Store original order
      this.originalDogList = [...this.dogList];
      this.originalMonkeyList = [...this.monkeyList];
    });
  }

  // Dog sorting
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

  // Monkey sorting
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

  goToHomepage(): void {
    this.router.navigate(['/home']);
  }
}
