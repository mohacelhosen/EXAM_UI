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
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExamComponent } from './pages/exam/exam.component';
import { SettingComponent } from './pages/setting/setting.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { ViewQuizComponent } from './pages/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/add-quiz/add-quiz.component';
import { ViewQuizQuestionComponent } from './pages/view-quiz-question/view-quiz-question.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { ViewCategoryQuizComponent } from './pages/view-category-quiz/view-category-quiz.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'navbar', component: NavbarComponent, canActivate:[AuthGuard],  children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' }, // Default child route
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'qa', component: QaComponent },
    { path: 'users', component: TableComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'exam/:catagoryId', component: ExamComponent },
    { path: 'category', component: CategoryComponent},
    { path: 'categories', component: CategoriesComponent},
    { path: 'view-quiz', component: ViewQuizComponent},
    { path: 'add-quiz', component: AddQuizComponent},
    { path: 'view-questions/:quizId/:title', component: ViewQuizQuestionComponent },
    { path: 'view-category-quiz/:catagoryId', component: ViewCategoryQuizComponent },
    { path: 'add-question/:quizId', component: AddQuestionComponent },
    { path: 'setting', component: SettingComponent },
    // Other child routes within the NavbarComponent
    {path:'**', component:NotFoundComponent}
  ]},
  {path:'**', redirectTo: 'login'}
  // Other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
