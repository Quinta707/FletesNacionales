import { Component, OnInit } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as data from "../../../shared/data/dashboard/default";
import * as chartData from '../../../shared/data/chart/google-chart';

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

  owlcarousel1 = [
    { id: 1, img: "assets/images/slider/camion.jpg"},
    { id: 2, img: "assets/images/slider/vans.jpg" },
    { id: 3, img: "assets/images/slider/hk11.jpg" },
    { id: 4, img: "assets/images/slider/van1.jpg" },
    { id: 5, img: "assets/images/slider/hk2.jpg" },
    { id: 6, img: "assets/images/slider/ultimoultimo.jpg" }
  ];

  owlcarousel13Options = {
    items: 3,
    loop: true,
    lazyLoad: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1,
        mergeFit: true
      },
      768: {
        items: 2,
        mergeFit: true
      },
      992: {
        items: 3,
        mergeFit: true

      }
    }
  }

  // // Pie Chart
  // public pieChart2 = chartData.pieChart2;
  
}
