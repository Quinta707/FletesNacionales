import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Usuarios } from '../../../../shared/model/usuarios.model';
import { Empleados } from '../../../../shared/model/empleados.model';
import { Roles } from '../../../../shared/model/rol.model';
import { TableService } from '../../../../shared/services/usuarios.service';

import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Idioma } from '../../../../../../config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  public domLayout: DomLayoutType = 'autoHeight';
  Usuarios: Usuarios[];
  idioma = Idioma
  public selected = [];
  public active = 1;
  modalRef: NgbModalRef;
  paginationPageSize: number = 10;
  public searchText;
  empleadosNoTienenUsuario!: Empleados[];
  listadoRoles!: Roles[];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  onSearchInputChange() {
    this.agGrid.api.setQuickFilter(this.searchText);
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }

  constructor
    (public service: TableService) { }

  columnDefs: ColDef[] = [
    { field: 'user_Id', headerName: 'ID', flex: 1 },
    { field: 'user_NombreUsuario', headerName: 'Nombre Usuario', flex: 2 },
    { field: 'empe_NombreCompleto', headerName: 'Nombre Empleado', flex: 2 },
    { field: 'user_EsAdmin', headerName: 'Es Admin', flex: 2 },
    //{ cellRenderer: (params) => this.actionButtonRenderer(params, this.modalService), headerName: 'Acciones', flex: 1 }

  ];


  ngOnInit(): void {
    this.service.getUsuarios()
      .subscribe((data: any) => {
        this.Usuarios = data.data;
      })
  }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
  };

  // openModal() {
  //   this.modalRef = this.modalService.open(this.modalContent, { centered: true });
  // }

  // actionButtonRenderer(params: any, modalService: NgbModal) {
  //   const onEdit = () => {
  //     //console.log('Botón de acción clickeado', params);
  //     this.flete.flet_Id = params.data.flet_Id;
  //     this.flete.vehi_Id = params.data.vehi_Id;
  //     this.flete.flet_FechaDeSalida = new Date(params.data.flet_FechaDeSalida);

  //     this.flet_FechaDeSalida = {
  //       year: this.flete.flet_FechaDeSalida.getFullYear(),
  //       month: this.flete.flet_FechaDeSalida.getMonth() + 1,
  //       day: this.flete.flet_FechaDeSalida.getDate(),
  //     };

  //     this.updateDate.get('flet_FechaDeSalida').setValue(this.flet_FechaDeSalida);

  //     this.modalRef = this.modalService.open(this.modalContent, { centered: true });
  //   };

  //   const redireccion = () => {
  //     this.router.navigate(['/flet/Fletes/Details'], { queryParams: { id: params.data.flet_Id } });
  //   }

  //   const button = document.createElement('il');
  //   button.classList.add('edit');

  //   const iconElement = document.createElement('i');
  //   iconElement.classList.add('icon-pencil-alt');
  //   iconElement.classList.add('mx-2');

  //   const textElement = document.createElement('span');
  //   textElement.innerText = '';
  //   textElement.appendChild(iconElement);


  //   const button2 = document.createElement('il');
  //   button2.classList.add('detail');

  //   const iconElement2 = document.createElement('i');
  //   iconElement2.classList.add('fa');
  //   iconElement2.classList.add('fa-file-text-o');

  //   const textElement2 = document.createElement('span');
  //   textElement2.innerText = '';
  //   textElement2.appendChild(iconElement2);

  //   button.appendChild(textElement);
  //   button2.appendChild(textElement2);

  //   button.addEventListener('click', onClickHandler);
  //   button2.addEventListener('click', redireccion);

  //   const container = document.createElement('div');
  //   container.classList.add('action')
  //   container.appendChild(button);
  //   container.appendChild(button2);

  //   return container;
  // }

  mensajeSuccess(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  mensajeWarning(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  mensajeError(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
