import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-sale-status',
  templateUrl: './sale-status.component.html',
  styleUrls: ['./sale-status.component.scss']
})
export class SaleStatusComponent {

  @Input() data: any
}
