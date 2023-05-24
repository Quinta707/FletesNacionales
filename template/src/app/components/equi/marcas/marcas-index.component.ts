import { Component } from '@angular/core';
import { Marcas } from '../../../shared/model/Marcas.model';
import { MarcasService } from '../../../shared/services/marcas.service';

@Component({
  selector: 'app-marcas-index',
  templateUrl: './marcas-index.component.html',
  styleUrls: ['./marcas-index.component.scss']
})
export class MarcasIndexComponent {
    marcas!: Marcas[];
 
    constructor(private service:MarcasService){}
   
    ngOnInit(): void {
     this.service.getMarcas()
     .subscribe((data: any)=>{
       this.marcas= data.data;
     })
    }

    Nuevo(){
      
    }
}
