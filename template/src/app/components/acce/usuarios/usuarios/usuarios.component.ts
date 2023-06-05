import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Usuarios } from '../../../../shared/model/usuarios.model';
import { Empleados } from '../../../../shared/model/empleados.model';
import { Roles } from '../../../../shared/model/rol.model';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { TableService } from '../../../../shared/services/empleados.service';
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
  @ViewChild('delete') modalDelete: any;
  user:any = JSON.parse(localStorage.getItem("user"));
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
  emppleadosDDL : any[]
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
  sumit:boolean = false;
  constructor
    (public service: UsuariosService,
    public service2: TableService,
     private rolService: RolesService, 
     private formBuilder: UntypedFormBuilder, 
     private modalService: NgbModal, 
     private _formBuilder: FormBuilder,
     private router: Router
    ) { }
  
  columnDefs: ColDef[] = [
    { field: 'user_Id', headerName: 'ID', flex: 1 },
    { field: 'user_NombreUsuario', headerName: 'Nombre Usuario', flex: 2 },
    { field: 'empe_NombreCompleto', headerName: 'Nombre Empleado', flex: 2 },
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

      this.service2.getEmpleados()
      .subscribe((data: any)=>{
        this.emppleadosDDL= data.data;
      })

      this.LoadEmpleadosNoTienenUsuario();
      this.LoadRoles();
  
      this.EditGroup = this._formBuilder.group({
        user_NombreUsuario: ['', [Validators.required]],
        user_EsAdmin: [false],
        user_Contrasena: ['', [Validators.required]],
        role_Id: [null, [Validators.required]],
        empe_Id: [null, [Validators.required]],
      });

      this.usuarioForm = this.formBuilder.group({
        user_NombreUsuario: ['', [Validators.required]],
        user_EsAdmin: [false],
        user_Contrasena: ['', [Validators.required]],
        role_Id: [null, [Validators.required]],
        empe_Id: [null, [Validators.required]],
      });
  }
  get form() {
    return this.usuarioForm.controls;
  }

  cancelar(){
    this.usuarioForm = this.formBuilder.group({
      user_NombreUsuario: '',
      user_Contrasena: '' ,
      role_Id: null ,
      empe_Id: null,
    });
  }

  guardarUsuario() {
    this.submitted = true;
    if (this.usuarioForm.valid) {
        this.service.validarUsernameExiste(this.usuarioForm.get('user_NombreUsuario')?.value).subscribe((data: any) => {
          if (data.code === 200) {
            const idUsername = data.data.codeStatus;
            if (idUsername > 0) {
              this.mensajeWarning('El nombre de usuario ya existe');
            } else {
              console.log(this.form);

              const usuarioInsert = new Usuarios();
              usuarioInsert.user_NombreUsuario = this.usuarioForm.get('user_NombreUsuario')?.value;
              usuarioInsert.user_Contrasena = this.usuarioForm.get('user_Contrasena')?.value;
              usuarioInsert.user_EsAdmin = this.usuarioForm.get('user_EsAdmin')?.value;
              usuarioInsert.role_Id = this.usuarioForm.get('role_Id')?.value ?? 0;
              usuarioInsert.empe_Id = this.usuarioForm.get('empe_Id')?.value;
              usuarioInsert.user_UsuCreacion = JSON.parse(localStorage.getItem("user") || '').user_Id;

              console.log("datos",usuarioInsert)

              this.service.insertarNuevoUsuario(usuarioInsert).subscribe((data: any) => {
                if (data.code === 200) {
                  if (data.data.codeStatus === 1) {
                    this.mensajeSuccess('Usuario agregado con exito');
                    this.service.getUsuarios()
                    .subscribe((data: any)=>{
                        this.Usuarios= data.data;
                    })
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
        this.service.getUsuarios()
        .subscribe((data: any) => {
          this.Usuarios = data.data;
        })
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

  EditGroup: FormGroup;  
  actionButtonRenderer(params: any, modalService: NgbModal) {
    const openModelEdit = () => {
      console.log(params.data)
      this.submitted = false;
      this.usuarios.user_Id = params.data.user_Id;
      this.EditGroup.get('user_Contrasena').setValue(params.data.user_Contrasena);
      this.EditGroup.get('user_NombreUsuario').disable();
      this.Usuarios = params.data;
    
      this.modalRef = this.modalService.open(this.modalEditar, { centered: true });
   };
  
   const openModalDelete = () => {
    this.Usuarios = params.data;
    this.usuarios.user_Id = params.data.user_Id;
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

  closeModal() {
    if (this.modalRef) {
      this.sumit = false;
      this.modalRef.dismiss();
    }
  }

  EliminarModelo(){
    this.service.getUsuariosDelete(this.usuarios)
    .subscribe((data:any) => {
      console.log(data);
      if(data.success){
        this.alertaEliminado()
      }else{
        this.alertaErrorInespero()
      }

      this.modalRef.close();
      this.service.getUsuarios()
      .subscribe((data: any)=>{
          this.Usuarios= data.data;
      })

    })
    this.service.getUsuarios()
      .subscribe((data: any) => {
        this.Usuarios = data.data;
      })
 }

  EditarModelo() {
    this.sumit = true;
    if (this.EditGroup.valid) {
      let datoTrim = this.EditGroup.value['user_Contrasena'].trim();
      this.EditGroup.get("user_Contrasena").setValue(datoTrim);
      this.usuarios.user_Contrasena = datoTrim;
      this.usuarios.user_UsuModificacion = this.user.user_Id;
      this.usuarios.role_Id = this.EditGroup.value['role_Id'];
      this.usuarios.user_EsAdmin = this.EditGroup.value['user_EsAdmin'] ? true : false; 
      this.usuarios.empe_Id = this.EditGroup.value['empe_Id'];
  
      this.service.getUsuariosEditar(this.usuarios).subscribe((data: any) => {
        if (data.success) {
          this.alertaLogrado();
          this.modalRef.close();
        } else {
          this.alertaErrorInespero();
          this.modalRef.close();
        }
  
        this.service.getUsuarios().subscribe((data: any) => {
          this.Usuarios = data.data;
        });
      });
    } else {
      this.alertaCamposVacios();
    }
    this.service.getUsuarios()
      .subscribe((data: any) => {
        this.Usuarios = data.data;
      })
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
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: messageBody,
      icon: 'success',
    }).then(() => {
     
    });;
    this.modalRef?.close(); // Cerrar el modal
    this.submitted = false; // Reiniciar el estado del formulario
    this.service.getUsuarios()
      .subscribe((data: any) => {
      });
    this.modalService.dismissAll();
  }

  mensajeWarning(messageBody: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: messageBody,
      icon: 'warning',
    });
  }

  mensajeError(messageBody: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: messageBody,
      icon: 'error',
    });
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
