import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {AlumnosListaComponent} from './alumnos-lista/alumnos-lista.component'
import { StatisticsComponent } from './statistics/statistics.component';
import { TextosComponent} from './textos/textos.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { SabiasQueComponent } from './sabias-que/sabias-que.component';
import { GruposComponent } from './grupos/grupos.component'

const routes: Routes = [
	{path: 'listaAlumnos', component: AlumnosListaComponent},
	{path: 'statistics', component: StatisticsComponent},
	{path: 'textos', component: TextosComponent},
	{path: 'actividades', component: ActividadesComponent},
	{path: 'sabiasQue', component: SabiasQueComponent},
	{path: 'grupos', component: GruposComponent},
	{path: '', component: AlumnosListaComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class StatsRoutingModule {}
export const routingComponents =[AlumnosListaComponent,
StatisticsComponent,
TextosComponent,
ActividadesComponent,
SabiasQueComponent,
GruposComponent]
