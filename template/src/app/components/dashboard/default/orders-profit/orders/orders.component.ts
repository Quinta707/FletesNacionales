import { Component } from '@angular/core';
import * as chartData from '../../../../../shared/data/dashboard/default'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  public orders = chartData.orders;

}
