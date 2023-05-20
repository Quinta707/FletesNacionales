import { Component } from '@angular/core';

@Component({
  selector: 'app-buy-coins',
  templateUrl: './buy-coins.component.html',
  styleUrls: ['./buy-coins.component.scss']
})
export class BuyCoinsComponent {

  public show: boolean = false

  toggle() {
    this.show = !this.show
  }
}
