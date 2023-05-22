import { Component } from '@angular/core';
import * as chartData from '../../../../../shared/data/dashboard/ecommerce'

@Component({
  selector: 'app-monthly-profits',
  templateUrl: './monthly-profits.component.html',
  styleUrls: ['./monthly-profits.component.scss']
})
export class MonthlyProfitsComponent {

  public monthlyProfits = chartData.monthlyProfits;
  
  constructor() { }
}
