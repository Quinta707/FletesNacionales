import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
import { TableService } from '../../../../shared/services/rolesPorPantalla.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-rolesPorPantalla-create',
  templateUrl: './rolesPorPantalla-create.component.html',
  styleUrls: ['./rolesPorPantalla-create.component.scss']
})
export class RolesporPantallaCreateComponent {
  public validate = false;
  public selected = [];
  
  createRol: RolesporPantalla = new RolesporPantalla();
  createPantallaPorRol: RolesporPantalla = new RolesporPantalla();

  rolesPorPantalla: RolesporPantalla[];
  closeResult: string;
  
  constructor(config: NgbModalConfig, public service: TableService, private router: Router) {
    
    this.service.setUserData(this.rolesPorPantalla)
    config.backdrop = 'static';
    config.keyboard = false;
  }
  dropdownList = [];
  selectedItems: any[] = [];
  ngOnInit() {
    this.service.getPantallas()
    .subscribe((data: any) =>{
      this.dropdownList = data.data
    })
    
  }
  
  format = { add: 'Añadir', remove: 'remover', all: 'Todo', none: 'Ninguno',
  direction: 'left-to-right', draggable: true, locale: 'Indefinido' };

  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  Index() {
    this.router.navigate(['/acce/Roles/List'])
  }

  enviar: RolesporPantalla = new RolesporPantalla();

  public Create() {
    this.validate = true;
    this.createRol.role_Nombre = this.createRol.role_Nombre.trim()

    if(this.createRol.role_Nombre == "" || this.createRol.role_Nombre == null)
    {
      this.validate = true;
    }

    if(this.selectedItems.length == 0)
  {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        title: 'Favor Seleccione almenos 1 pantalla',
        icon: 'error'
      })
    }

    if(this.createRol.role_Nombre != "" && this.createRol.role_Nombre != null && this.selectedItems.length != 0)
    {      
      this.service.createRol(this.createRol).subscribe((data:any) =>
      {
        if(data.message == "YaExiste")
        {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: 'Este rol ya existe',
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
        if(parseInt(data.message) > 0){
          this.selectedItems.forEach((element: any, i: any) => {
          
          this.enviar.pant_Id = element.pant_Id
          this.enviar.role_Id = data.message

          this.service.createRolesporPantalla(this.enviar)
          .subscribe((data:any)=>{
            if(this.selectedItems.length == i + 1)
            {
              
              if(data.message == 1) 
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
                this.router.navigate(["/acce/Roles/List"])
              }
              if(data.message == "-2")
              {
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                  title: 'Este rol ya existe',
                  icon: 'error'
                })
              }
              if(data.message == "0")
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
            }
          }) 
        });          
        }
      })
    } 
  }
  
 }
 
