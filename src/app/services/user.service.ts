import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../classes/user';

const usersUrl = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http: HttpClient = inject(HttpClient);

  addUser(user: User): Observable<User> {
    return this.http.post<User>(usersUrl, user);
  }

  signUp(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(usersUrl).pipe(
      map((users) => {
        if (users.some((u) => u.username === username)) {
          return false;
        }
        const newUser = { username, password } as User;
        this.addUser(newUser).subscribe();
        return true;
      }),
      catchError(() => of(false))
    );
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(usersUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.username === username && u.password === password);
        return !!user;
      }),
      catchError(() => of(false))
    );
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<User[]>(usersUrl).pipe(
      map((users) => users.some((u) => u.username === username)),
      catchError(() => of(false))
    );
  }

  resetPassword(username: string, newPassword: string): Observable<boolean> {
    return this.http.get<User[]>(usersUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.username === username);
        if (user) {
          const updatedUser = { ...user, password: newPassword };
          this.http.put(`${usersUrl}/${user.id}`, updatedUser).subscribe();
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }
}
