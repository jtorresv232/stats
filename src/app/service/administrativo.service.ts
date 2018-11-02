import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {
  private API = "http://andresr.pythonanywhere.com/";

  constructor(private http: HttpClient) { }

  getStudents(idGroup: number) {
    return this.http.get<any>(this.API + "estudiantes?id_grupo=" + idGroup);
  }
}
