import { Component } from "@angular/core";
import * as chartData from "../../../../shared/data/widget/general";
@Component({
  selector: "app-visitors",
  templateUrl: "./visitors.component.html",
  styleUrls: ["./visitors.component.scss"],
})
export class VisitorsComponent {
  public visitors = chartData.visitors;
  public show: boolean = false;

  toggle() {
    this.show = !this.show;
  }
}
