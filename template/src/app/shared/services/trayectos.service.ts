import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../../config';
import  { Trayectos } from '../model/trayectos.model';

@Injectable({
  providedIn: 'root'
})

export class TrayectosService {

  constructor(private http:HttpClient) { }

  TrayectosListado = Global + "Trayectos/Listado";

  getTrayectos(){
    return this.http.get<Trayectos[]>(this.TrayectosListado);
  }
}