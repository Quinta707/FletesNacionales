import { Component, OnInit } from "@angular/core";
import * as data from "../../../shared/data/dashboard/crypto";
import * as dataDefault from "../../../shared/data/dashboard/default";
import * as dataCourse from "../../../shared/data/dashboard/online-course";
import * as dataSocial from "../../../shared/data/dashboard/social";
import * as dataEcommerce from "../../../shared/data/dashboard/ecommerce";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"],
})
export class GeneralComponent {
  public model: NgbDateStruct;
  public date: { year: number; month: number };

  public purchase = dataDefault.purchase;
  public salesReturn = dataDefault.salesReturn;
  public sales = dataDefault.sales;
  public purchaseRate = dataDefault.purchaseRate;

  public completed = dataCourse.completed;
  public progress = dataCourse.progress;

  public facebook = dataSocial.facebook;
  public instagram = dataSocial.instagram;
  public twitter = dataSocial.twitter;
  public youtube = dataSocial.youtube;

  public newOrders = dataEcommerce.newOrders;
  public newCustomers = dataEcommerce.newCustomers;
  public averageSale = dataEcommerce.averageSale;
  public grossProfit = dataEcommerce.grossProfit;

  public averageSales = data.averageSales;
  public averageProfit = data.averageProfit;

  constructor(private calendar: NgbCalendar) {
    this.model = calendar.getToday();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
