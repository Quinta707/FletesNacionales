import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Inputmask from 'inputmask';
import  { ClientService } from '../../../../shared/services/clientes.service';


@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.scss']
})
export class ClientesEditComponent  implements OnInit {
  public validate = false;
  public departamentosDDL: []; 
  depto: any[] = [];

  constructor(private router: Router, service: ClientService){}
  ngOnInit(): void {    
    const inputElementTelefono = document.getElementById('tuInput');
    const inputmaskTelefono = new Inputmask('+(999) 9999-9999');
    inputmaskTelefono.mask(inputElementTelefono);

    const inputElementIdentidad = document.getElementById('IdentidadInput');
    const inputmaskIdentidad = new Inputmask('9999-9999-99999');
    inputmaskIdentidad.mask(inputElementIdentidad);

    
  }


  public Guardar() {
    this.validate = !this.validate;
  }

  public Regresar() {
    this.router.navigate(['flet/Clientes/List']) ;
  }
}
