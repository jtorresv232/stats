import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAlumno } from './Alumno';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatsService {


  constructor(private http: HttpClient) { }

  private _url: string = "http://luditics.eastus.cloudapp.azure.com/alumnos/";

  getAlumnos():Observable<IAlumno[]>{
  	return this.http.get<IAlumno[]>(this._url);
  }
  

}
