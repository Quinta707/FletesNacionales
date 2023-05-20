import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/default'

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent {

  public recentOrders = chartData.recentOrders;
  public show : boolean = false
  constructor() { }

  toggle(){
    this.show = !this.show
  }
}
