import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/NgbdSortableHeader';
import { Usuarios } from '../model/usuarios.model';
import { Empleados } from '../model/empleados.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class TableService {
  
    constructor(private http: HttpClient) {
       
    }


    getUsuarios() {
        return this.http.get<Usuarios[]>(Global + "Usuarios/Listado");
    }

    getEmpleadosNoTienenUsuario() {
        return this.http.get<Empleados[]>(Global + "Usuarios/ListarEmpleadosNoTienenUsuario");
    }

    getUsuarioEditar(id: number) {
        return this.http.get<Usuarios>(Global + `Usuarios/Buscar/${id}`);
    }
    
    validarUsernameExiste(username: string){
        return this.http.get(Global + `Usuarios/ValidarUsernameExiste/${username}`)
    }

    getUsuariosDelete(Usuarios: Usuarios) {
        return this.http.post<Usuarios[]>(Global + "Usuarios/Eliminar", Usuarios);
    }

    getUsuariosEditar(Usuarios: Usuarios) {
        return this.http.post<Usuarios[]>( Global + "Usuarios/Editar", Usuarios);
    }
     
    insertarNuevoUsuario(Usuarios: Usuarios){
        return this.http.post<Usuarios>(Global + `Usuarios/Insertar`, Usuarios);
    }


}