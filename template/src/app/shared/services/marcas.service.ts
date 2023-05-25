import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/NgbdSortableHeader';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../../config';
import  { Marcas } from '../../shared/model/Marcas.model';

interface SearchResult {
  tableMarca: any[];
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

function sort(tableMarca: Marcas[], column: SortColumn, direction: string): Marcas[] {
  if (direction === '' || column === '') {
      return tableMarca;
  } else {
      return [...tableMarca].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
      });
  }
}
function matches(table: Marcas, term: string, pipe: PipeTransform) {
  return table.marc_Nombre.toLowerCase().includes(term.toLowerCase());
}


@Injectable({
  providedIn: 'root'
})

export class MarcasService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableMarca$ = new BehaviorSubject<any[]>([]);
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
        this._tableMarca$.next(result.tableMarca);
        this._total$.next(result.total);
      });
    
      this._search$.next();
    }
    

  get tableMarca$() { return this._tableMarca$.asObservable(); }
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
      const tableMarca = this.userData;  
      const total = tableMarca.length;
      
      tableMarca.map(Marca => {
              if(name === Marca.name){
                  this.userData.splice(name,1);
              }
          })

      return (
          this._tableMarca$.next(tableMarca),
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
      let tableMarca = sort(this.userData, sortColumn, sortDirection);
  
      // 2. filter
      const total = tableMarca.length;
      tableMarca = tableMarca.filter((country) =>
        matches(country, searchTerm, this.pipe)
      );
  
      tableMarca = tableMarca
        .map((Marca, i) => ({ id: i + 1, ...Marca }))
        .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({ tableMarca, total });
    }

  MarcasListado = Global + "Marcas/Listado";

  getMarcas(){
    return this.http.get<Marcas[]>(this.MarcasListado);
  }
}