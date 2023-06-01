import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RolesporPantallaListComponent } from './rolesPorPantalla/rolesPorPantalla-list/rolesPorPantalla-list.component';
import { RolesporPantallaCreateComponent } from './rolesPorPantalla/rolesPorPantalla-create/rolesPorPantalla-create.component'
import { RolesporPantallaupdateComponent } from './rolesPorPantalla/rolesPorPantalla-update/rolesPorPantalla-update.component'
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component'
import { AccesoGuard } from "src/app/shared/guard/acceso.guard";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "Roles",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Roles" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: RolesporPantallaListComponent,
          },
          {
            path: "Create",
            component: RolesporPantallaCreateComponent,
          },
          {
            path: "Update",
            component: RolesporPantallaupdateComponent,
          },
        ],
      },
      {
        path: "Usuarios",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Usuarios" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: UsuariosComponent,
          },
        ],
      },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceRoutingModule {}
