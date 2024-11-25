import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
      if (this.loginForm.invalid) {
          console.error('Login form is invalid', this.loginForm.errors);
          return;
      }
  
      this.authService.login(this.loginForm.value).subscribe({
          next: (response) => {
              console.log('Login successful:', response);
              this.router.navigate(['/']); // Redirect to home after login
          },
          error: (err) => {
              console.error('Login error:', err);
          }
      });
  }
  
}