import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular2-highcharts';
import { DinosaurComponent } from './components/dinosaur/dinosaurs'
import { DinosaurService } from './services/dinosaurService'
import { AdGroupService } from './services/adGroupService'
import { SingleCampaingService } from './services/singleCampaingService'
import { SingleGroupService } from './services/singleGroupService'
import { KeywordService } from './services/keywordService'

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
  providers: [DinosaurService, AdGroupService,
              SingleCampaingService, KeywordService,
              SingleGroupService],
  bootstrap: [AppComponent, DinosaurComponent]
})
export class AppModule { }
