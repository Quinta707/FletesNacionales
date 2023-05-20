import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course'

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent {

  public upcomingChart = chartData.upcomingChart
  public show: boolean = false

  toggle() {
    this.show = !this.show
  }
}
