import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EstadosCiviles } from '../../../../shared/model/estadosCiviles.model';
import { TableService } from '../../../../shared/services/estadosCiviles.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


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
    
    this.estadosCreate.eciv_Descripcion = null
    this.validate = false;

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
    this.estadosCreate.eciv_Descripcion = this.estadosCreate.eciv_Descripcion.trim()
    if(this.estadosCreate.eciv_Descripcion == null)
    {

    }
    else
    {
      this.service.createEstadosCiviles(this.estadosCreate)
      .subscribe((data: any) =>{   
        if(data.message == "YaExiste")
        {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: 'Este Estado Civil ya existe',
            icon: 'error'
          })
        }
        if(data.message == "ErrorInesperado")
        {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: 'Ocurrio un error',
            icon: 'error'
          })
        }
        if(parseInt(data.data.codeStatus) > 0){

          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: 'Registro agregado con exito',
            icon: 'success'
          })
          this.modalService.dismissAll()


          this.index()
        }  
      })
    }
  }

  Actualizar(est: EstadosCiviles, content: any) {
    this.estadosCreate.eciv_Descripcion = this.estadosCreate.eciv_Descripcion.trim()
    const id = est.eciv_Id

    this.service.findEstadosCiviles(id ?? 0)
    .subscribe((data : any) =>{
      
      this.estadosEditar = data;
    
      this.open(content)
    })
  }

  update(){
    this.service.updateEstadosCiviles(this.estadosEditar)
    .subscribe((data:any) =>{     
      
      if(data.message == "YaExiste")
      {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Este Estado Civil ya existe',
          icon: 'error'
        })
      }
      if(data.message == "ErrorInesperado")
      {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Ocurrio un error',
          icon: 'error'
        })
      }
      if(parseInt(data.data.codeStatus) > 0){

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Registro actualizado con exito',
          icon: 'success'
        })
        this.modalService.dismissAll()

        this.estadosCreate.eciv_Descripcion = null
        this.validate = false;

        this.index()
      }  
    })
  }

  Eliminar(est: EstadosCiviles, content) {
    this.estadosEliminar.eciv_Id = est.eciv_Id
   
    this.open(content)
  }

  delete() {
    this.service.deleteEstadosCiviles(this.estadosEliminar)
    .subscribe((data: any) => {      
    if(data.message == "Registro eliminado")
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
          this.modalService.dismissAll()
          this.index()
      }   
      if(data.message == "EnUso")
      {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          title: 'Este Estado Civil no se puede eliminar porque esta en uso',
          icon: 'error'
        })
        this.modalService.dismissAll()

      }
      if(data.message == "Error Inesperado")
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

  index(){
    this.service.getEstadosCiviles()
    .subscribe((data: any)=>{
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
 
