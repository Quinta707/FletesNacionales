import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../../config';
import  { Pedidos } from '../model/pedidos.model';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http:HttpClient) { }

  PedidosListado = Global + "Pedidos/Listado";

  getPedidos(){
    return this.http.get<Pedidos[]>(this.PedidosListado);
  }
}
