
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../Model/Clientes';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  URL = "https://localhost:44339/api/Cargos/Listado";

  getCliente() {
    return this.http.get<Cliente[]>(this.URL);
  }

  URLCreate = "https://localhost:44339/api/Cargos/Insertar";
  createCliente(categoria: Cliente) {
    return this.http.post<Cliente[]>(this.URLCreate, categoria);
  }
  
  URLFind = "https://localhost:44339/api/Cargos/Buscar?id=";
  findCliente(id?: number) {
    return this.http.get<Cliente[]>(this.URLFind + id);
  }
  URLUpdate = "https://localhost:44339/api/Cargos/Editar";
  updateCliente(categoria: Cliente) {
    return this.http.put<Cliente[]>(this.URLUpdate , categoria);
  }
}
