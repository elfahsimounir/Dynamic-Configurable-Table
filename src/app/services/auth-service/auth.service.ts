import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL; // replace with your backend API URL
  private token: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): void {
    if (username === '3rpara' && password === '12345') {
      this.token = 'testtoken';
      Cookie.set('token', this.token);
      this.router.navigate(['/home/details']);
    }
  }
  logout(): void {
    this.token = null;
    Cookie.delete('token');
    this.router.navigate(['auth/signin']);
  }

  getToken(): string {
    return Cookie.get('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}