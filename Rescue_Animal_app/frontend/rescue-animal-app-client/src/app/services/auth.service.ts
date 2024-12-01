import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


/**
 * Service to handle authentication and user session management.
 * Provides methods to register, login, logout, and track user authentication status.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'token';
  // Base URL for authentication API endpoints
  private apiUrl = 'http://localhost:3000/auth';
  // BehaviorSubject to hold the current user's username
  private currentUserSubject = new BehaviorSubject<string | null>(this.getCurrentUserFromStorage());
  // Observable for external subscription
  public currentUser$ = this.currentUserSubject.asObservable();
  // BehaviorSubject to track login state
  private loggedInSubject = new BehaviorSubject<boolean>(this.checkToken());
  // Observable for login state
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize current user if stored in localStorage
    const username = this.getCurrentUserFromStorage();
    if (username) {
      //console.log('Initializing with stored username:', username); // Uncomment for debugging
      this.currentUserSubject.next(username);
    }
  }

  /**
   * Utility to check if the code is running in a browser environment.
   * Ensures safe access to window and localStorage.
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   * Retrieves the stored token from localStorage if available.
   * @returns JWT as a string, or null if not found
   */
  private getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  /**
   * Checks whether a valid token is present in localStorage.
   * @returns True if a token exists, otherwise false
   */
  private checkToken(): boolean {
    return this.isBrowser() && !!this.getToken();
  }

  /**
   * Retrieves the current user's username from localStorage.
   * @returns Username as a string, or null if not found
   */
  private getCurrentUserFromStorage(): string | null {
    if (this.isBrowser()) {
      const username = localStorage.getItem('username');
      //console.log('Retrieved username from storage:', username); // Uncomment for debugging
      return username;
    }
    return null;
  }

  /**
   * Verifies the user's login state based on the token's presence.
   * @returns True if the user is logged in, otherwise false
   */
  isLoggedIn(): boolean {
    return this.checkToken(); // Use the safe method
  }

  /**
   * Registers a new user by sending their details to the backend.
   * @param data Registration details (e.g., username, password)
   * @returns Observable of the server response
   */
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  /**
   * Logs in the user and saves their session data (token and username).
   * @param data Login details (e.g., username, password)
   * @returns Observable of the server response
   */
  login(data: any): Observable<any> {
    return this.http.post<{ token: string; username: string }>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => {
        if (this.isBrowser()) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
        }
        this.currentUserSubject.next(response.username);
        this.loggedInSubject.next(true); // Emit login state
      })
    );
  }

  /**
   * Logs out the user by clearing their session data.
   */
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    this.currentUserSubject.next(null); // Clear the current user
    this.loggedInSubject.next(false); // Update login state
  }

  /**
   * Provides the username of the currently logged-in user.
   * @returns Username as a string, or null if not logged in
   */
  getCurrentUser(): string | null {
    return this.getCurrentUserFromStorage();
  }
}
