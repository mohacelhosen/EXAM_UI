import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { QaComponent } from './pages/qa/qa.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';
import { ExamComponent } from './pages/exam/exam.component';
import { SettingComponent } from './pages/setting/setting.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { ViewQuizComponent } from './pages/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/add-quiz/add-quiz.component';
import { ViewQuizQuestionComponent } from './pages/view-quiz-question/view-quiz-question.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { ViewCategoryQuizComponent } from './pages/view-category-quiz/view-category-quiz.component';
import { StartExamComponent } from './pages/start-exam/start-exam.component'
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ResultComponent } from './components/result/result.component';
import { ChartModule } from 'angular-highcharts';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    ProfileComponent,
    TableComponent,
    DashboardComponent,
    QaComponent,
    LoginComponent,
    NotFoundComponent,
    ExamComponent,
    SettingComponent,
    CategoriesComponent,
    CategoryComponent,
    ViewQuizComponent,
    AddQuizComponent,
    ViewQuizQuestionComponent,
    AddQuestionComponent,
    ViewCategoryQuizComponent,
    StartExamComponent,
    ResultComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgToastModule,
    NgxUiLoaderModule,
    ChartModule,
    NgxUiLoaderHttpModule.forRoot({showForeground:true,}),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
