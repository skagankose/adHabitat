var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DinosaurService } from '../../services/dinosaurService';
var DinosaurComponent = (function () {
    function DinosaurComponent(dinosaurService) {
        var _this = this;
        this.dinosaurService = dinosaurService;
        this.series = [];
        this.dinosaurService
            .getDinos()
            .then(function (dinos) {
            _this.dinos = dinos;
            var ads = [];
            var ctr = [];
            var cr = [];
            for (var _i = 0, dinos_1 = dinos; _i < dinos_1.length; _i++) {
                var dino = dinos_1[_i];
                var myString = String(dino.species);
                ads.push(myString);
                var myCTR = Number(dino.avg_ctr);
                ctr.push(myCTR);
                var myCR = Number(dino.avg_cr);
                cr.push(myCR);
            }
            _this.series = _this.generateData(cr, ads, ctr);
            var that = _this;
            _this.optionDefault = {
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
                                click: function (event) {
                                    that.draw_chart(this.options.n);
                                }
                            }
                        }
                    }
                },
                series: that.series
            };
        });
    }
    DinosaurComponent.prototype.generateData = function (ctr, names, cr) {
        var ret = {}, ps = [], series = [], len = ctr.length;
        for (var i = 0; i < len; i++) {
            ps[i] = {
                x: ctr[i],
                y: cr[i],
                n: names[i]
            };
        }
        names = [];
        for (i = 0; i < len; i++) {
            var p = ps[i], sIndex = names.indexOf(p.n);
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
    };
    DinosaurComponent.prototype.draw_chart = function (e) {
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
        };
    };
    DinosaurComponent.prototype.ngOnInit = function () {
    };
    return DinosaurComponent;
}());
DinosaurComponent = __decorate([
    Component({
        selector: 'dinosaurs',
        template: "<ul><li *ngFor=\"let dino of dinos\">{{dino.species}} - {{dino.campaing}} - {{dino.avg_ctr}} - {{dino.avg_cr}}</li></ul>\n            <chart [options]=\"optionDefault\">\n            </chart>\n            <chart [options]=\"optionDinosaurs\">\n            </chart>"
    }),
    __metadata("design:paramtypes", [DinosaurService])
], DinosaurComponent);
export { DinosaurComponent };
//# sourceMappingURL=../../../../../src/app/components/dinosaur/dinosaurs.js.map