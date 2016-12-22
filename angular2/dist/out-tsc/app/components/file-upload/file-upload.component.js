var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
var FileUploadComponent = (function () {
    function FileUploadComponent(http, el) {
        this.http = http;
        this.el = el;
    }
    FileUploadComponent.prototype.upload = function () {
        var _this = this;
        var inputEl = this.el.nativeElement.firstElementChild;
        if (inputEl.files.length > 0) {
            var file = inputEl.files[0];
            console.log(file);
            var headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
            this.http.post('http://0.0.0.0:8000/upload/', file, { headers: headers })
                .subscribe(function (error) { return _this.errorMessage = error; });
        }
    };
    return FileUploadComponent;
}());
FileUploadComponent = __decorate([
    Component({
        selector: 'file-upload',
        templateUrl: './file-upload.component.html',
    }),
    __metadata("design:paramtypes", [Http, ElementRef])
], FileUploadComponent);
export { FileUploadComponent };
//# sourceMappingURL=../../../../../src/app/components/file-upload/file-upload.component.js.map