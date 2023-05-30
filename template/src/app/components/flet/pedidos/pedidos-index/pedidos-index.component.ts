import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { PedidoService } from '../../../../shared/services/pedidos.service';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html',
  styleUrls: ['./pedidos-index.component.scss']
})
export class PedidosIndexComponent implements OnInit {
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
  pedido:Pedidos = new Pedidos();
  listapedidos: Pedidos[];


  //Columnas de las tablas
  columnDefs: ColDef[] = [
    { field: 'pedi_Id', headerName: 'ID', flex: 1 },
    { field: 'clie_NombreCompleto', headerName: 'Cliente', flex: 1 },
    { field: 'pedi_OrigenNombre', headerName: 'Origen', flex: 1 },
    { field: 'pedi_DestinoNombre', headerName: 'Destino', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];
  

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const onClickHandler = () => {
       //console.log('Botón de acción clickeado', params);
      this.pedido.pedi_Id = params.data.pedi_Id;
      this.pedido.clie_NombreCompleto = params.data.clie_NombreCompleto;
      this.pedido.pedi_OrigenNombre = params.data.pedi_OrigenNombre;
      this.pedido.pedi_DestinoNombre = params.data.pedi_DestinoNombre;

      
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
    this.service.getPedidos()
    .subscribe((data: any)=>{
      this.listapedidos= data.data;
    })
  }

  
  ngOnInit(): void {

    this.service.getPedidos()
    .subscribe((data: any)=>{
      this.listapedidos= data.data;
    })

  }
  public searchText;

  modalRef: NgbModalRef;

  constructor(public service: PedidoService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private calendar: NgbCalendar,
              private router: Router) {

  }

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent, { centered: true });
  }

  redirectToCreate() {
    this.router.navigate(['/flet/Pedidos/Create']);
  }

  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }


}
