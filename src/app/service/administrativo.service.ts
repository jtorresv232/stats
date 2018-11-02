import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {
  private API = "andresr.pythonanywhere.com/";

  constructor(private http: HttpClient) { }

  getStudents(idGroup: number) {
    return this.http.get(this.API + "?id_grupo=" + idGroup);
  }
}
