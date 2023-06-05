import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UsuariosService } from '../../shared/services/usuarios.service';
import { RolesService } from '../../shared/services/rol.service';
import { RolesporPantalla } from "../model/rolesPorPantalla.model";

interface DataResponse {
  codeStatus: number;
}

interface ValidarRolResponse {
  code: number;
  data: DataResponse;
}

@Injectable({
  providedIn: "root",
})
export class AccesoGuard implements CanActivate {
  constructor(
    public router: Router,
    public service: UsuariosService,
    private rolService: RolesService,
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log("entra Acceso");
    let user = JSON.parse(localStorage.getItem("user"));
    let parametro = next.params["parametro"];

    if (!user) {
      // Si no hay un usuario válido, redirigir al dashboard
      this.router.navigate(["/dashboard/default"]);
      return false;
    }

    if (!user.user_EsAdmin) {
      const ropaAcceso = new RolesporPantalla();
      ropaAcceso.role_Id = user.role_Id;
      ropaAcceso.pant_Nombre = parametro;

      try {
        const data = await this.rolService.validarRolTienePantalla(ropaAcceso).toPromise();
        const response = data as ValidarRolResponse;

        if (response.code === 200) {
          if (response.data.codeStatus === 0) {
            // Si el usuario tiene permisos para acceder a la pantalla, permitir el acceso
            return true;
          } else {
            // Si el usuario no tiene permisos para acceder a la pantalla, redirigir al dashboard
            this.router.navigate(["/dashboard/default"]);
            return false;
          }
        } else {
          // Si hay un error en la respuesta, redirigir al dashboard
          this.router.navigate(["/dashboard/default"]);
          return false;
        }
      } catch (error) {
        console.error("Error al validar el acceso:", error);
        // En caso de error, redirigir al dashboard
        this.router.navigate(["/dashboard/default"]);
        return false;
      }
    }

    return true; // Permitir el acceso si el usuario es administrador
  }
}
