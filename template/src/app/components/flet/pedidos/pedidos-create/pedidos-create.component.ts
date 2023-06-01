import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../shared/validators/passwordMatch';
import { PedidoService } from 'src/app/shared/services/pedidos.service';
import { Pedidos } from 'src/app/shared/model/pedidos.model';
import { Clientes } from 'src/app/shared/model/clientes.model';
import Swal from 'sweetalert2';
import { WizardComponent } from 'angular-archwizard';


interface Card {
  item_Id: number;
  item_Nombre: string;
  item_Descripcion: string;
  item_Peso: string;
  item_Volumen: string;
}

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
  public Items = [];
  MuniOrigen: Pedidos = new Pedidos();
  MuniDestino: Pedidos = new Pedidos();
  SelectCliente: Clientes = new Clientes();

  ngOnInit(): void {
    this.service.getItems()
      .subscribe((data: any) => {
        this.Items = data.data;
      })
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

  filteredCards: Card[] = [...this.Items];

  onSearch(searchTerm: string) {
    this.Items = this.filteredCards.filter(card =>
      card.item_Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.item_Descripcion.toLowerCase().includes(searchTerm.toLowerCase())||
      card.item_Peso.toLowerCase().includes(searchTerm.toLowerCase())||
      card.item_Volumen.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
currentPage: number = 1;
itemsPerPage: number = 4;

getCurrentPageItems(): Card[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.Items.slice(startIndex, endIndex);
}

goToPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

goToNextPage() {
  const totalPages = Math.ceil(this.Items.length / this.itemsPerPage);
  if (this.currentPage < totalPages) {
    this.currentPage++;
  }
}

showPreviousButton(): boolean {
  return this.currentPage > 1;
}

showNextButton(): boolean {
  const totalPages = Math.ceil(this.Items.length / this.itemsPerPage);
  return this.currentPage < totalPages;
}



}
