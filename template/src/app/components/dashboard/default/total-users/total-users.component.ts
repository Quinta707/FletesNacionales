import { Component } from '@angular/core';

@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.scss']
})
export class TotalUsersComponent {

  public show: boolean = false

  toggle() {
    this.show = !this.show
  }
}
