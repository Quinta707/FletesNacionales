import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course'

@Component({
  selector: 'app-activity-hours',
  templateUrl: './activity-hours.component.html',
  styleUrls: ['./activity-hours.component.scss']
})
export class ActivityHoursComponent {

  public activityChart = chartData.activityChart
  public show: boolean= false


  constructor(){}

  toggle() {
    this.show = !this.show
  }
}
