import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskUser } from './task-user/TaskUser';

@Injectable()
export class TaskUserService {
  constructor(private http: HttpClient) {}
  protected UrlService: string = '';

  get(id: string): Observable<TaskUser> {
    return this.http.get<TaskUser>(this.UrlService + 'taskUser');
  }

  getAll(): Observable<TaskUser[]> {
    return this.http.get<TaskUser[]>(this.UrlService + 'taskUsers');
  }
}
