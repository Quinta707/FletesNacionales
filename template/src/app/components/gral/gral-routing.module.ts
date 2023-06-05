import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DepartamentosListComponent } from "./departamentos/departamentos-list/departamentos-list.component";
import { MunicipiosListComponent } from "./municipios/municipios-list/municipios-list.component";
import { EstadosDelPedidoListComponent } from './estadosDelPedido/estadosDelPedido-list/estadosDelPedido-list.component'
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component'
import { MetodosDePagoListComponent } from './metodosDePago/municipios-list/metodosDePago-list.component'
import { EstadosCivilesComponent } from './estadosCiviles/estadosCiviles-list/estadosCiviles-list.component'
import { AccesoGuard } from "src/app/shared/guard/acceso.guard";


const routes: Routes = [
  {
    path: "",
    children: [
       {
         path: "Departamentos",
         canActivate: [AccesoGuard],
         data: {
           parametro: "Departamentos" // Aquí puedes definir el valor del parámetro que quieres enviar
         },
         children: [
           {
             path: "List",
             component: DepartamentosListComponent,
           },
         ],
       },
       {
        path: "Municipios",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Municipios" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: MunicipiosListComponent,
          },
        ],
      },
      {
       path: "EstadosDelPedido",
       canActivate: [AccesoGuard],
       data: {
         parametro: "EstadosDelPedido" // Aquí puedes definir el valor del parámetro que quieres enviar
       },
       children: [
         {
           path: "List",
           component: EstadosDelPedidoListComponent,
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
     path: "EstadosCiviles",
     canActivate: [AccesoGuard],
     data: {
       parametro: "Estado Civiles" // Aquí puedes definir el valor del parámetro que quieres enviar
     },
     children: [
       {
         path: "List",
         component: EstadosCivilesComponent,
       },
     ],
   },
    {
     path: "MetodosDePago",
     canActivate: [AccesoGuard],
     data: {
       parametro: "Metodos de Pagos" // Aquí puedes definir el valor del parámetro que quieres enviar
     },
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
