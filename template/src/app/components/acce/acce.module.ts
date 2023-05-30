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

import { RolesporPantallaCreateComponent } from './rolesPorPantalla/rolesPorPantalla-create/rolesPorPantalla-create.component'
import { AngularDualListBoxModule } from 'angular-dual-listbox';

@NgModule({
  declarations: [
    RolesporPantallaListComponent,
    RolesporPantallaCreateComponent,
    RolesporPantallaupdateComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    AcceRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularDualListBoxModule
  ]
})
export class AcceModule { }
