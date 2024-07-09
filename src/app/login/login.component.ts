import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data: FormGroup;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
    private fb: FormBuilder
  ) {
    this.data = this.fb.group({
      user: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  login() {
    this.http
      .post<any>(`https://localhost:7043/users/login`, {
        data: this.data
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
