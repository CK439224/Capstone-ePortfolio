import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  // The main form group for user registration
  registerForm: FormGroup;
  showErrorMessage = false; // Flag to control the visibility of the error message

  // Predefined registration code for validation
  private readonly registrationCode = 'TestCode';

  /**
   * Navigates to the homepage of the application.
   */
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Constructor to initialize form controls and inject necessary services.
   * @param fb FormBuilder instance for creating and managing the reactive form
   * @param authService Service to handle authentication requests
   * @param router Router for navigation after successful registration
   */
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize the form group with validation rules for each control
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      registrationCode: ['', [Validators.required, this.registrationCodeValidator.bind(this)]],
    },
      { validators: this.passwordsMatchValidator } // Custom validator to ensure password and confirm password match
    );
  }

  /**
   * Custom validator to check if password and confirm password fields match.
   * @param group FormGroup containing the password fields
   * @returns Validation error object if passwords don't match, otherwise null
   */
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Custom validator to ensure the entered registration code matches the predefined one.
   * @param control Form control containing the registration code
   * @returns Validation error object if codes don't match, otherwise null
   */
  registrationCodeValidator(control: any) {
    return control.value === this.registrationCode ? null : { codeMismatch: true };
  }

  /**
   * Handles the submission of the registration form.
   * Validates the form, registers the user, and navigates to the home page on success.
   * Displays an error message if registration fails.
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.showErrorMessage = true; // Show the error message
      // Log errors for debugging purposes and halt the process
      console.error('Registration form is invalid', this.registerForm.errors);
      return;
    }

    this.showErrorMessage = false; // Hide the error message on valid submission
    // Call the AuthService to handle user registration
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        //console.log('Registration successful:', response); // Uncomment for debugging
        // Registration succeeded, navigate to the home page
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Log and alert user of registration failure
        console.error('Registration error:', err);
        alert(err.error.message || 'Registration failed. Please try again.');
      }
    });
  }
}
