import { Component, QueryList, ViewChildren,  OnInit, Input, ViewEncapsulation } from '@angular/core';
import { EstadosCiviles } from '../../../../shared/model/estadosciviles.model';
import { TableService } from '../../../../shared/services/estadosciviles.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estadosciviles-list',
  templateUrl: './estadosciviles-list.component.html',
  styleUrls: ['./estadosciviles-list.component.scss']
})
export class EstadoscivilesListComponent implements OnInit {
  public selected = [];
  estadosciviles:EstadosCiviles = new EstadosCiviles();
  items: EstadosCiviles[];
  mantenimientoValue: string = '';
  submitted: boolean = false;
  modalRef: NgbModalRef | undefined;
  
  public tableItem$: Observable<EstadosCiviles[]>;
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
    this.service.getEstadosCiviles()
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

  Guardar(e: Event){
    const apiUrl = 'https://localhost:44339/api/EstadosCiviles/Insertar';
    e.preventDefault();
    if (!this.mantenimientoValue ) {
      this.submitted = true;
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      }).fire({
        title: '¡ERROR!, El campo de Estado Civil no puede estar vacio',
        icon: 'error'
      });
      return;
    }

    const requestBody = {
      data: {
        eciv_Descripcion: this.mantenimientoValue
      }
    };

    this.http.post(apiUrl, requestBody).subscribe(
      (response: any) => {
        console.log(response);
        if (response.data.codeStatus > 0) {
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
            this.mantenimientoValue = ''; // Restablecer el valor del campo
            this.submitted = false; // Reiniciar el estado del formulario
            window.location.reload();
          });
        } else if (response.data.codeStatus == -2) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            title: '¡Ya existe un registro con el mismo estado civil!',
            icon: 'error'
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            title: '¡Hubo un error al insertar el registro!',
            icon: 'error'
          });
        }
      },
      (error: any) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
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