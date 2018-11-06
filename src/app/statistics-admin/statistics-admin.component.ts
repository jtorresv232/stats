import { Component, OnInit } from '@angular/core';
import { AdministrativoService } from '../service/administrativo.service';

@Component({
  selector: 'app-statistics-admin',
  templateUrl: './statistics-admin.component.html',
  styleUrls: ['./statistics-admin.component.scss']
})
export class StatisticsAdminComponent implements OnInit {
  public optionsCategories: Array<any> = [];
  public optionsStudent: Array<any> = [];

  idCategories: any;
  idStudent: any;

  constructor(private adminService: AdministrativoService) { }

  ngOnInit() {
    this.adminService.getStudents(5).subscribe(
      data => {
        data.entity.forEach(student => {
          this.optionsStudent.push(
            {
              value: student.id,
              label: student.nombres + ' ' + student.apellidos
            }
          );
        });
      },
      error => {

      });
    this.adminService.getCategories().subscribe(
      data => {
        data.entity.forEach(category => {
          this.optionsCategories.push(
            {
              value: category.id,
              label: category.nombre
            }
          );
        });
      },
      error => {

      }
    );
    /*this.optionsStudent.push({ value: 1, label: 'Esto si lo inserta' });
    this.optionsStudent.push({ value: 5, label: 'Esto si lo ' });
    this.optionsStudent.push({ value: 2, label: 'Esto ' });
    this.optionsCategories = [
      { value: 1, label: 'Armonioso' },
      { value: 2, label: 'Aislamiento' },
      { value: 3, label: 'Felicidad' },
    ];*/
  }

  mostarGrafico() {
    console.log(this.idStudent);
    console.log(this.idCategories);
  }

}
