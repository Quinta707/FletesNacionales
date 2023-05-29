import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
import { TableService } from '../../../../shared/services/rolesPorPantalla.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

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
  
  constructor(config: NgbModalConfig, public service: TableService) {
    
    this.service.setUserData(this.rolesPorPantalla)
    config.backdrop = 'static';
    config.keyboard = false;
  }
  //que te puedo decir amor
  dropdownList = [];
  selectedItems: any[] = [];
  dropdownSettings : IDropdownSettings;
  ngOnInit() {
    this.service.getPantallas()
    .subscribe((data: any) =>{
      this.dropdownList = data.data
      console.log(this.dropdownList)
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'pant_Id',
      textField: 'pant_Nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  //no es a vos que te deseo
  
  enviar: RolesporPantalla = new RolesporPantalla();
  Create()
  {
    
    this.service.createRol(this.createRol).subscribe((data:any) =>{
      console.log(data)
    })
    this.selectedItems.forEach((element: any) => {
      console.log(element.pant_Id)      
      console.log(this.createRol)
      this.enviar.pant_Id = element.pant_Id
      this.enviar.role_Nombre = this.createRol.role_Nombre
      this.service.createRolesporPantalla(this.enviar).subscribe((data:any)=>{
        console.log(data)
      })  
    });
  }
  
 }
 
