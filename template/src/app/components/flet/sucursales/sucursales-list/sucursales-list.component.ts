import { Component, QueryList, ViewChildren } from '@angular/core';
import { Sucursales } from '../../../../shared/model/sucursales.model';
import { TableService } from '../../../../shared/services/sucursales.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';

@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.scss']
})
export class SucursalesListComponent {
  public selected = [];

  
  items: Sucursales[];
 
  ngOnInit(): void {
   this.service.getVehiculos()
   .subscribe((data: any)=>{
      this.items= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<Sucursales[]>;
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
