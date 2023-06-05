import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
import { TableService } from '../../../../shared/services/rolesPorPantalla.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



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
       this.rolesPorPantalla= data.data;
       this.outerTableData = data.data
       this.service.setUserData(data.data)
    })
  }
 
  ngOnInit(): void {
      
    this.index()
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  rolesPorPantallaEliminar: RolesporPantalla = new RolesporPantalla()
  Eliminar(est: RolesporPantalla, content) {
    this.rolesPorPantallaEliminar.role_Id = est.role_Id
   
    this.open(content)
  }

  delete() {
    
    this.service.deleteRol(this.rolesPorPantallaEliminar)
    .subscribe((data: any) => {   
      if(data.message == "Eliminado")
      {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Registro eliminado con existo',
          icon: 'success'
        })

        this.service.deleteRolesporPantalla(this.rolesPorPantallaEliminar)
        .subscribe(()=>{  
         
          this.modalService.dismissAll()
          this.index()
        })
      }   
      if(data.message == "EnUso")
      {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          title: 'Este rol no se puede eliminar porque esta en uso',
          icon: 'error'
        })
        this.modalService.dismissAll()

      }
      if(data.message == "ErrorInesperado")
      {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Ha ocurrido un error',
          icon: 'error'
        })
        this.modalService.dismissAll()

      }
      if(data.message == "Conexión perdida")
      {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Ha ocurrido un error',
          icon: 'error'
        })
        this.modalService.dismissAll()

      }
    })
  }
  Actualizar(id: any)
  {
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
      this.innerTableData = data
    })
  }
 }
 
