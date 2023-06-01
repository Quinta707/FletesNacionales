import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { ArchwizardModule } from 'angular-archwizard';
import { SharedModule } from '../../shared/shared.module';


import { ItemListComponent } from './item/items-list/items-list.component';
import { ClienteListComponent } from './clientes/clientes-list/clientes-list.component';
import { FleteListPropioComponent } from './fletes/fletes-list-propio/fletes-list-propio.component';
import { FleteCreateComponent } from './fletes/fletes-create/fletes-create.component';
import { FletedetailsComponent } from './fletes/fletes-details/fletes-details.component';

import { VehiculosLstComponent } from './vehiculos/vehiculos-lst/vehiculos-lst.component';
import { SucursalesListComponent } from './sucursales/sucursales-list/sucursales-list.component';
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component';
import { EstadosdelpedidoListComponent } from './estadosdelpedido/estadosdelpedido-list/estadosdelpedido-list.component';
import { TipodevehiculoListComponent } from './tipodevehiculo/tipodevehiculo-list/tipodevehiculo-list.component';

import { FleteListComponent } from './fletes/fletes-list/fletes-list.component';
import { FletRoutingModule } from './flet-routing.module';
import { TrayectosIndexComponent } from './trayectos/trayectos-index/trayectos-index.component';
import { PedidosIndexComponent } from './pedidos/pedidos-index/pedidos-index.component';
import { PedidosCreateComponent } from './pedidos/pedidos-create/pedidos-create.component';

import { GoogleMapsModule } from "@angular/google-maps";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AgGridModule } from 'ag-grid-angular';
import { ClientesCreateComponent } from './clientes/clientes-create/clientes-create.component';
import { ReporteComponent } from './reporte/reporte/reporte.component';

import { ClientesEditComponent } from './clientes/clientes-edit/clientes-edit.component';
import { EmpleadosCreateComponent } from './empleados/empleados-create/empleados-create.component';
import { EmpleadosEditComponent } from './empleados/empleados-edit/empleados-edit.component';
import { EmpleadosDetailsComponent } from './empleados/empleados-details/empleados-details.component';
import { ClientesDetailsComponent } from './clientes/clientes-details/clientes-details.component';


@NgModule({
  declarations: [
    FleteListComponent,
    FleteListPropioComponent,
    FletedetailsComponent,
    ItemListComponent,
    ClienteListComponent,
    FleteCreateComponent,
    VehiculosLstComponent,
    SucursalesListComponent,
    EmpleadosListComponent,
    EstadosdelpedidoListComponent,
    TipodevehiculoListComponent,
    TrayectosIndexComponent,
    PedidosIndexComponent,
    ClientesCreateComponent,
    ReporteComponent,
    PedidosCreateComponent,
    ClientesEditComponent,
    EmpleadosCreateComponent,
    EmpleadosEditComponent,
    EmpleadosDetailsComponent,
    ClientesDetailsComponent,
  ],
  imports: [
    CommonModule,
    FletRoutingModule,
    AgGridModule,
    LeafletModule,
    GoogleMapsModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    ArchwizardModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class FletModule { }
