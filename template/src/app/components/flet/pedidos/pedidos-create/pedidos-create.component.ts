import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../shared/validators/passwordMatch';
import { PedidoService } from 'src/app/shared/services/pedidos.service';
import { Pedidos } from 'src/app/shared/model/pedidos.model';
import { Clientes } from 'src/app/shared/model/clientes.model';
import Swal from 'sweetalert2';
import { WizardComponent } from 'angular-archwizard';
import { Items } from 'src/app/shared/model/items.model';
import { FormControl } from '@angular/forms';
import { MetodosDePago } from 'src/app/shared/model/metodosDePago.model';
import { Global } from 'config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as L from 'leaflet';



interface Card {
  item_Id: number;
  item_Nombre: string;
  item_Descripcion: string;
  item_Peso: string;
  item_Volumen: string;
}

@Component({
  selector: 'app-pedidos-create',
  templateUrl: './pedidos-create.component.html',
  styleUrls: ['./pedidos-create.component.scss']
})
export class PedidosCreateComponent implements OnInit{
  @ViewChild(WizardComponent) wizard: WizardComponent;
  DirecValue: string = '';
  ClientValue: string = '';
  OrigenValue: string = '';
  DestinoValue: string = '';
  ItemValue: string = '';
  MetodoValue: string = '';
  submitted: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  maxDate: Date;
  searchTerm: string = '';
  firstFormSubmitted: boolean = false;
  thisabled: boolean = true;

 
  currentStep: number = 1;

  constructor(
    private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private service: PedidoService,
    private http: HttpClient,
    private router: Router
  ) {
    this.maxDate = new Date();
   }
  public municipiosDdl1 = [];
  public municipiosDdl2 = [];
  public clienteDdl = [];
  public itemsDdl = [];
  public Items = [];
  public metodoDdl = [];
  allItems: Card[] = [];
  MuniOrigen: Pedidos = new Pedidos();
  MuniDestino: Pedidos = new Pedidos();
  SelectCliente: Clientes = new Clientes();
  SelectItem: Items = new Items();
  SelectMetodo: MetodosDePago = new MetodosDePago();
  pedidos: Pedidos = new Pedidos();

  ngOnInit(): void {
    this.service.getItems()
    .subscribe((data: any)=>{
      this.Items = data.data;
    })
    this.service.getDllMunicipios()
      .subscribe((data: any) => {
        this.municipiosDdl1 = data.data.map((item: any) => ({
          value: item.muni_Id,
          label: item.muni_Nombre,
          job: item.depa_Nombre,
        }));
        this.municipiosDdl2 = data.data.map((item: any) => ({
          value: item.muni_Id,
          label: item.muni_Nombre,
          job: item.depa_Nombre,
        }));
      })
      this.service.getDllClientes()
      .subscribe((data: any) => {
        this.clienteDdl = data.data.map((item: any) => ({
          value: item.clie_Id,
          label: item.clie_NombreCompleto,
        }));
      })
      this.service.getMetodos()
      .subscribe((data: any) => {
        this.metodoDdl = data.data.map((item: any) => ({
          value: item.meto_Id,
          label: item.meto_Descripcion,
        }));
      })
      

    this.firstFormGroup = this._formBuilder.group({
      clie_Id: ['', Validators.required],
      muni_Origen: [, Validators.required],
      muni_Destino: [, Validators.required],
      DireccionPedido: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      item_Id: [, Validators.required],
      meto_Id: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
    })
    this.fourthFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    })
    this.service.getItems().subscribe((data: any) => {
      this.allItems = data.data;
      this.Items = [...this.allItems]; // Copia los elementos a 'Items'
    });
  }
  public finish(){
    this.toaster.success('Successfully Registered')
  }

  ValidarPedido(){
    if(this.firstFormGroup.valid){
      this.wizard.goToStep(1);
    }else{
      this.submitted = true;
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        title: 'Complete todos los campos',
        icon: 'warning'
      })
    }
  }

  Regresar1(){
    this.wizard.goToStep(0);
  }

  filteredCards: Card[] = [...this.Items];


  onSearch() {
    // Filtra los elementos en 'allItems' y asigna los resultados a 'filteredItems'
    const filteredItems = this.allItems.filter(card =>
      card.item_Nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      card.item_Descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      card.item_Peso.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      card.item_Volumen.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  
    // Asigna los elementos filtrados a 'Items' para mostrar en la página actual
    this.Items = filteredItems;
    this.currentPage = 1; // Reinicia la página actual al realizar una búsqueda
  }
  
currentPage: number = 1;
itemsPerPage: number = 4;

getCurrentPageItems(): Card[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.Items.slice(startIndex, endIndex);
}

goToPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

goToNextPage() {
  const totalPages = Math.ceil(this.Items.length / this.itemsPerPage);
  if (this.currentPage < totalPages) {
    this.currentPage++;
  }
}

showPreviousButton(): boolean {
  return this.currentPage > 1;
}

showNextButton(): boolean {
  const totalPages = Math.ceil(this.Items.length / this.itemsPerPage);
  return this.currentPage < totalPages;
}

selectedCardIds: number[] = [];

toggleSelection(item: Card) {
  const index = this.selectedCardIds.indexOf(item.item_Id);
  if (index > -1) {
    this.selectedCardIds.splice(index, 1); // Desmarca la tarjeta si ya está seleccionada
  } else {
    this.selectedCardIds.push(item.item_Id); // Marca la tarjeta si no está seleccionada
  }
}

ValidarItems(){
  if(this.selectedCardIds.length > 0){
    const cliente = this.firstFormGroup.value["clie_Id"]
    const origen = this.firstFormGroup.value["muni_Origen"]
    const destino = this.firstFormGroup.value["muni_Destino"]
    const metodo = this.secondFormGroup.value["meto_Id"]
    var comosalio = 0;
    const apiUrl = Global + 'Pedidos/Insertar';
      const requestBody = {
        clie_Id:            parseInt(cliente),
        muni_Origen:        String(origen),
        muni_Destino:       String(destino),
        pedi_DestinoFinal:  this.DirecValue,
        meto_Id:            parseInt(metodo),
        pedi_UsuCreacion:   1
      };
    
      this.http.post(apiUrl, requestBody).subscribe(
        (response: any) => {
          
          console.log(response);
          if (response !== undefined) {
            if (response.success) {
              this.service.getBuscarDetalles(response.codeStatus)
              .subscribe((response: any) => {
              this.pedidos = response;
            });
              const apiUrl2 = Global + 'PedidoDetalles/Insertar';
              const aidi = response.codeStatus
              this.selectedCardIds.forEach(element => {
                const requestBody2 = {
                  pedi_Id:            aidi,
                  item_Id:            this.selectedCardIds,
                  pdet_UsuCreacion:   1
                };
                this.http.post(apiUrl2, requestBody2).subscribe(
                  (response: any) => {
                    console.log(response)
                    if (response !== undefined) {
                      if (response.success) {
                        comosalio = 1
                      }
                      else{
                        comosalio = 0
                      }
                    }
                    else{
                      comosalio = 0
                    }
                });
              })
              if (response.success) {
                Swal.fire({
                  text: 'El pedido se ha ingresado exitosamente',
                  imageUrl: 'assets/images/check.gif',
                  imageWidth: 400,
                  imageHeight: 400,
                  imageAlt: 'Esooo',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  title: '¡Exito!'
                })
                this.router.navigate(['flet/Pedidos/List'])
                //this.wizard.goToStep(2);
              } else {
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                  title: '¡Hubo un error al ingresar el pedido!(2)',
                  icon: 'error'
                });
              }
            }
                
          
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: '¡Hubo un error en la respuesta del API!',
              icon: 'error'
            });
            console.error('Respuesta del API inválida:', response);
          }
        },
        (error: any) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: '¡Hubo un error al realizar la solicitud!',
            icon: 'error'
          });
          console.error(error);
        }
      );
  }else{
    this.submitted = true;
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      title: 'Seleccione al menos un producto',
      icon: 'warning'
    })

  }
}

redirectToList(){
  this.router.navigate(['flet/Pedidos/List']);
}

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

  // actualiza el mapa con nuevas coordenadas
  async recuperarMarker() {
    const popupInicio = `<b style="color: red; background-color: white">Lugar de origen: ${this.pedidos.muni_Origen}</b>`;
      const popupFinal = `<b style="color: red; background-color: white">Lugar de destino: ${this.pedidos.muni_Destino}</b>`;

      if (this.map4) {
        this.map4.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            this.map4.removeLayer(layer);
          }
        });
        if (this.pedidos.muni_Origen === this.pedidos.muni_Destino) {
          L.marker([this.coordenadasFin.lat, this.coordenadasFin.lon], this.IconDestino)
            .addTo(this.map4)
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

}
