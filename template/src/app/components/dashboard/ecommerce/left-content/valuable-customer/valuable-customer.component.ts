import { Component } from '@angular/core';

@Component({
  selector: 'app-valuable-customer',
  templateUrl: './valuable-customer.component.html',
  styleUrls: ['./valuable-customer.component.scss']
})
export class ValuableCustomerComponent {

  public show: boolean = false

  toggle() {
    this.show = this.show
  }
}
