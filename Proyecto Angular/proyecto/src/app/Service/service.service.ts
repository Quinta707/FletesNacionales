import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../Model/Categoria';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  Url = 'https://localhost:44339/api/Cargos/Listado'
  getCategoria(){
    return this.http.get<Categoria[]>(this.Url);
  }

  Urlcreate = 'https://localhost:44339/api/Cargos/Insertar'
  createCategoria(categoria: Categoria){
    return this.http.post<Categoria[]>(this.Urlcreate, categoria);
  }

  
  Urlobtener = 'https://localhost:44339/api/Cargos/Buscar?id=';
  getCategoriaid(id?: number){
    return this.http.get<Categoria[]>(this.Urlobtener+id);
  }
}
