import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Inputmask from "inputmask";
import { ClientService } from "../../../../shared/services/clientes.service";
import {
  CellClickedEvent,
  ColDef,
  DomLayoutType,
  GridReadyEvent,
} from "ag-grid-community";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
  NgbModalRef,
  NgbNavChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { Clientes } from "../../../../shared/model/clientes.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-clientes-edit",
  templateUrl: "./clientes-edit.component.html",
  styleUrls: ["./clientes-edit.component.scss"],
})
export class ClientesEditComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem("user"));

  public validate = false;
  depto: any[] = [];
  sumit: boolean = false;
  // cliente: Clientes = new Clientes()

  municipiosDDL:any[]
  EstadosCiDDL:any[]

  CreateGroup: FormGroup;

  constructor(
    private router: Router,
    private service: ClientService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {

    const id = this.route.snapshot.queryParams["id"];

    this.CreateGroup = this._formBuilder.group({
      clie_Id: ["", Validators.required],
      clie_Nombres: ["", Validators.required],
      clie_Apellidos: ["", Validators.required],
      clie_Identidad: ["", Validators.required],
      clie_FechaNacimiento: ["", Validators.required],
      clie_Sexo: ["", Validators.required],
      eciv_Id: ["", Validators.required],
      muni_Id: ["", Validators.required],
      clie_Telefono: ["", Validators.required],
      clie_DireccionExacta: ["", Validators.required],
    });

    const inputElementTelefono = document.getElementById("tuInput");
    const inputmaskTelefono = new Inputmask("+(999) 9999-9999");
    inputmaskTelefono.mask(inputElementTelefono);

    const inputElementIdentidad = document.getElementById("IdentidadInput");
    const inputmaskIdentidad = new Inputmask("9999-9999-99999");
    inputmaskIdentidad.mask(inputElementIdentidad);

    this.service.getMunicipios()
    .subscribe((data:any) => {
      console.log(data)
      this.municipiosDDL = data.data
    })

    this.service.getEstadosCi()
    .subscribe((data:any) => {
      this.EstadosCiDDL = data.data
    })

    this.service.getClientesBuscar(id)
    .subscribe((data:any)=> {
      this.CreateGroup.get('clie_Id').setValue(data.clie_Id);
      this.CreateGroup.get('clie_Nombres').setValue(data.clie_Nombres);
      this.CreateGroup.get('clie_Apellidos').setValue(data.clie_Apellidos);
      this.CreateGroup.get('clie_Identidad').setValue(data.clie_Identidad);
      this.CreateGroup.get('clie_FechaNacimiento').setValue(data.clie_FechaNacimiento.toString().replace('T00:00:00', ''));
      this.CreateGroup.get('clie_Sexo').setValue(data.clie_Sexo);
      this.CreateGroup.get('eciv_Id').setValue(data.eciv_Id);
      this.CreateGroup.get('muni_Id').setValue(data.muni_Id);
      this.CreateGroup.get('clie_Telefono').setValue(data.clie_Telefono);
      this.CreateGroup.get('clie_DireccionExacta').setValue(data.clie_DireccionExacta);
    })
  
  }

  Regresar(){
    this.router.navigate(['/flet/Clientes/List']);
  }

  public Guardar() {
    this.sumit = true;

    if(this.CreateGroup.valid){
      
      let data = {
        clie_Id: this.CreateGroup.value['clie_Id'],
        clie_Nombres: this.CreateGroup.value['clie_Nombres'],
        clie_Apellidos: this.CreateGroup.value['clie_Apellidos'],
        clie_Identidad: this.CreateGroup.value['clie_Identidad'],
        clie_FechaNacimiento: this.CreateGroup.value['clie_FechaNacimiento'],
        clie_Sexo: this.CreateGroup.value['clie_Sexo'],
        eciv_Id: this.CreateGroup.value['eciv_Id'],
        muni_Id: this.CreateGroup.value['muni_Id'].toString(),
        clie_DireccionExacta: this.CreateGroup.value['clie_DireccionExacta'],
        clie_Telefono: this.CreateGroup.value['clie_Telefono'],
        clie_UsuModificacion: this.user.user_Id
      }
      console.log("Data",data)
      this.service.putEditarCliente(data)
      .subscribe((data:any)=>{
        console.log("response",data)
        if(data.message === "Exitoso"){
         this.router.navigate(['/flet/Clientes/List']);
          this.alertaLogrado();
        }else if(data.message === "YaExiste"){
          this.alertaValorRepetido()
        }else{
          this.alertaErrorInespero()
        }
      })

    }else{
      this.alertaCamposVacios();
    }


  }

   //Alertas
   alertaCamposVacios() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'Completa todos los campos',
        icon: 'warning'
      })
  }
  alertaLogrado() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'Listo, el registro se guardo exitosamente',
        icon: 'success'
      })
  }
  alertaValorRepetido() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'Ya existe otro registro con el mismo numero de identidad',
        icon: 'warning'
      })
  }
  alertaErrorInespero() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'Ha ocurrido un error inesperado',
        icon: 'error'
      })
  }
  
  alertaEliminado() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'El registro a sido eliminado',
        icon: 'success'
      })
  }
  
  alertaEliminadoFallido() {
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 2500,
        timerProgressBar: true,
        title: 'No se pudo eliminar este registro porque esta en uso',
        icon: 'error'
      })
  }

}
