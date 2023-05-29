import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MarcasIndexComponent } from "./marcas/marcas-index.component";
import { ModelosIndexComponent } from './modelos/modelos-index/modelos-index.component';
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
    ],
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiRoutingModule {}
