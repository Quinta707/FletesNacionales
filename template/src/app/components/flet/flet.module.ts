import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { FleteListComponent } from './fletes/fletes-list/fletes-list.component';

import { FletRoutingModule } from './flet-routing.module';

@NgModule({
  declarations: [
    FleteListComponent,
  ],
  imports: [
    CommonModule,
    FletRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule,
  ]
})
export class FletModule { }
