import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'; // Replace with the actual path
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private loginService: ApiService,
    private router: Router,
    private toast: PopupService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let loginInfo = this.loginForm.value;
      this.loginService.login(loginInfo).subscribe({
        next: (response: any) => {
          if (response.message === 'Login Successful😇' && response.token) {
            // Storing the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', loginInfo.email);
            this.toast.showSuccessTopCenter('Login Successfully...😇');
            this.router.navigate(['/navbar']);
          } else {
            this.toast.showInfo('Login failed. Please check your credentials.');
          }
        },
        error: (err: any) => {
          console.error(err);
          if (err.status === 401) {
            this.toast.showWarn('Login failed due to incorrect credentials.');
          } else {
            this.toast.showErrorBottonCenter('An error occurred. Please try again later.');
          }
        },
      });
    }
  }
}
