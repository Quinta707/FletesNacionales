import { Component } from '@angular/core';
import { Trayectos } from 'src/Models/Trayectos';
import { ServiceService } from '../../../../../Service/service.service';

@Component({
  selector: 'app-trayectos-index',
  templateUrl: './trayectos-index.component.html',
  styleUrls: ['./trayectos-index.component.scss']
})
export class TrayectosIndexComponent {
  trayectos!: Trayectos[];
 
  constructor(private service:ServiceService){}
 
  ngOnInit(): void {
    this.service.getTrayectos()
    .subscribe((data: any)=>{
      this.trayectos= data.data;
    })
  }
}
