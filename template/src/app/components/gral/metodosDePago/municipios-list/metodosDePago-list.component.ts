import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MetodosDePago } from '../../../../shared/model/metodosDePago.model';
import { TableService } from '../../../../shared/services/metodoDePago.service';
import { Idioma } from '../../../../../../config';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-metodosDePago-list',
  templateUrl: './metodosDePago-list.component.html',
  styleUrls: ['./metodosDePago-list.component.scss']
})
export class MetodosDePagoListComponent implements OnInit {
  user:any = JSON.parse(localStorage.getItem("user"))
  //recolectores de datos
  metodosDePago: MetodosDePago[];

  metoPago:MetodosDePago= new MetodosDePago();
  
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
 
  ngOnInit(): void {
   
    this.service.getMetodosDePago()
   .subscribe((data: any)=>{
      this.metodosDePago= data.data;
   })

   this.CreateGroup = this._formBuilder.group({
    meto_Descripcion: ['', Validators.required],
  });
   
  this.EditGroup = this._formBuilder.group({
    meto_Descripcion: ['', Validators.required],
  });
  
  }

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
    { field: 'meto_Id', headerName: 'ID', flex: 1 },
    { field: 'meto_Descripcion', headerName: 'Descripcion', flex: 2 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const openModelEdit = () => {
      this.sumit = false;
      this.EditGroup.get('meto_Descripcion').setValue(params.data.meto_Descripcion);
      this.metoPago = params.data;
      this.modalRef = this.modalService.open(this.modalEdit, { centered: true });
   };
  
    const openModalDelete = () => {
      this.metoPago = params.data;
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
 
 

  constructor(public service: TableService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private router: Router) {
  }

  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }

  //fomularios
  CreateGroup: FormGroup;
  
  EditGroup: FormGroup;  

  sumit:boolean = false;

  //Elementos del Modal
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

    const Drenadora: MetodosDePago = new MetodosDePago();
    this.metoPago = Drenadora;
    this.modalRef = this.modalService.open(this.modalCreate, { centered: true });
  }

  CrearMetodo() {
    this.sumit = true;

    if(this.CreateGroup.value['meto_Descripcion']){
      let datoTrim = (this.CreateGroup.value['meto_Descripcion'].trim());
      this.CreateGroup.get("meto_Descripcion").setValue(datoTrim)
      this.metoPago.meto_Descripcion = datoTrim;
      this.metoPago.meto_UsuCreacion = this.user.user_Id;
    }

    if(this.CreateGroup.valid){

      this.service.postMetodoPagoCreate(this.metoPago)
      .subscribe((data:any) => {
        if(data.message === "Operación completada exitosamente."){
          this.alertaLogrado();
          this.modalRef.close();
        }else if(data.message === "YaExiste"){
          this.alertaValorRepetido();
        }else{
          this.alertaErrorInespero();
          this.modalRef.close();
        }
        
        this.service.getMetodosDePago()
        .subscribe((data: any)=>{
            this.metodosDePago= data.data;
        })
      })

    }else{
      this.alertaCamposVacios();
    }
  }
 
  EditarMetodo() {
    this.sumit = true;
    if(this.EditGroup.value['meto_Descripcion']){
      let datoTrim = (this.EditGroup.value['meto_Descripcion'].trim());
      this.EditGroup.get("meto_Descripcion").setValue(datoTrim)
      this.metoPago.meto_Descripcion = datoTrim;
      this.metoPago.meto_UsuModificacion = this.user.user_Id;
    }

    if(this.EditGroup.valid){

      this.service.putMetodoPagoUpdate(this.metoPago)
      .subscribe((data:any) => {
        if(data.message === "Operación completada exitosamente."){
          this.alertaLogrado();
          this.modalRef.close();
        }else if(data.message === "YaExiste"){
          this.alertaValorRepetido();
        }else{
          this.alertaErrorInespero();
          this.modalRef.close();
        }
        
        this.service.getMetodosDePago()
        .subscribe((data: any)=>{
            this.metodosDePago= data.data;
        })
      })

    }else{
      this.alertaCamposVacios();
    }
  }

  EliminarMetodo(){
    this.service.putMetodoPagoDelete(this.metoPago)
    .subscribe((data:any) => {
      console.log(data);
      if(data.message === "Registro eliminado"){
        this.alertaEliminado()
      }else if (data.message === "EnUso"){
        this.alertaEliminadoFallido()
      }else{
        this.alertaErrorInespero()
      }

      this.modalRef.close();
      this.service.getMetodosDePago()
      .subscribe((data: any)=>{
          this.metodosDePago= data.data;
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
 
