import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course'

@Component({
  selector: 'app-active-lessons',
  templateUrl: './active-lessons.component.html',
  styleUrls: ['./active-lessons.component.scss']
})
export class ActiveLessonsComponent {

  public chart1 = chartData.chart1
  public chart2 = chartData.chart2
  public chart3 = chartData.chart3
  
  constructor(){}
  
  public activeLessons = [
    {
      icon: "assets/images/dashboard-3/lessons/1.png",
      lessons: "UI/UX",
      title: "Web design",
      chart: "chart1",
      
    },
    {
      icon: "assets/images/dashboard-3/lessons/2.png",
      lessons: "Vue 3",
      title: "JS Framework",
      chart: "chart2"
    },
    {
      icon: "assets/images/dashboard-3/lessons/3.png",
      lessons: "Bootstrap 5",
      title: "Framework",
      chart: "chart3"
    },
  ]

  
}
