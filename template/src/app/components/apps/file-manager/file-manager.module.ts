import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FileManagerComponent } from './file-manager.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FileManagerRoutingModule
  ],
  declarations: [FileManagerComponent]
})
export class FileManagerModule { }
