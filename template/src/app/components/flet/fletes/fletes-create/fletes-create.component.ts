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
import { Router } from '@angular/router';


@Component({
  selector: 'app-flete-create',
  templateUrl: './fletes-create.component.html',
  styleUrls: ['./fletes-create.component.scss']
})
export class FleteCreateComponent implements OnInit {
  @ViewChild(WizardComponent) wizard: WizardComponent;
  //Guardar datos del flete
  datosFelte: Flete = new Flete();
  datosTrayecto: Trayectos = new Trayectos();
  pedidosSelect: Pedidos = new Pedidos();

  //date picker
  model: string;
  sumit:boolean = false;
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
   waypoints = [
    L.latLng(this.coordenadasIncio.lat, this.coordenadasIncio.lon), 
    L.latLng(this.coordenadasFin.lat, this.coordenadasFin.lon)
  ]
  
  waypointsPedidos = [
  ]

  private routingControl: any;

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
  handlePanelClick(item: any) {
    // Lógica para manejar el clic en el panel
    // Puedes acceder al objeto 'item' y realizar las operaciones necesarias
    console.log('Panel clickeado', item);
  }
  
  // actualiza el mapa con nuevas coordenadas
   async updateMarker(municipio: string) {
    if(this.routingControl){
      
      this.routingControl.getPlan().setWaypoints([]);
    }
    const popupText: string = "Este pedido llegara hasta " + municipio;
    const popupInfo = `<b style="color: black; background-color: white">${popupText}</b>`;
    if (this.map4) {
      this.map4.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map4.removeLayer(layer);
        }
      });

      const coordenadasMuni: any = await this.service
        .obtenerCoordenadas(municipio)
        .toPromise();
      const result1 = coordenadasMuni.results[0];
      let cords1 = {
        lat: result1.geometry.lat,
        lon: result1.geometry.lng,
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
  
  // actualiza el mapa con nuevas coordenadas
  async recuperarMarker() {
    const popupInicio = `<b style="color: red; background-color: white">Lugar de salida: ${this.nuevoFlete.muni_NombreInicio}</b>`;
    const popupFinal = `<b style="color: red; background-color: white">Lugar de destino: ${this.nuevoFlete.muni_NombreFinal}</b>`;
    const popupLocal = `<b style="color: black; background-color: white">Flete local en: ${this.nuevoFlete.muni_NombreFinal}</b>`;
    const popupUbicacion = `<b style="color: black; background-color: white">El flete se encuentra en: ${this.nuevoFlete.flet_Ubicado}</b>`;

    if (this.map4) {
      this.map4.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map4.removeLayer(layer);
        }
      });
      if (
        this.nuevoFlete.muni_NombreInicio === this.nuevoFlete.muni_NombreFinal
      ) {
        L.marker(
          [this.coordenadasFin.lat, this.coordenadasFin.lon],
          this.IconDestino
        )
          .addTo(this.map4)
          .bindPopup(popupLocal)
          .closePopup();
      } else {
        // L.marker(
        //   [this.coordenadasIncio.lat, this.coordenadasIncio.lon],
        //   this.IconInicio
        // )
        //   .addTo(this.map4)
        //   .bindPopup(popupInicio)
        //   .closePopup();
        // L.marker(
        //   [this.coordenadasFin.lat, this.coordenadasFin.lon],
        //   this.IconDestino
        // )
        //   .addTo(this.map4)
        //   .bindPopup(popupFinal)
        //   .closePopup();

          console.log(this.waypoints)
          this.routingControl.getPlan().setWaypoints(this.waypoints);
        
      }
    }
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


  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }

  modalRef: NgbModalRef;

  //Nuevos Datos (after insert)
  nuevoFlete: Flete = new Flete();
  public pedidosDelNuevoFlete$: Observable<any[]>;
  public itemsArray$: Observable<any[]>;
  itemsArray: any[] = [];


  public pedidos: any[] = []; //Listado de pedidos

  firstFormGroup: FormGroup; // primer formulario
  secondFormGroup: FormGroup; //selects del segundo
  trayectoriaFormGroup: FormGroup; //formulario de la tratectoria

  //datos del ddl
  public municipiosDdl = [];
  public vehiculosDdl = [];
  public empleadosDdl = [];
  public vehiculos: Vehiculos[];

  //borrar luego 
  public selectgroupby: string;

  ngOnInit(): void {
    // this.initializeMap()
    //cargar municipios
    this.service.getDllMunicipios()
      .subscribe((data: any) => {
        this.municipiosDdl = data.data.map((item: any) => ({
          value: item.muni_Id,
          label: item.muni_Nombre,
          job: item.depa_Nombre,
        }));
      })

    //cargar vehiculos
    this.service.getDllVehiculos()
      .subscribe((data: any) => {
        this.vehiculos = data.data
        this.vehiculosDdl = data.data.map((item: any) => ({
          value: item.vehi_Id,
          label: item.mode_Nombre,
          job: item.marc_Nombre,
          vehi_PesoMaximo: item.vehi_PesoMaximo,
          vehi_VolumenMaximo: item.vehi_VolumenMaximo,
        }));
      })

    //cargar empleados
    this.service.getDllEmpleados()
      .subscribe((data: any) => {
        this.empleadosDdl = data.data.map((item: any) => ({
          value: item.empe_Id,
          label: item.empe_NombreCompleto,
          job: item.carg_Descripcion,
        }));
      })

    //validaciones del primer formulario
    this.firstFormGroup = this._formBuilder.group({
      vehi_Id: ['', Validators.required],
      empe_Id: ['', Validators.required],
      muni_Inicio: ['', Validators.required],
      muni_Final: ['', Validators.required],
      flet_FechaDeSalida: ['', Validators.required],
    });

    //validaciones del primer formulario
    this.trayectoriaFormGroup = this._formBuilder.group({
      muni_Inicio: ['', Validators.required],
      muni_Final: ['', Validators.required],
      tray_Precio: ['', [CustomValidator.numeric, Validators.required]],
    });

    //validaciones del segundo formulario
    this.secondFormGroup = this._formBuilder.group({
      pedidosArray: ['', [Validators.required]]
    });

  }

  constructor(
    public service: TableService,
    private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private cdr: ChangeDetectorRef,
    private router: Router) {

  }


  //peso y volumen maximo
  public pesoMax: number = 0;
  public voluMax: number = 0;
  public pesoUso: number = 0;
  public voluUso: number = 0;


  public finish() {
    this.toaster.success('Successfully Registered')
  }
  //cargar datos del municipio inicio seleccionado 
  public seleccionarPedidos(content1) {
    this.sumit = true;
    if(this.firstFormGroup.valid){
      const vehiculo = this.firstFormGroup.value["vehi_Id"] // El pedi_Id que deseas buscar
      this.pesoUso = 0;
      this.voluUso = 0;
      this.pedidosSelect.pedi_Array = []
      this.secondFormGroup.get('pedidosArray').setValue('');
  
  
  
      if (vehiculo) {
        this.pesoMax = parseFloat(vehiculo.vehi_PesoMaximo.toString());
        this.voluMax = parseFloat(vehiculo.vehi_VolumenMaximo.toString());
      } else {
        this.pesoMax = 0;
        this.voluMax = 0;
      }
  
      const fecha = this.firstFormGroup.value["flet_FechaDeSalida"]
      const fechaSalidaCadena = (fecha.year.toString() + '-' + fecha.month.toString() + '-' + fecha.day.toString()).toString()
      this.service.getVehiculoDisponible(this.firstFormGroup.value["vehi_Id"].value, fechaSalidaCadena)
        .subscribe((data: any) => {
  
          console.log(data)
          if (parseInt(data.message) === 1) {
  
            this.wizard.goToStep(1);
            this.service.getTrayectoId(this.firstFormGroup.value["muni_Inicio"], this.firstFormGroup.value["muni_Final"])
              .subscribe((data: any) => {
                if (data.tray_Id == 0) {
                  Swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    title: 'Sin trayectoria',
                    icon: 'warning'
                  })
                  this.openModal(content1);
                } else {
                  Swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    title: 'Ingresa los mejores pedidos',
                    icon: 'success'
                  })
                  this.datosFelte.tray_Id = data.tray_Id;
                }
              })
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              title: 'Este vehiculo estara en uso en esa fecha',
              icon: 'warning'
            })
            this.wizard.goToStep(0);
          }
        })
  
  
      this.service.getPedidosPorMunicipio(this.firstFormGroup.value["muni_Inicio"])
        .subscribe((data: any) => {
          this.pedidos = data.data
        })
    }else{
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Completa todos los campos para continuar',
        icon: 'warning'
      })
    }

  }

  openModal(content1) {
    this.modalRef = this.modalService.open(content1, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }

  openModal2(content2) {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef = this.modalService.open(content2, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
    }

  }

  siModal2() {
    if (!isNaN(this.datosTrayecto.tray_Precio)) {
      this.datosTrayecto.tray_UsuCreacion = 1;
      this.service.postTrayectoCreate(this.datosTrayecto)
        .subscribe((data: any) => {
          if (parseInt(data.message) > 0) {
            this.datosFelte.tray_Id = parseInt(data.message);
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              title: '¡Registro Ingresado con éxito!',
              icon: 'success'
            }).then(() => {});
            this.modalRef?.dismiss(); // Cerrar el modal
            this.datosTrayecto.tray_Precio = null; // Restablecer el valor del campo
          }
        })
    }
  }

  nopModal() {
    if (this.modalRef) {
      this.datosTrayecto.muni_Inicio = null;
      this.datosTrayecto.muni_Final = null;
      this.wizard.goToStep(0);
      this.modalRef.dismiss();
    }
  }

  toggleSelection(item: any) {
    const index = this.pedidosSelect.pedi_Array.indexOf(item.pedi_Id);
    if (index > -1) {
      const updatedArray = this.pedidosSelect.pedi_Array.filter(id => id !== item.pedi_Id);
      this.pedidosSelect.pedi_Array = updatedArray;
      this.secondFormGroup.get('pedidosArray').setValue(updatedArray);
    } else {
      const updatedArray = [...this.pedidosSelect.pedi_Array, item.pedi_Id];
      this.pedidosSelect.pedi_Array = updatedArray;
      this.secondFormGroup.get('pedidosArray').setValue(updatedArray);
    }
    let nuevoPeso = 0;
    let nuevoVolumen = 0;
    this.pedidosSelect.pedi_Array.forEach(element => {
      const pedido = this.pedidos.find(pedido => pedido.pedi_Id === element);
      nuevoPeso += pedido.pedi_Peso;
      nuevoVolumen += pedido.pedi_Volumen;
    });

    this.pesoUso = nuevoPeso;
    this.voluUso = nuevoVolumen;

  }

  getToday(): NgbDateStruct {
    const today = this.calendar.getToday();
    return { year: today.year, month: today.month, day: today.day };
  }

  async guardar() {
    if (this.pedidosSelect.pedi_Array.length > 0 && this.pesoMax >= this.pesoUso && this.voluMax >= this.voluUso) {

      this.datosFelte.flet_UsuCreacion = 1;
      const vehiculo = this.firstFormGroup.value["vehi_Id"]
      const empleado = this.firstFormGroup.value["empe_Id"]
      const fecha = this.firstFormGroup.value["flet_FechaDeSalida"]
      this.datosFelte.vehi_Id = parseInt(vehiculo.value);
      this.datosFelte.empe_Id = parseInt(empleado.value);
      this.datosFelte.flet_FechaDeSalida = new Date(fecha.year.toString() + '-' + fecha.month.toString() + '-' + fecha.day.toString());

      const data: any = await this.service.postInsertarFlete(this.datosFelte).toPromise();

      let dataDetalles = {
        "pedidosArray": this.pedidosSelect.pedi_Array,
        "fdet_UsuCreacion": 1,
        "flet_Id": parseInt(data.message),
      }

      const data2: any = await this.service.postInsertarFleteDetalles(dataDetalles).toPromise()
      console.log(data2)

      if (data2.message === "1") {
        
        this.wizard.goToStep(2);

        Swal.fire({
          text: 'El flete se a creado exitosamente',
          imageUrl: 'assets/images/cajasydireccion.jpg',
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: 'Piola',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          title: '¡Exito!'
        })

        const datosdeFlete: any = await this.service.getBuscarFlete(dataDetalles.flet_Id).toPromise()
        this.nuevoFlete = datosdeFlete;


        this.service.getBuscarDetalles(dataDetalles.flet_Id)
          .subscribe((data: any) => {
            console.log(data.data)
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
      } else {
        Swal.fire({
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          title: 'Ocurrio un error',
          icon: 'error'
        }).then(() => {
          this.wizard.goToStep(0);
          this.pesoUso = 0;
          this.voluUso = 0;
          this.pedidosSelect.pedi_Array = []
        });
      }


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

      this.waypoints = [
        L.latLng(this.coordenadasIncio.lat, this.coordenadasIncio.lon), 
      ]

        const dataObservable: Observable<any[]> = this.pedidosDelNuevoFlete$; // Tu Observable con el array de datos

      await dataObservable.toPromise()
      .then(async data => {
        for (const element of data) {
          const result = await this.service.obtenerCoordenadas(element.pedi_DestinoNombre).toPromise();
          const result2 = result.results[0];
          this.waypointsPedidos.push(L.latLng(result2.geometry.lat, result2.geometry.lng));
          this.waypoints.push(L.latLng(result2.geometry.lat, result2.geometry.lng));
        }
      })
      .catch(error => {
        // Manejar el error
      });
      
      this.waypoints.push(L.latLng(this.coordenadasFin.lat, this.coordenadasFin.lon));

      const popupInicio = `<b style="color: red; background-color: white">Lugar de salida: ${this.nuevoFlete.muni_NombreInicio}</b>`;
      const popupFinal = `<b style="color: red; background-color: white">Lugar de destino: ${this.nuevoFlete.muni_NombreFinal}</b>`;
      const popupLocal = `<b style="color: black; background-color: white">Flete local en: ${this.nuevoFlete.muni_NombreFinal}</b>`;

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
          //  L.marker([this.coordenadasIncio.lat, this.coordenadasIncio.lon], this.IconInicio)
          //    .addTo(this.map4)
          //    .bindPopup(popupInicio)
          //    .closePopup();
          //  L.marker([this.coordenadasFin.lat, this.coordenadasFin.lon], this.IconDestino)
          //    .addTo(this.map4)
          //    .bindPopup(popupFinal)
          //    .closePopup();

           this.routingControl = L.Routing.control({
            waypoints: this.waypoints,
            routeWhileDragging: false,
            fitSelectedRoutes: true,
            addWaypoints: false,
            collapsible: true,
            // collapseBtnClass: "btn "
            // altLineOptions: {
            //   styles: [
            //     { color: 'lightseagreen', opacity: 0.6, weight: 4 } // Configuración de estilo de la ruta alternativa
            //   ],
            //   extendToWaypoints: true,
            //   missingRouteTolerance: 100
            // }
          }).addTo(this.map4)

         }

      }
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'No puedes continuar.',
        icon: 'error'
      })
      // .then(() => {
      //   this.wizard.goToStep(0);
      //   this.pesoUso = 0;
      //   this.voluUso = 0;
      //   this.pedidosSelect.pedi_Array = []
      // });
    }
  }
}

