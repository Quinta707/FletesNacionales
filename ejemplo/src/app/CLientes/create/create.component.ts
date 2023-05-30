import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Model/Clientes';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
 cate: Cliente = new Cliente();
 
 constructor(private service: ServiceService, private router: Router){}
 Guardar(){
  this.service.createCliente(this.cate)
  .subscribe(data=>{
      alert("Se agrego con exito la categoria")
      this.router.navigate(['index']);
  })
 }
}
