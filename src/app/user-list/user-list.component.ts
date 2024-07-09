import { Component } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: User[] = [];

  constructor(
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
    private userService: UserService
  ) {}

  getAllUsers(): void {
    this.spinnerService.spin$.next(true);

    this.userService.getAll().subscribe(
      (tasks) => {
        this.spinnerService.spin$.next(false);
        this.users = this.users;
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
}
