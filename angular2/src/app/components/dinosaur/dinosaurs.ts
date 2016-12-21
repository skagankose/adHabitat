import { Component, OnInit, Input } from '@angular/core';
import { DinosaurService } from '../../services/dinosaurService'
import { AdGroupService } from '../../services/adGroupService'
import { SingleCampaingService } from '../../services/singleCampaingService'
import { SingleGroupService } from '../../services/singleGroupService'
import { KeywordService } from '../../services/keywordService'

@Component({
  selector: 'dinosaurs',
  template: `<!--
            <ul><li *ngFor="let dino of dinos">
              {{dino.species}} - {{dino.campaing}} - {{dino.avg_ctr}} - {{dino.avg_cr}}
            </li></ul>
            -->
            <span style="text-align: center; font-family:Verdana;">
            <h1>AD Habitat </h1>
            <chart [options]="optionDefault">
            </chart>
            <chart [options]="optionDinosaurs">
            </chart>
            <chart [options]="optionTable">
            </chart>`
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

          // this.getAdGroups(()=>{
          //   console.log(this.adGroups)
          // })

         this.getTheCampaing(e.n,()=>{

              var adTitle: string[] = [];
              var adCTR: number[] = [];
              var adCR: number[] = [];

              for (let adGroupURL of this.theCampaing['adGroups']) {
                // console.log(url);
                this.getAdGroups(adGroupURL, ()=> {

                  // for (let keyword of this.adGroups['keywords']) {
                  //   console.log(keyword);
                  // }

                  // console.log(this.adGroups['keywords']);
                  // console.log(this.adGroups['ctr']);
                  // console.log(this.adGroups['cr']);

                  // console.log(this.adGroups);
                  // console.log(typeof(this.adGroups));
                  // for(var anAdGroup in this.adGroups) {
                  //   console.log(anAdGroup);
                  // }

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
                      zoomType: 'xy'
                    },
                    title:  {text: 'Avg CTR and CR of Ad Groups'},
                    legend: {enabled: false},
                    xAxis:  {
                      title: {
                        enabled: true,
                        text: 'Avg CTR'
                      },
                    },
                    yAxis: {title: {text: ' Avg CR'}},
                    plotOptions: {
                      scatter: {
                        cursor: 'pointer',
                          point: {
                            events: {
                              click: function(event) {
                              // that.writeKeywords();
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

                                    // that.thirdSeries = that.generateData(termsCR, keywordTerm, keywordCTR);

                                    // console.log(that.keywords['ctr']);

                                    that.optionTable = {
                                      chart: {
                                          type: 'bar'
                                      },
                                      title: {
                                          text: 'Keywords with Features'
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
                                          x: -40,
                                          y: 80,
                                          floating: true,
                                          borderWidth: 1,
                                          shadow: true
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

                                  })

                                }
                              })
                              //  that.getKeywords(this.options.n,()=>{
                              //   console.log(that.keywords);
                              //  })
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

        //   this.optionDinosaurs = {
        //     chart: {
        //       type: 'column'
        //     },
        //     xAxis: {
        //       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //     },
        //     series: [{
        //              data: [
        //                     {y: 10.9,}, {y: 10.5,}, {y: 10.4,},
        //                     {y: 10.4,}, {y: 10.4,}, {y: 9.0,},
        //                     {y: 7.2,}, {y: 6.3,}, {y: 10.4,}
        //                    ]
        //             }]
        // }

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
          zoomType: 'xy'
        },
        title:  {text: 'Avg CTR and CR of Campaigns'},
        legend: {enabled: false},
        xAxis:  {
          title: {
            enabled: true,
            text: 'Avg CTR'
          },
        },
        yAxis: {title: {text: ' Avg CR'}},
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
