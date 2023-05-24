import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Global } from '../../../../config';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  public loginForm: FormGroup;
  public show: boolean = false;
  public errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    const email = this.loginForm.value["email"];
    const password = this.loginForm.value["password"];

    const payload = {
      user_NombreUsuario: email,
      user_Contrasena: password,
    };

    // Realizar la solicitud POST al servidor
    this.http.post<any>(Global+"Usuarios/Login", payload).subscribe(
      (response) => {
        if(response != null){
          localStorage.setItem("user", JSON.stringify(response));
          this.router.navigate(["/dashboard/default"]);
        }else{
          this.errorMessage = "Error en el inicio de sesión";
        }
        
      },
      (error) => {
        // Manejar el error en caso de que la solicitud falle
        this.errorMessage = "Error en el inicio de sesión";
      }
    );
  }

  showPassword() {
    this.show = !this.show;
  }
}
