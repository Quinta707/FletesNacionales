/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/NgbdSortableHeader';
import { EstadosDelPedido } from '../model/estadosDelPedido2.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })

export class EstadosDelPedidoService {
  

    constructor(private pipe: DecimalPipe, private http: HttpClient) {}
      

    EstadosDelPedidoListado = Global + "EstadosDelPedido/Listado";
    getEstadosdelPedido(){
    return this.http.get<EstadosDelPedido[]>(this.EstadosDelPedidoListado);
    }

    EstadosDelPedidoInsert = Global + "EstadosDelPedido/Insertar";
    InserttEstadosdelPedido(EstadosDelPedido: EstadosDelPedido){
    return this.http.post<EstadosDelPedido[]>(this.EstadosDelPedidoInsert, EstadosDelPedido);
    }
    

}
