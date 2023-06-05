import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

import { DepartamentosListComponent } from './departamentos/departamentos-list/departamentos-list.component'
import { MunicipiosListComponent } from "./municipios/municipios-list/municipios-list.component";
import { EstadosDelPedidoListComponent } from './estadosDelPedido/estadosDelPedido-list/estadosDelPedido-list.component'
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component'
import { MetodosDePagoListComponent } from './metodosDePago/municipios-list/metodosDePago-list.component'
import { EstadosCivilesComponent } from './estadosCiviles/estadosCiviles-list/estadosCiviles-list.component'



import { GralRoutingModule } from './gral-routing.module';

@NgModule({
  declarations: [
    DepartamentosListComponent,
    MunicipiosListComponent,
    EstadosDelPedidoListComponent,
    EmpleadosListComponent,
    MetodosDePagoListComponent,
    EstadosCivilesComponent
  ],
  imports: [
    CommonModule,
    GralRoutingModule,
    NgSelectModule,
    AgGridModule,
    FormsModule,
    NgbModule,
    SharedModule,
  ]
})
export class GralModule { }
