import { Component, OnInit } from '@angular/core';
import { AdministrativoService } from '../service/administrativo.service';

@Component({
  selector: 'app-statistics-admin',
  templateUrl: './statistics-admin.component.html',
  styleUrls: ['./statistics-admin.component.scss']
})
export class StatisticsAdminComponent implements OnInit {
  public categoryOptions: Array<any> = [];
  public studentOptions: Array<any> = [];

  enabledBarChart = false;
  barType = 'bar';
  public chartColors: Array<any> = [
    {
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderColor: 'rgba(255,0,0,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255,0,0,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,0,0,1)'
    }
  ];
  barData: any[] = [];
  barDatasets: Array<any> = [];
  barLabels: Array<any> = [];
  arrayBarDatasets: Array<any> = [];
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };

  idCategories: any;
  initialDate: string;
  endDate: string;
  idStudent: any;

  constructor(private adminService: AdministrativoService) { }

  ngOnInit() {
    this.adminService.getStudents(5).subscribe(
      data => {
        data.entity.forEach(student => {
          this.studentOptions.push(
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
          this.categoryOptions.push(
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
  }

  mostarGrafico(opt: number) {
    this.enabledBarChart = false;
    this.barDatasets = [];
    this.barDatasets.push({data: [], label: 'Repeticiones '});
    this.barLabels = [];
    if (opt === 1) {
      this.adminService.getStudentStatistics(5, this.idStudent, this.initialDate, this.endDate, this.idCategories).subscribe(
        data => {
          data.entity.forEach(value => {
            this.barDatasets[0]['data'].push(value.repeticiones);
            this.barLabels.push(value.categoria__nombre);
          });
         // this.barDatasets['data'] = this.barData;
        this.enabledBarChart = true;
        },
        error => {
        }
      );
    }
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }
}
