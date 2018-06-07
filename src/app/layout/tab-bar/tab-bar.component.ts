import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements OnInit {
  currentUrl:string;
	ancho: number = 33.33;
  @ViewChild('staticTabs') public staticTabs;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.currentUrl=this._router.url.substring(1);
    console.log(this.currentUrl)
    if(this.currentUrl=='listaAlumnos'||this.currentUrl=='grupos'){
      this.staticTabs.setActiveTab(2);
    }else if(this.currentUrl=='statistics1'||this.currentUrl=='statistics2'){
      this.staticTabs.setActiveTab(3);
    }else if(this.currentUrl=='textos'||this.currentUrl=='actividades'||this.currentUrl=='sabiasQue'||this.currentUrl=='configuracion'){
      this.staticTabs.setActiveTab(1);
    }else{
      this.staticTabs.setActiveTab(1);
    }

  }

  mover(tab:number,path){
  console.log(path);
    var a = (tab*this.ancho) + '%';
    document.getElementById("slide").style.left=a;
    this._router.navigate([path]);

  }

  onSelectConf(){
    if(localStorage.getItem('currentUrl')=='/sabiasQue'){
        this._router.navigate(['sabiasQue']);
    }else if(localStorage.getItem('currentUrl')=='/actividades'){
        this._router.navigate(['actividades']);
    }else if(localStorage.getItem('currentUrl')=='/textos'){
        this._router.navigate(['textos']);
    }else if(localStorage.getItem('currentUrl')=='/configuracion'){
        this._router.navigate(['configuracion']);
    }else{
      this._router.navigate(['sabiasQue']);
    }
    localStorage.setItem('currentTab', 'conf');
    //this.staticTabs.setActiveTab(1);
  }

  onSelectAdmin(){
    console.log('clicklcikclickclic');
    if(localStorage.getItem('currentUrl')=='/listaAlumnos'){
        this._router.navigate(['listaAlumnos']);
    }else if(localStorage.getItem('currentUrl')=='/grupos'){
        this._router.navigate(['grupos']);
    }else{
      this._router.navigate(['listaAlumnos']);
    }
    localStorage.setItem('currentTab', 'admin');

  //  this.staticTabs.setActiveTab(2);
  }

  onSelectStats(){
    if(localStorage.getItem('currentUrl')=='/statistics1'){
        this._router.navigate(['statistics1']);
    }else if(localStorage.getItem('currentUrl')=='/statistics2'){
        this._router.navigate(['statistics2']);
    }else{
      this._router.navigate(['statistics1']);
    }
    localStorage.setItem('currentTab', 'stats');
  //  this.staticTabs.setActiveTab(3);
  }

  ngAfterViewInit(){
    var ulnav=document.getElementsByClassName('nav-tabs') as HTMLCollectionOf<HTMLElement>;
    var flcont=document.getElementsByClassName('container-fluid')as HTMLCollectionOf<HTMLElement>;
    var bdcont = document.getElementsByClassName("tab-content")as HTMLCollectionOf<HTMLElement>;
    var rmrow = document.getElementsByClassName("container-fluid")as HTMLCollectionOf<HTMLElement>;
    bdcont[0].classList.remove("tab-content");
    flcont[0].style.padding='0';
    flcont[0].style.margin='0';
    ulnav[0].style.margin='0';
    ulnav[0].style.padding='0.7rem 0';
    ulnav[0].style.borderRadius='0';
    (<HTMLElement>rmrow[0].childNodes[1]).style.margin='0';
    (<HTMLElement>rmrow[0].childNodes[1]).id='rowparent';
    var rmcol = document.getElementById("rowparent").childNodes;
    (<HTMLElement>rmcol[1]).style.padding='0';
    (<HTMLElement>rmcol[3]).style.padding='0';
    var list = document.getElementsByTagName("li");
    list[0].style.padding='0 10px';
    list[1].style.padding='0 10px';
    list[2].style.padding='0 10px';

  }


}
