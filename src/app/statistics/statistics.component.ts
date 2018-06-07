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
  public fechaInicioTortas:any;
  public fechaFinTortas:any;
  public res=[];
  public alumnos:any[];
  public grupos:any;
  public aciertosSuma:number[];
  public aciertosResta:number[];
  public fallosSuma:number[];
  public fallosResta:number[];
  public habilitarBarChart:boolean=false;
  public habilitarTorta:boolean=false;
  public chartType:string = 'bar';
  public optionsSelectEstudiante:Array<any>=[];
  public optionsSelectGrupo:Array<any>=[];

  public habilitarPieChart:boolean=false;

  public chartType2:string = 'pie';
  public estudiantesSuma:number[];
  public estudiantesResta:number[];
  public chartDataSuma:Array<any> = [300, 50, 100, 40, 120];
  public chartDataResta:Array<any> = [300, 50, 100, 40, 120];


  public chartDatasetsTorta:Array<any>;
  public chartDatasetsTorta2:Array<any>;
  public chartDatasets:Array<any>;
  public chartDatasets2:Array<any>;
  public chartLabels:Array<any> = ['nivel 1', 'nivel 2', 'nivel 3', 'nivel 4', 'nivel 5'];

  public chartColors2:Array<any> = [{
        hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
        hoverBorderWidth: 0,
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5","#616774"]
    }];

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
    this.chartDatasetsTorta=new Array(this.chartLabels.length);
    this.chartDatasetsTorta2=new Array(this.chartLabels.length);
    this._service.getAlumnos().subscribe(res=>{
      this.alumnos=res;
      for(var i=0;i<res.length;i++){
        var item=res[i];
        var data={
          value:item['id'], label:item['nombre_completo']
        };
        this.optionsSelectEstudiante.push(data);
      }
    }, err=>{
      console.log(err);
    });

    var data={
      "cedula":Number(localStorage.getItem('identificacion'))
    }
    this._service.getGrupos(data).subscribe(res=>{
      this.grupos=res;
      console.log(res);
      for(var i=0;i<res['length'];i++){
        var item=res[i];
        var data={
          value:item['id'], label:item['id']
        };
        this.optionsSelectGrupo.push(data);
      }
    }, err=>{
      console.log(err);
    });
  }

  recargarEstadisticaTorta(){
    var data={
      "grupo":this.grupoSeleccionado,
      "fechaInicio":this.fechaInicioTortas.toString(),
      "fechaFin":this.fechaFinTortas.toString()
    };

    console.log(data);
    this._service.getCuenta(data).subscribe(res => {
      console.log(res);

      for (var i=0; i<res['length']; i++) {
        var item=res[i];
        if(item['tipoOperacion']==0){
          this.chartDatasetsTorta[item['nivel']-1]=item['cuenta'];
        }else if(item['tipoOperacion']==1){
          this.chartDatasetsTorta2[item['nivel']-1]=item['cuenta'];
        }
      }
      this.habilitarPieChart=true;
    },err=>{

    });
  }

  recargarEstadistica(){
    var data={
      "idAlumno":this.alumnoSeleccionado,
      "fechaInicio":this.fechaInicio.toString(),
      "fechaFin":this.fechaFin.toString(),
      "juego":this.tipoJuego
    };
    this._service.getBarras(data).subscribe(res => {
      console.log(res)
      for (var i=0; i <res['length']; i++) {
        var item=res[i];
        if(item['tipoOperacion']==0){
          this.aciertosSuma[item['nivel']-1]=item.aciertos;
          this.fallosSuma[item['nivel']-1]=item.fallos;
        }else{
          this.aciertosResta[item['nivel']-1]=item.aciertos;
          this.fallosResta[item['nivel']-1]=item.fallos;
        }
      }
      this.chartDatasets=[
       {data: this.aciertosSuma, label: 'Aciertos'},
        {data: this.fallosSuma, label: 'Fallos'}
      ];

      this.chartDatasets2=[
       {data: this.aciertosResta, label: 'Aciertos'},
        {data: this.fallosResta, label: 'Fallos'}
      ];

      this.habilitarBarChart=true;

    },err=>{
      console.log(err);
    });

}
}
