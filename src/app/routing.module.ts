import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {AlumnosListaComponent} from './alumnos-lista/alumnos-lista.component'
import { StatisticsComponent } from './statistics/statistics.component';
const routes: Routes = [
	{path: 'listaAlumnos', component: AlumnosListaComponent},
	{path: 'statistics', component: StatisticsComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class StatsRoutingModule {}
export const routingComponents =[AlumnosListaComponent]
