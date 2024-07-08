import { Injectable } from '@angular/core';
import { User } from './users/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserServiceService {
  constructor(private http: HttpClient) {}

  protected UrlService: string = 'https://localhost:7043/';

  get(id: string): Observable<User> {
    return this.http.get<User>(this.UrlService + 'user' + id);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.UrlService + 'user');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.UrlService}user`, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.UrlService}/user/${id}`);
  }
}
