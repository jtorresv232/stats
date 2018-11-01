import { Component, OnInit, ViewChild,  ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
declare var $:any;
import { TabsetComponent } from 'ng-uikit-pro-standard';



@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements OnInit {
  currentUrl:string;
	ancho: number = 33.33;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(private _router: Router, private hostElement: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  mover(tab:number,path){
    var a = (tab*this.ancho) + '%';
    document.getElementById("slide").style.left=a;
    this._router.navigate([path]);

  }

  tabSelected(index){
    if(index+1==1){
      localStorage.setItem('currentTab', 'conf');
      this._router.navigate(['sabiasQue']);
    }else if(index+1==2){
      localStorage.setItem('currentTab', 'admin');
      this._router.navigate(['listaAlumnos']);
    }else{
      localStorage.setItem('currentTab', 'stats');
      this._router.navigate(['statistics1']);
    }
  }


  ngAfterViewInit(){
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(()=>{
          this.currentUrl=this._router.url;
          console.log(this.currentUrl)
          if(this.currentUrl=='/listaAlumnos'||this.currentUrl=='/grupos'){
            this.staticTabs.setActiveTab(2);
          }else if(this.currentUrl=='/statistics1'||this.currentUrl=='/statistics2'){
            this.staticTabs.setActiveTab(3);
          }else if(this.currentUrl=='/textos'||this.currentUrl=='/actividades'||this.currentUrl=='/sabiasQue'||this.currentUrl=='/configuracion'){
            this.staticTabs.setActiveTab(1);
          }else{
            this.staticTabs.setActiveTab(1);
          }
        }, 0.00000001);
      }
    });

    this.hostElement.nativeElement.querySelectorAll('.nav-item').forEach((elm,index)=>{
      elm.addEventListener('click', ()=>{
        this.tabSelected(index);
      }, false);
    });
    this.renderer.addClass(this.hostElement.nativeElement.querySelector('.md-tabs'), 'm-0');
    this.renderer.setStyle(this.hostElement.nativeElement.querySelector('.md-tabs'), 'border-radius','inherit');
    this.renderer.setStyle(this.hostElement.nativeElement.querySelector('.md-tabs'), 'background-color','#02579b');
    this.renderer.addClass(this.hostElement.nativeElement.querySelector('.container-fluid'), 'p-0');
  }


}
