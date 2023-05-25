import { Component } from '@angular/core';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { ServiceService } from '../../../../shared/services/pedidos.service';

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html',
  styleUrls: ['./pedidos-index.component.scss']
})
export class PedidosIndexComponent {
  pedidos!: Pedidos[];
 
  constructor(private service:ServiceService){}
 
  ngOnInit(): void {
   this.service.getPedidos()
   .subscribe((data: any)=>{
     this.pedidos= data.data;
   })
  }

  Nuevo(){
    
  }
}
