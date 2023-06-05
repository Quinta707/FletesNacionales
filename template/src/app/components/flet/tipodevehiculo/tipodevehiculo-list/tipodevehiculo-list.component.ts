import { Component, QueryList, ViewChildren,  OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TipoDeVehiculo } from '../../../../shared/model/tipodevehiculo.model';
import { TipodeVehiculoService } from '../../../../shared/services/tipodevehiculo.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';

@Component({
  selector: 'app-tipodevehiculo-list',
  templateUrl: './tipodevehiculo-list.component.html',
  styleUrls: ['./tipodevehiculo-list.component.scss']
})
export class TipodevehiculoListComponent {
  user:any = JSON.parse(localStorage.getItem("user"))

  tipodevehiculo:TipoDeVehiculo= new TipoDeVehiculo();
  tipodevehiculolist!: TipoDeVehiculo[];


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
    { field: 'tipv_Id', headerName: 'ID', flex: 1 },
    { field: 'tipv_Descripcion', headerName: 'Tipo de vehiculo', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const openModelEdit = () => {
      console.log(params.data)
      this.sumit = false;
      this.tipodevehiculo.tipv_Id = params.data.tipv_Id;
      this.EditGroup.get('tipv_Descripcion').setValue(params.data.tipv_Descripcion);
      this.tipodevehiculo = params.data;
      this.modalRef = this.modalService.open(this.modalEdit, { centered: true });
   };
  
    const openModalDelete = () => {
      this.tipodevehiculo = params.data;
      this.tipodevehiculo.tipv_Id = params.data.tipv_Id;
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
 
  

  constructor(private service: TipodeVehiculoService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private router: Router){}
   
    ngOnInit(): void {

      this.service.getTipoDeVehiculo()
      .subscribe((data: any)=>{
        this.tipodevehiculolist= data.data;
      })



      this.CreateGroup = this._formBuilder.group({
        tipv_Descripcion: ['', Validators.required],
      });
       
      this.EditGroup = this._formBuilder.group({
        tipv_Descripcion: ['', Validators.required],
      });

    }

    
  CreateGroup: FormGroup;
  EditGroup: FormGroup;  
  
  sumit:boolean = false;

  @ViewChild('delete') modalDelete: any;
  @ViewChild('edit') modalEdit: any;
  @ViewChild('create') modalCreate: any;
  
  modalRef: NgbModalRef;


    onSearchInputChange() {
      this.agGrid.api.setQuickFilter(this.searchText);
    }
  
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
  
      const Drenadora: TipoDeVehiculo = new TipoDeVehiculo();
      this.tipodevehiculo = Drenadora;
      this.modalRef = this.modalService.open(this.modalCreate, { centered: true });
    }
  
    
  CrearModelo() {
       this.sumit = true;
     let datoTrim = (this.CreateGroup.value['tipv_Descripcion'].trim());
     this.CreateGroup.get("tipv_Descripcion").setValue(datoTrim)
     this.tipodevehiculo.tipv_Descripcion = datoTrim;
     this.tipodevehiculo.tipv_UsuCreacion = this.user.user_Id;

     if(this.CreateGroup.valid){

       this.service.InsertTipoDeVehiculo(this.tipodevehiculo)
       .subscribe((data:any) => {
         if(data.success){
         this.alertaLogrado();
           this.modalRef.close();
         }else if(data.message === "YaExiste"){
           this.alertaValorRepetido();
         }else{
           this.alertaErrorInespero();
           this.modalRef.close();
         }
      
         this.service.getTipoDeVehiculo()
         .subscribe((data: any)=>{
             this.tipodevehiculolist= data.data;
         })
       })

     }else{
       this.alertaCamposVacios();
     }
  }
 
  EditarModelo() {
    this.sumit = true;
     let datoTrim = (this.EditGroup.value['tipv_Descripcion'].trim());
     this.EditGroup.get("tipv_Descripcion").setValue(datoTrim)
     this.tipodevehiculo.tipv_Descripcion = datoTrim;
     this.tipodevehiculo.tipv_UsuModificacion = this.user.user_Id;

     if(this.EditGroup.valid){

       this.service.EditarTipoVehiculoEditar(this.tipodevehiculo)
       .subscribe((data:any) => {
         if(data.success){
         this.alertaLogrado();
           this.modalRef.close();
         }else if(data.message === "YaExiste"){
           this.alertaValorRepetido();
         }else{
           this.alertaErrorInespero();
           this.modalRef.close();
         }
      
         this.service.getTipoDeVehiculo()
         .subscribe((data: any)=>{
             this.tipodevehiculolist= data.data;
         })
       })

     }else{
       this.alertaCamposVacios();
     }
  }

  EliminarModelo(){
     this.service.DeleteTipoDeVehiculo(this.tipodevehiculo)
     .subscribe((data:any) => {
       console.log(data);
       if(data.message === "Operación completada exitosamente."){
         this.alertaEliminado()
       }else{
         this.alertaErrorInespero()
       }

       this.modalRef.close();
       this.service.getTipoDeVehiculo()
       .subscribe((data: any)=>{
           this.tipodevehiculolist= data.data;
       })

     })
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
