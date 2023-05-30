import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './Categoria/list/list.component';
import { AddComponent } from './Categoria/add/add.component';
import { EditarComponent } from './Categoria/editar/editar.component';

const routes: Routes = [
  {path: 'listar',component:ListComponent},
  {path: 'nuevo',component:AddComponent},
  {path: 'editar',component:EditarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
