import { Component, OnInit, Input } from '@angular/core';
import { DinosaurService } from '../../services/dinosaurService'

@Component({
  selector: 'dinosaurs',
  template: `<ul><li *ngFor="let dino of dinos">{{dino.species}} - {{dino.campaing}} - {{dino.avg_ctr}} - {{dino.avg_cr}}</li></ul>
            <chart [options]="optionDefault">
            </chart>
            <chart [options]="optionDinosaurs">
            </chart>`
})
export class DinosaurComponent implements OnInit {

  dinos: any[];
  error: any;

  optionDefault: Object;
  optionDinosaurs: Object;

  // campaings = ['CPlusPlus-FreeSearch-SN', 'CPlusPlus-Search-SN', 'CSS-FreeSearch-SN', 'CSS-Search-SN', 'CSharp-FreeSearch-SN']
  //
  //  avg_ctr = [0.037953795379537955, 0.022257598676435827, 0.050381098288897697, 0.017271079013322796, 0.041448567870485682]
  //
  // avg_cr = [0.000590876861262113, 0.0, 0.002755388471177944,0.0012453300124533001, 8.5287846481876332e-05]

  series = [];

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

    draw_chart(e) {
      console.log(e);

          this.optionDinosaurs = {
            chart: {
              type: 'column'
            },
            xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [{
              data: [{
                y: 10.9,
              }, {
                  y: 10.5,
                }, {
                  y: 10.4,
                }, {
                  y: 10.4,
                }, {
                  y: 10.4,
                }, {
                  y: 9.0,
                }, {
                  y: 7.2,
                }, {
                  y: 6.3,
                }, {
                  y: 10.4,
                }]
            }]
          }


    }

  constructor(private dinosaurService: DinosaurService) {
          // this.series = this.generateData(this.avg_cr, this.campaings, this.avg_ctr);

          this.dinosaurService
              .getDinos()
              .then(dinos => {

                this.dinos = dinos

                var ads: string[] = [];
                var ctr: number[] = [];
                var cr: number[] = [];

                for (let dino of dinos){
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
          title: {
            text: 'Avg CTR and CR of Campaigns'
          },
          legend: {
            enabled: false
          },
          xAxis: {
              title: {
                  enabled: true,
                  text: 'Avg CTR'
              },
          },
          yAxis: {
              title: {
                  text: ' Avg CR'
                }
              },

          plotOptions: {
            scatter: {
              cursor: 'pointer',
                point: {
                  events: {
                    click: function(event) {
                      // console.log(this.options.n)
                      that.draw_chart(this.options.n);
                    //this.draw_chart(1);
                  }
                }
              }
            }
          },
          series: that.series
        }
      })
  }

  // logerDinos(dinos) {
  //
  //   var ads: string[] = [];
  //   var ctr: number[] = [];
  //   var cr: number[] = [];
  //
  //   for (let dino of dinos){
  //     var myString: string = String(dino.species);
  //     ads.push(myString);
  //     var myCTR: number = Number(dino.avg_ctr);
  //     ctr.push(myCTR);
  //     var myCR: number = Number(dino.avg_cr);
  //     cr.push(myCR);
  //   }
  //   console.log(ads);
  //   console.log(ctr);
  //   console.log(cr);
  //   this.series = this.generateData(cr, ads, ctr);
  //   console.log(this.series)
  //
  // }

  // getDinos() {
  //   this.dinosaurService
  //       .getDinos()
  //       .then(dinos => this.dinos = dinos)
  //       .catch(error => this.error = error);
  // }

  // logDinos() {
  //   this.dinosaurService
  //       .getDinos()
  //       .then(dinos => {this.logerDinos(dinos);})
  // }

  ngOnInit() {
    // this.getDinos();
    // this.logDinos();
  }
}
