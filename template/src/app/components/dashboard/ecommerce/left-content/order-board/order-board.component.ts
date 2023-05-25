import { Component } from '@angular/core';
import * as data from '../../../../../shared/data/dashboard/ecommerce'
@Component({
  selector: 'app-order-board',
  templateUrl: './order-board.component.html',
  styleUrls: ['./order-board.component.scss']
})
export class OrderBoardComponent {

  public newOrders = data.newOrders
  public newCustomers = data.newCustomers
  public averageSale = data.averageSale
  public grossProfit = data.grossProfit
 
}
