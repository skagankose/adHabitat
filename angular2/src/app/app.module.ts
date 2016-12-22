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
import { RouterModule }   from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component'


@NgModule({
  declarations: [
    AppComponent,
    DinosaurComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    RouterModule.forRoot([
      {
        path: 'charts',
        component: DinosaurComponent
      },
      {
        path: 'fileUpload',
        component: FileUploadComponent
      },
      {
        path: '',
        redirectTo: '/fileUpload',
        pathMatch: 'full'
      },

    ])
  ],
  providers: [DinosaurService, AdGroupService,
              SingleCampaingService, KeywordService,
              SingleGroupService],
  bootstrap: [AppComponent, DinosaurComponent]
})
export class AppModule { }
