import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent {
  quizzes:Quiz[] = [];


  constructor(private apiService:ApiService, private toast:PopupService, private _route:ActivatedRoute,){

  }

  ngOnInit(): void {
    this.apiService.getAllQuiz().subscribe((res)=>{
      this.quizzes=res;
    },
    (error)=>{
      console.log(error)
        this.toast.showWarn(error);
    }
    );
  }


}
