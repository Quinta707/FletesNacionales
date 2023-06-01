import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FleteListComponent } from './fletes/fletes-list/fletes-list.component';
import { FleteCreateComponent } from './fletes/fletes-create/fletes-create.component';
import { ItemListComponent } from './item/items-list/items-list.component';
import { ClienteListComponent } from './clientes/clientes-list/clientes-list.component';
import { FleteListPropioComponent } from './fletes/fletes-list-propio/fletes-list-propio.component';
import { VehiculosLstComponent } from './vehiculos/vehiculos-lst/vehiculos-lst.component';
import { SucursalesListComponent } from './sucursales/sucursales-list/sucursales-list.component';
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component';
import { EstadosdelpedidoListComponent } from './estadosdelpedido/estadosdelpedido-list/estadosdelpedido-list.component';
import { TipodevehiculoListComponent } from './tipodevehiculo/tipodevehiculo-list/tipodevehiculo-list.component';
import { TrayectosIndexComponent } from "./trayectos/trayectos-index/trayectos-index.component";
import { PedidosIndexComponent } from './pedidos/pedidos-index/pedidos-index.component';
import { FletedetailsComponent } from './fletes/fletes-details/fletes-details.component';
import { ClientesCreateComponent } from './clientes/clientes-create/clientes-create.component';

import { AccesoGuard } from '../../shared/guard/acceso.guard';

import { ReporteComponent } from './reporte/reporte/reporte.component';
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "Fletes",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Fletes" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: FleteListComponent,
          },
          {
            path: "Create",
            component: FleteCreateComponent,
          },
          {
            path: "PersonalList",
            component: FleteListPropioComponent,
          },
          {
            path: "Details",
            component: FletedetailsComponent,
          },
        ],
      },
      {
        path: "Items",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Items" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: ItemListComponent,
          },
          
        ],
      },
      {
        path: "Clientes",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Clientes" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: ClienteListComponent,
          },
          {
            path: "Create",
            component: ClientesCreateComponent,
          },
          
        ],
      },
      {
        path: "Vehiculos",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Vehiculos" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: VehiculosLstComponent,
          },
          
        ],
      }, 
      {
        path: "Sucursales",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Sucursales" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: SucursalesListComponent,
          },
          
        ],
      },
      {
        path: "Empleados",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Empleados" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: EmpleadosListComponent,
          },
          
        ],
      },    
      {
        path: "EstadosdelPedido",
        canActivate: [AccesoGuard],
        data: {
          parametro: "EstadosdelPedido" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: EstadosdelpedidoListComponent,
          },
          
        ],
      },
      {
        path: "Trayectos",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Trayectos" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: TrayectosIndexComponent,
          },
        ],
        
      },
      {
        path: "Pedidos",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Pedidos" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: PedidosIndexComponent,
          },
        ],
        
      },
      {
        path: "TipodeVehiculo",
        canActivate: [AccesoGuard],
        data: {
          parametro: "TipodeVehiculo" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: TipodevehiculoListComponent,
          },
        ],
        
      },
      {
        path: "Reporte",
        children: [
          {
            path: "List",
            component: ReporteComponent,
          },
        ],
        
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletRoutingModule {}
