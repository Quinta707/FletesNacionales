import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';
import Swal from 'sweetalert2';
import { Items } from '../../../../shared/model/items.model';
import { ItemsService } from '../../../../shared/services/items.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemListComponent implements OnInit {
  user:any = JSON.parse(localStorage.getItem("user"))
  items:Items= new Items();
  itemList!: Items[];

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
    { field: 'item_Id', headerName: 'ID', flex: 1 },
    { field: 'item_Nombre', headerName: 'Item', flex: 1 },
    { field: 'item_Descripcion', headerName: 'Descripción', flex: 1 },
    { field: 'item_Peso', headerName: 'Peso', flex: 1 },
    { field: 'item_Volumen', headerName: 'Volumen', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const openModelEdit = () => {
      console.log(params.data)
      this.sumit = false;
      this.EditGroup.get('item_Nombre').setValue(params.data.item_Nombre);
      this.items.item_Id = params.data.item_Id;
      this.items = params.data;
      this.modalRef = this.modalService.open(this.modalEdit, { centered: true });
   };
  
    const openModalDelete = () => {
      this.items = params.data;
      this.items.item_Id = params.data.item_Id;
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
 
  constructor(private service:ItemsService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private router: Router){}
   
    ngOnInit(): void {

      this.service.getItems()
      .subscribe((data: any)=>{
        this.itemList= data.data;
      })
  
      this.CreateGroup = this._formBuilder.group({
        item_Nombre: ['', Validators.required],
        item_Descripcion: ['', Validators.required],
        item_Peso: ['', Validators.required],
        item_Volumen: ['', Validators.required],
      });
       
      this.EditGroup = this._formBuilder.group({
        item_Nombre: ['', Validators.required],
        item_Descripcion: ['', Validators.required],
        item_Peso: ['', Validators.required],
        item_Volumen: ['', Validators.required],
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
  
      const Drenadora: Items = new Items();
      this.items = Drenadora;
      this.modalRef = this.modalService.open(this.modalCreate, { centered: true });
    }
  
    
  CrearModelo() {
    this.sumit = true;
     let datoTrim = (this.CreateGroup.value['item_Nombre'].trim());
     this.CreateGroup.get("item_Nombre").setValue(datoTrim)
     this.items.item_Nombre = datoTrim;
     this.items.item_UsuCreacion = this.user.user_Id;

     if(this.CreateGroup.valid){

       this.service.InsertItems(this.items)
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
      
         this.service.getItems()
         .subscribe((data: any)=>{
             this.itemList= data.data;
         })
       })

     }else{
       this.alertaCamposVacios();
     }
  }
 
  EditarModelo() {
    this.sumit = true;
     let datoTrim = (this.EditGroup.value['item_Nombre'].trim());
     this.EditGroup.get("item_Nombre").setValue(datoTrim)
     this.items.item_Nombre = datoTrim;
     this.items.item_UsuModificacion = this.user.user_Id;
     if(this.EditGroup.valid){
       this.service.EditarItems(this.items)
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
      
         this.service.getItems()
         .subscribe((data: any)=>{
             this.itemList= data.data;
         })
       })

     }else{
       this.alertaCamposVacios();
     }
  }

  EliminarModelo(){
     this.service.DeleteItems(this.items)
     .subscribe((data:any) => {
       console.log(data);
       if(data.success){
         this.alertaEliminado()
       }else{
        this.alertaEliminado()
       }
       this.modalRef.close();
       this.service.getItems()
       .subscribe((data: any)=>{
           this.itemList= data.data;
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
        title: 'Ya existe otro registro con el mismo nombre y marca',
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