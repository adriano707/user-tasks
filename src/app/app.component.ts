import { Component, OnInit } from '@angular/core';
import { User } from './user/users/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'tarefa';

  user = {} as User;
  users: User[] = [];

  constructor() {}

  ngOnInit() {
  }
}
