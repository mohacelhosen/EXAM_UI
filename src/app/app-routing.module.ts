import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { QaComponent } from './pages/qa/qa.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'profile', component:ProfileComponent},
  {path:'users', component:TableComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'qa',component:QaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
