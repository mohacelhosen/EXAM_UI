import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/questions';
import { ApiService } from 'src/app/services/api.service';
import { CoreService } from 'src/app/services/core.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent {
  quizId!: number;
  qtitle!: string;
  questions: Question[] = [];
  userRole: string | null | undefined;
  correctAnswer: number = 0;
  quizForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private apiService: ApiService,
    private toast: PopupService,
    private coreService: CoreService,
    private formBuilder: FormBuilder
  ) {
    this.quizId = this._route.snapshot.params['quizId'];
    this.qtitle = this._route.snapshot.params['title'];

    this.quizForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.userRole = this.coreService.getUserRole();
    this.apiService.getAllQuestion(this.quizId).subscribe(
      (res) => {
        this.questions = res;
        this.questions.forEach((q) => {
          q['givenAnswer'] = '';
          this.quizForm.addControl(`question${q.questionId}`, this.formBuilder.control('', Validators.required));
        });
      },
      (error) => {
        this.toast.showWarn(error);
      }
    );
  }

  submitQuiz() {
    this.correctAnswer = 0;

    // Mark the form as submitted
    this.formSubmitted = true;
    

    // Iterate through questions
    this.questions.forEach((question) => {
      const givenAnswer = this.quizForm.get(`question${question.questionId}`)?.value;
      console.log("Given Answer:: "+givenAnswer)
      console.log("Correct Answer:: "+question.answer)
      console.log("Both Are Same:: "+givenAnswer === question.answer)
      if (givenAnswer === question.answer) {
        this.correctAnswer++;
      }
    });

    // Ensure all questions are answered
    if (this.quizForm.valid) {
      console.log('Form is valid. Proceed with submission.');
      this.toast.showSuccessTopCenter(this.correctAnswer)
    } else {
      console.log('Form is not valid. Please answer all questions.');
    }
  }
}
