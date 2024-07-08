import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {UserTasksComponent} from "./user-tasks/user-tasks.component";

const routes: Routes = [
  { path: 'create-users', component: UserComponent },
  { path: 'user-tasks', component: UserTasksComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
