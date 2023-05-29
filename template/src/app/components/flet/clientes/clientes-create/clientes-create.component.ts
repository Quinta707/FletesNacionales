import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Inputmask from 'inputmask';
import { Clientes } from '../../../../shared/model/clientes.model';
import { ClientService } from '../../../../shared/services/clientes.service';

import { TableService } from '../../../../shared/services/estadosCiviles.service';

@Component({
  selector: 'app-clientes-create',
  templateUrl: './clientes-create.component.html',
  styleUrls: ['./clientes-create.component.scss']
})
export class ClientesCreateComponent {
  public validate = false;

  public EstadosCivilesDDL = [
    { value: "1", label: "", job: "Developer" },
    { value: "2", label: "Wyoming", job: "Developer" },
    { value: "3", label: "Coming", job: "Designer",disabled:true },
    { value: "4", label: "Hanry Die", job: "Designer" },
    { value: "5", label: "John Doe", job: "Designer" },
  ];

  constructor(private router: Router){

  }
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
}
