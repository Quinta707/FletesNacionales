import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Vehiculos } from '../../../../shared/model/vehiculos.model';
import { TableService } from '../../../../shared/services/vehiculo.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.scss']
})
export class VehiculosListComponent implements OnInit {
  public validate = false;
  public selected = [];
  
  vehiculos: Vehiculos[];
  closeResult: string;
  submitted: boolean = false;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, public service: TableService) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.vehiculos)
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  open(content: any) {
    this.validate = false;
    this.vehiculosCreate = new Vehiculos()
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectedOption: string;
  textInput: string;
  
  onKeyDown(event: any, eve: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (event.key !== undefined  && !allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
      event.preventDefault();
    }
    if (event.KeyboardEvent === 32) {
      event.preventDefault();
    }
    if (event.key === ' ') {
      event.preventDefault();
    }
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


  public modelosDDL: []; // en un onin it se setea , 
  vehiculosCreate: Vehiculos = new Vehiculos();

  vehiculosEditar: Vehiculos = new Vehiculos();

  vehiculosEliminar: Vehiculos = new Vehiculos();

  Guardar() {
    this.validate = false;
    this.vehiculosCreate.vehi_Placa = this.vehiculosCreate.vehi_Placa.trim()
    if(this.vehiculosCreate.mode_Id == null || this.vehiculosCreate.mode_Id == 0)
    {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        title: 'Selecciona el tipo del vehiculo',
        icon: 'error'
      })
    }
    if(this.vehiculosCreate.vehi_PesoMaximo == null || this.vehiculosCreate.vehi_PesoMaximo == 0)
    {
      this.validate = true;
    } 
    if(this.vehiculosCreate.vehi_VolumenMaximo == null || this.vehiculosCreate.vehi_VolumenMaximo == 0)
    {
      this.validate = true;
    }
    if(this.vehiculosCreate.vehi_Placa == null || this.vehiculosCreate.vehi_Placa == "")
    {
      this.validate = true;
    }
    else if(this.vehiculosCreate.mode_Id != null && this.vehiculosCreate.mode_Id != 0 && this.vehiculosCreate.vehi_PesoMaximo != null && this.vehiculosCreate.vehi_PesoMaximo != 0
       && this.vehiculosCreate.vehi_VolumenMaximo != null && this.vehiculosCreate.vehi_VolumenMaximo != 0 && this.vehiculosCreate.vehi_Placa != null && this.vehiculosCreate.vehi_Placa != "")
    {
      this.validate = false;     
      
      this.service.createVehiculos(this.vehiculosCreate)
      .subscribe((data: any) =>{     
        console.log(data)
        if(data.message == "YaExiste")
        {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: 'Este Vehiculo ya existe',
            icon: 'error'
          })
        }
        if(data.message == "Error Inesperado")
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
        if(parseInt(data.message) > 0){

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
  
  Actualizar(est: Vehiculos, content: any) {
    const id = est.vehi_Id

    this.service.findVehiculos(id)
    .subscribe((data : any) =>{
      this.vehiculosEditar = data
      console.log(this.vehiculosEditar)      
    
      this.open(content)
    })
  }
  cosas(){
    console.log(this.vehiculosEditar)
  }

  update(){
    if(this.vehiculosEditar.mode_Id == null || this.vehiculosEditar.mode_Id == 0)
    {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        title: 'Selecciona el tipo del vehiculo',
        icon: 'error'
      })
    }
    if(this.vehiculosEditar.vehi_PesoMaximo == null || this.vehiculosEditar.vehi_PesoMaximo == 0)
    {
      this.validate = true;
    } 
    if(this.vehiculosEditar.vehi_VolumenMaximo == null || this.vehiculosEditar.vehi_VolumenMaximo == 0)
    {
      this.validate = true;
    }
    if(this.vehiculosEditar.vehi_Placa == null || this.vehiculosEditar.vehi_Placa == "")
    {
      this.validate = true;
    }
    else if(this.vehiculosEditar.mode_Id != null && this.vehiculosEditar.mode_Id != 0 && this.vehiculosEditar.vehi_PesoMaximo != null && this.vehiculosEditar.vehi_PesoMaximo != 0
       && this.vehiculosEditar.vehi_VolumenMaximo != null && this.vehiculosEditar.vehi_VolumenMaximo != 0 && this.vehiculosEditar.vehi_Placa != null && this.vehiculosEditar.vehi_Placa != "")
    {
    this.service.updateVehiculos(this.vehiculosEditar)
    .subscribe((data: any) =>{     
      console.log(data)
      if(data.message == "YaExiste")
      {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Este Vehiculo ya existe',
          icon: 'error'
        })
      }
      if(data.message == "Error Inesperado")
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
      if(parseInt(data.message) > 0){

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


        this.index()
      }  
    })
  }
  }

  Eliminar(est: Vehiculos, content) {
    this.vehiculosEliminar.vehi_Id = est.vehi_Id
   
    this.open(content)
  }

  delete() {
    console.log(this.vehiculosEliminar.vehi_Id)
    this.service.deleteVehiculos(this.vehiculosEliminar)
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
            title: 'Este Vehiculo no se puede eliminar porque esta en uso',
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
    this.service.getVehiculos()
    .subscribe((data: any)=>{
      console.log(data.data)
       this.vehiculos= data.data;
       this.service.setUserData(data.data)
    })
  }
 
  ngOnInit(): void {
    
   this.service.getModelos()
   .subscribe((data: any) =>{
     
     this.modelosDDL = data.data.map((item:any) =>( 
       {
       value: item.mode_Id,
       label: item.mode_Nombre
     })) 
   })
   
    this.index()
  }

  public tableItem$: Observable<Vehiculos[]>;
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
 
