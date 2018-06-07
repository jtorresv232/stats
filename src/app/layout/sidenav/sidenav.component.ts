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
  myclass: string= "fa fa-angle-double-left my-float";
  options: any[];


  constructor(private _router: Router) { }

  ngOnInit() {

    this.show=true;

    if(this.myOption=="administrar"){
      this.options = [{
        nombre:"Grupos",
        url:"/grupos",
        icon:"fa fa-group ml-2 aux"
      },
      {
        nombre:"Alumnos",
        url:"/listaAlumnos",
        icon:"fa fa-male ml-2 aux"
      }];
    } else if(this.myOption=="configuracion"){
      this.options=[{
        nombre:"Sabías Qué?",
        url:"/sabiasQue",
        icon:"fa fa-lightbulb-o ml-2 aux"
      },
      {
        nombre:"Textos",
        url:"/textos",
        icon:"fa fa-pencil-square ml-2 aux"
      },
      {
        nombre:"Actividades",
        url:"/actividades",
        icon:"fa fa-puzzle-piece ml-2 aux"
      },{
        nombre:"Configuración serie",
        url:"/configuracion",
        icon:"fa fa-cog ml-2 aux"
      }];
    } else {
      this.options=[{
        nombre:"Estadísticas juego cocina",
        url:"/statistics1",
        icon:"fa fa-pie-chart ml-2 aux"
      },{
        nombre:"Estadísticas juego baño",
        url:"/statistics2",
        icon:"fa fa-pie-chart ml-2 aux"
      }];
    }

  }

  openOrHideNavInit(){
    if(localStorage.getItem('isDrawerHide')==null){
      this.show=true;
    }else if(localStorage.getItem('isDrawerHide')=='true'){
      console.log('por here');
      document.getElementById("left").style.width='4.5%';
      document.getElementById("right").style.width='95.5%';
      document.getElementById("right").style.marginLeft='4.5%';
      this.show=false;
      //this.myclass="fa fa-angle-double-right my-float";
      for (var i=0;i<4;i++) {
        console.log('jummm');
        let entry=document.getElementById('i'+i);
        console.log(entry);
        if(entry!=null){
          entry.classList.remove('ml-2');
        }
        console.log(entry);
      }
    }else{
      console.log('por here2');
      document.getElementById("left").style.width='19%';
      document.getElementById("right").style.width='81%';
      document.getElementById("right").style.marginLeft='19%';
      // this.myclass="fa fa-angle-double-left my-float";
      var array=document.getElementsByClassName('aux');
      for (var i=0;i<array.length;i++) {
        let entry=array[i];
        entry.classList.add('ml-2');
      }
    }
  }


  getWidth(){
  	if(this.show){
  		return "100%";
  	} else {
  		return "100%";
  	}
  }

  openOrCloseNav(){
    if(this.show==true){
      this.show=!this.show;
      localStorage.setItem('isDrawerHide', 'true');
      document.getElementById("left").style.width='4.5%';
      document.getElementById("right").style.width='95.5%';
      document.getElementById("right").style.marginLeft='4.5%';
      this.myclass="fa fa-angle-double-right my-float";
      var array=document.getElementsByClassName('aux');
      for (var i=0;i<array.length;i++) {
        let entry=array[i];
        entry.classList.remove('ml-2');
      }
    } else{
      document.getElementById("left").style.width='19%';
      document.getElementById("right").style.width='81%';
      document.getElementById("right").style.marginLeft='19%';
      setTimeout(()=>{
        this.show=!this.show;
        localStorage.setItem('isDrawerHide', 'false');
      }, 200);
      this.myclass="fa fa-angle-double-left my-float";
      var array=document.getElementsByClassName('aux');
      for (var i=0;i<array.length;i++) {
        let entry=array[i];
        entry.classList.add('ml-2');
      }
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

  ngAfterViewInit(){
    //
    var items=document.getElementsByClassName('nav-link') as HTMLCollectionOf<HTMLElement>;
    for(var i=0; i<items.length;i++){
      items[0].classList.remove('active');
    }

    if(localStorage.getItem('currentTab')=='admin'){
      if(this._router.url==='/grupos'){
        document.getElementById('elm0').classList.add('active');
      }else{
        document.getElementById('elm1').classList.add('active');
      }
    }else if(localStorage.getItem('currentTab')=='conf'){
      console.log(this._router.url);
      if(this._router.url==='/sabiasQue'){
        document.getElementById('elm0').classList.add('active');
      }else if(this._router.url==='/textos'){
        document.getElementById('elm1').classList.add('active');
      }else if(this._router.url==='/actividades'){
        document.getElementById('elm2').classList.add('active');
      }else if(this._router.url==='/configuracion'){
        document.getElementById('elm3').classList.add('active');
      }
    }else if(localStorage.getItem('currentTab')=='stats'){
      if(this._router.url==='/statistics1'){
        document.getElementById('elm0').classList.add('active');
      }else{
        document.getElementById('elm1').classList.add('active');
      }
    }
    this.openOrHideNavInit();
  }

  reDireccionar(path){
    console.log('esta entradno pa redirect '+path)
    localStorage.setItem('currentUrl',path);
    this._router.navigate([path]);
  }
}
