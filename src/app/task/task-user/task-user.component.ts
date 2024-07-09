import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TaskUser } from 'src/app/models/TaskUser';
import { UserTaskService } from 'src/app/services/user-task.service';
@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
})
export class TaskUserComponent implements OnInit {
  data = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(200),
    ],],
    description: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500),
      ],
    ],
  });

  task: TaskUser | undefined;

  constructor(
    private taskService: UserTaskService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {}

  save(): void {
    const infoUser = localStorage.getItem('user');
    if (infoUser) {
      const user = JSON.parse(infoUser);

      const headers = new HttpHeaders({
        Authorization: `bearer ${user.token}`,
      });

      const options = { headers };

      this.taskService.createTask(user).subscribe(
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

  getTask(id: string): void {
    this.spinnerService.spin$.next(true);

    this.taskService.get(id).subscribe(
      (task) => {
        this.spinnerService.spin$.next(false);
        this.task = task;
        this.data.patchValue(task);
      },
      (error) => {
        this.spinnerService.spin$.next(false);
        this.notificationService.showNotification(
          'Error when loading task.',
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

      this.taskService.deleteTask(id).subscribe(
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
