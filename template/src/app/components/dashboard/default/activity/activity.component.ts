import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  public show: boolean = false
  constructor() {}

  toggle() {
    this.show = !this.show
  }

  public activity = [
    {
      date: "8th March, 2022",
      title: "Updated Product",
      dace: "Quisque a consequat ante sit amet magna...",
      time: "1 day ago",
      primaryDotColor: "primary"
    },
    {
      date: "15th Oct, 2022",
      title: "Tello just like your product",
      dace: "Quisque a consequat ante sit amet magna...",
      time: "Today",
      primaryDotColor: "warning"
    },
    {
      date: "20th Sep, 2022",
      title: "Tello just like your product",
      dace: "Quisque a consequat ante sit amet magna...",
      time: "12:00 PM",
      primaryDotColor: "secondary"
    },
  ]
}
