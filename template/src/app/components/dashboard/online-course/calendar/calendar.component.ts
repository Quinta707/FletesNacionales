import { Component } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent {
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor(private calendar: NgbCalendar) {
    this.model = calendar.getToday();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
