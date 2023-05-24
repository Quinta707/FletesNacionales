import { Component } from '@angular/core';

@Component({
  selector: 'app-total-userswidgets',
  templateUrl: './total-userswidgets.component.html',
  styleUrls: ['./total-userswidgets.component.scss']
})
export class TotalUserswidgetsComponent {
  public show : boolean = false

  toggle() {
    this.show = !this.show
  }
}
