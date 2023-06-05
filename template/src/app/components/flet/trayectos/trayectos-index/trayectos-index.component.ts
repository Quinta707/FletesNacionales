import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';
import { Trayectos } from 'src/app/shared/model/trayectos.model';
import { TrayectosService } from 'src/app/shared/services/trayectos.service';
import { CustomValidator } from 'src/app/shared/validators/OnlyNumbers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trayectos-index',
  templateUrl: './trayectos-index.component.html',
  styleUrls: ['./trayectos-index.component.scss']
})
export class TrayectosIndexComponent {
  user:any = JSON.parse(localStorage.getItem("user"))

  trayectos:Trayectos= new Trayectos();
  trayectooslist!: Trayectos[];

  //DDL
  public municipiosDdl = [];

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
    { field: 'tray_Id', headerName: 'ID', flex: 1 },
    { field: 'muni_InicioNombre', headerName: 'Desde', flex: 1 },
    { field: 'muni_FinalNombre', headerName: 'Hasta', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const openModelEdit = () => {
      console.log(params.data)
      this.sumit = false;
      this.EditGroup.get('muni_Inicio').setValue(params.data.muni_Inicio);
      this.trayectos.tray_Id = params.data.tray_Id;
      this.trayectos = params.data;
      this.modalRef = this.modalService.open(this.modalEdit, { centered: true });
   };
  
    const openModalDelete = () => {
      this.trayectos = params.data;
      this.trayectos.tray_Id = params.data.tray_Id;
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
 
  constructor(private service:TrayectosService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private router: Router){}
   
    ngOnInit(): void {

      this.service.getTrayectos()
      .subscribe((data: any)=>{
        this.trayectooslist= data.data;
      })
      
     
      this.service.getDllMunicipios()
      .subscribe((data: any) => {
        this.municipiosDdl = data.data.map((item: any) => ({
          value: item.muni_Id,
          label: item.muni_Nombre,
          job: item.depa_Nombre,
        }));
      })


      this.CreateGroup = this._formBuilder.group({
        muni_Inicio: ['', Validators.required],
        muni_Final: ['', Validators.required],
        tray_Precio: ['', [CustomValidator.numeric, Validators.required]],
      });
       
      this.EditGroup = this._formBuilder.group({
        muni_Inicio: ['', Validators.required],
        muni_Final: ['', Validators.required],
        tray_Precio: ['', [CustomValidator.numeric, Validators.required]],
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
  
      const Drenadora: Trayectos = new Trayectos();
      this.trayectos = Drenadora;
      this.modalRef = this.modalService.open(this.modalCreate, { centered: true });
    }
  
    CrearModelo() {
      this.sumit = true;
       let datoTrim = (this.CreateGroup.value['muni_Inicio'].trim());
       this.CreateGroup.get("muni_Inicio").setValue(datoTrim)
       this.trayectos.muni_Inicio = datoTrim;
       this.trayectos.tray_UsuCreacion = this.user.user_Id;
  
       if(this.CreateGroup.valid){
  
         this.service.InsertTrayectos(this.trayectos)
         .subscribe((data:any) => {
           if(data.success){
           this.alertaLogrado();
             this.modalRef.close();
           }else if(data.message === "YaExiste"){
             this.alertaValorRepetido();
           }else{
             this. alertaLogrado()
             this.modalRef.close();
           }
        
           this.service.getTrayectos()
           .subscribe((data: any)=>{
               this.trayectooslist= data.data;
           })
         })
  
       }else{
         this.alertaCamposVacios();
       }
    }
   
    EditarModelo() {
      this.sumit = true;
       let datoTrim = (this.EditGroup.value['muni_Inicio'].trim());
       this.EditGroup.get("muni_Inicio").setValue(datoTrim)
       this.trayectos.muni_Inicio = datoTrim;
       this.trayectos.tray_UsuModificacion = this.user.user_Id;
       if(this.EditGroup.valid){
         this.service.EditarTrayectos(this.trayectos)
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
        
           this.service.getTrayectos()
           .subscribe((data: any)=>{
               this.trayectooslist= data.data;
           })
         })
  
       }else{
         this.alertaCamposVacios();
       }
    }
  
    EliminarModelo(){
      this.service.DeleteTrayectos(this.trayectos)
      .subscribe((data:any) => {
        console.log(data);
        if(data.success){
          this.alertaEliminado()
        }else if (data.message === "EnUso"){
          this.alertaEliminadoFallido()
        }else{
          this.alertaEliminado()
        }
 
        this.modalRef.close();
        this.service.getTrayectos()
        .subscribe((data: any)=>{
            this.trayectooslist= data.data;
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
        title: 'Ya existe este trayecto',
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
        title: 'No se pudo eliminar este trayecto porque esta en uso',
        icon: 'error'
      })
  }
 
 
 
}
