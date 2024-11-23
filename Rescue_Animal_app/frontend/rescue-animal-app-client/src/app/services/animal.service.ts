// src/app/services/animal.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interface representing the structure of an Animal entity.
 * This is used across the application and API interactions.
 */
export interface Animal {
    _id?: string; // Optional unique identifier for the animal
    name: string; // Name of the animal
    type: string; // Type of the animal (e.g., Dog, Monkey)
    gender?: string; // Optional gender of the animal
    age: number; // Age of the animal
    weight?: number; // Optional weight of the animal
    acquisitionDate?: string | null; // Optional date of acquisition (null if not available)
    acquisitionCountry?: string; // Optional country of acquisition
    trainingStatus: string; // Training status of the animal
    reserved?: boolean; // Optional flag indicating if the animal is reserved
    inServiceCountry?: string; // Optional country where the animal is in service
    adoptionStatus?: string; // Optional adoption status (e.g., Adopted, Available)
    tailLength?: number; // Optional new field
    height?: number; // Optional new field
    bodyLength?: number; // Optional new field
    species?: string; // Optional new field
}

/**
 * Service to manage API interactions for Animal data.
 * Provides CRUD operations and additional utility methods.
 */
@Injectable({
    providedIn: 'root' // Makes the service available throughout the app
})
export class AnimalService {
    private apiUrl = 'http://localhost:3000/api/animals'; // Base URL for the API

    /**
     * Constructor
     * Injects the HttpClient for making HTTP requests.
     * 
     * @param http - Angular's HttpClient for API calls
     */
    constructor(private http: HttpClient) {}

    /**
     * Fetches a list of all animals from the API.
     * Formats the `acquisitionDate` to "yyyy-MM-dd" format for consistency.
     * 
     * @returns An observable containing an array of animals.
     */
    getAnimals(): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.apiUrl).pipe(
            map(animals => animals.map(animal => ({
                ...animal,
                acquisitionDate: animal.acquisitionDate ?
                    new Date(animal.acquisitionDate).toISOString().split('T')[0] : null
            }))), // Formats acquisitionDate
            catchError(error => {
                // Logs and rethrows the error for handling by the caller
                return throwError(error);
            })
        );
    }

    /**
     * Adds a new animal to the database.
     * 
     * @param animal - The animal object to be added.
     * @returns An observable containing the added animal.
     */
    addAnimal(animal: Animal): Observable<Animal> {
        return this.http.post<Animal>(`${this.apiUrl}`, animal);
    }

    /**
     * Updates an existing animal in the database.
     * 
     * @param id - The unique ID of the animal to update.
     * @param animal - The updated animal object.
     * @returns An observable containing the updated animal.
     */
    updateAnimal(id: string, animal: Animal): Observable<Animal> {
        return this.http.put<Animal>(`${this.apiUrl}/${id}`, animal);
    }

    /**
     * Deletes an animal from the database.
     * 
     * @param id - The unique ID of the animal to delete.
     * @returns An observable with a void response upon successful deletion.
     */
    deleteAnimal(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    /**
     * Fetches a specific animal by its unique ID.
     * 
     * @param id - The unique ID of the animal.
     * @returns An observable containing the requested animal.
     */
    getAnimalById(id: string): Observable<Animal> {
        return this.http.get<Animal>(`${this.apiUrl}/${id}`);
    }
}
