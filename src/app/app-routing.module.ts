import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { QaComponent } from './pages/qa/qa.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'navbar', component: NavbarComponent,  children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' }, // Default child route
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'qa', component: QaComponent },
    { path: 'users', component: TableComponent },
    { path: 'home', component: HomeComponent },
    // Other child routes within the NavbarComponent
    {path:'**', redirectTo: 'dashboard'}
  ]},
  {path:'**', redirectTo: 'login'}
  // Other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
