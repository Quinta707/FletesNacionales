import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from "../../../shared/shared.module";
import { MapRoutingModule } from './map-routing.module';

import { GoogleMapComponent } from './google-map/google-map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
  declarations: [GoogleMapComponent, LeafletMapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    LeafletModule,
    HttpClientModule,
    SharedModule,
    GoogleMapsModule
  ]
})
export class MapModule { }
