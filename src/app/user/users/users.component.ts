import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data = this.fb.group({
    id: null,
    userName: null,
    password: null
  })

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService) {}

  ngOnInit(): void {}

  save(): void {
    this.http
      .post<any>(`https://localhost:44317/users`, this.data.value)
      .subscribe(
        (res) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification(
            'Successfully included.',
            ''
          );
        },
        (error => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification('Error when registering.', '');
        })
      );
  }

  back(): void {
    this.router.navigate(['/users']);
  }
}
