import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StatsRoutingModule,routingComponents} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {StatsService} from './stats.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StatsRoutingModule
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
