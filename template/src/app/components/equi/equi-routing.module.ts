import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MarcasIndexComponent } from "./marcas/marcas-index.component";
import { ModelosIndexComponent } from './modelos/modelos-index/modelos-index.component';
<<<<<<< HEAD
import { AccesoGuard } from "src/app/shared/guard/acceso.guard";
=======
import { VehiculosListComponent } from './vehiculos/vehiculos-list/vehiculos-list.component';
>>>>>>> nya
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "Marcas",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Marcas" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
        children: [
          {
            path: "List",
            component: MarcasIndexComponent,
          },
        ],
        
      },
      {
        path: "Modelos",
        canActivate: [AccesoGuard],
        data: {
          parametro: "Modelos" // Aquí puedes definir el valor del parámetro que quieres enviar
        },
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
