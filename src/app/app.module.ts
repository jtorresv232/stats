import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {StatsRoutingModule,routingComponents} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpService} from './http.service';
import { ToastModule } from './typescripts/pro/alerts/toast/toast.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsComponent2 } from './statistics2/statistics2.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { MDBBootstrapModule } from './typescripts/free';
import { MDBBootstrapModulePro } from './typescripts/pro/index';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { TabBarComponent} from './layout/tab-bar/tab-bar.component';
import { GruposComponent } from './grupos/grupos.component';
import { MDBSpinningPreloader } from './typescripts/pro/index';
import { SabiasQueComponent } from './sabias-que/sabias-que.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { TextosComponent } from './textos/textos.component';
import { MyFilterPipe, MyFilterPipe2 } from './mypipe';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StatisticsComponent,
    StatisticsComponent2,
    ToolbarComponent,
    SidenavComponent,
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
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    StatsRoutingModule,
    ToastModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [HttpService, MDBSpinningPreloader],
  bootstrap: [AppComponent]
})
export class AppModule { }
