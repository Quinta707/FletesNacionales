import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Clientes } from '../../../../shared/model/clientes.model';
import { ClientService } from '../../../../shared/services/clientes.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClienteListComponent implements OnInit {
  user:any = JSON.parse(localStorage.getItem("user"))

  clientesList: Clientes[];

  IdAEliminar: number
 
  ngOnInit(): void {
   this.service.getClientes()
   .subscribe((data: any)=>{
      this.clientesList= data.data;
   })
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
    { field: 'clie_Id', headerName: 'ID', flex: 1 },
    { field: 'clie_NombreCompleto', headerName: 'Nombre completo', flex: 2 },
    { field: 'clie_Identidad', headerName: 'Identidad', flex: 2 },
    { field: 'clie_Sexo', headerName: 'Sexo', flex: 1 },
    { field: 'eciv_Descripcion', headerName: 'Estado civil', flex: 2 },
    { field: 'clie_Telefono', headerName: 'Telefono', flex: 2 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const openModelEdit = () => {
    this.router.navigate(['/flet/Clientes/Edit'],{ queryParams: { id: params.data.clie_Id } });
   };
  
    const openModalDelete = () => {
      this.IdAEliminar= params.data.clie_Id
      this.modalRef = this.modalService.open(this.modalDelete, { centered: true });
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
 

  constructor(public service: ClientService, public router: Router, private modalService: NgbModal) {


  //Columnas de las tablas
  columnDefs: ColDef[] = [
    { field: 'clie_Id', headerName: 'ID', flex: 1 },
    { field: 'clie_NombreCompleto', headerName: 'Nombre', flex: 1 },
    { field: 'clie_FechaNacimiento', headerName: 'Fecha de Nacimiento', flex: 1 },
    { field: 'clie_Telefono', headerName: 'Telefono', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }
  ]
  
  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }

  @ViewChild('delete') modalDelete: any;

  modalRef: NgbModalRef;

  closeModal() {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }

  EliminarMetodo(){
    let data = {
      clie_Id: this.IdAEliminar
    }
    this.service.putEliminarCliente(data)
    .subscribe((data:any) => {
      console.log(data);
      if(data.message === "Eliminado"){
        this.alertaEliminado()
      }else if (data.message === "EnUso"){
        this.alertaEliminadoFallido()
      }else{
        this.alertaErrorInespero()
      }

      this.modalRef.close();
      this.service.getClientes()
      .subscribe((data: any)=>{
          this.clientesList= data.data;
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
        title: 'Ya existe otro registro con el mismo numero de identidad',
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


  CrearCliente(){
    this.router.navigate(['/flet/Clientes/Create']);
  }
 }
 
