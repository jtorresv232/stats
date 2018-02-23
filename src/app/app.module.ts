import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {StatsRoutingModule,routingComponents} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {StatsService} from './stats.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StatisticsComponent,
    ToolbarComponent
  ],
  imports: [
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
