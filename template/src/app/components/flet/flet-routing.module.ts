import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FleteComponent } from './fletes/fletes-list/fletes-list.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "list",
        component: FleteComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletRoutingModule {}
