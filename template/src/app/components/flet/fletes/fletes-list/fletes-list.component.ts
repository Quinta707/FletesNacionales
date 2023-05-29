import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { TableService } from '../../../../shared/services/fletes.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-flete-list',
  templateUrl: './fletes-list.component.html',
  styleUrls: ['./fletes-list.component.scss']
})
export class FleteListComponent implements OnInit {
  @ViewChild('content') modalContent: any;
  //tabs
  public selected = [];
  public active = 1;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }

  updateDate: FormGroup; // primer formulario
  flet_FechaDeSalida: NgbDateStruct;

  //Datos de las tablas
  flete:Flete = new Flete();
  fletesPendiente: Flete[];
  fletesTerminado: Flete[];
  fletesEnProceso: Flete[];


  //Columnas de las tablas
  columnDefs: ColDef[] = [
    { field: 'flet_Id', headerName: 'ID', flex: 1 },
    { field: 'muni_NombreInicio', headerName: 'Desde', flex: 2 },
    { field: 'muni_NombreFinal', headerName: 'Hasta', flex: 2 },
    {
      field: 'flet_FechaDeSalida',
      headerName: 'Fecha de salida',
      flex: 2,
      valueFormatter: (params) => {
        const fecha = params.value;
        if (fecha) {
          const formattedFecha = fecha.slice(0, 10);
          return formattedFecha;
        }
        return '';
      }
    },
    { field: 'flet_PedidosTotales', headerName: 'Pedidos', flex: 1 },
    // { field: 'marc_Nombre', headerName: 'Vehiculo', flex: 1 },
    // { field: 'vehi_Placa', headerName: 'Matricula', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];
  columnDefsEnProceso: ColDef[] = [
    { field: 'flet_Id', headerName: 'ID', flex: 1 },
    { field: 'flet_Ubicado', headerName: 'Ubicacion', flex: 2 },
    { field: 'muni_NombreFinal', headerName: 'Hasta', flex: 2 },
    {
      field: 'flet_FechaDeSalida',
      headerName: 'Fecha de salida',
      flex: 2,
      valueFormatter: (params) => {
        const fecha = params.value;
        if (fecha) {
          const formattedFecha = fecha.slice(0, 10);
          return formattedFecha;
        }
        return '';
      }
    },
    {headerName: 'Pedidos', flex: 1, 
    valueGetter: (params) => {
      // Obtener los valores de las propiedades
      const flet_PedidosCompletados = params.data.flet_PedidosCompletados;
      const flet_PedidosTotales = params.data.flet_PedidosTotales;
      
      // Combinar los valores en una sola cadena
      const nombreCompleto = `${flet_PedidosCompletados}/${flet_PedidosTotales}`;
      
      return nombreCompleto;
    } },
    // { field: 'marc_Nombre', headerName: 'Vehiculo', flex: 1 },
    { field: 'vehi_Placa', headerName: 'Matricula', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer2(params), headerName: 'Acciones', flex: 1 }
  ];
  columnDefsTerminado: ColDef[] = [
    { field: 'flet_Id', headerName: 'ID', flex: 1 },
    { field: 'muni_NombreInicio', headerName: 'Desde', flex: 2 },
    { field: 'muni_NombreFinal', headerName: 'Hasta', flex: 2 },
    {
      field: 'flet_FechaDeSalida',
      headerName: 'Fecha de salida',
      flex: 2,
      valueFormatter: (params) => {
        const fecha = params.value;
        if (fecha) {
          const formattedFecha = fecha.slice(0, 10);
          return formattedFecha;
        }
        return '';
      }
    },
    {headerName: 'Pedidos', flex: 1, 
    valueGetter: (params) => {
      // Obtener los valores de las propiedades
      const flet_PedidosCompletados = params.data.flet_PedidosCompletados;
      const flet_PedidosTotales = params.data.flet_PedidosTotales;
      
      // Combinar los valores en una sola cadena
      const nombreCompleto = `${flet_PedidosCompletados}/${flet_PedidosTotales}`;
      
      return nombreCompleto;
    } },
    // { field: 'marc_Nombre', headerName: 'Vehiculo', flex: 1 },
    { field: 'vehi_Placa', headerName: 'Matricula', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer2(params), headerName: 'Acciones', flex: 1 }
  ];
  
  idioma = {
    // for set filter
    selectAll: 'Seleccionar Todo',
    searchOoo: 'Buscar...',
    blanks: 'En blanco',

    // for number filter and text filter
    filterOoo: 'Filtrar',
    applyFilter: 'Aplicar Filtro...',
    equals: 'Igual',
    notEqual: 'No Igual',

    // for number filter
    lessThan: 'Menos que',
    greaterThan: 'Mayor que',
    lessThanOrEqual: 'Menos o igual que',
    greaterThanOrEqual: 'Mayor o igual que',
    inRange: 'En rango de',

    // for text filter
    contains: 'Contiene',
    notContains: 'No contiene',
    startsWith: 'Empieza con',
    endsWith: 'Termina con',

    // filter conditions
    andCondition: 'Y',
    orCondition: 'O',

    // the header of the default group column
    group: 'Grupo',

    // tool panel
    columns: 'Columnas',
    filters: 'Filtros',
    valueColumns: 'Valos de las Columnas',
    pivotMode: 'Modo Pivote',
    groups: 'Grupos',
    values: 'Valores',
    pivots: 'Pivotes',
    toolPanelButton: 'BotonDelPanelDeHerramientas',

    // other
    noRowsToShow: 'No hay filas para mostrar',

    // enterprise menu
    pinColumn: 'Columna Pin',
    valueAggregation: 'Agregar valor',
    autosizeThiscolumn: 'Autoajustar esta columna',
    autosizeAllColumns: 'Ajustar todas las columnas',
    groupBy: 'agrupar',
    ungroupBy: 'desagrupar',
    resetColumns: 'Reiniciar Columnas',
    expandAll: 'Expandir todo',
    collapseAll: 'Colapsar todo',
    toolPanel: 'Panel de Herramientas',
    export: 'Exportar',
    csvExport: 'Exportar a CSV',
    excelExport: 'Exportar a Excel (.xlsx)',
    excelXmlExport: 'Exportar a Excel (.xml)',


    // enterprise menu pinning
    pinLeft: 'Pin Izquierdo',
    pinRight: 'Pin Derecho',


    // enterprise menu aggregation and status bar
    sum: 'Suman',
    min: 'Minimo',
    max: 'Maximo',
    none: 'nada',
    count: 'contar',
    average: 'promedio',

    // standard menu
    copy: 'Copiar',
    copyWithHeaders: 'Copiar con cabeceras',
    paste: 'Pegar',

    first: 'Inicio',
    last: 'Final',
    avg: 'promedio',
    filteredRows: 'Filtrado',
    selectedRows: 'Seleccionado',
    totalRows: 'Filas totales',
    totalAndFilteredRows: 'Filas',
    more: 'Más...',
    to: 'a',
    of: 'de',
    page: 'Pagina',
    pageLastRowUnknown: '?',
    nextPage: 'Siguiente',
    lastPage: 'Ultima',
    firstPage: 'Primera',
    previousPage: 'Anterior',

  }

  actionButtonRenderer(params: any, modalService: NgbModal) {
    const onClickHandler = () => {
       //console.log('Botón de acción clickeado', params);
      this.flete.flet_Id = params.data.flet_Id;
      this.flete.vehi_Id = params.data.vehi_Id;
      this.flete.flet_FechaDeSalida = new Date(params.data.flet_FechaDeSalida);

      this.flet_FechaDeSalida = {
        year: this.flete.flet_FechaDeSalida.getFullYear(),
        month: this.flete.flet_FechaDeSalida.getMonth() + 1,
        day: this.flete.flet_FechaDeSalida.getDate(),
      };

      this.updateDate.get('flet_FechaDeSalida').setValue(this.flet_FechaDeSalida);
      
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

  actionButtonRenderer2(params: any) {
    
    const redireccion = () => {
      this.router.navigate(['/flet/Fletes/Details'], { queryParams: { id: params.data.flet_Id } });
    }

    const button2 = document.createElement('il');
    button2.classList.add('detail'); 
  
    const iconElement2 = document.createElement('i');
    iconElement2.classList.add('fa'); 
    iconElement2.classList.add('fa-file-text-o'); 

    const textElement2 = document.createElement('span');
    textElement2.innerText = '';
    textElement2.appendChild(iconElement2);
   
    button2.appendChild(textElement2);
  
    button2.addEventListener('click', redireccion);
  
    const container = document.createElement('div');
    container.classList.add('action')
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
    this.service.getFletes()
      .subscribe((data: any) => {
        this.fletesPendiente = data.data;
      })
  }

  printFechas() {
    if (this.updateDate.valid) {
      const fecha = this.updateDate.value["flet_FechaDeSalida"]
      let fechaNormal = fecha.year.toString() + '-' + fecha.month.toString() + '-' + fecha.day.toString()
      this.flete.flet_FechaDeSalida = new Date(fecha.year.toString() + '-' + fecha.month.toString() + '-' + fecha.day.toString());
      this.flete.flet_UsuModificacion = 1;
  
      this.service.getVehiculoDisponible(parseInt(this.flete.vehi_Id.toString()) , fechaNormal.toString())
        .subscribe((data: any) => {
          if (parseInt(data.message) === 1) {
             this.service.putUpdateFlete(this.flete)
              .subscribe((data:any) =>{
                if(data.message === "Exitoso"){
                  this.modalRef.close();
                  Swal.fire({
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    title: 'La fecha se edito correctamente',
                    icon: 'success'
                  })
                }else{
                  Swal.fire({
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    title: 'No se pudo editar esta fecha',
                    icon: 'error'
                  })
                }
              })
          }else{
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: 'Este vehiculo estara en uso en esa fecha',
              icon: 'warning'
            })
          }
        })
    }else{
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        title: 'Sos el mero usuario va',
        icon: 'info'
      })
    }
  }
  
  ngOnInit(): void {

    this.updateDate = this._formBuilder.group({
      flet_FechaDeSalida: ['', Validators.required],
    });

    this.service.getFletesPendientes()
      .subscribe((data: any) => {
        this.fletesPendiente = data.data;
      })

    this.service.getFletesEnProceso()
      .subscribe((data: any) => {
        this.fletesEnProceso = data.data;
      })

    this.service.getFletesTerminados()
      .subscribe((data: any) => {
        this.fletesTerminado = data.data;
      })

  }
  public searchText;

  getToday(): NgbDateStruct {
    const today = this.calendar.getToday();
    return { year: today.year, month: today.month, day: today.day };
  }

  modalRef: NgbModalRef;

  constructor(public service: TableService,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private calendar: NgbCalendar,
              private router: Router) {

                this.flet_FechaDeSalida = this.calendar.getToday();
  }

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent, { centered: true });
  }

  redirectToCreate() {
    this.router.navigate(['/flet/Fletes/Create']);
  }

  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }

}

