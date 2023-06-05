import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../../config';
import  { Pedidos } from '../model/pedidos.model';
import { Municipios } from '../model/municipios.model';
import { Clientes } from '../model/clientes.model';
import { Items } from '../model/items.model';
import { MetodosDePago } from '../model/metodosDePago.model';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  constructor(private http:HttpClient) { }

  PedidosListado = Global + "Pedidos/Listado";

  getPedidos(){
    return this.http.get<Pedidos[]>(this.PedidosListado);
  }
  getDllMunicipios(){
    return this.http.get<Municipios[]>(Global+"Municipios/Listado")
  }
  getDllClientes(){
    return this.http.get<Clientes[]>(Global+"Clientes/Listado")
  }
  getItems(){
    return this.http.get<Items[]>(Global+"Items/Listado")
  }
  getMetodos(){
    return this.http.get<MetodosDePago[]>(Global+"MetodosPago/Listado")
  }
  
}
