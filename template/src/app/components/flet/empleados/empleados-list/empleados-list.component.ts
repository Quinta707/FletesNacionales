import { Component, QueryList, ViewChildren } from '@angular/core';
import { Empleados } from '../../../../shared/model/empleados.model';
import { TableService } from '../../../../shared/services/empleados.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.scss']
})
export class EmpleadosListComponent {
  public selected = [];

  
  items: Empleados[];
 
  ngOnInit(): void {
   this.service.getEmpleados()
   .subscribe((data: any)=>{
      this.items= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<Empleados[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.items)

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
