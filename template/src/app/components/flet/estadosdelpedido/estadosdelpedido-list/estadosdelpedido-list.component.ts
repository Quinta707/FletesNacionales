import { Component, QueryList, ViewChildren,  OnInit } from '@angular/core';
import { EstadosDelPedido } from '../../../../shared/model/estadosdelpedido.model';
import { TableService } from '../../../../shared/services/estadosdelpedido.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estadosdelpedido-list',
  templateUrl: './estadosdelpedido-list.component.html',
  styleUrls: ['./estadosdelpedido-list.component.scss']
})
export class EstadosdelpedidoListComponent {
  public selected = [];
  estadosdelpedido:EstadosDelPedido = new EstadosDelPedido();
  items: EstadosDelPedido[];
  estadodelPedidoValue: string = '';
  submitted: boolean = false;
  modalRef: NgbModalRef | undefined;
  
  public tableItem$: Observable<EstadosDelPedido[]>;
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
    this.service.getEstadosdelPedido()
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
    const apiUrl = 'https://localhost:44339/api/EstadosDelPedido/Insertar';
    e.preventDefault();
    if (!this.estadodelPedidoValue) {
      this.submitted = true;
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        title: '¡ERROR!, El campo de Estado del Pedido no puede estar vacío',
        icon: 'error'
      });
    }
  
    const requestBody = {
      estp_Nombre: this.estadodelPedidoValue
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
              this.estadodelPedidoValue = ''; // Restablecer el valor del campo
              this.submitted = false; // Reiniciar el estado del formulario
              this.service.getEstadosdelPedido()
              .subscribe((data: any)=>{
                this.items= data.data;
                this.service.setUserData(data.data);
              });
              this.modalService.dismissAll( )
            });
          } else if (response.message === "YaExiste") {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              title: '¡Ya existe un registro con el mismo estado del pedido!',
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


  deleteData(id: number) {
    this.tableItem$.subscribe((data: any) => {      
      data.map((elem: any, i: any) => {
        if (elem.id == id) {
          data.splice(i, 1);
        }
      });
    });
  }
}
