import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course'

@Component({
  selector: 'app-learning-overview',
  templateUrl: './learning-overview.component.html',
  styleUrls: ['./learning-overview.component.scss']
})
export class LearningOverviewComponent {

  public learningChart = chartData.learningChart
  public show : boolean = false

  constructor(){}

  toggle() {
    this.show = !this.show
  }
}
