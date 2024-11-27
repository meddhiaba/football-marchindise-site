import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly http: HttpClient = inject(HttpClient);

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('state', 'connected');
      return of(true);
    }

    return of(false);
  }

  logout(): void {
    localStorage.removeItem('state');
  }
}
