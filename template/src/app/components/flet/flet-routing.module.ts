import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FleteListComponent } from './fletes/fletes-list/fletes-list.component';
import { ItemListComponent } from './item/items-list/items-list.component';
import { ClienteListComponent } from './clientes/clientes-list/clientes-list.component';
import { FleteListPropioComponent } from './fletes/fletes-list-propio/fletes-list-propio.component';

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
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletRoutingModule {}
