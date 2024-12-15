import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * LoginComponent handles the user login functionality. 
 * It includes form validation and communicates with AuthService for authentication.
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class LoginComponent {
    loginForm: FormGroup; // Form group to manage login form controls and validation
    showErrorMessage = false; // Flag to control the visibility of the error message

    /**
     * Initializes the LoginComponent and sets up the login form with validation rules.
     * @param fb FormBuilder instance to create reactive form
     * @param authService AuthService instance for handling authentication
     * @param router Router instance to navigate between routes
     */
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]], // Email must be valid
            password: ['', [Validators.required, Validators.minLength(6)]] // Password must be at least 6 characters
        });
    }

    /**
   * Navigates to the homepage of the application.
   */
    navigateToHome(): void {
        this.router.navigate(['/home']);
      }

    /**
     * Handles the form submission for login.
     * Validates the form and calls the AuthService to authenticate the user.
     * On successful login, navigates to the home page. Logs errors otherwise.
     */
    onSubmit(): void {
        if (this.loginForm.invalid) {
            console.error('Login form is invalid', this.loginForm.errors); // Log form validation errors
            this.showErrorMessage = true; // Show error message if the form is invalid
            return;
        }

        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                this.showErrorMessage = false; // Hide error message on successful login
                //console.log('Login successful:', response); // Uncomment for debugging
                // Redirect to the home page after a successful login
                this.router.navigate(['/']);
            },
            error: (err) => {
                // Log authentication errors for debugging
                console.error('Login error:', err);
                this.showErrorMessage = true; // Show error message on login failure
            }
        });
    }

}