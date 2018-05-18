import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

	public arrayConfiguraciones:any;
	public rangoMin;
	public rangoMax;
	public ayudas;
	public orden: Boolean;
	public numeroPorOp;
	public onEdit;

  @ViewChild('form') public contentModal;
  constructor(private _service: HttpService) { }

  ngOnInit() {
  	/*this._service.getConfiguracion().subscribe(res => {
  		this.arrayConfiguraciones = res;
  		console.log(this.arrayConfiguraciones);
  	},err=>{
  		console.log(err);
  	});*/
  }

 	setConfiguracion(des){
  	this.onEdit=des;
  	this.rangoMin=des['rangoMin'];
  	this.rangoMax=des['rangoMax'];
  	this.ayudas=des['ayuda'];
  	this.orden=des['orden'];
  	this.numeroPorOp=des['numPorOP'];
  }

  updateConfiguracion(){
   // this.txtDescripcion=this.txtDescripcion.replace(/\n/g, "*");
    let obj={
      "id": this.onEdit['id'],
      "rangoMin": this.rangoMin,
      "rangoMax": this.rangoMax,
      "ayuda": this.ayudas,
      "numPorOP": this.numeroPorOp,
      "orden": this.orden     
    }
    console.log(obj);
    /*this._service.actualizarConfiguracion(obj).subscribe(res => {
        console.log(res);
        this.onEdit['rangoMin']=res['rangoMin'];
        this.onEdit['rangoMax']=res['rangoMax'];
        this.onEdit['ayuda']=res['ayuda'];
        this.onEdit['numPorOP']=res['numPorOP'];
        this.onEdit['orden']=res['orden'];
        this.contentModal.hide();
      }, err => {
        console.log(err);
      });    */   
   

  }

  solonumeros(event){
  	console.log(event);
  }

  toggleCheck(event){
    if(event.target.checked){
      this.orden=true;
    }else{
      this.orden=false;
    }
  }

}

