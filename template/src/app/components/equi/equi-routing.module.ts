import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MarcasIndexComponent } from "./marcas/marcas-index.component";
import { ModelosIndexComponent } from './modelos/modelos-index/modelos-index.component';
import { VehiculosListComponent } from './vehiculos/vehiculos-list/vehiculos-list.component';
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "Marcas",
        children: [
          {
            path: "List",
            component: MarcasIndexComponent,
          },
        ],
        
      },
      {
        path: "Modelos",
        children: [
          {
            path: "List",
            component: ModelosIndexComponent,
          },
        ],
      },
      {
        path: "Vehiculos",
        children: [
          {
            path: "List",
            component: VehiculosListComponent,
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
export class EquiRoutingModule {}
