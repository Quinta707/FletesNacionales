import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Inputmask from 'inputmask';
import  { ClientService } from '../../../../shared/services/clientes.service';


@Component({
  selector: 'app-clientes-create',
  templateUrl: './clientes-create.component.html',
  styleUrls: ['./clientes-create.component.scss']
})
export class ClientesCreateComponent  implements OnInit {
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

    // this.DeptoDDl();
    
  }

  // DeptoDDl(): void {
  //   this.service.getDeptosDdl().subscribe(
  //     (response: any) => {
  //       this.depto = response;
  //     },
  //     (error: any) => {
  //       console.error('Error al obtener los datos de la API:', error);
  //     }
  //   );
  // }

  public Guardar() {
    this.validate = !this.validate;
  }
}
