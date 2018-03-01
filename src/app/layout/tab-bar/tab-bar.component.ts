import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements OnInit {

	ancho: number = 33.33;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  mover(tab:number,path){
  console.log(path);
    var a = (tab*this.ancho) + '%';
    document.getElementById("slide").style.left=a;
    this._router.navigate([path]); 

  }


}
