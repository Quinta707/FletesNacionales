import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flete } from '../model/fletes.model';
import { Global } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  //#region General

  CargosListado = Global + "Cargos/Listado";

  getCargos(){
    return this.http.get<Flete[]>(this.CargosListado);
  }

  //#endregion
}
