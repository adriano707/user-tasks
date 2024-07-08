import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}

  login() {
    this.http
      .post<any>(`http://localhost:4200/users/login`, {
        login: this.user,
        password: this.password,
      })
      .subscribe((user) => {
        localStorage.setItem('user', JSON.stringify(user));

        this.spinnerService.spin$.next(false);
        this.notificationService.showNotification(
          'successfully logged in.',
          ''
        );
      });
  }
}
