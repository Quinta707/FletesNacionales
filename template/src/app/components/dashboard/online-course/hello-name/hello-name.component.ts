import { Component } from '@angular/core';
import * as data from '../../../../shared/data/dashboard/online-course'
@Component({
  selector: 'app-hello-name',
  templateUrl: './hello-name.component.html',
  styleUrls: ['./hello-name.component.scss']
})
export class HelloNameComponent {
  public completed = data.completed
  public progress = data.progress
 
}
