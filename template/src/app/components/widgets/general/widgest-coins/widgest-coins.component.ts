import { Component } from '@angular/core';
import * as data from "../../../../shared/data/dashboard/crypto";
import * as dataDefault from "../../../../shared/data/dashboard/default";

@Component({
  selector: 'app-widgest-coins',
  templateUrl: './widgest-coins.component.html',
  styleUrls: ['./widgest-coins.component.scss']
})
export class WidgestCoinsComponent {

  public Bitcoin = data.Bitcoin;
  public Ethereum = data.Ethereum;
  public LeaveTravel = data.LeaveTravel;

  public salesReturn = dataDefault.salesReturn;
  public averageProfit = data.averageProfit;

  public averageSales = data.averageSales;

  
}
