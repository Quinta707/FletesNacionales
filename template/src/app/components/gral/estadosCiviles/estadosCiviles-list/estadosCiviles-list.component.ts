import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EstadosCiviles } from '../../../../shared/model/estadosCiviles.model';
import { TableService } from '../../../../shared/services/estadosCiviles.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-estadosCiviles-list',
  templateUrl: './estadosCiviles-list.component.html',
  styleUrls: ['./estadosCiviles-list.component.scss']
})
export class EstadosCivilesComponent implements OnInit {
  public selected = [];
  
  closeResult: string;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, public service: TableService) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.estadosCiviles)
  	// customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

  }

  open(content) {
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

  estadosCiviles: EstadosCiviles[];

  estadosCreate: EstadosCiviles = new EstadosCiviles();

  estadosEditar: EstadosCiviles = new EstadosCiviles();

  Guardar() {
    this.service.createEstadosCiviles(this.estadosCreate)
    .subscribe(data =>{     
      this.modalService.dismissAll()
      
      this.service.getEstadosCiviles()    
      .subscribe((data: any)=>{
        console.log('wawa')
        console.log(data.data )
        this.estadosCiviles= data.data;
        this.service.setUserData(data.data)
     })
    })
  }

  Actualizar(est: EstadosCiviles, content) {


    console.log(est.eciv_Id)
    const id = est.eciv_Id
    this.service.findEstadosCiviles(id ?? 0)
    .subscribe((data : any) =>{
      this.estadosEditar = data;
      
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    })
  }

  update(){

  }

  Eliminar(est: EstadosCiviles) {
    console.log(est.eciv_Id)

  }
 
  ngOnInit(): void {
   this.service.getEstadosCiviles()
   .subscribe((data: any)=>{
      this.estadosCiviles= data.data;
      this.service.setUserData(data.data)
   })
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
 
