import { Component, QueryList, ViewChildren, OnInit, ViewChild } from '@angular/core';
import { EstadosDelPedido } from '../../../../shared/model/estadosdelpedido.model';
import { EstadosDelPedidoService } from '../../../../shared/services/estadosdelpedido.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estadosdelpedido-list',
  templateUrl: './estadosdelpedido-list.component.html',
  styleUrls: ['./estadosdelpedido-list.component.scss']
})
export class EstadosdelpedidoListComponent {


  estadosdelpedido: EstadosDelPedido = new EstadosDelPedido();
  estadosdelpedidolist!: EstadosDelPedido[];


  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public domLayout: DomLayoutType = 'autoHeight';
  idioma = Idioma
  paginationPageSize: number = 10;
  public searchText: string;

  constructor(
    public service: EstadosDelPedidoService
  ) {

  }

  ngOnInit(): void {
    this.service.getEstadosdelPedido()
      .subscribe((data: any) => {
        this.estadosdelpedidolist = data.data;
      })

  
  }

  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };

  columnDefs: ColDef[] = [
    { field: 'estp_Id', headerName: 'ID', flex: 1 },
    { field: 'estp_Nombre', headerName: 'Estado del Pedido', flex: 1 },
  ];

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