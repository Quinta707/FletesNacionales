/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { Departamentos } from '../model/Departamentos.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })

export class DepaService {
   
  constructor(private http: HttpClient) {}
      
  DepartamentosListado = Global + "Departamentos/Listado";
  getDepartamentos(){
    return this.http.get<Departamentos[]>(this.DepartamentosListado);
  }

  DepartamentosInsert = Global + "Departamentos/Insertar";
  InsertDepartamento(Departamentos: Departamentos){
    return this.http.post<Departamentos[]>(this.DepartamentosInsert,Departamentos)
  }

  DepartamentosDelete = Global + "Departamentos/Eliminar";
  DeleteDepartamento(Departamentos: Departamentos){
    return this.http.post<Departamentos[]>(this.DepartamentosDelete,Departamentos)
  }

  DepartamentosEditar = Global + "Departamentos/Editar";
  EditarDepartamento(Departamentos:Departamentos){
    return this.http.post<Departamentos[]>(this.DepartamentosEditar,Departamentos)
  }


}
