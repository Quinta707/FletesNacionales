import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course'
@Component({
  selector: 'app-today-progress',
  templateUrl: './today-progress.component.html',
  styleUrls: ['./today-progress.component.scss']
})
export class TodayProgressComponent {

  public todayProgress = chartData.todayProgress

  constructor(){}
  
}
