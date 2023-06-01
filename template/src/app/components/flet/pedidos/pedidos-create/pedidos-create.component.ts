import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../shared/validators/passwordMatch';
import { PedidoService } from 'src/app/shared/services/pedidos.service';
import { Pedidos } from 'src/app/shared/model/pedidos.model';
import { Clientes } from 'src/app/shared/model/clientes.model';
import Swal from 'sweetalert2';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-pedidos-create',
  templateUrl: './pedidos-create.component.html',
  styleUrls: ['./pedidos-create.component.scss']
})
export class PedidosCreateComponent implements OnInit{
  @ViewChild(WizardComponent) wizard: WizardComponent;
  DirecValue: string = '';
  ClientValue: string = '';
  OrigenValue: string = '';
  DestinoValue: string = '';
  submitted: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  maxDate: Date;
 
  currentStep: number = 1;

  constructor(
    private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private service: PedidoService
  ) {
    this.maxDate = new Date();
   }
  public municipiosDdl1 = [];
  public municipiosDdl2 = [];
  public clienteDdl = [];
  MuniOrigen: Pedidos = new Pedidos();
  MuniDestino: Pedidos = new Pedidos();
  SelectCliente: Clientes = new Clientes();

  ngOnInit(): void {
    this.service.getDllMunicipios()
      .subscribe((data: any) => {
        this.municipiosDdl1 = data.data.map((item: any) => ({
          value: item.muni_Id,
          label: item.muni_Nombre,
          job: item.depa_Nombre,
        }));
        this.municipiosDdl2 = data.data.map((item: any) => ({
          value: item.muni_Id,
          label: item.muni_Nombre,
          job: item.depa_Nombre,
        }));
      })
      this.service.getDllClientes()
      .subscribe((data: any) => {
        this.clienteDdl = data.data.map((item: any) => ({
          value: item.clie_Id,
          label: item.clie_NombreCompleto,
        }));
      })

    this.firstFormGroup = this._formBuilder.group({
      clie_Id: ['', Validators.required],
      muni_Origen: [, Validators.required],
      muni_Destino: [, Validators.required],
      DireccionPedido: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      cnfPassword: ['', Validators.required],
    },
    {
      validator: MustMatch('password', 'cnfPassword')
    });
    this.thirdFormGroup = this._formBuilder.group({
      birthdate: [null, Validators.required],
      age: [''],
      hasPassport: ['', Validators.required],
    })
    this.fourthFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    })
  }
  public finish(){
    this.toaster.success('Successfully Registered')
  }

  ValidarPedido(){
    if(this.firstFormGroup.valid){
      this.wizard.goToStep(1);
    }else{
      console.log(this.MuniDestino.muni_Destino);
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

  Regresar1(){
    this.wizard.goToStep(0);
  }

}
