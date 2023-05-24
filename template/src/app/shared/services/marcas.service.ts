import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../../config';
import  { Marcas } from '../../shared/model/Marcas.model';

@Injectable({
  providedIn: 'root'
})

export class MarcasService {

  constructor(private http:HttpClient) { }

  MarcasListado = Global + "Marcas/Listado";

  getMarcas(){
    return this.http.get<Marcas[]>(this.MarcasListado);
  }
}