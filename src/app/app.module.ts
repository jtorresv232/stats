import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StatsRoutingModule,routingComponents} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpService} from './http.service';
import { ToastModule } from 'ng-uikit-pro-standard';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsComponent2 } from './statistics2/statistics2.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { TabBarComponent} from './layout/tab-bar/tab-bar.component';
import { GruposComponent } from './grupos/grupos.component';
import { SabiasQueComponent } from './sabias-que/sabias-que.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { TextosComponent } from './textos/textos.component';
import { MyFilterPipe, MyFilterPipe2 } from './mypipe';
import { LoginComponent } from './login/login.component';
import {UserService} from './user.service';
import {AuthGuardService} from './auth-guard.service';
import {AdminAuthService} from './admin-auth.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StatisticsComponent,
    StatisticsComponent2,
    ToolbarComponent,
    SidenavComponent,
    ConfiguracionComponent,
    TabBarComponent,
    GruposComponent,
    SabiasQueComponent,
    ActividadesComponent,
    TextosComponent,
    MyFilterPipe,
    MyFilterPipe2,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    StatsRoutingModule,
    ToastModule.forRoot()
  ],  
  providers: [HttpService, AuthGuardService, AdminAuthService, UserService, MDBSpinningPreloader],
  bootstrap: [AppComponent]
})
export class AppModule { }
