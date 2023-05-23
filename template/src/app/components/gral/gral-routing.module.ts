import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DepartamentosListComponent } from "./departamentos/departamentos-list/departamentos-list.component";
import { MunicipiosListComponent } from "./municipios/municipios-list/municipios-list.component";
import { EstadosDelPedidoListComponent } from './estadosDelPedido/estadosDelPedido-list/estadosDelPedido-list.component'
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component'
import { MetodosDePagoListComponent } from './metodosDePago/metodosDePago-list/metodosDePago-list.component'

import { EstadosCivilesComponent } from './estadosCiviles/estadosCiviles-list/estadosCiviles-list.component'


const routes: Routes = [
  {
    path: "",
    children: [
       {
         path: "Departamentos",
         children: [
           {
             path: "List",
             component: DepartamentosListComponent,
           },
         ],
       },
       {
        path: "Municipios",
        children: [
          {
            path: "List",
            component: MunicipiosListComponent,
          },
        ],
      },
      {
       path: "EstadosDelPedido",
       children: [
         {
           path: "List",
           component: EstadosDelPedidoListComponent,
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
         component: EstadosCivilesComponent,
       },
     ],
   },
    {
     path: "MetodosDePago",
     children: [
       {
         path: "List",
         component: MetodosDePagoListComponent,
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
export class GralRoutingModule {}
