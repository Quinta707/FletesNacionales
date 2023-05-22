import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Model/Clientes';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  cliente:Cliente=new Cliente()
  constructor(private service: ServiceService, private router: Router){}

  ngOnInit(): void {
    this.Find();
  }

  Find(){
    const id: number | undefined = isNaN(parseInt(localStorage.getItem('id') ?? '', 10)) ? undefined: parseInt(localStorage.getItem('id') ?? '', 10)
    this.service.findCliente(id ?? 0)
    .subscribe((data : any) =>{
      this.cliente = data;
    })
  }

  Editar(){
    console.log(this.cliente)
    this.service.updateCliente(this.cliente)
    .subscribe(data=>{
      alert("Se actualizo con exito la categoria")
      this.router.navigate(['index']);
  })
  }

}
