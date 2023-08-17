import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
 TotalCorrectAnswer=this.coreService.TotalCorrectAnswer;

 constructor(private coreService:CoreService){}
 
}
