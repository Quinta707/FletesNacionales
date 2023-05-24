import { Component } from '@angular/core';
import { Modelos } from '../../../../shared/model/Modelos.model';
import { ModelosService } from '../../../../shared/services/modelos.service';

@Component({
  selector: 'app-modelos-index',
  templateUrl: './modelos-index.component.html',
  styleUrls: ['./modelos-index.component.scss']
})
export class ModelosIndexComponent {
  modelos!: Modelos[];
 
    constructor(private service:ModelosService){}
   
    ngOnInit(): void {
     this.service.getModelos()
     .subscribe((data: any)=>{
       this.modelos= data.data;
     })
    }

    Nuevo(){
      
    }
}
