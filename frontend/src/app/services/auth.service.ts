import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    role: 'ADMIN' | 'USER';
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('flow_token', response.token);
          localStorage.setItem('flow_user', JSON.stringify(response.user));
        })
      );
  }
}