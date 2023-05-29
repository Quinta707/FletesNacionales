import { Component, OnInit, QueryList, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { Vehiculos } from '../../../../shared/model/vehiculos.model';
import { Trayectos } from '../../../../shared/model/trayectos.model';
import { TableService } from '../../../../shared/services/fletes.service';
import { NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from 'angular-archwizard';
import { CustomValidator } from '../../../../shared/validators/OnlyNumbers'
import Swal from 'sweetalert2';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-flete-details',
  templateUrl: './fletes-details.component.html',
  styleUrls: ['./fletes-details.component.scss']
})
export class FletedetailsComponent implements OnInit {

  //mapa

  //Control de las capas visibles
  layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': L.circle([46.95, -122], { radius: 5000 }),
      'Big Square': L.polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  }

  //Declaracion del mapa
  private map4: L.Map;

  //Coordenadas Iniciales
  private homeCoords = {
    lat: 15.5062156,
    lon: -88.0248937
  };
  private coordenadasIncio = {
    lat: 15.5062156,
    lon: -88.0248937
  };
  private coordenadasFin = {
    lat: 15.5062156,
    lon: -88.0248937
  };
  private coordenadasUbicacion = {
    lat: 0,
    lon: 0
  };

  //Iconos
  private markerIcon = {
    icon: L.icon({
      iconSize: [40, 40],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "assets/images/maker-icon.png",
    })
  };
  private IconInicio = {
    icon: L.icon({
      iconSize: [40, 40],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "assets/images/map_icon_Inicio.png",
    })
  };
  private IconDestino = {
    icon: L.icon({
      iconSize: [40, 40],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "assets/images/map_icon_Destino.png",
    })
  };
  private IconPaquete = {
    icon: L.icon({
      iconSize: [40, 40],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "assets/images/map_icon_paquete.png",
      // iconUrl: "assets/images/map_icon_paquete_añternative.png",
    })
  };
  private IconCamion = {
    icon: L.icon({
      iconSize: [40, 40],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "assets/images/map_icon_gps.png",
      // iconUrl: "assets/images/map_icon_paquete_añternative.png",
    })
  };
  // actualiza el mapa con nuevas coordenadas
  async updateMarker(municipio: string) {
    const popupText: string = 'Este pedido llegara hasta ' + municipio
    const popupInfo = `<b style="color: red; background-color: white">${popupText}</b>`;
    if (this.map4) {
      this.map4.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map4.removeLayer(layer);
        }
      });

      const coordenadasMuni: any = await this.service.obtenerCoordenadas(municipio).toPromise();
      const result1 = coordenadasMuni.results[0];
      let cords1 = {
        lat: result1.geometry.lat,
        lon: result1.geometry.lng
      };

      L.marker([cords1.lat, cords1.lon], this.IconPaquete)
        .addTo(this.map4)
        .bindPopup(popupInfo)
        .openPopup();

    }
  }
  
  redirectToList() {
    this.router.navigate(['/flet/Fletes/List']);
  }
  
  //Configuracion
  options4 = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: ""
      })
    ],
    zoom: 4,
    center: L.latLng(14.772433199139046, -86.63434162882122)
  };

  onMapReady4(map: L.Map) {
    this.map4 = map;
  }


  //Nuevos Datos (after insert)
  nuevoFlete: Flete = new Flete();
  public pedidosDelNuevoFlete$: Observable<any[]>;
  public itemsArray$: Observable<any[]>;
  itemsArray: any[] = [];



  async ngOnInit() {
    
    const id = this.route.snapshot.queryParams['id'];

    if (id) {
      
      const datosdeFlete: any = await this.service.getBuscarFlete(id).toPromise()
      this.nuevoFlete = datosdeFlete;
      
      this.service.getBuscarDetalles(id)
        .subscribe((data: any) => {
          this.pedidosDelNuevoFlete$ = of(data.data);
  
          data.data.forEach(element => {
            if (element.items && typeof element.items === 'string') {
              const itemsJSON = JSON.parse(element.items); // Parsear el campo "items" a un objeto o arreglo
              if (Array.isArray(itemsJSON)) {
                // Recorrer el arreglo de objetos
                for (const item of itemsJSON) {
                  this.itemsArray.push(item); // Agregar cada elemento al arreglo itemsArray
                }
  
                this.itemsArray$ = of(this.itemsArray);
  
              }
            }
          });
  
        })
  
  
        const coordenadasMuniInicio: any = await this.service.obtenerCoordenadas(this.nuevoFlete.muni_NombreInicio).toPromise();
        const result0 = coordenadasMuniInicio.results[0];
        let cords0 = {
          lat: result0.geometry.lat,
          lon: result0.geometry.lng
        };
        this.coordenadasIncio = cords0;
  
  
        const coordenadasMuniFin: any = await this.service.obtenerCoordenadas(this.nuevoFlete.muni_NombreFinal).toPromise();
        const result1 = coordenadasMuniFin.results[0];
        let cords1 = {
          lat: result1.geometry.lat,
          lon: result1.geometry.lng
        };
        this.coordenadasFin = cords1
        
        if(this.nuevoFlete.flet_Ubicado){
             const coordenadasUbicacion: any = await this.service.obtenerCoordenadas(this.nuevoFlete.flet_Ubicado).toPromise();
              const result2 = coordenadasUbicacion.results[0];
              let cords2 = {
                lat: result2.geometry.lat,
                lon: result2.geometry.lng
              };
              this.coordenadasUbicacion = cords2
        }

     
  
  
        const popupInicio = `<b style="color: red; background-color: white">Lugar de salida: ${this.nuevoFlete.muni_NombreInicio}</b>`;
        const popupFinal = `<b style="color: red; background-color: white">Lugar de destino: ${this.nuevoFlete.muni_NombreFinal}</b>`;
        const popupLocal = `<b style="color: red; background-color: white">Flete local en: ${this.nuevoFlete.muni_NombreFinal}</b>`;
        const popupUbicacion = `<b style="color: red; background-color: white">El flete se encuentra en: ${this.nuevoFlete.flet_Ubicado}</b>`;
  
        if (this.map4) {
          this.map4.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              this.map4.removeLayer(layer);
            }
          });
          if (this.nuevoFlete.muni_NombreInicio === this.nuevoFlete.muni_NombreFinal) {
            L.marker([this.coordenadasFin.lat, this.coordenadasFin.lon], this.IconDestino)
              .addTo(this.map4)
              .bindPopup(popupLocal)
              .closePopup();
          } else {
              L.marker([this.coordenadasIncio.lat, this.coordenadasIncio.lon], this.IconInicio)
                .addTo(this.map4)
                .bindPopup(popupInicio)
                .closePopup();
              L.marker([this.coordenadasFin.lat, this.coordenadasFin.lon], this.IconDestino)
                .addTo(this.map4)
                .bindPopup(popupFinal)
                .closePopup();
              if(this.nuevoFlete.flet_Ubicado){
                L.marker([this.coordenadasUbicacion.lat, this.coordenadasUbicacion.lon], this.IconCamion)
                  .addTo(this.map4)
                  .bindPopup(popupUbicacion)
                  .closePopup();
              }
            
          }
  
        }
    }else{
      this.router.navigate(['/flet/Fletes/List']);
    }


  }

  constructor(
    public service: TableService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  async recuperarMarker() {
    const popupInicio = `<b style="color: red; background-color: white">Lugar de salida: ${this.nuevoFlete.muni_NombreInicio}</b>`;
      const popupFinal = `<b style="color: red; background-color: white">Lugar de destino: ${this.nuevoFlete.muni_NombreFinal}</b>`;
      const popupLocal = `<b style="color: red; background-color: white">Flete local en: ${this.nuevoFlete.muni_NombreFinal}</b>`;

      if (this.map4) {
        this.map4.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            this.map4.removeLayer(layer);
          }
        });
        if (this.nuevoFlete.muni_NombreInicio === this.nuevoFlete.muni_NombreFinal) {
          L.marker([this.coordenadasFin.lat, this.coordenadasFin.lon], this.IconDestino)
            .addTo(this.map4)
            .bindPopup(popupLocal)
            .closePopup();
        } else {
          L.marker([this.coordenadasIncio.lat, this.coordenadasIncio.lon], this.IconInicio)
            .addTo(this.map4)
            .bindPopup(popupInicio)
            .closePopup();
          L.marker([this.coordenadasFin.lat, this.coordenadasFin.lon], this.IconDestino)
            .addTo(this.map4)
            .bindPopup(popupFinal)
            .closePopup();
        }
      }
  }


}