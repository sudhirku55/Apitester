import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./views/home/home.component";
import { ContactComponent } from "./views/contact/contact.component";
import { UsersComponent } from "./views/users/users.component";
import { UserSingleComponent } from "./views/user-single/user-single.component";
import { UserAddComponent } from "./views/user-add/user-add.component";
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NeedAuthGuard } from "./auth.guard";
import { LoginModule } from './views/login/login.module';
import { DashboardModule } from './views/dashboard/dashboard.model';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [NeedAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/add-new', component: UserAddComponent},
  { path: 'single-user/:id', component: UserSingleComponent},
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginModule,
    DashboardModule
  ],
  exports: [RouterModule],
  providers: [NeedAuthGuard]
})
export class AppRoutingModule { }
