import { Component, OnInit } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as data from "../../../shared/data/dashboard/default";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  constructor(calendar: NgbCalendar) {}

  ngOnInit() {}

  public purchase = data.purchase
  public salesReturn = data.salesReturn
  public sales = data.sales
  public purchaseRate = data.purchaseRate

  
}
