import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './CLientes/list/list.component';
import { CreateComponent } from './CLientes/create/create.component';
import { EditarComponent } from './CLientes/editar/editar.component';

const routes: Routes = [
  {path: 'index', component:ListComponent},
  {path: 'create', component:CreateComponent},
  {path: 'edit', component:EditarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
