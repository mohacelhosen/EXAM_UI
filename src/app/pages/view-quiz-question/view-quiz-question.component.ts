import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/questions';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit{
  quizId!:number;
  qtitle!:string;
  questions:Question[]=[];

  constructor(private _route:ActivatedRoute, private apiService:ApiService, private toast:PopupService){ 
    this.quizId=this._route.snapshot.params['quizId'];
    this.qtitle=this._route.snapshot.params['title'];
    console.log(this.quizId)
    console.log(this.qtitle)
  }
  ngOnInit(): void {

    this.apiService.getAllQuestion(this.quizId).subscribe(
      (res)=>{
          this.questions=res;
      },
      (error)=>{
        this.toast.showWarn(error)
      }
    );
  }  

}
