import { Component, QueryList, ViewChildren, OnInit, ViewChild } from '@angular/core';
import { EstadosDelPedido } from '../../../../shared/model/estadosdelpedido.model';
import { EstadosDelPedidoService } from '../../../../shared/services/estadosdelpedido.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Idioma } from 'config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estadosdelpedido-list',
  templateUrl: './estadosdelpedido-list.component.html',
  styleUrls: ['./estadosdelpedido-list.component.scss']
})
export class EstadosdelpedidoListComponent {
  user: any = JSON.parse(localStorage.getItem("user"))

  estadosdelpedido: EstadosDelPedido = new EstadosDelPedido();
  estadosdelpedidolist!: EstadosDelPedido[];


  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public domLayout: DomLayoutType = 'autoHeight';
  idioma = Idioma
  paginationPageSize: number = 10;
  public searchText: string;

  constructor(
    public service: EstadosDelPedidoService,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.service.getEstadosdelPedido()
      .subscribe((data: any) => {
        this.estadosdelpedidolist = data.data;
      })



    this.CreateGroup = this._formBuilder.group({
      estp_Nombre: ['', Validators.required],
    });
  }
  @ViewChild('create') modalCreate: any;
  modalRef: NgbModalRef;
  sumit: boolean = false;
  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }
  CreateGroup: FormGroup;

  OpenModalCreate() {
    this.sumit = false;
    const formGroup = this.CreateGroup;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control.markAsUntouched();
    });

    const Drenadora: EstadosDelPedido = new EstadosDelPedido();
    this.estadosdelpedido = Drenadora;
    this.modalRef = this.modalService.open(this.modalCreate, { centered: true });
  }

  CrearModelo() {
    this.sumit = true;
    let datoTrim = (this.CreateGroup.value['estp_Nombre'].trim());
    this.CreateGroup.get("estp_Nombre").setValue(datoTrim)
    this.estadosdelpedido.estp_Nombre = datoTrim;
    this.estadosdelpedido.estp_UsuCreacion = this.user.user_Id;

    if (this.CreateGroup.valid) {
      this.service.InserttEstadosdelPedido(this.estadosdelpedido)
        .subscribe((data: any) => {
          if (data.success) {
            this.alertaLogrado();
            this.modalRef.close();
          } else if (data.message === "YaExiste") {
            this.alertaValorRepetido();
          } else {
            this.alertaErrorInespero();
            this.modalRef.close();
          }
          this.service.getEstadosdelPedido()
            .subscribe((data: any) => {
              this.estadosdelpedidolist = data.data;
            })
        })

    } else {
      this.alertaCamposVacios();
    }
  }

  closeModal() {
    if (this.modalRef) {
      this.sumit = false;
      this.modalRef.dismiss();
    }
  }
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };

  columnDefs: ColDef[] = [
    { field: 'estp_Id', headerName: 'ID', flex: 1 },
    { field: 'estp_Nombre', headerName: 'Estado del Pedido', flex: 1 },
  ];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

  }
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
      title: 'Ya existe otro registro con el mismo nombre',
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


}