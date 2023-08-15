import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  quizId!:number;
  questionForm!:FormGroup;
  isSubmitting = false;

  constructor(private _route:ActivatedRoute,    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toast: PopupService){}


 
    ngOnInit(): void {
      this.quizId=this._route.snapshot.params['quizId'];
      console.log(this.quizId)

      this.questionForm = this._formBuilder.group({
        content:['', Validators.required],
        image:[''],
        option1:['', Validators.required],
        option2:['', Validators.required],
        option3:['', Validators.required],
        option4:['', Validators.required],
        answer:['', Validators.required],
        quiz:[this.quizId]
      },

    );
  }

  onSubmit() {
    console.log(this.questionForm.value)
    console.log(this.questionForm.valid )
    if (this.questionForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.apiService.addQuestion(this.questionForm.value).subscribe({
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
    this.questionForm.reset();
  }

}