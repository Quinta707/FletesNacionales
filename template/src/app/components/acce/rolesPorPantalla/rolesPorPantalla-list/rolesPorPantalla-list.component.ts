import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
import { TableService } from '../../../../shared/services/rolesPorPantalla.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-rolesPorPantalla-list',
  templateUrl: './rolesPorPantalla-list.component.html',
  styleUrls: ['./rolesPorPantalla-list.component.scss']
})
export class RolesporPantallaListComponent implements OnInit {
  public validate = false;
  public selected = [];
  
  rolesPorPantalla: RolesporPantalla[];
  closeResult: string;


  outerTableData: any[] = [];

  innerTableData: any[] = [];
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router, public service: TableService) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.rolesPorPantalla)
    config.backdrop = 'static';
    config.keyboard = false;

  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  index(){
    this.service.getRolesporPantalla()
    .subscribe((data: any)=>{      
      console.log(data.data)
       this.rolesPorPantalla= data.data;
       this.outerTableData = data.data
       this.service.setUserData(data.data)
    })
  }
 
  ngOnInit(): void {
      
    this.index()
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  rolesPorPantallaEliminar: RolesporPantalla = new RolesporPantalla()
  Eliminar(est: RolesporPantalla, content) {
    console.log('a')
    this.rolesPorPantallaEliminar.role_Id = est.role_Id
   
    console.log('b')
    this.open(content)
  }

  delete() {
    
    console.log('c')
    console.log(this.rolesPorPantallaEliminar.role_Id)
    this.service.deleteRol(this.rolesPorPantallaEliminar)
    .subscribe(() => {      
      this.service.deleteRolesporPantalla(this.rolesPorPantallaEliminar)
      .subscribe(()=>{  
        this.modalService.dismissAll()
        this.index()
      })
    })
  }
  Actualizar(id: any)
  {
    console.log(id)
    localStorage.setItem("role_Id", id)
    this.router.navigate(["/acce/Roles/Update"])
  }
  Insertar()
  {
    this.router.navigate(["/acce/Roles/Create"])
  }


  public tableItem$: Observable<RolesporPantalla[]>;
  public searchText;
  public pantallas: [];
  total$: Observable<number>;


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
  selectedRowIndex: number = -1;

  toggleTasks(index: any, id: any): void {
    if (index === this.selectedRowIndex) {
      this.selectedRowIndex = -1;
      this.innerTableData = [];
    } else {
      this.selectedRowIndex = index;

      this.dataPantallas(id);
    }
   
  }

  dataPantallas(id) {
    this.service.findRolesporPantalla(id)
    .subscribe((data: any)=>{
      console.log(data)
      this.innerTableData = data
    })
  }
 }
 
