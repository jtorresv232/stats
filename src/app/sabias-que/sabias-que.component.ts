import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sabias-que',
  templateUrl: './sabias-que.component.html',
  styleUrls: ['./sabias-que.component.scss']
})
export class SabiasQueComponent implements OnInit {
	public arraySabias:any;
	public txtDescripcion:string='';
	public onEdit;
  public onDelete;
  public actionText:string;
  public btnText:string;

  @ViewChild('form') public contentModal;
  constructor(private _service: HttpService) { }

  ngOnInit() {
  	this._service.getSabiasQue().subscribe(res => {
  		this.arraySabias = res;  		
  	},err=>{
  		console.log(err);
  	});
  }

  borrarSabiasQue(item){
    this.onDelete=item;
    var deleted=this.onDelete;
    console.log("--------------");
    console.log(this.onDelete);
    console.log("--------------");
    var pos= this.arraySabias.indexOf(this.arraySabias.filter(i=>{
        return i.id==item.id;
      })[0]);
     this._service.borrarSabiasQue(deleted).subscribe(res => {
      console.log(res);
      this.arraySabias.splice(pos, 1);
    },err=>{
      console.log(err);
    });
  }



  setDescripcion(des){
  	this.onEdit=des;
  	this.txtDescripcion=des.descripcion;
  	this.btnText='Editar';
    this.actionText='Editar Sabías que';
  }

  updateText(){
   // this.txtDescripcion=this.txtDescripcion.replace(/\n/g, "*");
   if(this.btnText=='Agregar'){
    let obj={
      "tipoTexto": 2,
      "habilitado": true,
      "descripcion": this.txtDescripcion,
    };
    console.log(obj);
      this._service.agregarSabiasQue(obj).subscribe(res => {
        console.log(res);
        this.arraySabias.push(res);
        this.contentModal.hide();
        this.txtDescripcion='';
      }, err => {
        console.log(err);
      });
   }else{
    let obj={
      "id": this.onEdit['id'],
      "descripcion": this.txtDescripcion,
      "tipoTexto": 2
    };
    console.log(obj);
    this._service.actualizarSabiasQue(obj).subscribe(res => {
        console.log(res);
        this.onEdit['descripcion']=res['descripcion'];
        this.contentModal.hide();
        this.txtDescripcion='';
      }, err => {
        console.log(err);
      });
   }

  }

}
