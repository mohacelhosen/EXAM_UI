import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
 TotalCorrectAnswer=this.coreService.TotalCorrectAnswer;

 constructor(private coreService:CoreService){}

 chart = new Chart({
  chart: {
    type: 'line'
  },
  title: {
    text: 'Linechart'
  },
  credits: {
    enabled: false
  },
  series: [
    {
      name: 'Line 1',
      data: [1, 2, 3]
    }
  ]
});

// add point to chart serie
add() {
  this.chart.addPoint(Math.floor(Math.random() * 10));
}
 
}
