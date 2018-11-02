import { Component, OnInit } from '@angular/core';
import {AdministrativoService} from '../service/administrativo.service'

@Component({
  selector: 'app-statistics-admin',
  templateUrl: './statistics-admin.component.html',
  styleUrls: ['./statistics-admin.component.scss']
})
export class StatisticsAdminComponent implements OnInit {
  optionsSelect: Array<any> = [];
  optionsStudent: Array<any> = [];

  idCategorias : any;
  idEstudiante : any;

  constructor(private adminService: AdministrativoService) { }

  ngOnInit() {
    this.adminService.getStudents(5).subscribe(data => {
      data.entity.forEach(student => {
        this.optionsStudent.push({value: student.id, label: student.nombres + " " + student.apellidos});
      });
    },
    error => {

    });
    this.optionsSelect = [
      { value: '1', label: 'Armonioso' },
      { value: '2', label: 'Aislamiento' },
      { value: '3', label: 'Felicidad' },
  ];
  }

  mostarGrafico() {
    console.log(this.optionsStudent);
  }

}
