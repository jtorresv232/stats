import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(alumnos: any[], grupo: Object): any {
        
        if(grupo === undefined) return alumnos;

        return alumnos.filter(function(alumno){
            return alumno.grupo.includes(grupo);
        })
        }
}

@Pipe({
    name: 'thefilter',
    pure: false
})
export class MyFilterPipe2 implements PipeTransform {
    transform(alumnos: any[], nombre: Object): any {
        
        if(nombre === undefined) return alumnos;

        let nombretxt=nombre.toString();
        return alumnos.filter(function(alumno){
            return alumno.nombre_completo.toLowerCase().includes(nombretxt.toLowerCase());
        })
        }
}