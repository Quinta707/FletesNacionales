import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Marcas } from '../../../shared/model/Marcas.model';
import { MarcasService } from '../../../shared/services/marcas.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Global, Idioma } from 'config';
import { CellClickedEvent, ColDef, DomLayoutType } from 'ag-grid-community';
import { FormGroup } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-marcas-index',
  templateUrl: './marcas-index.component.html',
  styleUrls: ['./marcas-index.component.scss']
})
export class MarcasIndexComponent implements OnInit{
  paginationPageSize: number = 10;
     public selected = [];
    marcas!: Marcas[];
 
   
    ngOnInit(): void {
     this.service.getMarcas()
     .subscribe((data: any)=>{
       this.marcas= data.data;
       this.service.setUserData(data.data)
     })
    }
    MarcaValue: string = '';
    submitted: boolean = false;
    basicModalCloseResult: string = '';
    modalRef: NgbModalRef | undefined;

    public tableMarca$: Observable<Marcas[]>;
    public searchText;
    total$: Observable<number>;
    
    constructor(public service:MarcasService,  private modalService: NgbModal, private router:Router, private http: HttpClient){
      this.tableMarca$ = service.tableMarca$;
      this.total$ = service.total$;
      this.service.setUserData(this.marcas)
    }

    onSearchInputChange(searchTerm: string) {
      this.service.searchTerm = searchTerm;
    }
      @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

      onSort({ column, direction }: SortEvent) {
        this.headers.forEach((header) => {
          if (header.sortable !== column) {
            header.direction = '';
          }
        });

        this.service.sortColumn = column;
        this.service.sortDirection = direction;
      }

      deleteData(id: number){
        this.tableMarca$.subscribe((data: any)=> {      
          data.map((elem: any,i: any)=>{elem.id == id && data.splice(i,1)})
          
        })
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
      if (!this.MarcaValue) {
        this.submitted = true;
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          title: '¡ERROR!, El campo no puede estar vacío',
          icon: 'error'
        });
        return;
      }
    
      const apiUrl = Global + 'Marcas/Insertar';
      const requestBody = {
        marc_Nombre:      this.MarcaValue,
        marc_UsuCreacion: 1
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
                this.MarcaValue = ''; // Restablecer el valor del campo
                this.submitted = false; // Reiniciar el estado del formulario
                this.service.getMarcas()
                  .subscribe((data: any) => {
                    this.marcas = data.data;
                    this.service.setUserData(data.data);
                  });
                this.modalService.dismissAll();
              });
            } else if (response.data.codeStatus === -2) {
              Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
                title: '¡Este registro ya existe!',
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

}
