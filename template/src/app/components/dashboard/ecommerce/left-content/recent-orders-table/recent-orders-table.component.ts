import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-orders-table',
  templateUrl: './recent-orders-table.component.html',
  styleUrls: ['./recent-orders-table.component.scss']
})
export class RecentOrdersTableComponent {

  public openTab : string = "shirt";
  public show : boolean = false

  constructor() {}

  tabbed(value){
    this.openTab = value
  }

  toggle() {
    this.show = !this.show
  }

  tableData = [
    {
      tag: "shirt",
      image: "assets/images/dashboard-2/order/1.png"
    },
    {
      tag: "television",
      image: "assets/images/dashboard-2/order/2.png"
    },
    {
      tag: "headphone",
      image: "assets/images/dashboard-2/order/3.png"
    },
    {
      tag: "chair",
      image: "assets/images/dashboard-2/order/4.png"
    },
    {
      tag: "lamp",
      image: "assets/images/dashboard-2/order/5.png"
    },
  ]
}
