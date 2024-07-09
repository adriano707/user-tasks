import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  data: FormGroup;
  user: User;
  form: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
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

  save(): void {
    const infoUser = localStorage.getItem('user');
    if (infoUser) {
      const user = JSON.parse(infoUser);

      const headers = new HttpHeaders({
        Authorization: `bearer ${user.token}`,
      });

      this.userService.createUser(user).subscribe(
        (res) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification(
            'Successfully included.',
            ''
          );
        },
        (error) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification(
            'Error when registering.',
            ''
          );
        }
      );
    }
  }

  back(): void {
    this.router.navigate(['/users']);
  }

  getUser(): void {
    this.spinnerService.spin$.next(true);

    this.userService.get(this.user.id).subscribe(
      (user) => {
        this.spinnerService.spin$.next(false);
        this.user = this.user;
      },
      (error) => {
        this.spinnerService.spin$.next(false);
        this.notificationService.showNotification(
          'Error when loading user.',
          ''
        );
      }
    );
  }

  delete(id: string): void {
    const infoUser = localStorage.getItem('user');
    if (infoUser) {
      const user = JSON.parse(infoUser);

      const headers = new HttpHeaders({
        Authorization: `Bearer ${user.token}`,
      });

      const options = { headers };

      this.spinnerService.spin$.next(true);

      this.userService.deleteUser(id).subscribe(
        (res) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification(
            'Successfully deleted.',
            ''
          );
        },
        (error) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification('Error when deleting.', '');
        }
      );
    }
  }
}
