import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { SharedModule } from "../../../shared/shared.module";
import { GalleryDescComponent } from './gallery-desc/gallery-desc.component';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { HoverEffectComponent } from './hover-effect/hover-effect.component';
import { MesonryComponent } from './mesonry/mesonry.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';


import 'hammerjs';
import 'mousetrap';


@NgModule({
  declarations: [GalleryGridComponent, GalleryDescComponent, MesonryComponent, HoverEffectComponent,],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    GalleryModule,
    NgxMasonryModule,
    SharedModule,
    LightboxModule
  ]
})
export class GalleryDemoModule { }
