import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL; // replace with your backend API URL
  private token: any;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { headers })
      .pipe(
        tap((res:any) => {
          this.token = res.token;
          Cookie.set('token', this.token);
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  logout(): void {
    this.token = null;
    Cookie.delete('token');
  }

  getToken(): string {
    return Cookie.get('token');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}