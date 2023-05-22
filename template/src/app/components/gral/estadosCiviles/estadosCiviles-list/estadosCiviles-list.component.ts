import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EstadosCiviles } from '../../../../shared/model/estadosCiviles.model';
import { TableService } from '../../../../shared/services/estadosCiviles.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';


@Component({
  selector: 'app-estadosCiviles-list',
  templateUrl: './estadosCiviles-list.component.html',
  styleUrls: ['./estadosCiviles-list.component.scss']
})
export class EstadosCivilesComponent implements OnInit {
  public selected = [];

  
  estadosCiviles: EstadosCiviles[];
 
  ngOnInit(): void {
   this.service.getEstadosCiviles()
   .subscribe((data: any)=>{
      this.estadosCiviles= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<EstadosCiviles[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.estadosCiviles)

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
 
