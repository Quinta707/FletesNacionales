import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { TableService } from '../../../../shared/services/fletes.service';
import { TableService as FletePendiente } from '../../../../shared/services/fletesPendientes.service';
import { TableService as FleteProceso} from '../../../../shared/services/fletesEnProceso.service';
import { TableService as FleteTermiando} from '../../../../shared/services/fletesTerminados.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-flete-list',
  templateUrl: './fletes-list.component.html',
  styleUrls: ['./fletes-list.component.scss']
})
export class FleteListComponent implements OnInit {
  public selected = [];
  public active = 1;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }
  
  fletes: Flete[];
  fletesPendiente: Flete[];
  // fletesTerminado: Flete[];
  // fletesEnProceso: Flete[];
 
  ngOnInit(): void {
 
 

  //  this.service.getFletesEnProceso()
  //  .subscribe((data: any)=>{
  //     this.fletesEnProceso= data.data;
  //     this.serviceEnProceso.setUserData(data.data)
  //  })

  //  this.service.getFletesTerminados()
  //  .subscribe((data: any)=>{
  //     this.fletesTerminado= data.data;
  //     this.serviceTerminado.setUserData(data.data)
  //  })


  }

  public tableItem$: Observable<Flete[]>;
  public tablePendienteItem$: Observable<Flete[]>;
  // public tableItemTerminado$: Observable<Flete[]>;
  // public tableItemEnProceso$: Observable<Flete[]>;

  public searchText;
  total$: Observable<number>;
  totalpendiente$: Observable<number>;
  // totalTerminado$: Observable<number>;
  // totalEnProceso$: Observable<number>;

  constructor(  public service: TableService,
                public servicePendiente: FletePendiente,
                // public serviceTerminado: FleteTermiando,
                // public serviceEnProceso: FleteProceso,
                private router: Router) {

    this.tableItem$ = service.tableItem$;
    // this.tablePendienteItem$ = servicePendiente.tablePendienteItem$;
    // this.tableItemEnProceso$ = serviceEnProceso.tableItem$;
    // this.tableItemTerminado$ = serviceTerminado.tableItem$;

    this.total$ = service.total$;
    // this.totalpendiente$ = servicePendiente.totalpendiente$;
    // this.totalTerminado$ = serviceTerminado.total$;
    // this.totalEnProceso$ = serviceEnProceso.total$;

    this.service.getFletes()
    .subscribe((data: any)=>{
       this.fletes= data.data;
       this.service.setUserData(data.data)
    // this.service.setUserData(this.fletes)
    })

    this.service.getFletesPendientes()
    .subscribe((data: any)=>{
       this.fletesPendiente= data.data;
      //  this.servicePendiente.setfletePendientesData(data.data)
      //  this.servicePendiente.setfletePendientesData(this.fletesPendiente)
    })

    // this.serviceTerminado.setUserData(this.fletesTerminado)
    // this.serviceEnProceso.setUserData(this.fletesEnProceso)

  }

  redirectToCreate() {
    this.router.navigate(['/flet/Fletes/Create']);
  }
  


  // onSearchInputChange(searchTerm: string) {
  //   this.service.searchTerm = searchTerm;
  // }

  // @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  // onSort({ column, direction }: SortEvent) {
  //   // resetting other headers
  //   this.headers.forEach((header) => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });

  //   this.service.sortColumn = column;
  //   this.service.sortDirection = direction;

  // }

 }
 
