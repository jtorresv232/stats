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
  public alumnoSeleccionado;
  public grupoSeleccionado;
  public parameters:object;
  public tipoJuego:string='serializacion';
  public fechaInicio:any;
  public fechaFin:any;
  public fechaInicioTortas:any;
  public fechaFinTortas:any;
  public res=[];
  public alumnos:any[];
  public grupos:any;


  public aciertosAnyOp:number[];
  public fallosAnyOp:number[];

  public habilitarBarChart:boolean=false;
  public habilitarPieChart:boolean=false;
  public chartType:string = 'bar';
  public chartType2:string = 'pie';
  public optionsSelectEstudiante:Array<any>=[];
  public optionsSelectGrupo:Array<any>=[];

  public chartDatasets:Array<any>;
  public chartDatasetsNumerico:Array<any>=[];
  public chartDatasetsLetras:Array<any>=[];
  public chartDatasetsDesc1:Array<any>=[];
  public chartDatasetsDesc2:Array<any>=[];
  public chartLabels2:Array<any> = ['Aciertos', 'Desaciertos'];
  public chartLabels:Array<any> = ['Escribir valor numérico', 'Escribir en letras', 'Descomposición', 'Descomposición unidades'];
  public chartColors2:Array<any> = [{
        hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
        hoverBorderWidth: 0,
        backgroundColor: ["#F7464A", "#46BFBD"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
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
    this.aciertosAnyOp = new Array(this.chartLabels.length);
    this.fallosAnyOp = new Array(this.chartLabels.length);
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
    this._service.getGrafico3(data).subscribe(res => {
      console.log(res);

      for (var i=0; i<res['length']; i++) {
        var item=res[i];
        if(item['tipoOperacion']==0){
          this.chartDatasetsNumerico.push(item['aciertos']);
          this.chartDatasetsNumerico.push(item['fallos']);
        }else if(item['tipoOperacion']==1){
          this.chartDatasetsLetras.push(item['aciertos']);
          this.chartDatasetsLetras.push(item['fallos']);
        }else if(item['tipoOperacion']==2){
          this.chartDatasetsDesc1.push(item['aciertos']);
          this.chartDatasetsDesc1.push(item['fallos']);
        }else if(item['tipoOperacion']==3){
          this.chartDatasetsDesc2.push(item['aciertos']);
          this.chartDatasetsDesc2.push(item['fallos']);
        }
      }

      console.log(this.chartDatasetsNumerico);
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
          this.aciertosAnyOp[item['tipoOperacion']]=item.aciertos;
          this.fallosAnyOp[item['tipoOperacion']]=item.fallos;
        }else if(item['tipoOperacion']==1){
          this.aciertosAnyOp[item['tipoOperacion']]=item.aciertos;
          this.fallosAnyOp[item['tipoOperacion']]=item.fallos;
        }else if(item['tipoOperacion']==2){
          this.aciertosAnyOp[item['tipoOperacion']]=item.aciertos;
          this.fallosAnyOp[item['tipoOperacion']]=item.fallos;
        }else if(item['tipoOperacion']==3){
          this.aciertosAnyOp[item['tipoOperacion']]=item.aciertos;
          this.fallosAnyOp[item['tipoOperacion']]=item.fallos;
        }
      }
      this.chartDatasets=[
        {data: this.aciertosAnyOp, label: 'Aciertos'},
        {data: this.fallosAnyOp, label: 'Fallos'},
      ];

      this.habilitarBarChart=true;

    },err=>{
      console.log(err);
    });
  }

}
