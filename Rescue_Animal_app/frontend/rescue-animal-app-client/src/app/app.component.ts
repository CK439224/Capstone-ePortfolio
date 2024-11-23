import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * AppComponent
 * The root component of the application.
 * Acts as the entry point and container for all other components and routes.
 */
@Component({
    selector: 'app-root', // Indicates this is a standalone component
    imports: [RouterOutlet], // Imports the RouterOutlet directive for route rendering
    templateUrl: './app.component.html', // Path to the HTML template for this component
    styleUrl: './app.component.scss' // Path to the SCSS styles for this component
})
export class AppComponent {
  title = 'rescue-animal-app-client'; // Application title, used throughout the app

  /**
   * Constructor
   * Initializes the AppComponent. Currently used for initial setup or debugging.
   */
  constructor() {
    // Uncomment the following line for debugging during app initialization
    // console.log("appComponent: Constructor called - AppComponent is loading.");
  }
}
