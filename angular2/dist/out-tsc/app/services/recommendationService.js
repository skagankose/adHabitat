var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var RecommendationService = (function () {
    function RecommendationService(http) {
        this.http = http;
        this.apiURL = 'http://localhost:8000/recommendations';
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    RecommendationService.prototype.getRecommendations = function () {
        return this.http.get(this.apiURL)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RecommendationService.prototype.getRecommendation = function (keyword) {
        return this.http.get('http://localhost:8000/recommendations/' + keyword)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RecommendationService.prototype.delete = function (keyword) {
        return this.http.delete('http://localhost:8000/recommendations/' + keyword)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    RecommendationService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return RecommendationService;
}());
RecommendationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], RecommendationService);
export { RecommendationService };
//# sourceMappingURL=../../../../src/app/services/recommendationService.js.map