import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Usuarios } from '../../../../shared/model/usuarios.model';
import { Empleados } from '../../../../shared/model/empleados.model';
import { Roles } from '../../../../shared/model/rol.model';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
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
  @ViewChild('content2') modalEditar: any;
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
  submitted = false;
  fieldTextType!: boolean;
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
    (public service: TableService,
     private rolService: RolesService, 
     private formBuilder: UntypedFormBuilder, 
     private modalService: NgbModal, 
     private router: Router
    ) { }

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

      this.LoadEmpleadosNoTienenUsuario();
      this.LoadRoles();
  
      this.usuarioForm = this.formBuilder.group({
        user_NombreUsuario: ['', [Validators.required]],
        user_EsAdmin: [false],
        user_Contrasena: [''],
        role_Id: [''],
        empe_Id: ['', [Validators.required]],
      });
  }
  get form() {
    return this.usuarioForm.controls;
  }
  guardarUsuario() {
    this.submitted = true;
      if (this.usuarioForm.get('user_Contrasena')?.value === '' || this.usuarioForm.get('user_Contrasena')?.value === null) {
        this.form['user_Contrasena'].setErrors([Validators.required]);
      }
    
    if (!this.usuarioForm.get('user_EsAdmin')?.value) {
      if (this.usuarioForm.get('role_Id')?.value === '' || this.usuarioForm.get('role_Id')?.value === null) {
        this.form['role_Id'].setErrors([Validators.required]);
      }
    } else {
      this.form['role_Id'].reset();
    }

    if (this.usuarioForm.valid) {
        this.service.validarUsernameExiste(this.usuarioForm.get('user_NombreUsuario')?.value).subscribe((data: any) => {
          if (data.code === 200) {
            const idUsername = data.data.codeStatus;
            if (idUsername > 0) {
              this.mensajeWarning('El nombre de usuario ya existe');
            } else {
              const usuarioInsert = new Usuarios();
              usuarioInsert.user_NombreUsuario = this.usuarioForm.get('user_NombreUsuario')?.value;
              usuarioInsert.user_Contrasena = this.usuarioForm.get('user_Contrasena')?.value;
              usuarioInsert.user_EsAdmin = this.usuarioForm.get('user_EsAdmin')?.value;
              usuarioInsert.role_Id = this.usuarioForm.get('role_Id')?.value ?? 0;
              usuarioInsert.empe_Id = this.usuarioForm.get('empe_Id')?.value;
              usuarioInsert.user_UsuCreacion = JSON.parse(localStorage.getItem("user") || '').user_Id;
              this.service.insertarNuevoUsuario(usuarioInsert).subscribe((data: any) => {
                if (data.code === 200) {
                  if (data.data.codeStatus === 1) {
                    this.mensajeSuccess('Usuario agregado con exito');
                  } else {
                    this.mensajeError('Ocurrio un error al intentar agregar el usuario');
                  }
                } else {
                  this.mensajeError('Error relacionado con el servidor');
                }
              });
            }
          }
        });
  
    }
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
     
    this.modalRef = this.modalService.open(this.modalEditar, { centered: true });
    };
  
    

    const button = document.createElement('il');
    button.classList.add('edit'); 

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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',  centered: true }).result.then((result) => {
      console.log(result);
    }, (reason) => {
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
