import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EstadosCiviles } from '../../../../shared/model/estadosCiviles.model';
import { TableService } from '../../../../shared/services/estadosCiviles.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Idioma } from '../../../../../../config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-estadosCiviles-list',
  templateUrl: './estadosCiviles-list.component.html',
  styleUrls: ['./estadosCiviles-list.component.scss']
})
export class EstadosCivilesComponent implements OnInit {
  
  public validate = false;
  public selected = [];
  paginationPageSize: number = 10;

  sumbite: boolean
  
  estadosCiviles: EstadosCiviles[];
  closeResult: string;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, public service: TableService,private _formBuilder: FormBuilder) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.estadosCiviles)
    config.backdrop = 'static';
    config.keyboard = false;

  }

  public submit() {
    this.validate = !this.validate;
  }
  
  createFormGroup: FormGroup;
  updateFormGroup: FormGroup;
  ngOnInit(): void {
    this.index()

    this.createFormGroup = this._formBuilder.group({
      eciv_Descripcion: ['', Validators.required],
    });
    
    this.updateFormGroup = this._formBuilder.group({
      eciv_Descripcion: ['', Validators.required],
    }); 
  }

  open(content: any) {
    this.estadosCreate.eciv_Descripcion = null
    this.validate = false;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
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
    this.validate = false;
    console.log(this.estadosCreate.eciv_Descripcion)
    try
    {
      let datoTrim = (this.estadosCreate.eciv_Descripcion.trim());
      this.createFormGroup.get("eciv_Descripcion").setValue(datoTrim)
      this.estadosCreate.eciv_Descripcion = datoTrim;
    }
    catch(e)
    {
      console.log(e)
    }
    
    
    if(this.estadosCreate.eciv_Descripcion == null || this.estadosCreate.eciv_Descripcion == "")
    {
      this.validate = true

    }
    else
    {
      this.validate = false
      this.service.createEstadosCiviles(this.estadosCreate)
      .subscribe((data: any) =>{   
        this.validate = false
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
    const id = est.eciv_Id

    this.service.findEstadosCiviles(id ?? 0)
    .subscribe((data : any) =>{
      console.log(data)
      this.estadosEditar = data

    
      this.open(content)
    })
    
  }

  update(){
    this.validate = false
    this.sumbite = false
    
    try
    {
      let datoTrim = (this.estadosEditar.eciv_Descripcion.trim());
      this.updateFormGroup.get("eciv_Descripcion").setValue(datoTrim)
      this.estadosEditar.eciv_Descripcion = datoTrim;
    }
    catch(e)
    {
      console.log(e)
    }
    
    if(this.estadosEditar.eciv_Descripcion == null || this.estadosEditar.eciv_Descripcion == "")
    {
      this.validate = true
      this.sumbite = true
    }
    else
    {
      this.validate = false
      this.sumbite = false
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
 

  @ViewChild('Update') modalUpdate: any;
  
  @ViewChild('Delete') modalDelete: any;


  public domLayout: DomLayoutType = 'autoHeight';
  idioma = Idioma
  columnDefs: ColDef[] = [
    { field: 'eciv_Id', headerName: 'Id', flex: 2 },
    { field: 'eciv_Descripcion', headerName: 'Descripcion', flex: 2 },

    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };
  actionButtonRenderer(params: any, modalService: NgbModal) {
    const Act = () => {
          
    this.Actualizar(params.node.data,this.modalUpdate)  
    };
    const Eli = () => {
    
      this.Eliminar(params.node.data,this.modalDelete)
    }

    const button = document.createElement('il');
    button.classList.add('edit'); 

    const iconElement = document.createElement('i');
    iconElement.classList.add('icon-pencil-alt'); 
    iconElement.classList.add('mx-2'); 

    const textElement = document.createElement('span');
    textElement.innerText = '';
    textElement.appendChild(iconElement);


    const button2 = document.createElement('il');
    button2.classList.add('detail'); 
  
    const iconElement2 = document.createElement('i');
    iconElement2.classList.add('icon-trash'); 

    const textElement2 = document.createElement('span');
    textElement2.innerText = '';
    textElement2.appendChild(iconElement2);
   
    button.appendChild(textElement);
    button2.appendChild(textElement2);
  
    button.addEventListener('click', Act);
    button2.addEventListener('click', Eli);
  
    const container = document.createElement('div');
    container.classList.add('action')
    container.appendChild(button);
    container.appendChild(button2);
  
    return container;
  }

  
  public tableItem$: Observable<EstadosCiviles[]>;
  public searchText;
  total$: Observable<number>;


  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

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
 
