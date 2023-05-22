import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cargos } from '../Models/Cargos';

import { Global } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  //#region General

  CargosListado = Global + "Cargos/Listado";

  getCargos(){
    return this.http.get<Cargos[]>(this.CargosListado);
  }

  DepartamentosListado = Global + 'Departamentos/Listado'

  getDepartamentos(){
    return this.http.get<Departamentos[]>(this.DepartamentosListado)
  }
  
  EmpleadosListado = Global + 'Empleados/Listado'
  
  getEmpleados(){
    return this.http.get<Empleados[]>(this.EmpleadosListado)
  }
  
  EstadosCivilesListado = Global + 'EstadosCiviles/Listado'
  
  getEstadosCiviles(){
    return this.http.get<EstadosCiviles[]>(this.EstadosCivilesListado)
  }
  
  EstadosDelPedidoListado = Global + 'EstadosDelPedido/Listado'
  
  getEstadosDelPedido(){
    return this.http.get<EstadosDelPedido[]>(this.EstadosDelPedidoListado)
  }
  
  MetodosDePagoListado = Global + 'MetodosDePago/Listado'
  
  getMetodosDePago(){
    return this.http.get<MetodosDePago[]>(this.MetodosDePagoListado)
  }
  
  MunicipiosListado = Global + 'Municipios/Listado'
  
  getMunicipios(){
    return this.http.get<Municipios[]>(this.MunicipiosListado)
  }
  //#endregion
}
