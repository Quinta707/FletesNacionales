import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Municipios } from '../../../../shared/model/municipios.model';
import { TableService } from '../../../../shared/services/municipios.services';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Idioma } from '../../../../../../config';
import {  ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { AgGridAngular } from 'ag-grid-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

 
@Component({
  selector: 'app-municipios-list',
  templateUrl: './municipios-list.component.html',
  styleUrls: ['./municipios-list.component.scss']
})
export class MunicipiosListComponent implements OnInit {
  
  createFormGroup: FormGroup;
  updateFormGroup: FormGroup;

  ngOnInit(): void {
    
    this.service.getDepartamenos()
    .subscribe((data: any) =>{
      
      this.departamentosDDL = data.data.map((item:any) =>( 
        {
        value: item.depa_Id,
        label: item.depa_Nombre
      })) 
 
    })
    
    this.createFormGroup = this._formBuilder.group({
      muni_Nombre: ['', Validators.required],
      muni_Id: ['', Validators.required],
      depa_Id: ['', Validators.required],
   });

 
    this.updateFormGroup = this._formBuilder.group({
     muni_Nombre:['', Validators.required],
     muni_Id:['', Validators.required],
     depa_Id:['', Validators.required]
    });
     this.index()
 
   }
   algo(){
    console.log(this.createFormGroup)
    console.log(this.municipiosCreate)
   }

  public validate = false;
  public selected = [];
  
  public domLayout: DomLayoutType = 'autoHeight';
  idioma = Idioma

  municipios: Municipios[];
  closeResult: string;
  paginationPageSize: number = 10;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, public service: TableService,private _formBuilder: FormBuilder) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.municipios)
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.validate = false;
    this.sumbit = false
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectedOption: string;
  textInput: string;
  
  onKeyDown(event: any) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (event.key !== undefined && !allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
      event.preventDefault();
    }
  }
  
  onPaste(event: any) {
    const pastedText = event.clipboardData.getData('text/plain');
    const numericValue = pastedText.replace(/[^0-9]/g, '');
    this.textInput = numericValue;
    event.preventDefault();
  }
  mostrarDato(){
    console.log(this.selectedOption + this.textInput )
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

  sumbit: boolean = true
  Guardar() {
    this.sumbit = true;
    this.validate = false;
    console.log(this.municipiosCreate)
    try
    {
      let datoTrim = (this.createFormGroup.value['muni_Nombre'].trim());
      this.createFormGroup.get("muni_Nombre").setValue(datoTrim)
      this.municipiosCreate.muni_Nombre = datoTrim;
    }
    catch(e)
    {
      console.log(e)
    }

    if(this.municipiosCreate.muni_Id == null || this.municipiosCreate.muni_Id == "")
    {
      this.validate = true;
      this.sumbit = true
    }
    if(this.municipiosCreate.muni_Nombre == null || this.municipiosCreate.muni_Nombre == "")
    {
      this.validate = true;
      this.sumbit = true
    }
    if(this.municipiosCreate.depa_Id == null || this.municipiosCreate.depa_Id == "")
    {
      this.toastSeleccionaDepartamento
      this.sumbit = true
      this.validate = true;      
    }
    else if(this.municipiosCreate.muni_Nombre != null && this.municipiosCreate.muni_Id != null && this.municipiosCreate.muni_Id != null)
    {
      this.validate = false;
      this.municipiosCreate.muni_Id = this.municipiosCreate.depa_Id + "" + this.municipiosCreate.muni_Id
      
      this.service.createMunicipios(this.municipiosCreate)
      .subscribe((data: any) =>{    
        if(data.message == "YaExiste")
        {
          this.toastMunicipioExiste()
          this.municipiosCreate.muni_Id = ""
        }
        if(data.message == "Error Inesperado")
        {
          this.toastMunicipioError()
        }
        if(parseInt(data.message) > 0){

          this.toastMunicipioAgregado()
          this.modalService.dismissAll()
          
          this.index()
        }  
      })
    }
  }
  Actualizar(est: any, content: any) {
    const id = est.data.muni_Id

    this.service.findMunicipios(id)
    .subscribe((data : any) =>{
      this.municipiosEditar = data;
      console.log(content)
    
      this.open(content)
    })
  }

  update(){
    this.validate = false;
    this.sumbit = false
    try
    {
      let datoTrim = (this.updateFormGroup.value['muni_Nombre'].trim());
      this.updateFormGroup.get("muni_Nombre").setValue(datoTrim)
      this.municipiosEditar.muni_Nombre = datoTrim;
    }
    catch(e)
    {
      console.log(e)
    }

    if(this.municipiosEditar.muni_Id == null || this.municipiosEditar.muni_Id == "")
    {
      this.validate = true;
      this.sumbit = true
    }
    if(this.municipiosEditar.muni_Nombre == null || this.municipiosEditar.muni_Nombre == "")
    {
      this.validate = true;
      this.sumbit = true
    }
    if(this.municipiosEditar.depa_Id == null || this.municipiosEditar.depa_Id == "")
    {
      this.toastSeleccionaDepartamento
      this.sumbit = true

    }
    else if(this.municipiosEditar.muni_Nombre != null && this.municipiosEditar.muni_Id != null && this.municipiosEditar.muni_Id != null)
    {
      this.service.updateMunicipios(this.municipiosEditar)
    .subscribe((data: any) =>{     
      console.log(data)
      if(data.message == "YaExiste")
      {
        this.toastMunicipioExiste()
      }
      if(data.message == "Error Inesperado")
      {
        this.toastMunicipioError()
        this.modalService.dismissAll()

      }
      if(parseInt(data.message) > 0){

        this.modalService.dismissAll()

        this.toasteMunicipioActuazliazo()
        this.index()
      }  
    })
   }
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
 

  @ViewChild('Update') modalUpdate: any;
  
  @ViewChild('Delete') modalDelete: any;

  columnDefs: ColDef[] = [
    { field: 'muni_Id', headerName: 'Codigo de muncipios', flex: 2 },
    { field: 'muni_Nombre', headerName: 'Municipio', flex: 2 },
    { field: 'depa_Id', headerName: 'Codigo de Departamento', flex: 2 },
    { field: 'depa_Nombre', headerName: 'Departamento', flex: 2 },

    { cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };
  actionButtonRenderer(params: any, modalService: NgbModal) {
    const Act = () => {
          
    this.Actualizar(params,this.modalUpdate)  
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

  
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }
  public searchText;

  public tableItem$: Observable<Municipios[]>;
  total$: Observable<number>;

  toastMunicipioExiste()
  {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: 'Este Municipio ya existe',
      icon: 'error'
    })
  }
  toastMunicipioError()
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
  toastMunicipioAgregado()
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
  toasteMunicipioActuazliazo()
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
  toastSeleccionaDepartamento()
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
  toastMunicipioenUso()
  {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      title: 'Este Municipio no se puede eliminar porque esta en uso',
      icon: 'error'
    })
  }
  toastMunicipioEliminado()
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
 
