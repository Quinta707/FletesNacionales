/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { RolesporPantalla } from '../model/rolesPorPantalla.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../model/rol.model';

@Injectable({ providedIn: 'root' })

export class RolesService {


    constructor(private http: HttpClient) { }


    getListadoRoles() {
        return this.http.get<Roles[]>(Global + 'Roles/Listado');
    }

    validarRolTienePantalla(RolesporPantalla: RolesporPantalla){
        return this.http.post(Global + 'Roles/ValidarRolTienePantalla', RolesporPantalla);
    }
}

