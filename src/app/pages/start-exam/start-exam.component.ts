import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  timer:any;
  quizId!: number;
  qtitle!: string;
  questions: Question[] = [];
  userRole: string | null | undefined;
  correctAnswer: number = 0;
  quizForm: FormGroup;
  formSubmitted: boolean = false;
  unansweredQuestions: number[] = []; // Array to store unanswered question indexes

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private apiService: ApiService,
    private toast: PopupService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    
  ) {
    this.quizId = this._route.snapshot.params['quizId'];
    this.qtitle = this._route.snapshot.params['title'];

    this.quizForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.userRole = this.coreService.getUserRole();
    this.loadQuestions();
  }

loadQuestions() {
  this.apiService.getAllQuestion(this.quizId).subscribe(
    (res) => {
      this.questions = res;
      console.log('Questions loaded:', this.questions);

      this.questions.forEach((q) => {
        q['givenAnswer'] = '';
        this.quizForm.addControl(`question${q.questionId}`, this.formBuilder.control('', Validators.required));
      });

      this.timer = this.questions.length * 2 * 60;
      console.log('Timer value:', this.timer);

      this.startTimer();
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
      this.coreService.TotalCorrectAnswer=this.correctAnswer;
      this.toast.showSuccessTopCenter(this.correctAnswer)
      this.router.navigate(['navbar','result']);
    } else {
      console.log('Form is not valid. Please answer all questions.');
    }
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(t);
        this.handleUnansweredQuestions();
        this.submitQuiz(); // Submit the quiz after handling unanswered questions
      } else {
        this.timer--;
      }
    }, 1000);
  }

  handleUnansweredQuestions() {
    this.unansweredQuestions = [];
    this.questions.forEach((question, index) => {
      const selectedAnswer = this.quizForm.get(`question${question.questionId}`)?.value;
      if (!selectedAnswer) {
        this.unansweredQuestions.push(index);
      }
    });

    // Fill random options for unanswered questions
    this.unansweredQuestions.forEach(index => {
      const question = this.questions[index];
      const randomOption = this.getRandomOption(question);
      this.quizForm.get(`question${question.questionId}`)?.setValue(randomOption);
    });
  }

  getRandomOption(question: Question): string {
    const options = [question.option1, question.option2, question.option3, question.option4];
    const correctOption = question.answer;
    
    // Remove the correct option from the array
    const remainingOptions = options.filter(option => option !== correctOption);
    
    // Randomly select an option from the remaining options
    const randomIndex = Math.floor(Math.random() * remainingOptions.length);
    return remainingOptions[randomIndex];
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    console.log('Formatted Time:', `${mm} min : ${ss} sec`);
    return `${mm} min : ${ss} sec`;
  }
  
}
