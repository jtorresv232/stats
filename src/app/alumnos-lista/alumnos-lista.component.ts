import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpService } from '../http.service';
import { MyFilterPipe,MyFilterPipe2 } from '../mypipe'

@Component({
  selector: 'app-alumnos-lista',
  templateUrl: './alumnos-lista.component.html',
  styleUrls: ['./alumnos-lista.component.css'],
  pipes: [MyFilterPipe, MyFilterPipe2]
})
export class AlumnosListaComponent implements OnInit {

  public info:boolean=false;
  public arrayGrupos:any;
  public arrayAlumnos:any = [];
  public actionText:string;
  public onEdit;
  public btnText;
  public grupoSelected;
  public txtNombre;
  public onDelete;
  public Selecteds=[];
  public filteredList;
  public filterGroup="";
  public filterName="";
  public need="";


  @ViewChild('form') public contentModal;
  constructor(private _service: HttpService) { }

  ngOnInit() {
  this._service.getAlumnos().subscribe(res => {
      this.arrayAlumnos = res;
    },err=>{
      console.log(err);
    });

  this._service.getGrupos().subscribe(res => {
      this.arrayGrupos = res;
    },err=>{
      console.log(err);
    });
  }

  setAlumno(des){
    this.onEdit=des;
    this.txtNombre=des.nombre_completo;
    this.btnText='Editar';
    this.need='No es necesario que llene todos los campos'
    this.actionText='Editar Alumno';
    this.grupoSelected=des.grupo;
  }

  

  updateAlumno(){
   // this.txtDescripcion=this.txtDescripcion.replace(/\n/g, "*");
   if(this.btnText=='Agregar'){
    let obj={
      "nombre_completo": this.txtNombre,
      "grupo": this.grupoSelected   
    };
    console.log(obj);
      this._service.agregarAlumno(obj).subscribe(res => {
        console.log(res);
        this.arrayAlumnos.push(res);
        this.contentModal.hide();
        this.txtNombre='';
      }, err => {
        console.log(err);
      });        
   }else if(this.btnText=='Editar Masivamente'){
    let obj;
    for(let selected of this.Selecteds){
      obj={
      "id":selected.id,
      "nombre_completo": selected.nombre_completo,
      "grupo": this.grupoSelected   
      };
      this._service.actualizarAlumno(obj).subscribe(res => {
        selected['nombre_completo']=res['nombre_completo'];
        selected['grupo']=res['grupo'];
        this.contentModal.hide();
        this.txtNombre='';
      }, err => {
        console.log(err);
      });
      var pos= this.arrayAlumnos.indexOf(this.arrayAlumnos.filter(i=>{
        return i.id==selected.id;
      })[0]); 
      this.arrayAlumnos[pos]=selected; 

    }
    this.Selecteds=[];
   }else{
    let obj={
      "id":this.onEdit['id'],
      "nombre_completo": this.txtNombre,
      "grupo": this.grupoSelected   
    };
    console.log(obj);
    this._service.actualizarAlumno(obj).subscribe(res => {
        console.log(res);
        this.onEdit['nombre_completo']=res['nombre_completo'];
        this.onEdit['grupo']=res['grupo'];
        this.contentModal.hide();
        this.txtNombre='';
      }, err => {
        console.log(err);
      });       
   }

  }

  borrarAlumno(item){
    this.onDelete=item;
    var deleted=this.onDelete;
    console.log("--------------");
    console.log(this.onDelete);
    console.log("--------------");
    var pos= this.arrayAlumnos.indexOf(this.arrayAlumnos.filter(i=>{
        return i.id==item.id;
      })[0]);
     this._service.borrarAlumno(deleted).subscribe(res => {
      console.log(res);
      this.arrayAlumnos.splice(pos, 1);
    },err=>{
      console.log(err);
    });
  }


  toggleCheck(event,item){
    if(event.target.checked){
      console.log(item);
      this.Selecteds.push(item);
    }else{
      var pos= this.Selecteds.indexOf(this.Selecteds.filter(i=>{
        return i.id==item.id;
      })[0]);
       this.Selecteds.splice(pos, 1);
    }
  }


}
