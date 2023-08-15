import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  Category!:FormGroup;
  isSubmitting = false;

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toast: PopupService
  ) {}


  ngOnInit(): void {
    this.Category = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.Category.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.apiService.addCategory(this.Category.value).subscribe({
        next: (val: any) => {
          this.toast.showSuccessTopCenter("Category Successfully Added") 
          console.log(val);
          this.router.navigate(['navbar','categories']);
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this.toast.showErrorBottonCenter(err);

        },
      });
    }
  }

  clearform() {
    this.Category.reset();
  }
}
