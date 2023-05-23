import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { Trayectos } from '../../../../shared/model/trayectos.model';
import { TableService } from '../../../../shared/services/fletes.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-flete-create',
  templateUrl: './fletes-create.component.html',
  styleUrls: ['./fletes-create.component.scss']
})
export class FleteCreateComponent implements OnInit {
  //Guardar datos del flete
   datosFelte: Flete = new Flete();
   datosTrayecto: Trayectos = new Trayectos();

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }
  
  public pedidos: any[] = []; //Listado de pedidos

  firstFormGroup: FormGroup; // primer formulario
  secondFormGroup: FormGroup; //selects del segundo
 
  //datos del ddl
  public municipiosDdl = [];
  public vehiculosDdl = [];
  public empleadosDdl = [];

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
    this.vehiculosDdl = data.data.map((item: any) => ({
      value: item.vehi_Id,
      label: item.mode_Nombre,
      job: item.marc_Nombre,
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
    muni_InicioId: ['', Validators.required],
    muni_FinId: ['', Validators.required],
  });

  //validaciones del segundo formulario
  this.secondFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    cnfPassword: ['', Validators.required],
  });

  }


  constructor(
    public service: TableService, 
    private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private modalService: NgbModal) 
    {

    }


  public finish() {
    this.toaster.success('Successfully Registered')
  }
  //cargar datos del municipio inicio seleccionado 
  public seleccionarPedidos(content) {
    this.service.getTrayectoId(this.firstFormGroup.value["muni_InicioId"].value,this.firstFormGroup.value["muni_FinId"].value)
    .subscribe((data: any)=>{
      console.log(data.tray_Id)
      if(data.tray_Id == 0){
        this.modalService.open(content, { centered: true });
      }
    })


    this.service.getPedidosPorMunicipio(this.firstFormGroup.value["muni_InicioId"].value)
    .subscribe((data: any)=>{
      console.log(data.data)
    this.pedidos = data.data
    })
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }
 
 }
 
