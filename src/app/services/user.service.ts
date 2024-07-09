import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  protected UrlService: string = 'https://localhost:7043/';

  get(id: string): Observable<User> {
    return this.http.get<User>(this.UrlService + 'user' + id);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.UrlService + 'user');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.UrlService}/user`, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.UrlService}/user/${id}`);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.UrlService}/user/${id}`, user);
  }
}
