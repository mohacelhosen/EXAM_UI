import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private _formBuilder: FormBuilder,
    private regService: ApiService,
    private router: Router,
    private toast: PopupService
  ) {}
  ngOnInit(): void {
    this.registrationForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      designation: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.regService.userRegistration(this.registrationForm.value).subscribe({
        next: (val: any) => {
          this.toast.showSuccessTopCenter("Registered Successfully") 
          console.log(val);
          this.router.navigate(['login']);
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this.toast.showErrorBottonCenter(err);

        },
      });
    }
  }

  clearform() {
    this.registrationForm.reset();
  }

}
