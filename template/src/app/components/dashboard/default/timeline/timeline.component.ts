import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/default'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  
  public timeLine = chartData.timeLine;
  public show: boolean = false
  
  constructor() { }

  toggle() {
    this.show = !this.show
  }
}
