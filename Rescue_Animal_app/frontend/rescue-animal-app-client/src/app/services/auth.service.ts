import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'token';
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<string | null>(this.getCurrentUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  private loggedInSubject = new BehaviorSubject<boolean>(this.checkToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const username = this.getCurrentUserFromStorage();
    if (username) {
      console.log('Initializing with stored username:', username);
      this.currentUserSubject.next(username);
    }
  }

  // Utility to check if running in a browser environment
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Safely get token from storage
  private getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  // Check if a valid token exists
  private checkToken(): boolean {
    return this.isBrowser() && !!this.getToken();
  }

  // Get the current user's username safely
  private getCurrentUserFromStorage(): string | null {
    if (this.isBrowser()) {
      const username = localStorage.getItem('username');
      console.log('Retrieved username from storage:', username); // Debug log
      return username;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.checkToken(); // Use the safe method
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

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

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    this.currentUserSubject.next(null); // Clear the current user
    this.loggedInSubject.next(false); // Update login state
  }

  getCurrentUser(): string | null {
    return this.getCurrentUserFromStorage();
  }
}
