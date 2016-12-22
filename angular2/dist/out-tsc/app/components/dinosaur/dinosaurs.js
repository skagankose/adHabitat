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
import { AdGroupService } from '../../services/adGroupService';
import { SingleCampaingService } from '../../services/singleCampaingService';
import { SingleGroupService } from '../../services/singleGroupService';
import { KeywordService } from '../../services/keywordService';
var DinosaurComponent = (function () {
    function DinosaurComponent(dinosaurService, adGroupService, singleCampaingService, singleGroupService, keywordService) {
        this.dinosaurService = dinosaurService;
        this.adGroupService = adGroupService;
        this.singleCampaingService = singleCampaingService;
        this.singleGroupService = singleGroupService;
        this.keywordService = keywordService;
        this.series = [];
        this.secondarySeries = [];
        this.thirdSeries = [];
        this.barchart = false;
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
    DinosaurComponent.prototype.drawAdGroups = function (e) {
        var _this = this;
        this.getTheCampaing(e.n, function () {
            var adTitle = [];
            var adCTR = [];
            var adCR = [];
            for (var _i = 0, _a = _this.theCampaing['adGroups']; _i < _a.length; _i++) {
                var adGroupURL = _a[_i];
                _this.getAdGroups(adGroupURL, function () {
                    var myString = String(_this.adGroups['title']);
                    adTitle.push(myString);
                    var myCTR = Number(_this.adGroups['ctr']);
                    adCTR.push(myCTR);
                    var myCR = Number(_this.adGroups['cr']);
                    adCR.push(myCR);
                    _this.secondarySeries = _this.generateData(adCR, adTitle, adCTR);
                    var that = _this;
                    _this.optionDinosaurs = {
                        chart: {
                            type: 'scatter',
                            zoomType: 'xy',
                            width: 450,
                            height: 300,
                        },
                        title: { text: 'Ad Groups' },
                        legend: { enabled: false },
                        xAxis: {
                            title: {
                                enabled: true,
                                text: 'CTR'
                            },
                        },
                        yAxis: { title: { text: 'CR' } },
                        plotOptions: {
                            scatter: {
                                cursor: 'pointer',
                                point: {
                                    events: {
                                        click: function (event) {
                                            that.getTheGroup(this.options.n, function () {
                                                var keywordTerm = [];
                                                var keywordCTR = [];
                                                var keywordCR = [];
                                                for (var _i = 0, _a = that.theGroup['keywords']; _i < _a.length; _i++) {
                                                    var keywordURL = _a[_i];
                                                    that.getKeywords(keywordURL, function () {
                                                        var termsString = String(that.keywords['terms']);
                                                        keywordTerm.push(termsString);
                                                        var termsCTR = Number(that.keywords['ctr']);
                                                        keywordCTR.push(termsCTR);
                                                        var termsCR = Number(that.keywords['cr']);
                                                        keywordCR.push(termsCR);
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
                                                        };
                                                        that.barchart = true;
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        },
                        series: _this.secondarySeries
                    };
                });
            }
        });
    };
    DinosaurComponent.prototype.getCampaings = function (callback) {
        var _this = this;
        this.dinosaurService
            .getDinos()
            .then(function (dinos) {
            _this.dinos = dinos;
            callback();
        })
            .catch(function (error) { return _this.error = error; });
    };
    DinosaurComponent.prototype.getAdGroups = function (url, callback) {
        var _this = this;
        this.adGroupService
            .getData(url)
            .then(function (adGroups) {
            _this.adGroups = adGroups;
            callback();
        })
            .catch(function (error) { return _this.error = error; });
    };
    DinosaurComponent.prototype.getTheCampaing = function (pk, callback) {
        var _this = this;
        this.singleCampaingService
            .getData(pk)
            .then(function (theCampaing) {
            _this.theCampaing = theCampaing;
            callback();
        })
            .catch(function (error) { return _this.error = error; });
    };
    DinosaurComponent.prototype.getTheGroup = function (pk, callback) {
        var _this = this;
        this.singleGroupService
            .getData(pk)
            .then(function (theGroup) {
            _this.theGroup = theGroup;
            callback();
        })
            .catch(function (error) { return _this.error = error; });
    };
    DinosaurComponent.prototype.getKeywords = function (url, callback) {
        var _this = this;
        this.keywordService
            .getData(url)
            .then(function (keywords) {
            _this.keywords = keywords;
            callback();
        })
            .catch(function (error) { return _this.error = error; });
    };
    DinosaurComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCampaings(function () {
            var ads = [];
            var ctr = [];
            var cr = [];
            for (var _i = 0, _a = _this.dinos; _i < _a.length; _i++) {
                var dino = _a[_i];
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
                    zoomType: 'xy',
                    width: 450,
                    height: 300,
                },
                title: { text: 'Ad Campaigns' },
                legend: { enabled: false },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'CTR'
                    },
                },
                yAxis: { title: { text: 'CR' } },
                plotOptions: {
                    scatter: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function (event) {
                                    that.drawAdGroups(this.options);
                                }
                            }
                        }
                    }
                },
                series: that.series
            };
        });
    };
    return DinosaurComponent;
}());
DinosaurComponent = __decorate([
    Component({
        selector: 'dinosaurs',
        template: "<div class=\"row\">\n                <div class=\"col-xs-6\" style=\"border-right:solid #EEEEEE;border-width: 1.5px;\">\n                  <chart [options]=\"optionDefault\">\n                  </chart>\n                </div>\n                <div class=\"col-xs-6\">\n                  <chart [options]=\"optionDinosaurs\">\n                  </chart>\n                </div>\n              </div>\n              <hr>\n              <div class=\"row\">\n              <div class=\"col-xs-12\">\n                <chart id = \"keyword-graph\" [options]=\"optionTable\">\n                </chart>\n              </div>\n              </div>\n              <recommendations *ngIf=\"barchart\"></recommendations>\n            "
    }),
    __metadata("design:paramtypes", [DinosaurService,
        AdGroupService,
        SingleCampaingService,
        SingleGroupService,
        KeywordService])
], DinosaurComponent);
export { DinosaurComponent };
//# sourceMappingURL=../../../../../src/app/components/dinosaur/dinosaurs.js.map