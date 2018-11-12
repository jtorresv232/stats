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
  public groupOptions: Array<any> = [];

  // Bar data
  enabledBarChart = false;
  barType = 'bar';
  barColors: Array<any> = [
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
  barOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };


  // Pie Data
  enablePieChart = false;
  pieType = 'pie';
  pieData: Array<any> = [];
  pieLables: Array<any> = [];
  pieColors: Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)',
    'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]
  }];

  pieOptions: any = {
    responsive: true
  };


  idCategory: number;
  idCategories: any;
  initialDate: string;
  initialPieDate: string;
  endPieDate: string;
  endDate: string;
  idStudent: any;
  idGroup: number;
  range: number;
  numStudents: number;

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

    this.adminService.getGroupsByTeacher(1).subscribe(
      data => {
        data.entity.forEach(group => {
          this.groupOptions.push(
            {
              value: group.grupo__id,
              label: group.grupo__grado + '-' + group.grupo__consecutivo + ' ' + group.grupo__ano
            }
          );
        });
      },
      error => {

      }
    );
  }

  mostarGrafico(opt: number) {
    if (opt === 1) {
      this.enabledBarChart = false;
      this.barDatasets = [];
      this.barDatasets.push({ data: [], label: 'Repeticiones ' });
      this.barLabels = [];
      this.adminService.getStudentStatistics(5, this.idStudent, this.initialDate, this.endDate, this.idCategories).subscribe(
        data => {
          data.entity.forEach(value => {
            this.barDatasets[0]['data'].push(value.repeticiones);
            this.barLabels.push(value.categoria__nombre);
          });
          this.enabledBarChart = true;
        },
        error => {
        }
      );
    } else if (opt === 2) {
      this.enablePieChart = false;
      this.pieData = [];
      this.pieLables = [];

      this.adminService.getGroupStatistics(this.idGroup, this.initialPieDate, this.endPieDate, this.idCategory).subscribe(
        data => {
          this.numStudents = data.entity.length;

          let value = this.range;
          let previosValue = 0;
          let count = 0;
          let percentage = '';

          data.entity.forEach((element, index) => {
            if (element.repeticiones <= value) {
              count++;
              if (index === this.numStudents - 1) {
                this.pieData.push(count);
                percentage = ((count / this.numStudents) * 100).toFixed(2) + '%';
                this.pieLables.push(previosValue + '-' + value + ' => ' + percentage);
              }

            } else {
              this.pieData.push(count);
              percentage = ((count / this.numStudents) * 100).toFixed(2) + '%';
              this.pieLables.push(previosValue + '-' + value + ' =>' + percentage);

              while (value < element.repeticiones) {
                previosValue = value + 1;
                value = value + this.range;
                count = 1;
              }

              if (index === this.numStudents - 1) {
                this.pieData.push(count);
                percentage = ((count / this.numStudents) * 100).toFixed(2) + '%';
                this.pieLables.push(previosValue + '-' + value + ' ->' + percentage);
              }
            }
          });

          this.enablePieChart = true;
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
