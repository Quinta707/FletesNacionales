import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RolesporPantalla } from '../../../../shared/model/rolesPorPantalla.model';
import { TableService } from '../../../../shared/services/rolesPorPantalla.services';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { IDropdownSettings } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-rolesPorPantalla-list',
  templateUrl: './rolesPorPantalla-list.component.html',
  styleUrls: ['./rolesPorPantalla-list.component.scss']
})
export class RolesporPantallaListComponent implements OnInit {
  public validate = false;
  public selected = [];
  
  rolesPorPantalla: RolesporPantalla[];
  closeResult: string;


  outerTableData: any[] = [];

  innerTableData: any[] = [];
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router, public service: TableService) {
    
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.rolesPorPantalla)
    config.backdrop = 'static';
    config.keyboard = false;

  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  index(){
    this.service.getRolesporPantalla()
    .subscribe((data: any)=>{      
      console.log(data.data)
       this.rolesPorPantalla= data.data;
       this.outerTableData = data.data
       this.service.setUserData(data.data)
    })
  }
 
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  rolesPorPantallaEliminar: RolesporPantalla = new RolesporPantalla()
  Eliminar(est: RolesporPantalla, content) {
    console.log('a')
    this.rolesPorPantallaEliminar.role_Id = est.role_Id
   
    console.log('b')
    this.open(content)
  }

  delete() {
    
    console.log('c')
    console.log(this.rolesPorPantallaEliminar.role_Id)
    this.service.deleteRol(this.rolesPorPantallaEliminar)
    .subscribe(() => {      
      this.service.deleteRolesporPantalla(this.rolesPorPantallaEliminar)
      .subscribe(()=>{  
        this.modalService.dismissAll()
        this.index()
      })
    })
  }

  //-------------------------------------------------------ACTUALIZAR-------------------------------------------------------//
 
  
  updateRol: RolesporPantalla = new RolesporPantalla();
  
  updatePantallaPorRol: RolesporPantalla = new RolesporPantalla();

    Actualizar(id: any, mod: any) {
    this.updateRol.role_Id = id
    this.service.findRolesporPantalla(id)
    .subscribe(data => {
      
      this.selectedItems = data
      console.log(this.selectedItems)

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
    
      
      this.service.findRol(id)
      .subscribe(datos => {
        this.updateRol = datos
      })
    })
    this.open(mod)
  }

  actua: RolesporPantalla = new RolesporPantalla();
  eliminar: RolesporPantalla = new RolesporPantalla();

hola()
{
  console.log("hola")
  if(this.updateRol.role_Nombre == "")
    {
      this.validate = true;
      console.log('inserte un nombre')
    }
    if(this.selectedItems.length == 0)
    {
      console.log('selecciona pantallas')
    }
    else
    {

    }
}
  Update()
  {   
    console.log("HOLAAAAAAAAAAAAAAAAAAA")
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
      this.eliminar.role_Id = this.updateRol.role_Id
      this.service.deleteRolesporPantalla(this.eliminar).subscribe(data =>{
      })    

      console.log(this.updateRol.role_Nombre + ' aqui iria el orl')
      this.service.updateRol(this.updateRol).subscribe((data:any) =>{
      
      this.selectedItems.forEach((element: any) => {
        this.actua.pant_Id = element.pant_Id
        this.actua.role_Id = this.updateRol.role_Id
          
          this.service.createRolesporPantalla(this.actua)
          .subscribe((data:any)=>{
          })
        });
      })
    }
    
  
 }
 //-------------------------------------------------------FIN ACTUALIZAR-------------------------------------------------------//

  //-------------------------------------------------------INSERTAR-------------------------------------------------------//

  
  createRol: RolesporPantalla = new RolesporPantalla();
  createPantallaPorRol: RolesporPantalla = new RolesporPantalla();


  
  dropdownList = [];
  selectedItems: any[] = [];
  
  dropdownSettings : IDropdownSettings;
  ngOnInit() {
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
    
    this.index()
  }

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
          this.index()
        })
      });
      })
    }
  }
  
  //-------------------------------------------------------FIN INSERTAR-------------------------------------------------------//

  public tableItem$: Observable<RolesporPantalla[]>;
  public searchText;
  public pantallas: [];
  total$: Observable<number>;


  onSearchInputChange(searchTerm: string) {
    this.service.searchTerm = searchTerm;
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

  }

  deleteData(id: number){
    this.tableItem$.subscribe((data: any)=> {      
      data.map((elem: any,i: any)=>{elem.id == id && data.splice(i,1)})
      
    })
  }
  selectedRowIndex: number = -1;
  showInnerTable: boolean = false;

  toggleTasks(index: any, id: any, action: String, implementar: any): void {
    console.log(action)
    if (action === 'Update' || action === 'Delete') {
      if(action === 'Update')
      {
      this.Actualizar(id, implementar)
      }
      if(action === 'Delete')
      {
        this.Eliminar(id, implementar)
      }
      this.showInnerTable = false;
      return;
    }
    this.showInnerTable = true;
    if (index === this.selectedRowIndex) {
      this.selectedRowIndex = -1;
      this.innerTableData = [];
    } else {
      this.selectedRowIndex = index;

      this.dataPantallas(id);
    }
   
  }

  dataPantallas(id) {
    this.service.findRolesporPantalla(id)
    .subscribe((data: any)=>{
      this.innerTableData = data
    })
  }
 }
 
