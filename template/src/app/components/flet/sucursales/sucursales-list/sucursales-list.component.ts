import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Sucursales } from '../../../../shared/model/sucursales.model';
import { TableService } from '../../../../shared/services/sucursales.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { Idioma } from '../../../../../../config';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.scss']
})
export class SucursalesListComponent {
  user:any = JSON.parse(localStorage.getItem("user"))
  
  sucursalesList: Sucursales[];
  sucursal: Sucursales = new Sucursales();

  //DDL
  municipiosDDL : any[]
 
  ngOnInit(): void {
    
   this.service.getSucursales()
   .subscribe((data: any)=>{
      this.sucursalesList= data.data;
   })
   
   this.service.getMunicipios()
   .subscribe((data: any)=>{
      this.municipiosDDL= data.data;
   })

   this.CreateGroup = this._formBuilder.group({
    sucu_Nombre: ['', Validators.required],
    muni_Id: ['', Validators.required],
    sucu_Direccion: ['', Validators.required],
  });
   
  this.EditGroup = this._formBuilder.group({
    sucu_Nombre: ['', Validators.required],
    muni_Id: ['', Validators.required],
    sucu_Direccion: ['', Validators.required],
  });

  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
 

  public domLayout: DomLayoutType = 'autoHeight';
  idioma = Idioma
  paginationPageSize: number = 10;
  public searchText:string;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };

  columnDefs: ColDef[] = [
    { field: 'sucu_Id', headerName: 'ID', flex: 1 },
    { field: 'sucu_Nombre', headerName: 'Nombre', flex: 2 },
    { field: 'muni_Nombre', headerName: 'Minicipio', flex: 1 },
    { field: 'depa_Nombre', headerName: 'Departamento', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const openModelEdit = () => {
      this.sumit = false;
      // this.EditGroup.get('sucu_Nombre').setValue(params.data.sucu_Nombre);
      this.sucursal = params.data;
      this.modalRef = this.modalService.open(this.modalEdit, { centered: true });
   };
  
    const openModalDelete = () => {
      this.sucursal = params.data;
      this.modalRef = this.modalService.open(this.modalDelete, { centered: true });
      // this.router.navigate(['/flet/Fletes/PersonalDetails'], { queryParams: { id: params.data.flet_Id } });
    }

    const button = document.createElement('il');
    button.classList.add('edit'); 

    const iconElement = document.createElement('i');
    iconElement.classList.add('icon-pencil-alt'); 
    iconElement.classList.add('mx-2'); 

    const textElement = document.createElement('span');
    textElement.innerText = '';
    textElement.appendChild(iconElement);


    const button2 = document.createElement('il');
    button2.classList.add('delete'); 
  
    const iconElement2 = document.createElement('i');
    iconElement2.classList.add('fa'); 
    iconElement2.classList.add('fa-trash-o'); 

    const textElement2 = document.createElement('span');
    textElement2.innerText = '';
    textElement2.appendChild(iconElement2);
   
    button.appendChild(textElement);
    button2.appendChild(textElement2);
  
    button.addEventListener('click', openModelEdit);
    button2.addEventListener('click', openModalDelete);
  
    const container = document.createElement('div');
    container.classList.add('action')
    container.appendChild(button);
    container.appendChild(button2);
  
    return container;
  }
 


  constructor(public  service: TableService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private router: Router) {

  }

  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }

  CreateGroup: FormGroup;
  EditGroup: FormGroup;  

  sumit:boolean = false;
  
  @ViewChild('delete') modalDelete: any;
  @ViewChild('edit') modalEdit: any;
  @ViewChild('create') modalCreate: any;

 
  modalRef: NgbModalRef;

  closeModal() {
    if (this.modalRef) {
      this.sumit = false;
      this.modalRef.dismiss();
    }
  }

  OpenModalCreate() {
    this.sumit = false;
    const formGroup = this.CreateGroup;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control.markAsUntouched();
    });

    const Drenadora: Sucursales = new Sucursales();
    this.sucursal = Drenadora;
    this.modalRef = this.modalService.open(this.modalCreate, { centered: true });
  }

   CrearSucursal() {
    this.sumit = true;

    let datoNombreTrim = (this.CreateGroup.value['sucu_Nombre'].trim());
    // let datoDireccionTrim = (this.CreateGroup.value['meto_Direccion'].trim());
    this.CreateGroup.get("sucu_Nombre").setValue(datoNombreTrim)
    this.sucursal.sucu_Nombre = datoNombreTrim;
    // this.CreateGroup.get("meto_Direccion").setValue(datoDireccionTrim)
    // this.sucursal.sucu_Direccion = datoDireccionTrim;
    this.sucursal.sucu_UsuCreacion = this.user.user_Id;

    if(this.CreateGroup.valid){

      this.service.postMunicipiosCreate(this.sucursal)
      .subscribe((data:any) => {
        if(data.message === "Exitoso"){
          this.alertaLogrado();
          this.modalRef.close();
        }else if(data.message === "YaExiste"){
          this.alertaValorRepetido();
        }else{
          this.alertaErrorInespero();
          this.modalRef.close();
        }
        
        this.service.getSucursales()
        .subscribe((data: any)=>{
            this.sucursalesList= data.data;
        })
      })

    }else{
      this.alertaCamposVacios();
    }
  }
 
  EditarSucursal() {
    // this.sumit = true;

    // let datoTrim = (this.EditGroup.value['meto_Descripcion'].trim());
    // this.EditGroup.get("meto_Descripcion").setValue(datoTrim)
    // this.metoPago.meto_Descripcion = datoTrim;
    // this.metoPago.meto_UsuModificacion = this.user.user_Id;

    // if(this.EditGroup.valid){

    //   this.service.putMetodoPagoUpdate(this.metoPago)
    //   .subscribe((data:any) => {
    //     if(data.message === "Operación completada exitosamente."){
    //       this.alertaLogrado();
    //       this.modalRef.close();
    //     }else if(data.message === "YaExiste"){
    //       this.alertaValorRepetido();
    //     }else{
    //       this.alertaErrorInespero();
    //       this.modalRef.close();
    //     }
        
    //     this.service.getMetodosDePago()
    //     .subscribe((data: any)=>{
    //         this.metodosDePago= data.data;
    //     })
    //   })

    // }else{
    //   this.alertaCamposVacios();
    // }
  }

  EliminarMetodo(){
    // this.service.putMetodoPagoDelete(this.metoPago)
    // .subscribe((data:any) => {
    //   console.log(data);
    //   if(data.message === "Registro eliminado"){
    //     this.alertaEliminado()
    //   }else if (data.message === "EnUso"){
    //     this.alertaEliminadoFallido()
    //   }else{
    //     this.alertaErrorInespero()
    //   }

    //   this.modalRef.close();
    //   this.service.getMetodosDePago()
    //   .subscribe((data: any)=>{
    //       this.metodosDePago= data.data;
    //   })

    // })
  }

  //Alertas
  alertaCamposVacios() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'Completa todos los campos',
        icon: 'warning'
      })
  }
  alertaLogrado() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'Listo, el registro se guardo exitosamente',
        icon: 'success'
      })
  }
  alertaValorRepetido() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'Ya existe otro registro con el mismo nombre',
        icon: 'warning'
      })
  }
  alertaErrorInespero() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'Ha ocurrido un error inesperado',
        icon: 'error'
      })
  }
  
  alertaEliminado() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'El registro a sido eliminado',
        icon: 'success'
      })
  }
  
  alertaEliminadoFallido() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'No se pudo eliminar este registro porque esta en uso',
        icon: 'error'
      })
  }


}
