import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Quiz } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-view-category-quiz',
  templateUrl: './view-category-quiz.component.html',
  styleUrls: ['./view-category-quiz.component.css']
})
export class ViewCategoryQuizComponent {
  catagoryId!:number;
  quizzes:Quiz[] = [];

  constructor(private apiService:ApiService, private toast:PopupService,private _route:ActivatedRoute,){
    this.catagoryId=this._route.snapshot.params['catagoryId'];
    console.log(this.catagoryId)
  }

  ngOnInit(): void {
    this.apiService.getQuizByCategoryId(this.catagoryId).subscribe((res)=>{
      this.quizzes=res;
    },
    (error)=>{
      console.log(error)
        this.toast.showWarn(error);
    }
    );
  }

}
