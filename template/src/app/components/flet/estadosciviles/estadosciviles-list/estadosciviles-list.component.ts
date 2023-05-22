import { Component, QueryList, ViewChildren,  OnInit, Input, ViewEncapsulation } from '@angular/core';
import { EstadosCiviles } from '../../../../shared/model/estadosciviles.model';
import { TableService } from '../../../../shared/services/estadosciviles.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-estadosciviles-list',
  templateUrl: './estadosciviles-list.component.html',
  styleUrls: ['./estadosciviles-list.component.scss']
})
export class EstadoscivilesListComponent implements OnInit {
  public selected = [];

  items: EstadosCiviles[];
 
  ngOnInit(): void {
   this.service.getEstadosCiviles()
   .subscribe((data: any)=>{
      this.items= data.data;
      this.service.setUserData(data.data)
   });
  }

  public tableItem$: Observable<EstadosCiviles[]>;
  public searchText;
  total$: Observable<number>;

  constructor(
    public service: TableService,
    private modalService: NgbModal
  ) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.items);
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

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Acción a realizar cuando se cierra el modal
      console.log(result);
    }, (reason) => {
      // Acción a realizar cuando se descarta el modal sin guardar cambios
      console.log(reason);
    });
  }

  deleteData(id: number) {
    this.tableItem$.subscribe((data: any) => {      
      data.map((elem: any, i: any) => {
        if (elem.id == id) {
          data.splice(i, 1);
        }
      });
    });
  }
}