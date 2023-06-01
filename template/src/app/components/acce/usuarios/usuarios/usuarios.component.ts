import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Usuarios } from '../../../../shared/model/usuarios.model';
import { Empleados } from '../../../../shared/model/empleados.model';
import { Roles } from '../../../../shared/model/rol.model';
import { TableService } from '../../../../shared/services/usuarios.service';
import { RolesService } from '../../../../shared/services/rol.service';

import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Idioma } from '../../../../../../config';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  @ViewChild('content') modalContent: any;
  public domLayout: DomLayoutType = 'autoHeight';
  Usuarios: Usuarios[];
  idioma = Idioma
  public selected = [];
  public active = 1;
  modalRef: NgbModalRef;
  paginationPageSize: number = 10;
  public searchText;
  empleadosNoTienenUsuario!: Empleados[];
  listadoRoles!: Roles[];
  usuarioForm!: UntypedFormGroup;
  usuarios:Usuarios = new Usuarios();
  roles:Roles = new Roles();
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }

  constructor
    (public service: TableService, private rolService: RolesService, private formBuilder: UntypedFormBuilder, private modalService: NgbModal, private _formBuilder: FormBuilder, ) {

    this.LoadEmpleadosNoTienenUsuario();
    this.LoadRoles();

    this.usuarioForm = this.formBuilder.group({
      usua_Nombre: ['', [Validators.required]],
      usua_EsAdmin: [false],
      usua_Clave: [''],
      role_Id: [''],
      empe_Id: ['', [Validators.required]],
    });

  }

  columnDefs: ColDef[] = [
    { field: 'user_Id', headerName: 'ID', flex: 1 },
    { field: 'user_NombreUsuario', headerName: 'Nombre Usuario', flex: 2 },
    { field: 'empe_NombreCompleto', headerName: 'Nombre Empleado', flex: 2 },
    { field: 'user_EsAdmin', headerName: 'Es Admin', flex: 2 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];

  LoadEmpleadosNoTienenUsuario() {
    this.service.getEmpleadosNoTienenUsuario().subscribe((data: any) => {
      if (data.code === 200) {
        this.empleadosNoTienenUsuario = data.data;
      }
    })
  }

  LoadRoles() {
    this.rolService.getListadoRoles().subscribe((data: any) => {
      if (data.code === 200) {
        this.listadoRoles = data.data;
      }
    })
  }
  ngOnInit(): void {
    this.service.getUsuarios()
      .subscribe((data: any) => {
        this.Usuarios = data.data;
      })
  }



  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent, { centered: true });
  }

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const onClickHandler = () => {
       //console.log('Botón de acción clickeado', params);
     
    this.modalRef = this.modalService.open(this.modalContent, { centered: true });
    };
  
    

    const button = document.createElement('il');
    button.classList.add('create'); 

    const iconElement = document.createElement('i');
    iconElement.classList.add('icon-pencil-alt'); 
    iconElement.classList.add('mx-2'); 

    const textElement = document.createElement('span');
    textElement.innerText = '';
    textElement.appendChild(iconElement);


    const button2 = document.createElement('il');
    button2.classList.add('detail'); 
  
    const iconElement2 = document.createElement('i');
    iconElement2.classList.add('fa'); 
    iconElement2.classList.add('fa-file-text-o'); 

    const textElement2 = document.createElement('span');
    textElement2.innerText = '';
    textElement2.appendChild(iconElement2);
   
    button.appendChild(textElement);
    button2.appendChild(textElement2);
  
    button.addEventListener('click', onClickHandler);
  
    const container = document.createElement('div');
    container.classList.add('action')
    container.appendChild(button);
    container.appendChild(button2);
  
    return container;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Acción a realizar cuando se cierra el modal
      console.log(result);
    }, (reason) => {
      // Acción a realizar cuando se descarta el modal sin guardar cambios
      console.log(reason);
    });
  }

  mensajeSuccess(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  mensajeWarning(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  mensajeError(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
