import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories:Category[] = [];

  constructor(private apiService:ApiService, private toast:PopupService){}

  ngOnInit(): void {
    this.apiService.getAllCategory().subscribe((res)=>{
      this.categories=res;
    },
    (error)=>{
      console.log(error)
        this.toast.showWarn(error);
    }
    );
  }



}
