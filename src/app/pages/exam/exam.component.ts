import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  catagoryId!:number;
  quizzes:Quiz[] = [];
 

  constructor(private apiService:ApiService, private toast:PopupService,private _route:ActivatedRoute,){
    this.catagoryId=this._route.snapshot.params['catagoryId'];
    console.log(this.catagoryId)
  }

  ngOnInit(): void {
    this.apiService.getQuizByCategoryId(this.catagoryId).subscribe((res)=>{
      this.quizzes=res;
      console.log(this.quizzes)
    },
    (error)=>{
      console.log(error)
        this.toast.showWarn(error);
    }
    );
  }
}
