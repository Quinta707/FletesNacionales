/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { Items } from '../model/items.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class ItemsService {
  
  constructor(private http: HttpClient) {}
       
  itemsListado = Global + "Items/Listado";
  getItems(){
    return this.http.get<Items[]>(this.itemsListado);
  }

  Itemsinsert = Global + "Items/Insertar";
  InsertItems(Items: Items){
    return this.http.post<Items[]>(this.Itemsinsert,Items)
  }

  ItemsDelete = Global + "Items/Eliminar";
  DeleteItems(Items: Items){
    return this.http.post<Items[]>(this.ItemsDelete,Items)
  }

  ItemsEditar = Global + "Items/Editar";
  EditarItems(Items:Items){
    return this.http.post<Items[]>(this.ItemsEditar,Items)
  }
}