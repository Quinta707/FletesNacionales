/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/NgbdSortableHeader';
import { Clientes } from '../model/clientes.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { Departamentos } from '../model/Departamentos.model';

interface SearchResult {
    tableItem: any[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(tableItem: Clientes[], column: SortColumn, direction: string): Clientes[] {
    if (direction === '' || column === '') {
        return tableItem;
    } else {
        return [...tableItem].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(table: Clientes, term: string, pipe: PipeTransform) {
    return table.clie_NombreCompleto.toLowerCase().includes(term.toLowerCase());
  }

@Injectable({ providedIn: 'root' })
export class ClientService {
 
 

    constructor(private pipe: DecimalPipe, private http: HttpClient) {
    
      }
      

  ClientesListado = Global + "Clientes/Listado";

  getClientes(){
    return this.http.get<Clientes[]>(this.ClientesListado);
  }
  
  
  getClientesBuscar(id:any){
    return this.http.get<Clientes>(Global + `Clientes/Buscar?id=${id}`);
  }
  
  getMunicipios(){
    return this.http.get<any[]>(Global + "Municipios/Listado");
  }
  
  getEstadosCi(){
    return this.http.get<any[]>(Global + "EstadosCiviles/Listado");
  }
  
  postCreateCliente(data:any){
    return this.http.post<any[]>(Global + "Clientes/Insertar",data);
  }

  putEditarCliente(data:any){
    return this.http.put<any[]>(Global + "Clientes/Editar",data);
  }
  
  putEliminarCliente(data:any){
    return this.http.put<any[]>(Global + "Clientes/Eliminar",data);
  }

  DeptosDdl = Global + "Departamentos/Listado";
  getDeptosDdl(){
    return this.http.get<Departamentos[]>(this.DeptosDdl);
  }
  
}

