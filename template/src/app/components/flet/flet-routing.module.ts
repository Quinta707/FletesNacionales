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

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "Fletes",
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
        ],
      },
      {
        path: "Items",
        children: [
          {
            path: "List",
            component: ItemListComponent,
          },
          
        ],
      },
      {
        path: "Clientes",
        children: [
          {
            path: "List",
            component: ClienteListComponent,
          },
          
        ],
      },
      {
        path: "Vehiculos",
        children: [
          {
            path: "List",
            component: VehiculosLstComponent,
          },
          
        ],
      }, 
      {
        path: "Sucursales",
        children: [
          {
            path: "List",
            component: SucursalesListComponent,
          },
          
        ],
      },
      {
        path: "Empleados",
        children: [
          {
            path: "List",
            component: EmpleadosListComponent,
          },
          
        ],
      },    
      {
        path: "EstadosdelPedido",
        children: [
          {
            path: "List",
            component: EstadosdelpedidoListComponent,
          },
          
        ],
      },
      {
        path: "TipoDeVehiculo",
        children: [
          {
            path: "List",
            component: TipodevehiculoListComponent,
          },
          
        ],
        ],
        
      },
      {
        path: "Trayectos",
        children: [
          {
            path: "List",
            component: TrayectosIndexComponent,
          },
        ],
        
      },
      {
        path: "Pedidos",
        children: [
          {
            path: "List",
            component: PedidosIndexComponent,
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
