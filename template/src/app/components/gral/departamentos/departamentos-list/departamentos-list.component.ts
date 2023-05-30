import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Departamentos } from '../../../../shared/model/Departamentos.model';
import { TableService } from '../../../../shared/services/Departamentos.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';


@Component({
  selector: 'app-departamentos-list',
  templateUrl: './departamentos-list.component.html',
  styleUrls: ['./departamentos-list.component.scss']
})
export class DepartamentosListComponent implements OnInit {
  public selected = [];

  
  Departamentos: Departamentos[];
 
  ngOnInit(): void {
   this.service.getDepartamentos()
   .subscribe((data: any)=>{
      this.Departamentos= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<Departamentos[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.Departamentos)

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
 
