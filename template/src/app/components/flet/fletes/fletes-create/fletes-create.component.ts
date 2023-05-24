import { Component, OnInit, QueryList, ViewChildren,ViewChild  } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { Vehiculos } from '../../../../shared/model/vehiculos.model';
import { Trayectos } from '../../../../shared/model/trayectos.model';
import { TableService } from '../../../../shared/services/fletes.service';
import { NgbModal, NgbModalRef , NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormArray  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from 'angular-archwizard';
import {CustomValidator} from '../../../../shared/validators/OnlyNumbers'
import Swal from 'sweetalert2';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

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

   //date pycker
    model: string;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }
  
  modalRef: NgbModalRef;



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
    //cargar municipios
   this.service.getDllMunicipios()
   .subscribe((data: any)=>{
    this.municipiosDdl = data.data.map((item: any) => ({
      value: item.muni_Id,
      label: item.muni_Nombre,
      job: item.depa_Nombre,
    }));
   })

   //cargar vehiculos
   this.service.getDllVehiculos()
   .subscribe((data: any)=>{
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
   .subscribe((data: any)=>{
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
    private calendar: NgbCalendar) 
    {

    }

    
  //peso y volumen maximo
  public pesoMax :number = 0;
  public voluMax :number = 0;
  public pesoUso :number = 0;
  public voluUso :number = 0;


  public finish() {
    this.toaster.success('Successfully Registered')
  }
  //cargar datos del municipio inicio seleccionado 
  public seleccionarPedidos(content1) {
    const vehiculo = this.firstFormGroup.value["vehi_Id"] // El pedi_Id que deseas buscar
    this.pesoUso = 0;
    this.voluUso = 0;
    this.pedidosSelect.pedi_Array = []

    if (vehiculo) {
      this.pesoMax = parseFloat(vehiculo.vehi_PesoMaximo.toString());
      this.voluMax = parseFloat(vehiculo.vehi_VolumenMaximo.toString());
    } else {
      this.pesoMax = 0;
      this.voluMax = 0;
    }

    this.service.getTrayectoId(this.firstFormGroup.value["muni_Inicio"],this.firstFormGroup.value["muni_Final"])
    .subscribe((data: any)=>{
      if(data.tray_Id == 0){
        this.openModal(content1);
      }
    })


    this.service.getPedidosPorMunicipio(this.firstFormGroup.value["muni_Inicio"])
    .subscribe((data: any)=>{
    this.pedidos = data.data
    })
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
  
  siModal2 (){
    if(!isNaN(this.datosTrayecto.tray_Precio)){
      this.datosTrayecto.tray_UsuCreacion = 1;
        this.service.postTrayectoCreate(this.datosTrayecto)
        .subscribe((data : any)=>{
          if(data.message === "Exitoso"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: '¡Registro Ingresado con éxito!',
              icon: 'success'
            }).then(() => {
              this.modalRef?.dismiss(); // Cerrar el modal
              this.datosTrayecto.tray_Precio = null; // Restablecer el valor del campo
            });
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

  guardarEliminar() {
    // Aquí puedes implementar la lógica para guardar o eliminar los elementos seleccionados en función de this.selectedItems
    if (this.pedidosSelect.pedi_Array.length > 0) {
      // Realizar la acción de guardar o eliminar
    } else {
      // No hay elementos seleccionados, mostrar un mensaje de error o realizar alguna otra acción
    }
  }
 }
 
