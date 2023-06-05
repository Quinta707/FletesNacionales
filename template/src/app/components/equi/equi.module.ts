import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

import { MarcasIndexComponent } from '././marcas/marcas-index.component';
import { ModelosIndexComponent } from './modelos/modelos-index/modelos-index.component';

import { EquiRoutingModule } from './equi-routing.module';

@NgModule({
  declarations: [
    MarcasIndexComponent,
    ModelosIndexComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    EquiRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class EquiModule { }
