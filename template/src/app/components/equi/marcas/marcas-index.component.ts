import { Component } from '@angular/core';
import { Marcas } from '../../../../Models/Marcas';
import { ServiceService } from '../../../../Service/service.service';

@Component({
  selector: 'app-marcas-index',
  templateUrl: './marcas-index.component.html',
  styleUrls: ['./marcas-index.component.scss']
})
export class MarcasIndexComponent {
    marcas!: Marcas[];
 
    constructor(private service:ServiceService){}
   
    ngOnInit(): void {
     this.service.getMarcas()
     .subscribe((data: any)=>{
       this.marcas= data.data;
     })
    }

    Nuevo(){
      
    }
}
