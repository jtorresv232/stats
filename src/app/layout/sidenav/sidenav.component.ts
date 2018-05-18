import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  show: boolean = true;
  class: string= "fa fa-angle-double-left";
  @Input() myOption : string;

  options: any[];


  constructor(private _router: Router) { }

  ngOnInit() {
    this.show=true;

    if(this.myOption=="administrar"){
      this.options = [{
        nombre:"Grupos",
        url:"/grupos",
        icon:"fa fa-group"
      },
      {
        nombre:"Alumnos",
        url:"/listaAlumnos",
        icon:"fa fa-male"
      }];
    } else if(this.myOption=="configuracion"){
      this.options=[{
        nombre:"Sabías Qué?",
        url:"/sabiasQue",
        icon:"fa fa-lightbulb-o"
      },
      {
        nombre:"Textos",
        url:"/textos",
        icon:"fa fa-pencil-square"
      },
      {
        nombre:"Actividades",
        url:"/actividades",
        icon:"fa fa-puzzle-piece"
      }];
    } else {
      this.options=[{
        nombre:"Estadisticas juego operaciones",
        url:"/statistics1",
        icon:"fa fa-pie-chart"
      },{
        nombre:"Estadisticas juego serializacion",
        url:"/statistics2",
        icon:"fa fa-pie-chart"
      }];
    }
  }

  getWidth(){
  	if(this.show){
  		return "100%";
  	} else {
  		return "100%";	
  	}
  }

  whenClick(){
    this.show=!this.show;
    if(!this.show){
      document.getElementById("left").style.flex='0.05';
      this.class="fa fa-angle-double-right";
    } else{
      document.getElementById("left").style.flex='1';
      this.class="fa fa-angle-double-left";
    }
    
  }

  reDireccionar(path){
    this._router.navigate([path]);
  }
}
