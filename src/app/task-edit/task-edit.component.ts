import { Component } from '@angular/core';
import { TaskUser } from '../models/TaskUser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { UserTaskService } from '../services/user-task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
    private taskUserService: UserTaskService
  ) {
    this.form = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
    });
  }
  save(): void {
    const task: TaskUser = this.form.value;

    if (!task.id) {
      this.notificationService.showNotification(
        'Error: User ID is required for update.',
        ''
      );
      return;
    }

    this.spinnerService.spin$.next(true);

    this.taskUserService.updateTask(task.id, task).subscribe(
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
