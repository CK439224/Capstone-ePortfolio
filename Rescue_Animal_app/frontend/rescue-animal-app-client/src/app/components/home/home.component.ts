import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalService } from '../../services/animal.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AnimalListComponent } from '../animal-list/animal-list.component';

/**
 * Interface representing an Animal entity with its properties.
 */
interface Animal {
    _id?: string; 
    name: string; 
    type: string; 
    gender?: string; 
    age: number; 
    weight?: number; 
    acquisitionDate?: string | null; 
    acquisitionCountry?: string; 
    trainingStatus: string; 
    reserved?: boolean; 
    inServiceCountry?: string; 
    tailLength?: number; 
    height?: number; 
    bodyLength?: number; 
    species?: string; 
}

/**
 * HomeComponent
 * Serves as the home page of the Rescue Animal Organization.
 * Displays the welcome message and allows navigation to animal-related actions.
 */
@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterModule, AnimalListComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    title = 'Welcome to the Rescue Animal Organization'; 
    animals: Animal[] = []; 
    showAnimalList = false; 

    currentUsername: string | null = null; 
    isLoggedIn: boolean = false;

    /**
     * Constructor
     * Injects necessary services.
     * 
     * @param animalService - Service to interact with animal data
     * @param authService - Service to manage authentication
     * @param router - Angular Router for navigation
     */
    constructor(
        private animalService: AnimalService,
        private authService: AuthService,
        private router: Router
    ) {}

    /**
     * Lifecycle hook that runs after component initialization.
     */
    ngOnInit(): void {
        this.animalService.getAnimals().subscribe(
            (data) => {
                this.animals = data;
            },
            (error) => {
                console.error("Error fetching data", error);
            }
        );
    
        // Subscribe to the authentication state
        this.authService.currentUser$.subscribe((username) => {
            this.currentUsername = username;
            //this.isLoggedIn = username !== null && username !== 'undefined'; // Avoid invalid usernames
            this.isLoggedIn = this.authService.isLoggedIn();
            console.log('Auth state updated:', { username, isLoggedIn: this.isLoggedIn });
        });
    }

    /**
     * Toggles the visibility of the current animal list.
     */
    viewCurrentAnimals(): void {
        this.showAnimalList = true;
    }

    /**
     * Navigates to the edit page for a specific animal.
     */
    editAnimal(id: string): void {
        console.log(`Navigating to edit page for ID: ${id}`);
        this.router.navigate(['/edit-animal', id]);
    }

    /**
     * Logs out the user.
     */
    logout(): void {
        this.authService.logout(); 
        console.log('User logged out');
    }
}
