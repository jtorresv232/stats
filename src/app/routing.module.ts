import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {AlumnosListaComponent} from './alumnos-lista/alumnos-lista.component'
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsComponent2 } from './statistics2/statistics2.component';
import { TextosComponent} from './textos/textos.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { SabiasQueComponent } from './sabias-que/sabias-que.component';
import { GruposComponent } from './grupos/grupos.component'
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from './auth-guard.service';
import {AdminAuthService} from './admin-auth.service';

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'listaAlumnos', component: AlumnosListaComponent, canActivate: [AuthGuardService]},
	{path: 'statistics1', component: StatisticsComponent, canActivate: [AuthGuardService]},
	{path: 'statistics2', component: StatisticsComponent2, canActivate: [AuthGuardService] },
	{path: 'textos', component: TextosComponent, canActivate: [AuthGuardService]},
	{path: 'actividades', component: ActividadesComponent, canActivate: [AuthGuardService]},
	{path: 'sabiasQue', component: SabiasQueComponent, canActivate: [AuthGuardService]},
	{path: 'grupos', component: GruposComponent, canActivate: [AuthGuardService]},
	{path: '', component: SabiasQueComponent, canActivate: [AuthGuardService]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class StatsRoutingModule {}
export const routingComponents =[AlumnosListaComponent,
StatisticsComponent,
StatisticsComponent2,
TextosComponent,
LoginComponent,
ActividadesComponent,
SabiasQueComponent,
GruposComponent]
