import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { MarcasIndexComponent } from '././marcas/marcas-index.component';
import { ModelosIndexComponent } from './modelos/modelos-index/modelos-index.component';

import { EquiRoutingModule } from './equi-routing.module';
import { MarcasDetailsComponent } from './marcas/marcas-details/marcas-details.component';

@NgModule({
  declarations: [
    MarcasIndexComponent,
    ModelosIndexComponent,
    MarcasDetailsComponent,
  ],
  imports: [
    CommonModule,
    EquiRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class EquiModule { }
