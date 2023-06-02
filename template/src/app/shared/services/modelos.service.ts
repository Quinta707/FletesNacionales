import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../../config';
import  { Modelos } from '../../shared/model/Modelos.model';

@Injectable({
  providedIn: 'root'
})

export class ModelosService {

  constructor(private http:HttpClient) { }

  ModelosListado = Global + "Modelos/Listado";

  getModelos(){
    return this.http.get<Modelos[]>(this.ModelosListado);
  }
  
  getMarcas(){
    return this.http.get<any[]>(Global + "Marcas/Listado");
  }

  getTiposDeVehiculos(){
    return this.http.get<any[]>(Global + "TipoDeVehiculo/Listado");
  }
  
  postModelosCreate(data: any){
    return this.http.post<any[]>(Global + "Modelos/Insertar",data);
  }
  
  putModelosUpdate(data: any){
    return this.http.put<any[]>(Global + "Modelos/Editar",data);
  }
  
  putModelosDelete(data: any){
    return this.http.put<any[]>(Global + "Modelos/Eliminar",data);
  }
}