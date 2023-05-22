import { Component } from '@angular/core';
import { TipoDeVehiculo } from '../../../../../Models/TipoDeVehiculo';
import { ServiceService } from '../../../../../Service/service.service';

@Component({
  selector: 'app-tipovehiculo-index',
  templateUrl: './tipovehiculo-index.component.html',
  styleUrls: ['./tipovehiculo-index.component.scss']
})
export class TipoVehiculoIndexComponent {
  tipovehiculo!: TipoDeVehiculo[];
 
  constructor(private service:ServiceService){}
 
  ngOnInit(): void {
   this.service.getTipodeVehiculo()
   .subscribe((data: any)=>{
     this.tipovehiculo= data.data;
   })
  }

  Nuevo(){
    
  }
}
