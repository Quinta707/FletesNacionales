import { Component, OnInit } from '@angular/core';
import Inputmask from 'inputmask';
import { Router } from '@angular/router';
import  { TableService } from '../../../../shared/services/empleados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Global } from 'config';
import { Municipios } from 'src/app/shared/model/municipios.model';
import { EstadosCiviles } from 'src/app/shared/model/estadosCiviles.model';
import { Sucursales } from 'src/app/shared/model/sucursales.model';
import { Cargos } from 'src/app/shared/model/cargos.model';

@Component({
  selector: 'app-empleados-create',
  templateUrl: './empleados-create.component.html',
  styleUrls: ['./empleados-create.component.scss']
})
export class EmpleadosCreateComponent {
  public validate = false;
  public municipiosDdl: []; 
  public estadosCivilesDdl: []; 
  public sucursalesDdl: []; 
  public cargosDdl: []; 
  depto: any[] = [];
  submitted: boolean = false;
  // NombresValue: string = '';
  // ApellidosValue: string = '';
  // IdentidadValue: string = '';
  // FechaNacValue: string = '';
  // SexoValue: string = '';
  // EstadoValue: number = 0;
  // MunicipioValue: string = '';
  // DireccionValue: string = '';
  // TelefonoValue: string = '';
  // SucursalValue: number = 0;
  // CargoValue: number = 0;
  Municipio: Municipios = new Municipios();
  Estados: EstadosCiviles = new EstadosCiviles();
  Sucursales: Sucursales = new Sucursales();
  Cargos: Cargos = new Cargos();

  constructor(private router: Router, private service: TableService, private http: HttpClient, private _formBuilder: FormBuilder){}
  FormGroup1: FormGroup;
  ngOnInit(): void {    
    this.service.getDllMunicipios()
      .subscribe((data: any) => {
        this.municipiosDdl = data.data.map((item: any) => ({
          value: item.muni_Id,
          label: item.muni_Nombre,
          job: item.depa_Nombre,
        }));
      })
      this.service.getDllEstadosCiviles()
      .subscribe((data: any) => {
        this.estadosCivilesDdl = data.data.map((item: any) => ({
          value: item.eciv_Id,
          label: item.eciv_Descripcion,
        }));
      })
      this.service.getDllSucursales()
      .subscribe((data: any) => {
        this.sucursalesDdl = data.data.map((item: any) => ({
          value: item.sucu_Id,
          label: item.sucu_Nombre,
        }));
      })
      this.service.getDllCargos()
      .subscribe((data: any) => {
        this.cargosDdl = data.data.map((item: any) => ({
          value: item.carg_Id,
          label: item.carg_Descripcion,
        }));
      })
    const inputElementTelefono = document.getElementById('tuInput');
    const inputmaskTelefono = new Inputmask('+(999) 9999-9999');
    inputmaskTelefono.mask(inputElementTelefono);

    const inputElementIdentidad = document.getElementById('IdentidadInput');
    const inputmaskIdentidad = new Inputmask('9999-9999-99999');
    inputmaskIdentidad.mask(inputElementIdentidad);
    this.FormGroup1 = this._formBuilder.group({
        empe_Nombres:         ['', Validators.required],
        empe_Apellidos:       ['', Validators.required],
        empe_Identidad:       [, Validators.required],
        empe_FechaNacimiento: ['', Validators.required],
        empe_Sexo:            ['', Validators.required],
        eciv_Id:              [, Validators.required],
        muni_Id:              [, Validators.required],
        empe_DireccionExacta: ['', Validators.required],
        empe_Telefono:        [, Validators.required],
        sucu_Id:              [, Validators.required],
        carg_Id:              [, Validators.required],
    }) 
  }
  public Guardar() {
    //const nombre = this.FormGroup1.value["clie_Id"]
      //const apellidos = this.FormGroup1.value["muni_Origen"]
      //const identidad = this.FormGroup1.value["muni_Destino"]
      //const fechanac = this.FormGroup1.value["meto_Id"]
      //const sexo = this.FormGroup1.value["sexo_Id"]
      const estado = this.FormGroup1.value["eciv_Id"]
      const muni = this.FormGroup1.value["muni_Id"]
      //const direc = this.FormGroup1.value["meto_Id"]
      //const telefono = this.FormGroup1.value["meto_Id"]
      const sucursal = this.FormGroup1.value["sucu_Id"]
      const cargo = this.FormGroup1.value["carg_Id"]
 
      console.log(this.FormGroup1.value['empe_Nombres'])
      console.log(this.FormGroup1.value['empe_Sexo'])
      console.log(this.FormGroup1.value['empe_Apellidos'])
      console.log(this.FormGroup1.value['empe_Identidad'])
      console.log(this.FormGroup1.value['eciv_Id'])
      console.log(this.FormGroup1.value['muni_Id'])
      console.log(this.FormGroup1.value['empe_DireccionExacta'])
      console.log(this.FormGroup1.value['empe_Telefono'])
      console.log(this.FormGroup1.value['sucu_Id'])
      console.log(this.FormGroup1.value['carg_Id'])
    if(this.FormGroup1.valid){
      this.submitted = false;
      
      const apiUrl = Global + 'Empleados/Insertar';
      const requestBody = {
        empe_Nombres:         this.FormGroup1.value['empe_Nombres'],
        empe_Apellidos:       this.FormGroup1.value['empe_Apellidos'],
        empe_Identidad:       String(this.FormGroup1.value['empe_Identidad']),
        empe_FechaNacimiento: this.FormGroup1.value['empe_FechaNacimiento'],
        empe_Sexo:            String(this.FormGroup1.value['empe_Sexo']),
        eciv_Id:              parseInt(this.FormGroup1.value['eciv_Id']),
        muni_Id:              String(this.FormGroup1.value['muni_Id']),
        empe_DireccionExacta: this.FormGroup1.value['empe_DireccionExacta'],
        empe_Telefono:        String(this.FormGroup1.value['empe_Telefono']),
        sucu_Id:              parseInt(this.FormGroup1.value['sucu_Id']),
        carg_Id:              parseInt(this.FormGroup1.value['carg_Id']),
        empe_UsuCreacion:     1
      };
    
      this.http.post(apiUrl, requestBody).subscribe(
        (response: any) => {
          
          console.log(response);
          if (response !== undefined) {
            if (response.success) {
              if (response.code == 200){
                Swal.fire({
                  text: 'El registro se ha ingresado exitosamente',
                  imageUrl: 'assets/images/check.gif',
                  imageWidth: 400,
                  imageHeight: 400,
                  imageAlt: 'Esooo',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  title: '¡Exito!'
                })
                this.router.navigate(['flet/Empleados/List'])
              }
              else if (response.code == 409){
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                  title: 'El número de identidad ya está registrado',
                  icon: 'error'
                });
              }
            } else{
              Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                title: '¡Algo salió mal! No lo intente nuevamente.',
                icon: 'error'
              });
            }
           
          }
      })
    }else{
      this.submitted = true;
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        title: 'Complete todos los campos',
        icon: 'warning'
      })
    }
  }

  public Cancelar() {
    this.router.navigate(['flet/Clientes/List']);
  }
}
