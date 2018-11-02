import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-admin',
  templateUrl: './statistics-admin.component.html',
  styleUrls: ['./statistics-admin.component.scss']
})
export class StatisticsAdminComponent implements OnInit {
  optionsSelect: Array<any>;
  optionsStudent: Array<any>;

  idCategorias : any;
  idEstudiante : any;

  constructor() { }

  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Armonioso' },
      { value: '2', label: 'Aislamiento' },
      { value: '3', label: 'Felicidad' },
  ];
  this.optionsStudent = [
    {value: '1', label: 'Andrés Ruiz Graciano'},
    {value: '2', label: 'Andrés Alvarez'},
    {value: '3', label: 'Alejandro Gallego'},
  ];
  }

  mostarGrafico() {
    console.log(this.idCategorias);
    console.log(this.idEstudiante);
  }

}
