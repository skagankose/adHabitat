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
import { Http } from '@angular/http';
var DummyService = (function () {
    function DummyService(http) {
        this.http = http;
        this.dummiesUrl = 'http://127.0.0.1:8000/snippets.json';
    }
    DummyService.prototype.getDummies = function () {
        return this.http.get(this.dummiesUrl)
            .map(function (response) { return response.json(); });
    };
    DummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return DummyService;
}());
DummyService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DummyService);
export { DummyService };
//# sourceMappingURL=../../../src/app/dummy.service.js.map