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
  selector: 'app-rolesPorPantalla-update',
  templateUrl: './rolesPorPantalla-update.component.html',
  styleUrls: ['./rolesPorPantalla-update.component.scss']
})

export class RolesporPantallaupdateComponent {
  public validate = false;
  public selected = [];
  
  updateRol: RolesporPantalla = new RolesporPantalla();
  
  updatePantallaPorRol: RolesporPantalla = new RolesporPantalla();

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
    if(localStorage.getItem("role_Id") == 'null')
    {
      this.router.navigate(['/acce/Roles/List'])
    }
    else
    {
      this.service.findRolesporPantalla( parseInt(localStorage.getItem("role_Id")))
      .subscribe(data => {
        this.selectedItems = data
      })
      this.service.findRol(parseInt(localStorage.getItem("role_Id")))
      .subscribe((data: any) => {
        this.updateRol = data
      })
      this.service.getPantallas()
      .subscribe((data: any) =>{
        this.dropdownList = data.data
      })
      
    }
  }

  
  format = { add: 'Añadir', remove: 'remover', all: 'Todo', none: 'Ninguno',
  direction: 'left-to-right', draggable: true, locale: 'Indefinido' };

  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  Index() {
    localStorage.setItem("role_Id", null)
    this.router.navigate(['/acce/Roles/List'])
  }
  
  enviar: RolesporPantalla = new RolesporPantalla();
  eliminar: RolesporPantalla = new RolesporPantalla();
  Update()
  {   
    this.validate = true;
    this.updateRol.role_Nombre = this.updateRol.role_Nombre.trim()

    if(this.updateRol.role_Nombre == "")
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
    if(this.updateRol.role_Nombre != "" && this.selectedItems.length != 0)
    {  
      this.eliminar.role_Id = parseInt(localStorage.getItem("role_Id"))
      this.service.deleteRolesporPantalla(this.eliminar).subscribe(data =>{
      })    
      this.service.updateRol(this.updateRol).subscribe((data:any) =>{
      
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
        if(data.message == "Exitoso")
        {
          this.selectedItems.forEach((element: any, i: any) => {
            
            this.enviar.pant_Id = element.pant_Id
            this.enviar.role_Id = parseInt(localStorage.getItem("role_Id"))
              
              this.service.createRolesporPantalla(this.enviar)
              .subscribe((data:any)=>{
               
              if(data.message == 1) 
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
              })
          });
        }
      })
    }
    
  
 }
}
