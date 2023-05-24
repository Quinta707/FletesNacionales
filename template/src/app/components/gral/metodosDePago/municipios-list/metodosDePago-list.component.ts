import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MetodosDePago } from '../../../../shared/model/metodosDePago.model';
import { TableService } from '../../../../shared/services/metodoDePago.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';


@Component({
  selector: 'app-metodosDePago-list',
  templateUrl: './metodosDePago-list.component.html',
  styleUrls: ['./metodosDePago-list.component.scss']
})
export class MetodosDePagoListComponent implements OnInit {
  public selected = [];

  
  metodosDePago: MetodosDePago[];
 
  ngOnInit(): void {
   this.service.getMetodosDePago()
   .subscribe((data: any)=>{
      this.metodosDePago= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<MetodosDePago[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.metodosDePago)

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
 
