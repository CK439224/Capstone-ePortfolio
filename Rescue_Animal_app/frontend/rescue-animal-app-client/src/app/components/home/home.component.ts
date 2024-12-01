import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalService } from '../../services/animal.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AnimalListComponent } from '../animal-list/animal-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * Interface representing an Animal entity.
 * Describes the expected structure for animal data within the application.
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
    phase?: string;
    reserved?: boolean;
    inServiceCountry?: string;
    tailLength?: number;
    height?: number;
    bodyLength?: number;
    species?: string;
}

/**
 * HomeComponent
 * Acts as the home page for the application, providing key organization details
 * and access to functionalities like viewing and editing animal data.
 */
@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterModule, AnimalListComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    title = 'GRAZIOSO SALVARE'; // Organization's title displayed prominently on the page
    animals: Animal[] = []; // Stores the list of animals fetched from the server
    showAnimalList = false; // Controls the visibility of the animal list

    currentUsername: string | null = null; // Tracks the username of the currently logged-in user
    isLoggedIn: boolean = false; // Indicates whether a user is logged in
    missionStatement: string = ''; // Displays the organization's mission statement

    /**
     * Constructor to initialize essential services.
     * Services provide functionality for animal data management, authentication, and navigation.
     * 
     * @param animalService - Fetches and manages animal data
     * @param authService - Handles user authentication
     * @param router - Manages navigation between routes
     */
    constructor(
        private animalService: AnimalService,
        private authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) { }

    /**
     * Initializes the component.
     * Fetches animal data, mission statement, and sets up authentication status tracking.
     */
    ngOnInit(): void {
        // Fetch the list of animals
        this.animalService.getAnimals().subscribe(
            (data) => {
                this.animals = data;
            },
            (error) => {
                console.error("Error fetching data", error);
            }
        );

        // Load the mission statement from a local JSON file
        this.http.get<{ mission: string }>('/assets/mission-statement.json')
            .subscribe(data => {
                this.missionStatement = data.mission;
            });

        // Subscribe to the authentication state
        this.authService.currentUser$.subscribe((username) => {
            this.currentUsername = username;
            this.isLoggedIn = this.authService.isLoggedIn();
            //console.log('Auth state updated:', { username, isLoggedIn: this.isLoggedIn }); // Uncomment for debugging
        });
    }

    /**
     * Displays the current animal list in the UI.
     */
    viewCurrentAnimals(): void {
        this.showAnimalList = true;
    }

    /**
     * Navigates to the page for editing a specific animal.
     * 
     * @param id - The unique identifier of the animal to edit
     */
    editAnimal(id: string): void {
        //console.log(`Navigating to edit page for ID: ${id}`); // Uncomment for debugging
        this.router.navigate(['/edit-animal', id]);
    }

    /**
     * Logs out the currently logged-in user.
     * Ensures the session is properly cleared.
     */
    logout(): void {
        this.authService.logout();
        //console.log('User logged out'); // Uncomment for debugging
    }
}
