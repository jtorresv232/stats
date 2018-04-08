import { ViewChild, Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

	public arrayGrupos:any;
	public txtDescripcion:string='';
	public txtGrupo;
	public onEdit;
  	public onDelete;
  	public actionText:string;
  	public btnText:string;

  @ViewChild('form') public contentModal;
  constructor(private _service: HttpService) { }

  ngOnInit() {
  	this._service.getGrupos().subscribe(res => {
  		this.arrayGrupos = res;
  		console.log(this.arrayGrupos);
  	},err=>{
  		console.log(err);
  	});
  }

  borrarGrupo(item){
    this.onDelete=item;
    var deleted=this.onDelete;
    console.log("--------------");
    console.log(this.onDelete);
    console.log("--------------");
    var pos= this.arrayGrupos.indexOf(this.arrayGrupos.filter(i=>{
        return i.id==item.id;
      })[0]);
     this._service.borrarGrupo(deleted).subscribe(res => {
      console.log(res);
      this.arrayGrupos.splice(pos, 1);
    },err=>{
      console.log(err);
    });
  }



  setDescripcion(des){
  	this.onEdit=des;
  	this.txtDescripcion=des.descripcion;
  	this.txtGrupo=des.id;
  	this.btnText='Editar';
    this.actionText='Editar Grupo';
  }

  updateGrupo(){
   // this.txtDescripcion=this.txtDescripcion.replace(/\n/g, "*");
   if(this.btnText=='Agregar'){
    let obj={
      "id": this.txtGrupo,
      "descripcion": this.txtDescripcion,      
    };
    console.log(obj);
      this._service.agregarGrupo(obj).subscribe(res => {
        console.log(res);
        this.arrayGrupos.push(res);
        this.contentModal.hide();
        this.txtDescripcion=''
        this.txtGrupo='';
      }, err => {
        console.log(err);
      });        
   }else{
    let obj={
      "id": this.onEdit['id'],
      "descripcion": this.txtDescripcion     
    };
    console.log(obj);
    this._service.actualizarGrupo(obj).subscribe(res => {
        console.log(res);
        this.onEdit['descripcion']=res['descripcion'];
        this.onEdit['id']=res['id'];
        this.contentModal.hide();
        this.txtDescripcion='';
      }, err => {
        console.log(err);
      });       
   }

  }

}
