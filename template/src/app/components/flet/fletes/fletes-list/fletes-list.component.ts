import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { TableService } from '../../../../shared/services/fletes.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';


@Component({
  selector: 'app-flete-list',
  templateUrl: './fletes-list.component.html',
  styleUrls: ['./fletes-list.component.scss']
})
export class FleteListComponent implements OnInit {
  public selected = [];

  
  cargos: Flete[];
 
  ngOnInit(): void {
   this.service.getCargos()
   .subscribe((data: any)=>{
      this.cargos= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<Flete[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.cargos)

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
 
