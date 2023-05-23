import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { Pedidos } from '../../../../shared/model/pedidos.model';
import { TableService } from '../../../../shared/services/fletes.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-flete-create',
  templateUrl: './fletes-create.component.html',
  styleUrls: ['./fletes-create.component.scss']
})
export class FleteCreateComponent implements OnInit {
  public selected = [];

  public active = 1;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }
  
  fletes: Flete[];
  pedidos: Pedidos[];
 
  public municipiosDdl = [];
  public vehiculosDdl = [];
  public empleadosDdl = [];
  public selectgroupby: string;

  ngOnInit(): void {
   this.service.getDllMunicipios()
   .subscribe((data: any)=>{
    this.municipiosDdl = data.data.map((item: any) => ({
      value: item.muni_Id,
      label: item.muni_Nombre,
      job: item.depa_Nombre,
    }));
   })
   this.service.getDllVehiculos()
   .subscribe((data: any)=>{
    this.vehiculosDdl = data.data.map((item: any) => ({
      value: item.vehi_Id,
      label: item.mode_Nombre,
      job: item.marc_Nombre,
    }));
   })
   this.service.getDllEmpleados()
   .subscribe((data: any)=>{
    this.empleadosDdl = data.data.map((item: any) => ({
      value: item.empe_Id,
      label: item.empe_NombreCompleto,
      job: item.carg_Descripcion,
    }));
   })
   this.service.getPedidos()
   .subscribe((data: any)=>{
    this.pedidos = data.data
   })
  }

  public tableItem$: Observable<Flete[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.fletes)

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
 
