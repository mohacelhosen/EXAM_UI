import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {
  quizForm!: FormGroup;
  categories!: Category[];
  isSubmitting = false;

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toast: PopupService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const quizId = this._route.snapshot.params['quizId'];
    console.log("quizId::" + quizId);

    this.quizForm = this._formBuilder.group({
      quizId: [quizId], // Use the quizId from the route
      title: ['', Validators.required],
      description: ['', Validators.required],
      maxMarks: ['', Validators.required],
      numberOfQuestions: ['', Validators.required],
      isActive: ['', Validators.required],
      categoryObject: [null, Validators.required] // Set initial value to null
    });

    this.apiService.getAllCategory().subscribe(
      (res) => {
        this.categories = res;
        this.quizForm.get('categoryObject')?.setValue(this.categories[0]?.categoryId);
      },
      (error) => {
        console.log(error);
        this.toast.showWarn(error);
      }
    );
  }

  onSubmit() {
    if (this.quizForm.valid && !this.isSubmitting) {
      const quizData = {
        ...this.quizForm.value,
        categoryObject: {
          categoryId: this.quizForm.get('categoryObject')?.value
        }
      };

      console.log(quizData);
      this.isSubmitting = true;

      this.apiService.addQuiz(quizData).subscribe({
        next: (val: any) => {
          this.toast.showSuccessTopCenter("Category Successfully Added");
          console.log(val);
          this.router.navigate(['navbar', 'view-quiz']);
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
