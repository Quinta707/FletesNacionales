import { Component } from '@angular/core';
import * as chartData from '../../../../../shared/data/dashboard/ecommerce'
@Component({
  selector: 'app-monthly-order',
  templateUrl: './monthly-order.component.html',
  styleUrls: ['./monthly-order.component.scss']
})
export class MonthlyOrderComponent {

  public monthlyOrderChart = chartData.monthlyOrderChart;
  public show: boolean = false
  
  constructor() { }

  toggle() {
    this.show = !this.show
  }
}
