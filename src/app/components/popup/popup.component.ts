import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  private editData: any;
  inputData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private formBuilder: FormBuilder,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.email) {
      this.setPopUpdata(this.inputData.email);
    } else {
      // If email is not provided, it means we are adding a new user,
      // so we can initialize the form with empty data here if needed.
      this.initializeForm();
    }
  }

  closePopUp() {
    if (this.userForm.valid) {
      this.ref.close('close by save button');
    }
  }

  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    designation: ['', Validators.required],
  });

  saveUser() {
    if (this.userForm.valid) {
      this.service.userRegistration(this.userForm.value).subscribe((response) => {
        console.log(this.userForm.value);
        this.closePopUp();
      });
    }
  }

  initializeForm() {
    this.userForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      password: '',
      designation: '',
    });
  }

  setPopUpdata(email: string) {
    this.service.getSingleUser(email).subscribe(
      (response) => {
        if (response.status === 200) {
          this.editData = response.body; // Extract the user data from the response body
          this.userForm.patchValue({
            firstName: this.editData.firstName,
            lastName: this.editData.lastName,
            email: this.editData.email,
            dob: this.formatDate(this.editData.dob),
            gender: this.editData.gender,
            password: '',
            designation: this.editData.designation,
          });
        } else {
          console.error('Error fetching user data:', response);
          // Handle other status codes here (e.g., 404, 500, etc.)
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle error, show error message, etc.
      }
    );
  }
  

  formatDate(dateArray: number[]): string {
    // Assuming that dateArray contains the [year, month, day]
    const [year, month, day] = dateArray;
    const formattedDate = new Date(year, month - 1, day).toISOString().split('T')[0];
    return formattedDate;
  }
}
