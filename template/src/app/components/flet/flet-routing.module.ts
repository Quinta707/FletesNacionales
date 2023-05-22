import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FleteListComponent } from './fletes/fletes-list/fletes-list.component';
import { ItemListComponent } from './item/items-list/items-list.component';
import { ClienteListComponent } from './clientes/clientes-list/clientes-list.component';
import { FleteListPropioComponent } from './fletes/fletes-list-propio/fletes-list-propio.component';
import { VehiculosLstComponent } from './vehiculos/vehiculos-lst/vehiculos-lst.component';
import { SucursalesListComponent } from './sucursales/sucursales-list/sucursales-list.component';
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component';
import { EstadoscivilesListComponent } from './estadosciviles/estadosciviles-list/estadosciviles-list.component';

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
        path: "EstadosCiviles",
        children: [
          {
            path: "List",
            component: EstadoscivilesListComponent,
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
