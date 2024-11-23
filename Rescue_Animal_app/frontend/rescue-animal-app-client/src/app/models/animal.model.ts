// src/app/models/animal.model.ts

/**
 * Interface representing an Animal entity.
 * Defines the structure for animal-related data used across the application.
 */
export interface Animal {
  _id?: string; // Optional unique identifier for the animal, typically provided by the database
  name: string; // The name of the animal
  type: string; // The type of the animal (e.g., Dog, Monkey)
  gender?: string; // Optional gender of the animal (e.g., Male, Female)
  age: number; // The age of the animal in years
  weight?: number; // Optional weight of the animal in kilograms
  acquisitionDate?: string; // Optional date when the animal was acquired, formatted as "yyyy-MM-dd"
  acquisitionCountry?: string; // Optional country where the animal was acquired
  trainingStatus: string; // The current training status of the animal (e.g., In Training, Training Completed)
  reserved?: boolean; // Optional flag indicating if the animal is reserved
  inServiceCountry?: string; // Optional country where the animal is currently in service
  adoptionStatus?: string; // Optional adoption status (e.g., Adopted, Available, Pending)
  tailLength?: number; // Optional field
  height?: number; // Optional field
  bodyLength?: number; // Optional field
  species?: string; // Optional field
}
