import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { TaskUserComponent } from './task/task-user/task-user.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: 'create-user', component: UserComponent },
  { path: 'edit-user', component: UserEditComponent },
  { path: 'create-task', component: TaskUserComponent },
  { path: 'task-edit', component: TaskEditComponent },
  { path: 'user-tasks', component: TaskUserComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
