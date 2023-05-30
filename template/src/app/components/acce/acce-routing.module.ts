import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RolesporPantallaListComponent } from './rolesPorPantalla/rolesPorPantalla-list/rolesPorPantalla-list.component';
import { RolesporPantallaCreateComponent } from './rolesPorPantalla/rolesPorPantalla-create/rolesPorPantalla-create.component'
import { RolesporPantallaupdateComponent } from './rolesPorPantalla/rolesPorPantalla-update/rolesPorPantalla-update.component'

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "Roles",
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
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceRoutingModule {}
