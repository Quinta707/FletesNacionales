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
}