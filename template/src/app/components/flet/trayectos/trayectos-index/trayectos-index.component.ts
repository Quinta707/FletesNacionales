import { Component } from '@angular/core';
import { Trayectos } from 'src/app/shared/model/trayectos.model';
import { TrayectosService } from 'src/app/shared/services/trayectos.service';

@Component({
  selector: 'app-trayectos-index',
  templateUrl: './trayectos-index.component.html',
  styleUrls: ['./trayectos-index.component.scss']
})
export class TrayectosIndexComponent {
  trayectos!: Trayectos[];
 
  constructor(private service:TrayectosService){}
 
  ngOnInit(): void {
    this.service.getTrayectos()
    .subscribe((data: any)=>{
      this.trayectos= data.data;
    })
  }
}
