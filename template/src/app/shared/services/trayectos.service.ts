import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../../config';
import  { Trayectos } from '../model/trayectos.model';
import { Municipios } from '../model/municipios.model';

@Injectable({
  providedIn: 'root'
})

export class TrayectosService {

  constructor(private http:HttpClient) { }

  TrayectosListado = Global + "Trayectos/Listado";
  getTrayectos(){
    return this.http.get<Trayectos[]>(this.TrayectosListado);
  }

  getTrayectoId(desde: string, hasta: string){
    return this.http.get<Trayectos[]>(Global+"Trayectos/Existe?desde="+desde.toString()+"&hasta="+hasta.toString())
  }

  TrayectosInsert = Global + "Trayectos/Insertar";
  InsertTrayectos(Trayectos: Trayectos){
    return this.http.post<Trayectos[]>(this.TrayectosInsert,Trayectos)
  }

  TrayectosDelete = Global + "Trayectos/Eliminar";
  DeleteTrayectos(Trayectos: Trayectos){
    return this.http.post<Trayectos[]>(this.TrayectosDelete,Trayectos)
  }

  TrayectosEditar = Global + "Trayectos/Editar";
  EditarTrayectos(Trayectos:Trayectos){
    return this.http.post<Trayectos[]>(this.TrayectosEditar,Trayectos)
  }


  getDllMunicipios(){
    return this.http.get<Municipios[]>(Global+"Municipios/Listado")
  }

}