import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Marcas } from '../../../shared/model/Marcas.model';
import { MarcasService } from '../../../shared/services/marcas.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
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
  marcas: Marcas[];
  @ViewChild('content') modalContent: any;
  //tabs
  public selected = [];
  public active = 1;
  public domLayout: DomLayoutType = 'autoHeight';
  
  idioma = Idioma

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }

  updateDate: FormGroup; // primer formulario

  //Datos de las tablas
  Marcas:Marcas = new Marcas();
  listaMarcas: Marcas[];


  //Columnas de las tablas
  columnDefs: ColDef[] = [
    { field: 'clie_Id', headerName: 'ID', flex: 1 },
    { field: 'clie_NombreCompleto', headerName: 'Nombre', flex: 1 },
    { field: 'clie_FechaNacimiento', headerName: 'Fecha de Nacimiento', flex: 1 },
    { field: 'clie_Telefono', headerName: 'Telefono', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];
  

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const onClickHandler = () => {
      this.Marcas.marc_Id = params.data.marc_Id;
      this.Marcas.marc_Nombre = params.data.marc_Nombre;

      
    this.modalRef = this.modalService.open(this.modalContent, { centered: true });
    };
  
    const redireccion = () => {
      this.router.navigate(['/flet/Fletes/Details'], { queryParams: { id: params.data.flet_Id } });
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
    button2.addEventListener('click', redireccion);
  
    const container = document.createElement('div');
    container.classList.add('action')
    container.appendChild(button);
    container.appendChild(button2);
  
    return container;
  }

  //Cpnonfiguracion
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  redireccionarConID(id: number) {
    this.router.navigate(['/otra-pagina'], { queryParams: { id: id } });
  }
  

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  paginationPageSize: number = 10;

  clearSelection(): void {
    this.agGrid.api.deselectAll();
    this.service.getMarcas()
    .subscribe((data: any)=>{
      this.listaMarcas= data.data;
    })
  }

  
  ngOnInit(): void {

    this.service.getMarcas()
    .subscribe((data: any)=>{
      this.listaMarcas= data.data;
    })

  }
  public searchText;

    MarcaValue: string = '';
    submitted: boolean = false;
    basicModalCloseResult: string = '';
    modalRef: NgbModalRef | undefined;

    
    constructor(
      public service:MarcasService,  
      private modalService: NgbModal,
      private router:Router, 
      private http: HttpClient){}

      onSearchInputChange() {
        this.agGrid.api.setQuickFilter(this.searchText);
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
