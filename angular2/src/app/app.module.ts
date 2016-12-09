import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular2-highcharts';
import { DinosaurComponent } from './components/dinosaur/dinosaurs'
import { DinosaurService } from './services/dinosaurService'

@NgModule({
  declarations: [
    AppComponent,
    DinosaurComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
  ],
  providers: [DinosaurService],
  bootstrap: [AppComponent, DinosaurComponent]
})
export class AppModule { }
