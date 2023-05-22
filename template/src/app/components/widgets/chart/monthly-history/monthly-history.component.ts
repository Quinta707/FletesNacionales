import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/widget/chart'

@Component({
  selector: 'app-monthly-history',
  templateUrl: './monthly-history.component.html',
  styleUrls: ['./monthly-history.component.scss']
})
export class MonthlyHistoryComponent {

  public monthlyHistory = chartData.monthlyHistory
}
