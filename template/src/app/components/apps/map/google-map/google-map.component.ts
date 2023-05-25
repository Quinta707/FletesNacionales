import { Component, OnInit, ViewChild } from '@angular/core';
import { MapMarker, GoogleMap, MapInfoWindow } from '@angular/google-maps';
// import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})

export class GoogleMapComponent implements OnInit {

  public markers: any[];
  public markers1: any[];
  public zoom: number;

  constructor() {
    this.markers = [];
    this.zoom = 2;
  }

  ngOnInit() {
    const bangalore = { lat: 12.97, lng: 77.59 };
    this.markers1.push({
      position: {
        lat: 12.97,
        lng: 77.59
      },
      label: {
        color: "red",
        text: "Arial"
      },
      Option:{
        draggable: true,
        animation: google.maps.Animation.DROP,
        zoomControl: false,
        mapTypeControl: false, 
        streetViewControl: false,
        fullscreenControl: false
      }
      
    })

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 12,
        center: bangalore,
      }
    );

    this.markers.push({
      position: {
        lat: 35.717, 
        lng: 139.731 
      },
      label: {
        color: "black",
        text: "Madrid"
      },
      Option:{
        draggable: true,
        animation: google.maps.Animation.DROP,
      }
    });

    this.markers.push({
      position: {
        lat: 48.8615515,
        lng: 2.3112233
      },
      label: {
        color: "black",
        text: "Paris"
      }
    });
  }

  

  //Street View
  @ViewChild(GoogleMap) map!: GoogleMap;


  ngAfterViewInit(){
    const streetView = this.map.getStreetView();

    streetView.setOptions({
        position: { lat: 38.9938386, lng: -77.2515373 },
        pov: { heading: 70, pitch: -10 },
    });

    streetView.setVisible(true);
    const bounds = this.getBounds(this.markers);
    this.map.googleMap.fitBounds(bounds);
  }

  marker1 = { position: { lat: 38.9987208, lng: -77.2538699 } };
  marker2 = { position: { lat: 39.7, lng: -76.0 } };
  marker3 = { position: { lat: 37.9, lng: -76.8 } };

  markers5 = [this.marker1, this.marker2, this.marker3];


getBounds(markers){
  let north;
  let south;
  let east;
  let west;

  for (const marker of markers){
    // set the coordinates to marker's lat and lng on the first run.
    // if the coordinates exist, get max or min depends on the coordinates.
    north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
    south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
    east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
    west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
  };

  const bounds = { north, south, east, west };

  return bounds;
}
}

