import { Component, QueryList, ViewChildren, OnInit, ViewChild } from '@angular/core';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { ServiceService } from '../../../../shared/services/pedidos.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html',
  styleUrls: ['./pedidos-index.component.scss']
})
export class PedidosIndexComponent {
  pedidos: Pedidos = new Pedidos();
  pedidolist!: Pedidos[];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public domLayout: DomLayoutType = 'autoHeight';
  idioma = Idioma
  paginationPageSize: number = 10;
  public searchText: string;
  constructor(private service:ServiceService, private router: Router){}
  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }
  ngOnInit(): void {
   this.service.getPedidos()
   .subscribe((data: any)=>{
     this.pedidolist= data.data;
   })
  }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };

  columnDefs: ColDef[] = [
    { field: 'pedi_Id', headerName: 'ID', flex: 1 },
    { field: 'clie_NombreCompleto', headerName: 'Nombre Cliente', flex: 1 },
    { field: 'muni_Origen', headerName: 'Muni Origen', flex: 1 },
    { field: 'muni_Destino', headerName: 'Muni Destino', flex: 1 },
    { cellRenderer: (params) => this.actionButtonRenderer2(params), headerName: 'Acciones', flex: 1 }
  ];


  actionButtonRenderer2(params: any) {
    
    const redireccion = () => {
      this.router.navigate(['/flet/Reporte/List'], { queryParams: { id: params.data.pedi_Id } });
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
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

  }
}
