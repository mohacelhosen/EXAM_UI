import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent {
  settingForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private _formBuilder: FormBuilder,
    private toast: PopupService
  ) {}

  ngOnInit(): void {
    this.settingForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      designation: ['', Validators.required],
    });
  }

  onSubmit() {}
}
