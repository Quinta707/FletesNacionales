import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Vehiculos } from '../../../../shared/model/vehiculos.model';
import { VehiculosEdit } from '../../../../shared/model/Vehiculosedit.model';
import { TableService } from '../../../../shared/services/Vehiculos.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.scss']
})
export class VehiculosListComponent implements OnInit {
  public selected = [];
  Vehiculos:Vehiculos = new Vehiculos();
  VehiculosEdit:VehiculosEdit = new VehiculosEdit();
  codigoValue: string = '';
  departamentoValue: string = '';
  submitted: boolean = false;
  basicModalCloseResult: string = '';
  modalRef: NgbModalRef | undefined;
  items: Vehiculos[];
 
  ngOnInit(): void {
   this.service.getVehiculos()
   .subscribe((data: any)=>{
      this.items= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<Vehiculos[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService,
    private modalService: NgbModal,
    private router:Router,
    private http: HttpClient
    ) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.items)

  }

  onSearchInputChange(searchTerm: string) {
    this.service.searchTerm = searchTerm;
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

  }

  Guardar(e: Event) {
    e.preventDefault();
    if (!this.departamentoValue || !this.codigoValue) {
      this.submitted = true;
      if (!this.departamentoValue && !this.codigoValue) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          title: '¡ERROR!, Los campos de Departamento y Codigo no pueden estar vacíos',
          icon: 'error'
        });
      } else {
        if (!this.departamentoValue) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            title: '¡ERROR!, El campo de Departamento no puede estar vacío',
            icon: 'error'
          });
        }
        if (!this.codigoValue) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            title: '¡ERROR!, El campo de Codigo no puede estar vacío',
            icon: 'error'
          });
        }
      }
      return;
    }
    const apiUrl = 'https://localhost:44339/api/Vehiculos/Insertar';
    const requestBody = {
      depa_Id : this.codigoValue,
      depa_Nombre: this.departamentoValue
    };
  
    this.http.post(apiUrl, requestBody).subscribe(
      (response: any) => {
        console.log(response);
        if (response !== undefined) {
          if (response.success) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: '¡Registro Ingresado con éxito!',
              icon: 'success'
            }).then(() => {
              this.modalRef?.close(); // Cerrar el modal
              this.departamentoValue = ''; // Restablecer el valor del campo
              this.submitted = false; // Reiniciar el estado del formulario
              this.service.getVehiculos()
                .subscribe((data: any) => {
                  this.items = data.data;
                  this.service.setUserData(data.data);
                });
              this.modalService.dismissAll();
            });
          } else if (response.message === "YaExiste") {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              title: '¡Ya existe el Departamento!',
              icon: 'warning'
            });
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: '¡Hubo un error al insertar el registro!',
              icon: 'error'
            });
          }
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            title: '¡Hubo un error en la respuesta del API!',
            icon: 'error'
          });
          console.error('Respuesta del API inválida:', response);
        }
      },
      (error: any) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          title: '¡Hubo un error al realizar la solicitud!',
          icon: 'error'
        });
        console.error(error);
      }
    );
  }

  Editar() {
    if (!this.VehiculosEdit.depa_Nombre) {
      this.submitted = true;
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      }).fire({
        title: '¡ERROR!, El campo de Departamento no puede estar vacio',
        icon: 'error'
      });
      return;
    }
  
    this.service.EditarDepartamento(this.VehiculosEdit).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success == 1) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: '¡Registro Actualizado con éxito!',
            icon: 'success'
          });
          this.modalService.dismissAll();
          this.service.getVehiculos().subscribe(data => {
            this.items = data;  
          });
        } else if (response.message == "YaExiste") {
          // El registro ya existe
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            title: 'Ya existe este Departamento',
            icon: 'warning'
          });
        } else {
          // Error desconocido u otro código de estado
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: 'Ha ocurrido un error',
            icon: 'error'
          });
        }
      },
      (error) => {
        // Error en la comunicación con el servidor
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Error de comunicación con el servidor',
          icon: 'error'
        });
        console.error(error);
      }
    );
  }
  
  Delete() {
    const depa_Id: string | undefined = isNaN(parseInt(localStorage.getItem("depa_Id") ?? '', 0)) ? undefined : parseInt(localStorage.getItem("depa_Id") ?? '', 0).toString();
    if (depa_Id !== undefined) {
      this.Vehiculos.depa_Id = depa_Id.toString();
    }
  
    this.service.DeleteDepartamento(this.Vehiculos).subscribe(
      (response: any) => {
        console.log(this.Vehiculos);
        console.log(response);
        if (response.success == 1) {
          this.handleDeleteSuccess(); // Mostrar el Toast de éxito solo cuando response.success sea igual a 1
        } else {
          this.handleDeleteError(); // Mostrar el Toast de error en otros casos
        }
      },
      (error: any) => {
        this.handleDeleteError(); // Mostrar el Toast de error en caso de error en la solicitud
        console.error(error);
      }
    );
  }
  
  handleDeleteSuccess() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: '¡Registro eliminado con éxito!',
      icon: 'success'
    }).then(() => {
      this.modalService.dismissAll();
      this.service.getVehiculos().subscribe((data: any) => {
        this.items = data;
      });
    });
  }
  
  handleDeleteError() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: '¡Registro eliminado con éxito!',
      icon: 'success'
    }).then(() => {
      this.modalService.dismissAll();
      this.service.getVehiculos().subscribe((data: any) => {
        this.items = data;
      });
    });
  }
  openBasicModal1(content: TemplateRef<any>, id:number) {
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
    localStorage.setItem("depa_Id",id.toString())
  }

  openBasicModal2(content: TemplateRef<any>, id:number) {
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
    localStorage.setItem("depa_Id",id.toString())
  }

  openBasicModal3(content: TemplateRef<any>, VehiculosEdit: VehiculosEdit) {
    this.VehiculosEdit = { ...VehiculosEdit };
    console.log(this.VehiculosEdit);
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
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
  deleteData(id: number){
    this.tableItem$.subscribe((data: any)=> {      
      data.map((elem: any,i: any)=>{elem.id == id && data.splice(i,1)})
      
    })
  }

  cancelar() {
    this.departamentoValue = ''; // Restablecer el valor del campo
    this.codigoValue = '';
    this.submitted = false; // Reiniciar el estado del formulario
  }

 }
 
