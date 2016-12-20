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
var AppComponent = (function () {
    function AppComponent() {
        this.campaings = ['3DSMax-Search-SN', 'ASP.net-Search-SN', 'AbletonLive-FreeSearch-SN', 'AbletonLive-Search-SN', 'Access-FreeSearch-SN', 'Access-Search-SN', 'Accounting-FreeSearch-SN',
            'Accounting-Search-SN', 'Actionscript-Search-SN', 'AdobeAudition-Search-SN', 'AdobePremiere-FreeSearch-SN', 'AdobePremiere-Search-SN', 'Adwords-FreeSearch-SN',
            'Adwords-Search-SN', 'AffiliateMarketing-Search-SN', 'AfterEffects-FreeSearch-SN', 'AfterEffects-Search-SN', 'Ajax-FreeSearch-SN', 'Ajax-Search-SN', 'Android-FreeSearch-SN',
            'Android-Search-SN', 'AppMarketing-FreeSearch-SN', 'AppMarketing-Search-SN', 'Autocad-Search-SN',
            'AutodeskMaya-FreeSearch-SN', 'AutodeskMaya-Search-SN', 'AutodeskRevit-Search-SN', 'BigData-Search-SN', 'BlackandWhitePhotography-FreeSearch-SN', 'BlackandWhitePhotography-Search-SN', 'Blender-FreeSearch-SN',
            'Blender-Search-SN', 'Blogging-FreeSearch-SN', 'Blogging-Search-SN', 'Bootstrap-FreeSearch-SN', 'Bootstrap-Search-SN', 'BusinessDevelopment-Search-SN', 'CCNA-FreeSearch-SN', 'CCNA-Search-SN',
            'CCNP-FreeSearch-SN', 'CCNP-Search-SN', 'CFA-FreeSearch-SN', 'CFA-Search-SN', 'CLanguage-FreeSearch-SN',
            'CLanguage-Search-SN', 'CPlusPlus-FreeSearch-SN', 'CPlusPlus-Search-SN', 'CSS-FreeSearch-SN', 'CSS-Search-SN', 'CSharp-FreeSearch-SN'];
        this.avg_ctr = [0.015258792913622258, 0.010058646818212299, 0.032592444444444445, 0.0092501328315253446, 0.029446495855312727, 0.0090625546806649068, 0.031227188392007586, 0.0087948465873512773, 0.0090986518243661111, 0.012374652561709193, 0.021876953907815626, 0.010818719897870359, 0.0064020486555697821, 0.003677737275550156,
            0.014137573209190565, 0.020693281653746769, 0.0085915863581279856, 0.013333333333333334, 0.0070519867549668899,
            0.028734067897558075, 0.011659416171531906, 0.0, 0.005235602094240838, 0.0091890705189127467, 0.0071872377622377633,
            0.0091604070576176873, 0.010954478707782671, 0.006351321332822674, 0.0048192771084337354, 0.0077131202290076327,
            0.047576575121163173, 0.025331019650839157, 0.025874410029498526, 0.013282261662302364, 0.025793452380952379, 0.012993688658669574, 0.0075443131462333834, 0.026604192685102591, 0.005440471617584295, 0.041052631578947368, 0.0060838163895836402, 0.021136187399030695, 0.0048588200836820099,
            0.037953795379537955, 0.022257598676435827, 0.050381098288897697, 0.017271079013322796, 0.041448567870485682, 0.0098500895522388009, 0.039905913410770863];
        this.avg_cr = [0.0, 0.00087172265808355132, 0.0, 0.00060881115784812932, 0.0, 0.00065009113444152822, 0.0, 0.0,
            0.0016079158936301793, 0.00041485169052063887, 0.002004008016032064, 0.00017408460511808739, 0.0,
            6.7503712704198725e-05, 0.011262952395254542, 0.0, 0.0016157885625252466, 0.0, 0.0, 0.00029779630732578919,
            0.00012916559028674761, 0.0, 0.0, 6.3359310650700125e-05, 0.0, 0.0, 5.4386251155707835e-05, 0.0, 0.0, 0.0, 0.0,
            0.022701071097242138, 0.0, 0.0017780380176510523, 0.0, 0.0009882769901853872, 0.0, 0.0013380909901873326,
            0.00010670081092616304, 0.0, 0.00044137119317345886, 0.0, 0.0, 0.0, 0.000590876861262113, 0.0, 0.002755388471177944,
            0.0012453300124533001, 8.5287846481876332e-05, 0.0015839493136219642];
        this.series = this.generateData(this.avg_cr, this.campaings, this.avg_ctr);
        var that = this;
        this.option = {
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
            series: this.series
        };
    }
    AppComponent.prototype.generateData = function (ctr, names, cr) {
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
    AppComponent.prototype.draw_chart = function (e) {
        for (var _i = 0, _a = this.campaings; _i < _a.length; _i++) {
            var campaign = _a[_i];
            alert(campaign);
            if (e == campaign) {
                this.optionk = {
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
                                }]
                        }]
                };
            }
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=../../../src/app/app.component.js.map