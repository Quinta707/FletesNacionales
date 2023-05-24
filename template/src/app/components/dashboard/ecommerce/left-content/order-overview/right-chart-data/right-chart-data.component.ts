import { Component } from '@angular/core';
export interface Balance {
  icon: string;
  title: string;
  price: string;
  growth: string;
  colorClass: string;
  show?: boolean
}
@Component({
  selector: 'app-right-chart-data',
  templateUrl: './right-chart-data.component.html',
  styleUrls: ['./right-chart-data.component.scss']
})
export class RightChartDataComponent {

  constructor() {}

  ngOnInit(): void {}

  toggle(item: Balance) {
    item.show = !item.show;
  }

  public balance: Balance[] = [
    {
      icon: "income",
      title: "Income",
      price: "$22,678",
      growth: "+$456",
      colorClass: "success",
    },
    {
      icon: "expense",
      title: "Expense",
      price: "$12,057",
      growth: "+$256",
      colorClass: "danger",
    },
    {
      icon: "doller-return",
      title: "Cashback",
      price: "8,475",
      growth: "",
      colorClass: "success",
    },
  ];
}
