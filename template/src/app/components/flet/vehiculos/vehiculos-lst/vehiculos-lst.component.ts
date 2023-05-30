import { Component, QueryList, ViewChildren } from '@angular/core';
import { Vehiculos } from '../../../../shared/model/vehiculos.model';
import { TableService } from '../../../../shared/services/vehiculo.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';

@Component({
  selector: 'app-vehiculos-lst',
  templateUrl: './vehiculos-lst.component.html',
  styleUrls: ['./vehiculos-lst.component.scss']
})
export class VehiculosLstComponent {
  public selected = [];
  
  items: Vehiculos[];
 
  ngOnInit(): void {
   this.service.getVehiculos()
   .subscribe((data: any)=>{
      this.items= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<Vehiculos[]>;
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
