import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FleteListComponent } from './fletes/fletes-list/fletes-list.component';
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
