/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/NgbdSortableHeader';
import { Clientes } from '../model/clientes.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';

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
 
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _tableItem$ = new BehaviorSubject<any[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    userData;

    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe, private http: HttpClient) {
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._tableItem$.next(result.tableItem);
          this._total$.next(result.total);
        });
      
        this._search$.next();
      }
      

    get tableItem$() { return this._tableItem$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) {
        this._set({ page });
    }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    setUserData(val: object) {
        this.userData = val;
    }

    deleteSingleData(name: string) {
        const tableItem = this.userData;  
        const total = tableItem.length;
        
        tableItem.map(item => {
                if(name === item.name){
                    this.userData.splice(name,1);
                }
            })

        return (
            this._tableItem$.next(tableItem),
            this._total$.next(total)
        )

    }


    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } =
          this._state;
    
        // 1. sort
        let tableItem = sort(this.userData, sortColumn, sortDirection);
    
        // 2. filter
        const total = tableItem.length;
        tableItem = tableItem.filter((country) =>
          matches(country, searchTerm, this.pipe)
        );
    
        // 3. Parsear la fecha
         tableItem.forEach((item) => {
             if (typeof item.clie_FechaNacimiento === 'string') {
               let data = new Date(item.clie_FechaNacimiento);
               item.clie_FechaNacimiento = data.toLocaleDateString('es-ES', {
                 day: '2-digit',
                 month: '2-digit',
                 year: 'numeric'
               });
             }
           });
          
    
        tableItem = tableItem
          .map((item, i) => ({ id: i + 1, ...item }))
          .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ tableItem, total });
      }
    
  ClientesListado = Global + "Clientes/Listado";

  getClientes(){
    return this.http.get<Clientes[]>(this.ClientesListado);
  }


}

