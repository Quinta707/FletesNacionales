import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { FleteListComponent } from './fletes/fletes-list/fletes-list.component';

import { FletRoutingModule } from './flet-routing.module';

import { TrayectosIndexComponent } from './trayectos/trayectos-index/trayectos-index.component';

@NgModule({
  declarations: [
    FleteListComponent,
    TrayectosIndexComponent,
  ],
  imports: [
    CommonModule,
    FletRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class FletModule { }
