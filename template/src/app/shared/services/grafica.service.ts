/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/NgbdSortableHeader';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { Modelos } from '../model/Modelos.model';
import { Flete } from '../model/fletes.model';
import { Grafica } from '../model/grafica.model';
import { Departamentos } from '../model/departamentos.model';

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

@Injectable({ providedIn: 'root' })
export class TableService {
   
    constructor(private http: HttpClient) {}
      
  DepartamentosListado = Global + "Departamentos/Listado";

  getDepartamenos(){
    return this.http.get<Departamentos[]>(this.DepartamentosListado);
  }


  GraficaGet = Global + "Fletes/Grafica"

  getGrafica(Grafica: Grafica)
  {
    return this.http.put<Flete[]>(this.GraficaGet, Grafica)
  }

  

}

