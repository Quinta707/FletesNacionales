import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-sales',
  templateUrl: './recent-sales.component.html',
  styleUrls: ['./recent-sales.component.scss']
})
export class RecentSalesComponent {

  public show: boolean = false
  constructor() {}

  toggle(){
    this.show = !this.show
  }

  public recentSalesList = [
    {
      profile: "assets/images/dashboard/user/1.jpg",
      name: "Jane Cooper",
      time: "10 minutes ago",
      sales: "200.00"
    },
    {
      profile: "assets/images/dashboard/user/2.jpg",
      name: "Brooklyn Simmons",
      time: "19 minutes ago",
      sales: "970.00"
    },
    {
      profile: "assets/images/dashboard/user/3.jpg",
      name: "Leslie Alexander",
      time: "2 hours ago",
      sales: "300.00"
    },
    {
      profile: "assets/images/dashboard/user/4.jpg",
      name: "Travis Wright",
      time: "8 hours ago",
      sales: "450.00"
    },
    {
      profile: "assets/images/dashboard/user/5.jpg",
      name: "Mark Green",
      time: "1 day ago",
      sales: "768.00"
    },

  ]
}
