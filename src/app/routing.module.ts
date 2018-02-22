import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {AlumnosListaComponent} from './alumnos-lista/alumnos-lista.component'

const routes: Routes = [
	{path: 'listaAlumnos', component: AlumnosListaComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class StatsRoutingModule {}
export const routingComponents =[AlumnosListaComponent]