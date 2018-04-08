import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-textos',
  templateUrl: './textos.component.html',
  styleUrls: ['./textos.component.scss']
})
export class TextosComponent implements OnInit {
	public arrayHistorias:any;
  public actionText:string;
  public onEdit;
  public btnText;
  public pets=["Perro", "Gato"];
  public levels=["1","2","3","4","5"];
  public operations=["Suma","Resta"];
  public opSelected;
  public levelSelected;
  public petSelected:string;
  public txtDescripcion;
  public onDelete;
  public need="";


  @ViewChild('form') public contentModal;
  constructor(private _service: HttpService) { }

  ngOnInit() {
  this._service.getHistorias().subscribe(res => {
  		this.arrayHistorias = res;
  	},err=>{
  		console.log(err);
  	});
  }

  setDescripcion(des){
    this.onEdit=des;
    this.txtDescripcion=des.descripcion;
    this.btnText='Editar';
    this.actionText='Editar Historia';
    this.need='No es necesario llenar todos los campos.'
    this.petSelected="Seleccione una mascota";
    this.opSelected=(des.tipoOperacion==0)?"Suma":"Resta";
    this.levelSelected=des.nivel;
    this.petSelected=des.tipoMascota;
  }

  

  updateText(){
   // this.txtDescripcion=this.txtDescripcion.replace(/\n/g, "*");
   if(this.btnText=='Agregar'){
    let op = (this.opSelected=='Suma')?0:1;
    let obj={
      "tipoTexto": 1,
      "habilitado": true,
      "descripcion": this.txtDescripcion, 
      "tipoMascota":this.petSelected,
      "nivel": parseInt(this.levelSelected),
      "tipoOperacion": op     
    };
    console.log(obj);
      this._service.agregarHistoria(obj).subscribe(res => {
        console.log(res);
        this.arrayHistorias.push(res);
        this.contentModal.hide();
        this.txtDescripcion='';
      }, err => {
        console.log(err);
      });        
   }else{
    let op = (this.opSelected=='Suma')?0:1;
    let obj={
      "id": this.onEdit['id'],
      "descripcion": this.txtDescripcion,
      "tipoTexto": 1,
      "tipoMascota":this.petSelected,
      "nivel": parseInt(this.levelSelected),
      "tipoOperacion": op      
    };
    console.log(obj);
    this._service.actualizarHistoria(obj).subscribe(res => {
        console.log(res);
        this.onEdit['descripcion']=res['descripcion'];
        this.onEdit['tipoMascota']=res['tipoMascota'];
        this.onEdit['tipoOperacion']=res['tipoOperacion'];
        this.onEdit['nivel']=res['nivel'];
        this.contentModal.hide();
        this.txtDescripcion='';
      }, err => {
        console.log(err);
      });       
   }

  }

  borrarHistoria(item){
    this.onDelete=item;
    var deleted=this.onDelete;
    console.log("--------------");
    console.log(this.onDelete);
    console.log("--------------");
    var pos= this.arrayHistorias.indexOf(this.arrayHistorias.filter(i=>{
        return i.id==item.id;
      })[0]);
     this._service.borrarHistoria(deleted).subscribe(res => {
      console.log(res);
      this.arrayHistorias.splice(pos, 1);
    },err=>{
      console.log(err);
    });
  }


}