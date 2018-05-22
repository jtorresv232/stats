import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  public isAdmin:boolean;
  public accessUser:any;

  constructor(private router: Router) { }

  login(res:any) {
    this.isAdmin=res['rol'];
    this.accessUser = res;
    localStorage.setItem("identificacion", res['identificacion']);
    localStorage.setItem("docente", res['nombre']);
    localStorage.setItem("isAdmin", res['rol']);
  }

  logout() {
    this.accessUser = null;
    this.isAdmin = false;
    localStorage.removeItem("token");
    localStorage.removeItem("identificacion");
    localStorage.removeItem("docente");
    localStorage.removeItem("isAdmin");
    this.router.navigate(['/login']);
  }


  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessUser && !this.isAdmin;
  }


}
