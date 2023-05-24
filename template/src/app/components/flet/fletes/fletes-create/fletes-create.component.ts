import { Component, OnInit, QueryList, ViewChildren,ViewChild  } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { Trayectos } from '../../../../shared/model/trayectos.model';
import { TableService } from '../../../../shared/services/fletes.service';
import { NgbModal, NgbModalRef , NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from 'angular-archwizard';


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
    muni_Inicio: ['', Validators.required],
    muni_Final: ['', Validators.required],
  });

  //validaciones del primer formulario
  this.trayectoriaFormGroup = this._formBuilder.group({
    muni_Inicio: ['', Validators.required],
    muni_Final: ['', Validators.required],
    tray_Precio: ['', Validators.required],
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
  public seleccionarPedidos(content1) {
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
    this.datosTrayecto.tray_UsuCreacion = 1;
    this.service.postTrayectoCreate(this.datosTrayecto)
    .subscribe((data : any)=>{
      console.log(data);
    })
  }

  nopModal() {
    if (this.modalRef) {
      this.datosTrayecto.muni_Inicio = null;
      this.datosTrayecto.muni_Final = null;
      this.wizard.goToStep(0); 
      this.modalRef.dismiss();
    }
  }
 }
 
