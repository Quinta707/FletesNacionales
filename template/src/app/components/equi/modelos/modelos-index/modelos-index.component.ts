import { Component } from '@angular/core';
import { Modelos } from '../../../../../Models/Modelos';
import { ServiceService } from '../../../../../Service/service.service';

@Component({
  selector: 'app-modelos-index',
  templateUrl: './modelos-index.component.html',
  styleUrls: ['./modelos-index.component.scss']
})
export class ModelosIndexComponent {
  modelos!: Modelos[];
 
    constructor(private service:ServiceService){}
   
    ngOnInit(): void {
     this.service.getModelos()
     .subscribe((data: any)=>{
       this.modelos= data.data;
     })
    }

    Nuevo(){
      
    }
}
