import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { FleteListComponent } from './fletes/fletes-list/fletes-list.component';
import { ItemListComponent } from './item/items-list/items-list.component';
import { ClienteListComponent } from './clientes/clientes-list/clientes-list.component';
import { FleteListPropioComponent } from './fletes/fletes-list-propio/fletes-list-propio.component';

import { FletRoutingModule } from './flet-routing.module';
import { VehiculosLstComponent } from './vehiculos/vehiculos-lst/vehiculos-lst.component';
import { SucursalesListComponent } from './sucursales/sucursales-list/sucursales-list.component';
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component';
import { EstadosdelpedidoListComponent } from './estadosdelpedido/estadosdelpedido-list/estadosdelpedido-list.component';
import { TipodevehiculoListComponent } from './tipodevehiculo/tipodevehiculo-list/tipodevehiculo-list.component';
import { DepartamentosListComponent } from './departamentos/departamentos-list/departamentos-list.component';

@NgModule({
  declarations: [
    FleteListComponent,
    FleteListPropioComponent,
    ItemListComponent,
    ClienteListComponent,
    VehiculosLstComponent,
    SucursalesListComponent,
    EmpleadosListComponent,
    EstadosdelpedidoListComponent,
    TipodevehiculoListComponent,
    DepartamentosListComponent,
  ],
  imports: [
    CommonModule,
    FletRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule,
  ]
})
export class FletModule { }
