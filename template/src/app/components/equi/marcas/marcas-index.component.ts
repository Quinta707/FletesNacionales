import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Marcas } from '../../../shared/model/Marcas.model';
import { MarcasService } from '../../../shared/services/marcas.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';


@Component({
  selector: 'app-marcas-index',
  templateUrl: './marcas-index.component.html',
  styleUrls: ['./marcas-index.component.scss']
})
export class MarcasIndexComponent implements OnInit{
    public selected = [];
    marcas!: Marcas[];
 
   
    ngOnInit(): void {
     this.service.getMarcas()
     .subscribe((data: any)=>{
       this.marcas= data.data;
       this.service.setUserData(data.data)
     })
    }

    public tableMarca$: Observable<Marcas[]>;
    public searchText;
    total$: Observable<number>;
    
    constructor(public service:MarcasService){

      this.tableMarca$ = service.tableMarca$;
      this.total$ = service.total$;
      this.service.setUserData(this.marcas)
    }

    onSearchInputChange(searchTerm: string) {
      this.service.searchTerm = searchTerm;
    }
  
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  
    onSort({ column, direction }: SortEvent) {
      this.headers.forEach((header) => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
  
      this.service.sortColumn = column;
      this.service.sortDirection = direction;
  
    }

    deleteData(id: number){
      this.tableMarca$.subscribe((data: any)=> {      
        data.map((elem: any,i: any)=>{elem.id == id && data.splice(i,1)})
        
      })
    }

}
