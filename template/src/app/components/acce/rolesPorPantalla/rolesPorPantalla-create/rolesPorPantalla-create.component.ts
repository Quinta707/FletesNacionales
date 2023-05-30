import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
import { TableService } from '../../../../shared/services/rolesPorPantalla.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
      console.log(this.dropdownList)
    })
    
  }
  
  format = { add: 'Añadir', remove: 'remover', all: 'Todo', none: 'Ninguno',
  direction: 'left-to-right', draggable: true, locale: 'Indefinido' };

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  Index() {
    this.router.navigate(['/acce/Roles/List'])
  }
  enviar: RolesporPantalla = new RolesporPantalla();

  public Create() {
    this.validate = true;
    if(this.createRol.role_Nombre == "" || this.createRol.role_Nombre == null)
    {
      this.validate = true;
      console.log('inserte un nombre')
    }
    if(this.selectedItems.length == 0)
    {
      console.log('ta vacio las pantallas')
    }
    if(this.createRol.role_Nombre != "" && this.createRol.role_Nombre != null && this.selectedItems.length != 0)
    {      
      this.service.createRol(this.createRol).subscribe((data:any) =>{
        this.selectedItems.forEach((element: any) => {
        this.enviar.pant_Id = element.pant_Id
        this.enviar.role_Id = data.message
        this.service.createRolesporPantalla(this.enviar).subscribe((data:any)=>{
          this.router.navigate(['acce/Roles/List'])
        })
      });
      })
    }
  }
  
 }
 
