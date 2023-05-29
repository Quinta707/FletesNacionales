import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Items } from '../../../../shared/model/items.model';
import { ItemsEdit } from '../../../../shared/model/itemsedit.model';
import { TableService } from '../../../../shared/services/items.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemListComponent implements OnInit {
  public selected = [];
  Items:Items = new Items();
  ItemsEdit:ItemsEdit = new ItemsEdit();
  itemValue: string = '';
  descripcionValue: string = '';
  pesoValue: number | null = null;
  volumenValue: number | null = null;
  submitted: boolean = false;
  basicModalCloseResult: string = '';
  modalRef: NgbModalRef | undefined;
  items: Items[];
 
  ngOnInit(): void {
   this.service.getItems()
   .subscribe((data: any)=>{
      this.items= data.data;
      this.service.setUserData(data.data)
   })
  }

  public tableItem$: Observable<Items[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService,
    private modalService: NgbModal,
    private router:Router,
    private http: HttpClient) {

    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(this.items)

  }

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

  Guardar(e: Event) {
    e.preventDefault();
  
    if (!this.itemValue && !this.descripcionValue && !this.pesoValue && !this.volumenValue) {
      // Validación de todos los campos vacíos
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        title: '¡ERROR!, Todos los campos están vacíos',
        icon: 'error'
      });
      return;
    }
  
    if (this.pesoValue < 100) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        title: '¡ERROR!, El peso no puede ser menor a 100',
        icon: 'error'
      });
      return;
    }
  
    if (!this.itemValue || !this.descripcionValue || !this.pesoValue || !this.volumenValue) {
      this.submitted = true;
  
      let errorMessage = '';
      if (!this.itemValue && !this.descripcionValue && !this.pesoValue) {
        errorMessage = '¡ERROR!, El campo Item, el campo Descripción y el campo Peso son obligatorios';
      } else if (!this.itemValue && !this.descripcionValue && !this.volumenValue) {
        errorMessage = '¡ERROR!, El campo Item, el campo Descripción y el campo Volumen son obligatorios';
      } else if (!this.itemValue && !this.pesoValue && !this.volumenValue) {
        errorMessage = '¡ERROR!, El campo Item, el campo Peso y el campo Volumen son obligatorios';
      } else if (!this.descripcionValue && !this.pesoValue && !this.volumenValue) {
        errorMessage = '¡ERROR!, El campo Descripción, el campo Peso y el campo Volumen son obligatorios';
      } else if (!this.itemValue && !this.descripcionValue) {
        errorMessage = '¡ERROR!, El campo Item y el campo Descripción son obligatorios';
      } else if (!this.itemValue && !this.pesoValue) {
        errorMessage = '¡ERROR!, El campo Item y el campo Peso son obligatorios';
      } else if (!this.itemValue && !this.volumenValue) {
        errorMessage = '¡ERROR!, El campo Item y el campo Volumen son obligatorios';
      } else if (!this.descripcionValue && !this.pesoValue) {
        errorMessage = '¡ERROR!, El campo Descripción y el campo Peso son obligatorios';
      } else if (!this.descripcionValue && !this.volumenValue) {
        errorMessage = '¡ERROR!, El campo Descripción y el campo Volumen son obligatorios';
      } else if (!this.pesoValue && !this.volumenValue) {
        errorMessage = '¡ERROR!, El campo Peso y el campo Volumen son obligatorios';
      } else if (!this.itemValue) {
        errorMessage = '¡ERROR!, El campo Item es obligatorio';
      } else if (!this.descripcionValue) {
        errorMessage = '¡ERROR!, El campo Descripción es obligatorio';
      } else if (!this.pesoValue) {
        errorMessage = '¡ERROR!, El campo Peso es obligatorio';
      } else if (!this.volumenValue) {
        errorMessage = '¡ERROR!, El campo Volumen es obligatorio';
      }
  
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        title: errorMessage,
        icon: 'error'
      });
  
      return;
    }
  
    const apiUrl = 'https://localhost:44339/api/Items/Insertar';
    const requestBody = {
      item_Nombre : this.itemValue,
      item_Descripcion: this.descripcionValue,
      item_Peso : this.pesoValue,
      item_Volumen: this.volumenValue
    };
  
    this.http.post(apiUrl, requestBody).subscribe(
      (response: any) => {
        console.log(response);
        if (response !== undefined) {
          if (response.success) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: '¡Registro Ingresado con éxito!',
              icon: 'success'
            }).then(() => {
              this.modalRef?.close(); // Cerrar el modal
              this.itemValue = ''; // Restablecer el valor del campo
              this.descripcionValue = '';
              this.pesoValue = null;
              this.volumenValue = null;
              this.submitted = false; // Reiniciar el estado del formulario
              this.service.getItems()
                .subscribe((data: any) => {
                  this.items = data.data;
                  this.service.setUserData(data.data);
                });
              this.modalService.dismissAll();
            });
          } else if (response.message === "YaExiste") {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              title: '¡Ya existe este Item!',
              icon: 'warning'
            });
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: '¡Hubo un error al insertar el registro!',
              icon: 'error'
            });
          }
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            title: '¡Hubo un error en la respuesta del API!',
            icon: 'error'
          });
          console.error('Respuesta del API inválida:', response);
        }
      },
      (error: any) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          title: '¡Hubo un error al realizar la solicitud!',
          icon: 'error'
        });
        console.error(error);
      }
    );
  }

  Editar() {
    if (!this.ItemsEdit.item_Descripcion || !this.ItemsEdit.item_Peso || !this.ItemsEdit.item_Volumen || !this.ItemsEdit.item_Nombre) {
      this.submitted = true;
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      }).fire({
        title: '¡ERROR!, Todos los campos deben ser completados',
        icon: 'warning'
      });
      return;
    }

    this.service.EditarItems(this.ItemsEdit).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success == 1) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            title: '¡Registro Actualizado con éxito!',
            icon: 'success'
          });
          this.modalService.dismissAll();
          this.service.getItems().subscribe(data => {
            this.items = data;
          });
        } else if (response.message == "YaExiste") {
          // El registro ya existe
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: 'Ya existe este registro',
            icon: 'warning'
          });
        } else {
          // Error desconocido u otro código de estado
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: 'Ha ocurrido un error',
            icon: 'error'
          });
        }
      },
      (error) => {
        // Error en la comunicación con el servidor
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Error de comunicación con el servidor',
          icon: 'error'
        });
        console.error(error);
      }
    );
  }

  Delete() {
    const item_Id: number | undefined = isNaN(parseInt(localStorage.getItem("item_Id") ?? '', 0)) ? undefined : parseInt(localStorage.getItem("item_Id") ?? '', 0);
    if (item_Id !== undefined) {
      this.Items.item_Id = item_Id;
    }
  
    this.service.DeleteItems(this.Items).subscribe(
      (response: any) => {
        console.log(this.Items);
        console.log(response);
        if (response.message == "Eliminado") {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            title: '¡Registro eliminado con éxito!',
            icon: 'success'
          }).then(() => {
            this.modalService.dismissAll();
            this.service.getItems().subscribe((data: any) => {
              this.items = data;
            });
          });
        } else if (response.message == "EnUso"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              title: 'Este Item no se puede Eliminar porque esta siendo usado',
              icon: 'warning'
            });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: '¡ERROR!, ¡Oh no!, hubo un error al eliminar el registro',
            icon: 'error'
          });
        }
      },
      (error: any) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: '¡Hubo un error al realizar la solicitud!',
          icon: 'error'
        });
        console.error(error);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Acción a realizar cuando se cierra el modal
      console.log(result);
    }, (reason) => {
      // Acción a realizar cuando se descarta el modal sin guardar cambios
      console.log(reason);
    });
  }

  openBasicModal1(content: TemplateRef<any>, id:number) {
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
    localStorage.setItem("item_Id",id.toString())
  }

  openBasicModal2(content: TemplateRef<any>, id:number) {
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
    localStorage.setItem("item_Id",id.toString())
  }

  openBasicModal3(content: TemplateRef<any>, ItemsEdit: ItemsEdit) {
    this.ItemsEdit = { ...ItemsEdit };
    console.log(this.ItemsEdit);
    this.modalRef = this.modalService.open(content, {});
    this.modalRef.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
  }
  
  cancelar() {
    this.itemValue = ''; 
    this.descripcionValue = '';
    this.pesoValue = null;
    this.volumenValue = null;
    this.submitted = false; 
  }

  deleteData(id: number){
    this.tableItem$.subscribe((data: any)=> {      
      data.map((elem: any,i: any)=>{elem.id == id && data.splice(i,1)})
      
    })
  }

 }
 
