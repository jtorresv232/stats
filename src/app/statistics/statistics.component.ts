import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [HttpService]
})
export class StatisticsComponent implements OnInit {

  constructor(private _service: HttpService) { }
  public alumnoSeleccionado;
  public grupoSeleccionado;
  public parameters:object;
  public tipoJuego:string='operaciones';
  public fechaInicio:any;
  public fechaFin:any;
  public fechaInicioTorta:any;
  public fechaFinTorta:any;
  public res=[];
  public alumnos:any[];
  public grupos:any[];
  public aciertosSuma:number[];
  public aciertosResta:number[];
  public fallosSuma:number[];
  public fallosResta:number[];
  public habilitarBarChart:boolean=false;
  public habilitarTorta:boolean=false;
  public chartType:string = 'bar';

  public chartType2:string = 'pie';
  public estudiantesSuma:number[];
  public estudiantesResta:number[];
  public chartDataSuma:Array<any> = [300, 50, 100, 40, 120];
  public chartDataResta:Array<any> = [300, 50, 100, 40, 120];
   public chartColors2:Array<any> = [{
        hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'], 
        hoverBorderWidth: 0, 
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"], 
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5","#616774"]
    }];



  public chartDatasets:Array<any>;
  public chartDatasets2:Array<any>;
  public chartLabels:Array<any> = ['nivel 1', 'nivel 2', 'nivel 3', 'nivel 4', 'nivel 5'];
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

  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }

  ngOnInit() {
    this.aciertosSuma = new Array(this.chartLabels.length);
    this.aciertosResta = new Array(this.chartLabels.length);
    this.fallosSuma = new Array(this.chartLabels.length);
    this.fallosResta = new Array(this.chartLabels.length);
    this.estudiantesSuma = new Array(this.chartLabels.length);
    this.estudiantesResta = new Array(this.chartLabels.length);
    this._service.getAlumnos().subscribe(res=>{
      console.log(res);
      this.alumnos=res;
    }, err=>{
      console.log(err);
    });
    this._service.getGrupos().subscribe(res=>{
      console.log(res);
      this.grupos=res;
    }, err=>{
      console.log(err);
    });
  }

  recargarEstadisticaTorta(){
    var data={
      "grupo":this.grupoSeleccionado,
      "fechaInicio":this.fechaInicioTorta.toString(),
      "fechaFin":this.fechaFinTorta.toString(),
      "juego":this.tipoJuego
    };

    console.log(data);  
    this._service.getCuenta(data).subscribe(res => {
      console.log(res);

      for (let item of res) {
        if(item['tipoOperacion']==0){
          this.estudiantesSuma[item['nivel']-1]=item.cuenta;
        }else{
          this.estudiantesResta[item['nivel']-1]=item.cuenta;
        }
      }
      this.chartDataSuma=this.estudiantesSuma;
      this.chartDataResta=this.estudiantesResta;
      this.habilitarTorta=true;
    },err=>{

    });
  }

  recargarEstadistica(){
    console.log(this.alumnoSeleccionado);
    console.log(this.fechaFin);
    console.log(this.fechaInicio);
    var data={
      "idAlumno":this.alumnoSeleccionado,
      "fechaInicio":this.fechaInicio.toString(),
      "fechaFin":this.fechaFin.toString(),
      "juego":this.tipoJuego
    };
    this._service.getBarras(data).subscribe(res => {
      console.log(res);
      for (let item of res) {
        if(item['tipoOperacion']==0){
          this.aciertosSuma[item['nivel']-1]=item.aciertos;
          this.fallosSuma[item['nivel']-1]=item.fallos;
        }else{
          this.aciertosResta[item['nivel']-1]=item.aciertos;
          this.fallosResta[item['nivel']-1]=item.fallos;
        }
      }
      console.log(this.aciertosSuma);
      console.log(this.aciertosResta);
      this.chartDatasets=[
       {data: this.aciertosSuma, label: 'Suma'},
        {data: this.aciertosResta, label: 'Resta'}
      ];

      this.chartDatasets2=[
       {data: this.fallosSuma, label: 'Suma'},
        {data: this.fallosResta, label: 'Resta'}
      ];

      this.habilitarBarChart=true;
 
    },err=>{
      console.log(err);
    });


}
