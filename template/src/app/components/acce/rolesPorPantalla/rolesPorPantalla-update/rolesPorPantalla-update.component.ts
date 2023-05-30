import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
import { TableService } from '../../../../shared/services/rolesPorPantalla.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
  //que te puedo decir amor
  dropdownList = [];
  selectedItems: any[] = [];
  dropdownSettings : IDropdownSettings;
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
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'pant_Id',
        textField: 'pant_Nombre',
        selectAllText: 'Seleccionar todo',
        searchPlaceholderText: 'Buscar pantalla' ,
        unSelectAllText: 'Deseleccionar',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }
  }

  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  Index() {
    localStorage.setItem("role_Id", null)
    this.router.navigate(['/acce/Roles/List'])
  }
  //no es a vos que te deseo
  
  enviar: RolesporPantalla = new RolesporPantalla();
  eliminar: RolesporPantalla = new RolesporPantalla();
  Update()
  {   
    if(this.updateRol.role_Nombre == "")
    {
      this.validate = true;
      console.log('inserte un nombre')
    }
    if(this.selectedItems.length == 0)
    {
      console.log('selecciona pantallas')
    }
    if(this.updateRol.role_Nombre != "" && this.selectedItems.length != 0)
    {  
      this.eliminar.role_Id = parseInt(localStorage.getItem("role_Id"))
      this.service.deleteRolesporPantalla(this.eliminar).subscribe(data =>{
      })    

      console.log(this.updateRol.role_Nombre + ' aqui iria el orl')
      this.service.updateRol(this.updateRol).subscribe((data:any) =>{
      
      this.selectedItems.forEach((element: any) => {
        this.enviar.pant_Id = element.pant_Id
        this.enviar.role_Id = parseInt(localStorage.getItem("role_Id"))
          
          this.service.createRolesporPantalla(this.enviar)
          .subscribe((data:any)=>{
            this.router.navigate(['acce/Roles/List'])
          })
        });
      })
    }
    
  
 }
}
