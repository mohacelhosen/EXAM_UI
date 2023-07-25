import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  isSubmitting = false;

  constructor(private _formBuilder: FormBuilder, private regService: ApiService) {
    this.registrationForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      designation: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.regService.userRegistration(this.registrationForm.value).subscribe({
        next: (val: any) => {
          alert("Saved Successfully...😇");
          this.registrationForm.reset();
        },
        error: (err: any) => {
          this.isSubmitting = false;
          console.error(err);
          alert("An error occurred. Please try again later.");
        }
      });
    }
  }

  clearform() {
    this.registrationForm.reset();
  }
}
