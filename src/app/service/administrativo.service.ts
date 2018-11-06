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

  getCategories() {
    return this.http.get<any>(this.API + "categorias/");
  }

  getStudentStatistics(idGroup: number, idStudent: number, initialDate: string, finishDate: string, categories) {
    return this.http.post<any>(this.API + "estadisticas/individual", {
      "id_grupo": idGroup,
      "id_estudiante": idStudent,
      "fecha_inicial": initialDate,
      "fecha_final": finishDate,
      "id_categorias": categories
  });
  }
}
