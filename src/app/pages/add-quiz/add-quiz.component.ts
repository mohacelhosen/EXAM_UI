import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {
  quizForm!:FormGroup;
  categories!:Category[];
  isSubmitting = false;

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toast: PopupService
  ) {}


  ngOnInit(): void {
      this.quizForm = this._formBuilder.group({
        quizId:[],
        title:['', Validators.required],
        description:['', Validators.required],
        maxMarks:['', Validators.required],
        numberOfQuestions:['', Validators.required],
        isActive:['', Validators.required],
        category:['', Validators.required],
      },
      this.apiService.getAllCategory().subscribe((res)=>{
        this.categories=res;
      },
      (error)=>{
        console.log(error)
          this.toast.showWarn(error);
      })
    );
  }

  onSubmit() {
    if (this.quizForm.valid && !this.isSubmitting) {
      console.log(this.quizForm.value)
      this.isSubmitting = true;
      this.apiService.addQuiz(this.quizForm.value).subscribe({
        next: (val: any) => {
          this.toast.showSuccessTopCenter("Category Successfully Added") 
          console.log(val);
          this.router.navigate(['navbar','view-quiz']);
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this.toast.showErrorBottonCenter(err);

        },
      });
    }
  }

  clearform() {
    this.quizForm.reset();
  }

}
