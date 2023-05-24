import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EstadosDelPedido } from '../../../../shared/model/estadosDelPedido2.model';
import { TableService } from '../../../../shared/services/estadosDelPedido2.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';


@Component({
  selector: 'app-estadosDelPedido-list',
  templateUrl: './estadosDelPedido-list.component.html',
  styleUrls: ['./estadosDelPedido-list.component.scss']
})
export class EstadosDelPedidoListComponent implements OnInit {
  public selected = [];

  
  estadosDelPedido: EstadosDelPedido[];
 
  ngOnInit(): void {
   this.service.getEstadosdelPedido()
   .subscribe((data: any)=>{
      this.estadosDelPedido= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<EstadosDelPedido[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.estadosDelPedido)

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

  deleteData(id: number){
    this.tableItem$.subscribe((data: any)=> {      
      data.map((elem: any,i: any)=>{elem.id == id && data.splice(i,1)})
      
    })
  }

 }
 
