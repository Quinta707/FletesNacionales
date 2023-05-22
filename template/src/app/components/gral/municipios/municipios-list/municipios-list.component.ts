import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Municipios } from '../../../../shared/model/municipios.model';
import { TableService } from '../../../../shared/services/municipios.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader,SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';


@Component({
  selector: 'app-municipios-list',
  templateUrl: './municipios-list.component.html',
  styleUrls: ['./municipios-list.component.scss']
})


export class MunicipiosListComponent implements OnInit {
  public selected = [];

  
  Municipios: Municipios[];
 
  ngOnInit(): void {
   this.service.getMunicipios()
   .subscribe((data: any)=>{
      this.Municipios= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<Municipios[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.Municipios)

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
 
