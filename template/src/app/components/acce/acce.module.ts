import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AcceRoutingModule } from './acce-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RolesporPantallaListComponent } from './rolesPorPantalla/rolesPorPantalla-list/rolesPorPantalla-list.component';
import { RolesporPantallaupdateComponent } from './rolesPorPantalla/rolesPorPantalla-update/rolesPorPantalla-update.component';

import { RolesporPantallaCreateComponent } from './rolesPorPantalla/rolesPorPantalla-create/rolesPorPantalla-create.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component'
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    RolesporPantallaListComponent,
    RolesporPantallaCreateComponent,
    RolesporPantallaupdateComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    AcceRoutingModule,
    FormsModule,
    AgGridModule,
    NgbModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AcceModule { }
