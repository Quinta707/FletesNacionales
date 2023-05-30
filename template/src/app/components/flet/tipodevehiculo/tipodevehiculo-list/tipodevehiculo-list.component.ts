import { Component, QueryList, ViewChildren,  OnInit, TemplateRef } from '@angular/core';
import { TipoDeVehiculo } from '../../../../shared/model/tipodevehiculo.model';
import { TipoDeVehiculoEdit } from '../../../../shared/model/tipodevehiculoedit.model';
import { TableService } from '../../../../shared/services/tipodevehiculo.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tipodevehiculo-list',
  templateUrl: './tipodevehiculo-list.component.html',
  styleUrls: ['./tipodevehiculo-list.component.scss']
})
export class TipodevehiculoListComponent {
  public selected = [];
  TipoDeVehiculo:TipoDeVehiculo = new TipoDeVehiculo();
  TipoDeVehiculoEdit: TipoDeVehiculoEdit = new TipoDeVehiculoEdit();
  items: TipoDeVehiculo[];
  tipodeVehiculoValue: string = '';
  submitted: boolean = false;
  basicModalCloseResult: string = '';
  modalRef: NgbModalRef | undefined;
  
  public tableItem$: Observable<TipoDeVehiculo[]>;
  public searchText;
  total$: Observable<number>;

  constructor(
    public service: TableService,
    private modalService: NgbModal,
    private router:Router,
    private http: HttpClient
  ) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.items);   
  }

  ngOnInit(): void {
    this.service.getTipoDeVehiculo()
    .subscribe((data: any)=>{
      this.items= data.data;
      this.service.setUserData(data.data);
    });
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

    
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Acción a realizar cuando se cierra el modal
      console.log(result);
    }, (reason) => {
      // Acción a realizar cuando se descarta el modal sin guardar cambios
      console.log(reason);
    });
  }

  Guardar(e: Event) {
    e.preventDefault();
    if (!this.tipodeVehiculoValue) {
      this.submitted = true;
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        title: '¡ERROR!, El campo de tipo de vehiculo no puede estar vacío',
        icon: 'error'
      });
      return;
    }
  
    const apiUrl = 'https://localhost:44339/api/TipoDeVehiculo/Insertar';
    const requestBody = {
      tipv_Descripcion: this.tipodeVehiculoValue
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
              this.tipodeVehiculoValue = ''; // Restablecer el valor del campo
              this.submitted = false; // Reiniciar el estado del formulario
              this.service.getTipoDeVehiculo()
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
              title: '¡Ya existe un registro con el mismo tipo de vehiculo!',
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
            timer: 1500,
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
          timer: 1500,
          timerProgressBar: true,
          title: '¡Hubo un error al realizar la solicitud!',
          icon: 'error'
        });
        console.error(error);
      }
    );
  }

  Editar() {
    if (!this.TipoDeVehiculoEdit.tipv_Descripcion) {
      this.submitted = true;
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      }).fire({
        title: '¡ERROR!, El campo de tipo de vehiculo no puede estar vacio',
        icon: 'warning'
      });
      return;
    }
  
    this.service.EditarTipoVehiculoEditar(this.TipoDeVehiculoEdit).subscribe(
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
          this.service.getTipoDeVehiculo().subscribe(data => {
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
            title: 'Ya existe este registro',
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
    const tipv_Id: number | undefined = isNaN(parseInt(localStorage.getItem("tipv_Id") ?? '', 0)) ? undefined : parseInt(localStorage.getItem("tipv_Id") ?? '', 0);
    if (tipv_Id !== undefined) {
      this.TipoDeVehiculo.tipv_Id = tipv_Id;
    }
  
    this.service.DeleteTipoDeVehiculo(this.TipoDeVehiculo).subscribe(
      (response: any) => {
        console.log(this.TipoDeVehiculo);
        console.log(response);
        if (response.success == 1) {
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
            this.service.getTipoDeVehiculo().subscribe((data: any) => {
              this.items = data;
            });
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: '¡ERROR!, ¡Oh no!, hubo un error al eliminar el registro',
            icon: 'error'
          });
        }
      },
      (error: any) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: '¡Hubo un error al realizar la solicitud!',
          icon: 'error'
        });
        console.error(error);
      }
    );
  }

  openBasicModal1(content: TemplateRef<any>, id:number) {
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
    localStorage.setItem("tipv_Id",id.toString())
  }

  openBasicModal2(content: TemplateRef<any>, id:number) {
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
    localStorage.setItem("tipv_Id",id.toString())
  }

  openBasicModal3(content: TemplateRef<any>,TipoDeVehiculoEdit: TipoDeVehiculoEdit) {
    this.TipoDeVehiculoEdit = {...TipoDeVehiculoEdit};
    console.log(TipoDeVehiculoEdit)
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
  }

  cancelar() {
    this.tipodeVehiculoValue = ''; // Restablecer el valor del campo
    this.submitted = false; // Reiniciar el estado del formulario
  }


  deleteData(id: number) {
    this.tableItem$.subscribe((data: any[]) => {
      data.map((elem: any, i: number) => {
        if (elem.id == id) {
          data.splice(i, 1);
        }
      });
    });
  }
  }
