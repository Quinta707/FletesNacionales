import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EstadosCiviles } from '../../../../shared/model/estadosCiviles.model';
import { TableService } from '../../../../shared/services/estadosCiviles.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-estadosCiviles-list',
  templateUrl: './estadosCiviles-list.component.html',
  styleUrls: ['./estadosCiviles-list.component.scss']
})
export class EstadosCivilesComponent implements OnInit {
  public validate = false;
  public selected = [];
  
  estadosCiviles: EstadosCiviles[];
  closeResult: string;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, public service: TableService) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.estadosCiviles)
    config.backdrop = 'static';
    config.keyboard = false;

  }

  public submit() {
    this.validate = !this.validate;
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  estadosCreate: EstadosCiviles = new EstadosCiviles();

  estadosEditar: EstadosCiviles = new EstadosCiviles();

  estadosEliminar: EstadosCiviles = new EstadosCiviles();

  Guardar() {
    this.validate = !this.validate;
    if(this.estadosCreate.eciv_Descripcion == null)
    {

    }
    else
    {
      this.service.createEstadosCiviles(this.estadosCreate)
      .subscribe(() =>{     
        this.modalService.dismissAll()
        this.estadosCreate.eciv_Descripcion = null
        this.validate = false;
        this.index()
      })
    }
  }

  Actualizar(est: EstadosCiviles, content: any) {
    console.log(est.eciv_Descripcion)
    const id = est.eciv_Id

    this.service.findEstadosCiviles(id ?? 0)
    .subscribe((data : any) =>{
      
      this.estadosEditar = data;
      console.log(this.estadosEditar)
    
      this.open(content)
    })
  }

  update(){
    this.service.updateEstadosCiviles(this.estadosEditar)
    .subscribe(() =>{     
      this.modalService.dismissAll()
      
      this.index()
    })
  }

  Eliminar(est: EstadosCiviles, content) {
    this.estadosEliminar.eciv_Id = est.eciv_Id
   
    this.open(content)
  }

  delete() {
    console.log(this.estadosEliminar.eciv_Id)
    this.service.deleteEstadosCiviles(this.estadosEliminar)
    .subscribe(() => {      
      this.modalService.dismissAll()
      this.index()
    })
  }

  index(){
    this.service.getEstadosCiviles()
    .subscribe((data: any)=>{
      console.log(data.data)
       this.estadosCiviles= data.data;
       this.service.setUserData(data.data)
    })
  }
 
  ngOnInit(): void {
    this.index()
  }



  public tableItem$: Observable<EstadosCiviles[]>;
  public searchText;
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

 }
 