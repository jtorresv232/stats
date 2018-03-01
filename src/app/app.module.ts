import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {StatsRoutingModule,routingComponents} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {StatsService} from './stats.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TabBarComponent} from './layout/tab-bar/tab-bar.component';
import { GruposComponent } from './grupos/grupos.component';
import { SabiasQueComponent } from './sabias-que/sabias-que.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { TextosComponent } from './textos/textos.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StatisticsComponent,
    ToolbarComponent,
    SidenavComponent,
    TabBarComponent,
    GruposComponent,
    SabiasQueComponent,
    ActividadesComponent,
    TextosComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    StatsRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
