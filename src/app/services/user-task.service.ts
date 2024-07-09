import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskUser } from '../models/TaskUser';

@Injectable({
  providedIn: 'root',
})
export class UserTaskService {
  constructor(private http: HttpClient) {}
  protected UrlService: string = 'https://localhost:7043/';

  get(id: string): Observable<TaskUser> {
    return this.http.get<TaskUser>(this.UrlService + 'task');
  }

  getAll(): Observable<TaskUser[]> {
    return this.http.get<TaskUser[]>(this.UrlService + 'task');
  }

  createTask(user: TaskUser): Observable<TaskUser> {
    return this.http.post<TaskUser>(`${this.UrlService}/task`, user);
  }

  deleteTask(id: string): Observable<TaskUser> {
    return this.http.delete<TaskUser>(`${this.UrlService}/task/${id}`);
  }

  updateTask(id: string, task: TaskUser): Observable<TaskUser> {
    return this.http.put<TaskUser>(`${this.UrlService}/task/${id}`, task);
  }
}
