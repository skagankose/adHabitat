import { Component, OnInit, Input } from '@angular/core';
import { DinosaurService } from '../../services/dinosaurService'
import { AdGroupService } from '../../services/adGroupService'
import { SingleCampaingService } from '../../services/singleCampaingService'
import { SingleGroupService } from '../../services/singleGroupService'
import { KeywordService } from '../../services/keywordService'

@Component({
  selector: 'dinosaurs',
  template: `<div class="row">
                <div class="col-xs-6" style="border-right:solid #EEEEEE;border-width: 1.5px;">
                  <chart [options]="optionDefault">
                  </chart>
                </div>
                <div class="col-xs-6">
                  <chart [options]="optionDinosaurs">
                  </chart>
                </div>
              </div>
              <hr>
              <div class="row">
              <div class="col-xs-12">
                <chart id = "keyword-graph" [options]="optionTable">
                </chart>
              </div>
              </div>
              <recommendations *ngIf="barchart"></recommendations>
            `
})
export class DinosaurComponent implements OnInit {

  keywords: any[];
  theCampaing: any[];
  theGroup: any[];
  dinos: any[];
  adGroups: any[];
  error: any;
  series = [];
  secondarySeries = [];
  thirdSeries = [];
  optionDefault: Object;
  optionDinosaurs: Object;
  barchart:boolean = false;

  constructor(private dinosaurService: DinosaurService,
              private adGroupService: AdGroupService,
              private singleCampaingService: SingleCampaingService,
              private singleGroupService: SingleGroupService,
              private keywordService: KeywordService,) {}

  generateData(ctr, names, cr) {
        let ret = {},
            ps = [],
            series = [],
            len = ctr.length;

        //concat to get cr
        for (var i = 0; i < len; i++) {
            ps[i] = {
                x: ctr[i],
                y: cr[i],
                n: names[i]
            };
        }
        names = [];

        //generate series and split cr
        for (i = 0; i < len; i++) {
            var p = ps[i],
                sIndex = names.indexOf(p.n);

            if (sIndex < 0) {
                sIndex = names.push(p.n) - 1;
                series.push({
                    name: p.n,
                    data: []
                });
            }
            series[sIndex].data.push(p);
        }
        return series;
    }

    drawAdGroups(e) {

         this.getTheCampaing(e.n,()=>{

              var adTitle: string[] = [];
              var adCTR: number[] = [];
              var adCR: number[] = [];

              for (let adGroupURL of this.theCampaing['adGroups']) {

                // console.log(url);
                this.getAdGroups(adGroupURL, ()=> {

                  // console.log(this.adGroups['keywords']);
                  // console.log(this.adGroups['ctr']);
                  // console.log(this.adGroups['cr']);
                  // console.log(this.adGroups);
                  // console.log(typeof(this.adGroups));

                  var myString: string = String(this.adGroups['title']);
                  adTitle.push(myString);
                  var myCTR: number = Number(this.adGroups['ctr']);
                  adCTR.push(myCTR);
                  var myCR: number = Number(this.adGroups['cr']);
                  adCR.push(myCR);

                  this.secondarySeries = this.generateData(adCR, adTitle, adCTR);

                  let that = this;
                  this.optionDinosaurs = {
                    chart: {
                      type: 'scatter',
                      zoomType: 'xy',
                      width: 450,
                      height: 300,
                    },
                    title:  {text: 'Ad Groups'},
                    legend: {enabled: false},
                    xAxis:  {
                      title: {
                        enabled: true,
                        text: 'CTR'
                      },
                    },
                    yAxis: {title: {text: 'CR'}},
                    plotOptions: {
                      scatter: {
                        cursor: 'pointer',
                          point: {
                            events: {
                              click: function(event) {

                              // console.log(this.options);
                              that.getTheGroup(this.options.n,()=>{

                                // console.log(that.theGroup);
                                var keywordTerm: string[] = [];
                                var keywordCTR: number[] = [];
                                var keywordCR: number[] = [];
                                for (let keywordURL of that.theGroup['keywords']) {

                                  // console.log(keywordURL);
                                  that.getKeywords(keywordURL, ()=> {

                                    var termsString: string = String(that.keywords['terms']);
                                    keywordTerm.push(termsString);
                                    var termsCTR: number = Number(that.keywords['ctr']);
                                    keywordCTR.push(termsCTR);
                                    var termsCR: number = Number(that.keywords['cr']);
                                    keywordCR.push(termsCR);

                                    // console.log(that.keywords['ctr']);
                                    that.optionTable = {
                                      chart: {
                                          type: 'bar',
                                          width: 900,
                                          height: 500,
                                          style: {
                                              fontFamily: 'Verdana'
                                          }
                                      },
                                      title: {
                                          text: 'Keywords'
                                      },
                                      xAxis: {
                                          categories: keywordTerm,
                                          title: {
                                              text: null
                                          }
                                      },
                                      yAxis: {
                                          min: 0,
                                          title: {
                                              text: 'Rate',
                                          },
                                      },
                                      plotOptions: {
                                          bar: {
                                              dataLabels: {
                                                  enabled: true
                                              }
                                          }
                                      },
                                      legend: {
                                          layout: 'vertical',
                                          align: 'right',
                                          verticalAlign: 'top',
                                          x: -5,
                                          y: 40,
                                          floating: true,
                                          borderWidth: 0.5,
                                          shadow: false
                                      },
                                      credits: {
                                          enabled: false
                                      },
                                      series: [{
                                          name: 'CTR',
                                          data: keywordCTR
                                      }, {
                                          name: 'CR',
                                          data: keywordCR
                                      }]
                                    }
                                    that.barchart=true;
                                  })
                                }
                              })
                            }
                          }
                        }
                      }
                    },
                    series: this.secondarySeries
                }
              })
            }
          })

        // console.log(e.n);

    }

  // Service to get all Ad Campaings3
  getCampaings(callback) {
    this.dinosaurService
        .getDinos()
        .then(dinos => {
          this.dinos = dinos;
          callback();
        })
        .catch(error => this.error = error);
  }

  // Service to get Ad Group(s)
  getAdGroups(url, callback){
    this.adGroupService
        .getData(url)
        .then(adGroups => {
          this.adGroups = adGroups;
          callback();
        })
        .catch(error => this.error = error);
  }

  // Service to get Camapings according to
  getTheCampaing(pk, callback){
    this.singleCampaingService
        .getData(pk)
        .then(theCampaing => {
          this.theCampaing = theCampaing;
          callback();
        })
        .catch(error => this.error = error);
  }

  // Service to get Groups according to
  getTheGroup(pk, callback){
    this.singleGroupService
        .getData(pk)
        .then(theGroup => {
          this.theGroup = theGroup;
          callback();
        })
        .catch(error => this.error = error);
  }

  // Service to get Keywords of Ad Groups
  getKeywords(url, callback){
    this.keywordService
        .getData(url)
        .then(keywords => {
          this.keywords = keywords;
          // console.log(keywords);
          callback();
        })
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getCampaings(()=>{

          var ads: string[] = [];
          var ctr: number[] = [];
          var cr: number[] = [];

          for (let dino of this.dinos) {
            var myString: string = String(dino.species);
            ads.push(myString);
            var myCTR: number = Number(dino.avg_ctr);
            ctr.push(myCTR);
            var myCR: number = Number(dino.avg_cr);
            cr.push(myCR);
          }

          this.series = this.generateData(cr, ads, ctr);

        let that = this;
        this.optionDefault = {
        chart: {
          type: 'scatter',
          zoomType: 'xy',
          width: 450,
          height: 300,
        },
        title:  {text: 'Ad Campaigns'},
        legend: {enabled: false},
        xAxis:  {
          title: {
            enabled: true,
            text: 'CTR'
          },
        },
        yAxis: {title: {text: 'CR'}},
        plotOptions: {
          scatter: {
            cursor: 'pointer',
              point: {
                events: {
                  click: function(event) {
                    that.drawAdGroups(this.options);
                }
              }
            }
          }
        },
        series: that.series
        }
    });
  }
}
