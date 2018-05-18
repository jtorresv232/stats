import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-statistics2',
  templateUrl: './statistics2.component.html',
  styleUrls: ['./statistics2.component.css'],
  providers: [HttpService]
})
export class StatisticsComponent2 implements OnInit {

  constructor(private _service: HttpService) { }

  public parameters:object;
  public res=[];


  public chartType:string = 'bar';
  public chartType2:string = 'pie';

   public chartData2:Array<any> = [300, 50, 100, 40, 120];

   public chartLabels2:Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

    public chartDatasets:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset'},
    ];

    public chartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    public chartColors:Array<any> = [
        {
            backgroundColor: 'rgba(220,220,220,0.2)',
            borderColor: 'rgba(220,220,220,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(220,220,220,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(220,220,220,1)'
        },
        {
            backgroundColor: 'rgba(151,187,205,0.2)',
            borderColor: 'rgba(151,187,205,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)'
        }
    ];

    public chartOptions:any = {
        responsive: true
    };

    public chartOptions2:any = {
        responsive: true,

    };

    public chartClicked(e: any): void {

    }

    public chartHovered(e: any): void {

    }

  ngOnInit() {
    this.parameters={
      fechaInicio: "2017-10-10T14:34:20.665869-05:00",
      fechaFin: "2017-12-29T23:44:11.615179-05:00",
      idAlumno:"30"
    };
    this._service.getBarras(this.parameters).subscribe(data => {

      this.saludar(data)
    }, err => {
      console.log(err);
    });
  }


  saludar(p){
    console.log('hola mundo');
    this.res=p;
    console.log(this.res);
  }

}
