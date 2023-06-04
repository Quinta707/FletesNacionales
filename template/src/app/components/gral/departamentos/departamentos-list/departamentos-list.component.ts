import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Departamentos } from '../../../../shared/model/Departamentos.model';
import { DepaService } from '../../../../shared/services/Departamentos.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { Idioma } from '../../../../../../config';
import { CellClickedEvent, ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-departamentos-list',
  templateUrl: './departamentos-list.component.html',
  styleUrls: ['./departamentos-list.component.scss']
})
export class DepartamentosListComponent implements OnInit {
  
  user:any = JSON.parse(localStorage.getItem("user"))

  departamentos:Departamentos= new Departamentos();
  departamentoslist!: Departamentos[];
  
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
    { field: 'depa_Id', headerName: 'ID', flex: 1 },
    { field: 'depa_Nombre', headerName: 'Departamento', flex: 2 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const openModelEdit = () => {
      console.log(params.data)
      this.sumit = false;
      this.departamentos.depa_Id = params.data.depa_Id;
      this.EditGroup.get('depa_Nombre').setValue(params.data.depa_Nombre);
      this.EditGroup.get('depa_Id').disable();
      this.departamentos = params.data;
      this.modalRef = this.modalService.open(this.modalEdit, { centered: true });
   };
  
    const openModalDelete = () => {
      this.departamentos = params.data;
      this.departamentos.depa_Id = params.data.depa_Id;
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
 
  constructor(private service:DepaService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private router: Router){}
   
    ngOnInit(): void {

      this.service.getDepartamentos()
      .subscribe((data: any)=>{
        this.departamentoslist= data.data;
      })
    
      this.CreateGroup = this._formBuilder.group({
        depa_Nombre: ['', Validators.required],
        depa_Id: ['', Validators.required],
      });
       
      this.EditGroup = this._formBuilder.group({
        depa_Nombre: ['', Validators.required],
        depa_Id: ['', Validators.required],
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
  
      const Drenadora: Departamentos = new Departamentos();
      this.departamentos = Drenadora;
      this.modalRef = this.modalService.open(this.modalCreate, { centered: true });
    }
  
    
  CrearModelo() {
       this.sumit = true;
     let datoTrim = (this.CreateGroup.value['depa_Nombre'].trim());
     this.CreateGroup.get("depa_Nombre").setValue(datoTrim)
     this.departamentos.depa_Nombre = datoTrim;
     this.departamentos.depa_UsuCreacion = this.user.user_Id;
     if(this.CreateGroup.valid){
       this.service.InsertDepartamento(this.departamentos)
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
      
         this.service.getDepartamentos()
         .subscribe((data: any)=>{
             this.departamentoslist= data.data;
         })
       })

     }else{
       this.alertaCamposVacios();
     }
  }
 
  EditarModelo() {
    this.sumit = true;
     let datoTrim = (this.EditGroup.value['depa_Nombre'].trim());
     this.EditGroup.get("depa_Nombre").setValue(datoTrim)
     this.departamentos.depa_Nombre = datoTrim;
     this.departamentos.depa_UsuModificacion = this.user.user_Id;

     if(this.EditGroup.valid){
       this.service.EditarDepartamento(this.departamentos)
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
         this.service.getDepartamentos()
         .subscribe((data: any)=>{
             this.departamentoslist= data.data;
         })
       })

     }else{
       this.alertaCamposVacios();
     }
  }

  EliminarModelo(){
     this.service.DeleteDepartamento(this.departamentos)
     .subscribe((data:any) => {
       console.log(data);
       if(data.success){
         this.alertaEliminado()
       }else{
         this.alertaEliminado()
       }

       this.modalRef.close();
       this.service.getDepartamentos()
       .subscribe((data: any)=>{
           this.departamentoslist= data.data;
       })

     })
  }

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
        title: 'Ya existe este Departamento',
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
 