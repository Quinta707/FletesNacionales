import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/default'

@Component({
  selector: 'app-orders-profit',
  templateUrl: './orders-profit.component.html',
  styleUrls: ['./orders-profit.component.scss']
})
export class OrdersProfitComponent {

  constructor(){}
  public profit = chartData.profit

}
