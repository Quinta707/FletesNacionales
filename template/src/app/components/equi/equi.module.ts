import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { MarcasIndexComponent } from '././marcas/marcas-index.component';
import { ModelosIndexComponent } from './modelos/modelos-index/modelos-index.component';
import { TipoVehiculoIndexComponent } from './tipovehiculo/vehiculos-index/tipovehiculo-index.component';

import { EquiRoutingModule } from './equi-routing.module';

@NgModule({
  declarations: [
    MarcasIndexComponent,
    ModelosIndexComponent,
    TipoVehiculoIndexComponent,
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
