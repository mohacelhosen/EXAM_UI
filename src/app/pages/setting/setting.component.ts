import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  settingForm!: FormGroup;
  isSubmitting = false;
  originalUserData: any; // Store original user data

  constructor(
    private _formBuilder: FormBuilder,
    private toast: PopupService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.settingForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      userPhoto: ['', Validators.required],
      dob: [''],
      linkedin: [''],
      github: [''],
      facebook: [''],
    });

    // Retrieve user data from API and populate form
    this.apiService.getSingleUser().subscribe(
      (user) => {
        this.originalUserData = user; // Capture original user data
        this.populateFormWithUserData(user);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  populateFormWithUserData(user: any): void {
    const dobArray = user.dob;
    const dob = new Date(dobArray[0], dobArray[1] - 1, dobArray[2]);

    // Populate form controls with user data
    this.settingForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      userPhoto: user.userPhoto,
      dob: dob,
      linkedin: user.linkedin,
      github: user.github,
      facebook: user.facebook,
    });
  }

  onSubmit() {
    if (this.settingForm.valid) {
      this.isSubmitting = true;

      const updatedUserData = this.settingForm.value;

      // Merge updated data with unchanged data
      const mergedUserData = { ...this.originalUserData, ...updatedUserData };

      this.apiService.updateUser(mergedUserData).subscribe(
        (response) => {
          this.isSubmitting = false;
          // Show success message or handle as needed
          this.toast.showSuccessTopCenter('User information updated successfully.');
        },
        (error) => {
          this.isSubmitting = false;
          // Handle error if needed
          this.toast.showErrorBottonCenter('Error updating user information.');
        }
      );
    }
  }
}
