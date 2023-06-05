import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Vehiculos } from '../../../../shared/model/vehiculos.model';
import { TableService } from '../../../../shared/services/vehiculo.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';


@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.scss']
})
export class VehiculosListComponent implements OnInit {

  
  createFormGroup: FormGroup;
  updateFormGroup: FormGroup;

  ngOnInit(): void {
    
    this.service.getModelos()
    .subscribe((data: any) =>{
      
      this.modelosDDL = data.data.map((item:any) =>( 
        {
        value: item.mode_Id,
        label: item.mode_Nombre
      })) 
    })
 
    this.createFormGroup = this._formBuilder.group({
     mode_Id: ['', Validators.required],
     vehi_PesoMaximo: ['', Validators.required],
     vehi_VolumenMaximo: ['', Validators.required],
     vehi_Placa: ['', Validators.required]
   });

   this.updateFormGroup = this._formBuilder.group({
    mode_Id: ['', Validators.required],
    vehi_PesoMaximo: ['', Validators.required],
    vehi_VolumenMaximo: ['', Validators.required],
    vehi_Placa: ['', Validators.required]
  });
    
     this.index()
   }
 

  public validate = false;
  public selected = [];
  
  vehiculos: Vehiculos[];
  closeResult: string;
  submitted: boolean = false;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, public service: TableService,private _formBuilder: FormBuilder) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.vehiculos)
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  open(content: any) {
    
    this.sumbit = false
    this.validate = false;
    this.submitted =  false;
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
  sumbit: boolean = true
  Guardar() {
    this.validate = true; 
    this.sumbit = true;
    try
    {
      let datoTrim = (this.createFormGroup.value['vehi_Placa'].trim());
      this.createFormGroup.get("vehi_Placa").setValue(datoTrim)
      this.vehiculosCreate.vehi_Placa = datoTrim;
    }
    catch(e)
    {
      console.log(e)
    }
    
    this.validate = true;
    if(this.vehiculosCreate.mode_Id == null || this.vehiculosCreate.mode_Id == 0)
    {
      this.toastSeleccionaTipoVehiculo()
      this.sumbit = true
      this.validate = true;
    }
    if(this.vehiculosCreate.vehi_PesoMaximo == null || this.vehiculosCreate.vehi_PesoMaximo == 0)
    {
      this.validate = true; 
      this.sumbit = true
    } 
    if(this.vehiculosCreate.vehi_VolumenMaximo == null || this.vehiculosCreate.vehi_VolumenMaximo == 0)
    {
      this.validate = true;
      this.sumbit = true
    }
    if(this.vehiculosCreate.vehi_Placa == null || this.vehiculosCreate.vehi_Placa == "")
    {
      this.validate = true;
      this.sumbit = true
    }
    else if(this.vehiculosCreate.mode_Id != null && this.vehiculosCreate.mode_Id != 0 && this.vehiculosCreate.vehi_PesoMaximo != null && this.vehiculosCreate.vehi_PesoMaximo != 0
       && this.vehiculosCreate.vehi_VolumenMaximo != null && this.vehiculosCreate.vehi_VolumenMaximo != 0 && this.vehiculosCreate.vehi_Placa != null && this.vehiculosCreate.vehi_Placa != "")
    {
      this.sumbit = false
      this.validate = false;  
      
      this.service.createVehiculos(this.vehiculosCreate)
      .subscribe((data: any) =>{     
        console.log(data)
        if(data.message == "YaExiste")
        {
          this.toastVehiculoExiste()
        }
        if(data.message == "Error Inesperado")
        {
          this.toastVehiculoError()
        }
        if(parseInt(data.message) > 0){

          this.toastVehizuloAgregado()
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
      console.log(this.vehiculosEditar.vehi_PesoMaximo)     
      console.log(this.vehiculosEditar.vehi_VolumenMaximo)     
    
      this.open(content)
    })
  }

  update(){
    this.validate = true; 
    this.sumbit = false
    
    try
    {
      let datoTrim = (this.vehiculosEditar.vehi_Placa.trim());
      this.createFormGroup.get("vehi_Placa").setValue(datoTrim)
      this.vehiculosEditar.vehi_Placa = datoTrim;
    }
    catch(e)
    {
      console.log(e)
    }
    if(this.vehiculosEditar.mode_Id == null || this.vehiculosEditar.mode_Id == 0)
    {
      this.sumbit = true
      this.validate = true;
      this.toastSeleccionaTipoVehiculo()
    }
    if(this.vehiculosEditar.vehi_PesoMaximo == null || this.vehiculosEditar.vehi_PesoMaximo == 0)
    {
      this.sumbit = true
      this.validate = true;
    } 
    if(this.vehiculosEditar.vehi_VolumenMaximo == null || this.vehiculosEditar.vehi_VolumenMaximo == 0)
    {
      this.sumbit = true
      this.validate = true;
    }
    if(this.vehiculosEditar.vehi_Placa == null || this.vehiculosEditar.vehi_Placa == "")
    {
      this.sumbit = true
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
        this.toastVehiculoExiste()
      }
      if(data.message == "Error Inesperado")
      {
        this.toastVehiculoError()
        this.modalService.dismissAll()

      }
      if(parseInt(data.message) > 0){

        this.modalService.dismissAll()

        this.toastVehiculoActualizado()
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
            this.toastVehiculoEliminado()
            this.modalService.dismissAll()
            this.index()
        }   
        if(data.message == "EnUso")
        {
          this.toastVehiculoenUso()
          this.modalService.dismissAll()
  
        }
        if(data.message == "Error Inesperado")
        {
          this.toastVehiculoError()
          this.modalService.dismissAll()
  
        }
        if(data.message == "Conexión perdida")
        {
          this.toastVehiculoError()
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

  public tableItem$: Observable<Vehiculos[]>;
  public searchText;
  total$: Observable<number>;

  paginationPageSize: number = 10;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  @ViewChild('Update') modalUpdate: any;
  
  @ViewChild('Delete') modalDelete: any;


  public domLayout: DomLayoutType = 'autoHeight';
  idioma = Idioma
  columnDefs: ColDef[] = [
    { field: 'vehi_Id', headerName: 'Id', flex: 1 },
    { field: 'mode_Nombre', headerName: 'Modelo', flex: 2 },
    { field: 'vehi_PesoMaximo', headerName: 'Peso Maximo', flex: 1 },
    { field: 'vehi_VolumenMaximo', headerName: 'Volumen Maximo', flex: 1 },
    { field: 'tipv_Descripcion', headerName: 'Vehiculo tipo', flex: 1 },
    { field: 'marc_Nombre', headerName: 'Marca', flex: 1 },
    { field: 'vehi_Placa', headerName: 'Placa', flex: 1 },


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
    
      this.Eliminar(params,this.modalDelete)
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
    iconElement2.classList.add('fa'); 
    iconElement2.classList.add('fa-file-text-o'); 

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

  toastVehiculoExiste()
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

  toastVehiculoError()
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

  toastVehizuloAgregado()
  {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: 'Registro agregado con exito',
      icon: 'success'
    })
  }
  toastVehiculoActualizado()
  {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: 'Registro actualizado con exito',
      icon: 'success'
    })
  }
  toastSeleccionaTipoVehiculo()
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
  toastVehiculoenUso()
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
  }
  toastVehiculoEliminado()
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
  }
 }
 
