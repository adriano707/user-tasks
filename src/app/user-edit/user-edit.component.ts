import { Component } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  data: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {
    this.data = this.fb.group({
      id: [''],
      name: [''],
      password: ['']
    });
  }

  ngOnInit(): void {}

  save(): void {
    const user: User = this.data.value;

    if (!user.id) {
      this.notificationService.showNotification(
        'Error: User ID is required for update.',
        ''
      );
      return;
    }

    this.spinnerService.spin$.next(true);

    this.userService.updateUser(user.id, user).subscribe(
      (res) => {
        this.spinnerService.spin$.next(false);
        this.notificationService.showNotification('Successfully updated.', '');
      },
      (error) => {
        this.spinnerService.spin$.next(false);
        this.notificationService.showNotification('Error when updating.', '');
      }
    );
  }
}
