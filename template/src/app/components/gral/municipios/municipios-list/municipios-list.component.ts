import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Municipios } from '../../../../shared/model/municipios.model';
import { TableService } from '../../../../shared/services/municipios.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-municipios-list',
  templateUrl: './municipios-list.component.html',
  styleUrls: ['./municipios-list.component.scss']
})
export class MunicipiosListComponent implements OnInit {
  public validate = false;
  public selected = [];
  
  municipios: Municipios[];
  closeResult: string;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, public service: TableService) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.municipios)
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


  public departamentosDDL: []; // en un onin it se setea , 
  municipiosCreate: Municipios = new Municipios();

  municipiosEditar: Municipios = new Municipios();

  municipiosEliminar: Municipios = new Municipios();

  Guardar() {
    this.validate = !this.validate;
    if(this.municipiosCreate.muni_Nombre == null)
    {

    }
    else
    {
      this.municipiosCreate.depa_Id
      this.service.createMunicipios(this.municipiosCreate)
      .subscribe(() =>{     
        this.modalService.dismissAll()
        this.municipiosCreate.muni_Nombre = ''
        this.validate = false;
        this.index()
      })
    }
  }

  Actualizar(est: Municipios, content: any) {
    const id = est.muni_Id

    this.service.findMunicipios(id)
    .subscribe((data : any) =>{
      
      this.municipiosEditar = data;
      console.log(this.municipiosEditar)
    
      this.open(content)
    })
  }

  update(){
    this.service.updateMunicipios(this.municipiosEditar)
    .subscribe(() =>{     
      this.modalService.dismissAll()
      
      this.index()
    })
  }

  Eliminar(est: Municipios, content) {
    this.municipiosEliminar.muni_Id = est.muni_Id
   
    this.open(content)
  }

  delete() {
    console.log(this.municipiosEliminar.muni_Id)
    this.service.deleteMunicipios(this.municipiosEliminar)
    .subscribe(() => {      
      this.modalService.dismissAll()
      this.index()
    })
  }

  index(){
    this.service.getMunicipios()
    .subscribe((data: any)=>{
      console.log(data.data)
       this.municipios= data.data;
       this.service.setUserData(data.data)
    })
  }
 
  ngOnInit(): void {
    
   this.service.getDepartamenos()
   .subscribe((data: any) =>{
     
     this.departamentosDDL = data.data.map((item:any) =>( 
       {
       value: item.depa_Id,
       label: item.depa_Nombre
     })) 

   })
   
    this.index()
  }

  public tableItem$: Observable<Municipios[]>;
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
 
