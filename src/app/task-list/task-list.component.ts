import { Component } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { TaskUser } from '../models/TaskUser';
import { UserTaskService } from '../services/user-task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: TaskUser[] = [];

  constructor(
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
    private taskUserService: UserTaskService
  ) {}

  getAllTasks(): void {
    this.spinnerService.spin$.next(true);

    this.taskUserService.getAll().subscribe(
      (tasks) => {
        this.spinnerService.spin$.next(false);
        this.tasks = tasks;
      },
      (error) => {
        this.spinnerService.spin$.next(false);
        this.notificationService.showNotification(
          'Error when loading tasks.',
          ''
        );
      }
    );
  }
}
