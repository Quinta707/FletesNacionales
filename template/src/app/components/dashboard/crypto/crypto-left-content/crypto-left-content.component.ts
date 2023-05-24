import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/crypto'

@Component({
  selector: 'app-crypto-left-content',
  templateUrl: './crypto-left-content.component.html',
  styleUrls: ['./crypto-left-content.component.scss']
})
export class CryptoLeftContentComponent {

  public averageSales = chartData.averageSales
  public averageProfit = chartData.averageProfit
  public averageVisits = chartData.averageVisits
}
