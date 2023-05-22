import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cargos } from '../Models/Cargos';
import { Global } from '../../config';
import { Marcas } from '../Models/Marcas';
import { Modelos } from '../Models/Modelos';
import { TipoDeVehiculo } from '../Models/TipoDeVehiculo';
import { Vehiculos } from '../Models/Vehiculos';
import { Pedidos } from '../Models/Pedidos';
import { Trayectos } from '../Models/Trayectos';


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

  //#endregion

  //#region Equipo

  MarcasListado = Global + "Marcas/Listado";
  ModelosListado = Global + "Modelos/Listado";
  TipoDeVehiculoListado = Global + "TipoDeVehiculo/Listado";
  VehiculosListado = Global + "Vehiculos/Listado";

  getMarcas(){
    return this.http.get<Marcas[]>(this.MarcasListado);
  }
  getModelos(){
    return this.http.get<Modelos[]>(this.ModelosListado);
  }
  getTipodeVehiculo(){
    return this.http.get<TipoDeVehiculo[]>(this.TipoDeVehiculoListado);
  }
  getVehiculos(){
    return this.http.get<Vehiculos[]>(this.VehiculosListado);
  }
  //#endregion

  //#region Fletes
  PedidosListado = Global + "Pedidos/Listado";

  getPedidos(){
    return this.http.get<Pedidos[]>(this.PedidosListado);
  }
  //#endregion
}
