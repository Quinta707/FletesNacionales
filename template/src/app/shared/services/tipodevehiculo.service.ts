/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { TipoDeVehiculo } from '../model/tipodevehiculo.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class TipodeVehiculoService {
  
    constructor(private http: HttpClient) {}
       
  tipodevehiculoListado = Global + "TipoDeVehiculo/Listado";
  getTipoDeVehiculo(){
    return this.http.get<TipoDeVehiculo[]>(this.tipodevehiculoListado);
  }

  tipodevehiculoinsert = Global + "TipoDeVehiculo/Insertar";
  InsertTipoDeVehiculo(Items: TipoDeVehiculo){
    return this.http.post<TipoDeVehiculo[]>(this.tipodevehiculoinsert,Items)
  }

  tipodevehiculoDelete = Global + "TipoDeVehiculo/Eliminar";
  DeleteTipoDeVehiculo(Items: TipoDeVehiculo){
    return this.http.post<TipoDeVehiculo[]>(this.tipodevehiculoDelete,Items)
  }

  tipodevehiculoEditar = Global + "TipoDeVehiculo/Editar";
  EditarTipoVehiculoEditar(Items:TipoDeVehiculo){
    return this.http.post<TipoDeVehiculo[]>(this.tipodevehiculoEditar,Items)
  }
}