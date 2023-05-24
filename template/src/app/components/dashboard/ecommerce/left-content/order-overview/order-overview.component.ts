import { Component } from '@angular/core';
import * as chartData from '../../../../../shared/data/dashboard/ecommerce'

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent {

  public orderOverview = chartData.orderOverview;
  public orderBar = chartData.orderBar;
  
  constructor() { }
}
