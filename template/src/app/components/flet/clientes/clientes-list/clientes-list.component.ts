import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Clientes } from '../../../../shared/model/clientes.model';
import { ClientService } from '../../../../shared/services/clientes.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClienteListComponent implements OnInit {
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
  clientes:Clientes = new Clientes();
  listaclientes: Clientes[];


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
      this.clientes.clie_Id = params.data.clie_Id;
      this.clientes.clie_NombreCompleto = params.data.clie_NombreCompleto;
      this.clientes.clie_FechaNacimiento = params.data.clie_FechaNacimiento;
      this.clientes.clie_Telefono = params.data.clie_Telefono;

      
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
    this.service.getClientes()
    .subscribe((data: any)=>{
      this.listaclientes= data.data;
    })
  }

  
  ngOnInit(): void {

    this.service.getClientes()
    .subscribe((data: any)=>{
      this.listaclientes= data.data;
    })

  }
  public searchText;

  modalRef: NgbModalRef;

  constructor(
    public service: ClientService, 
    public router: Router, 
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private calendar: NgbCalendar,) {}



  CrearCliente(){
    this.router.navigate(['flet/Clientes/Create']);
  }

  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }
 }
 
