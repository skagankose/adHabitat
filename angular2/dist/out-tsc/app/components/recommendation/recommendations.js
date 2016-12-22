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
import { RecommendationService } from '../../services/recommendationService';
var RecommendationComponent = (function () {
    function RecommendationComponent(recommendationService) {
        this.recommendationService = recommendationService;
    }
    RecommendationComponent.prototype.getRecommendations = function () {
        var _this = this;
        this.recommendationService
            .getRecommendations()
            .then(function (recommendations) { return _this.recommendations = recommendations; });
    };
    RecommendationComponent.prototype.delete = function (recommendation) {
        var _this = this;
        this.recommendationService
            .delete(recommendation.id)
            .then(function () {
            _this.recommendations = _this.recommendations.filter(function (h) { return h !== recommendation; });
            if (_this.selectedRecommendation === recommendation) {
                _this.selectedRecommendation = null;
            }
        });
    };
    RecommendationComponent.prototype.ngOnInit = function () {
        this.getRecommendations();
    };
    RecommendationComponent.prototype.onSelect = function (recommnedation) {
        this.selectedRecommendation = recommnedation;
    };
    return RecommendationComponent;
}());
RecommendationComponent = __decorate([
    Component({
        selector: 'recommendations',
        templateUrl: 'recommendations.html',
        styleUrls: ['recommendations.css']
    }),
    __metadata("design:paramtypes", [RecommendationService])
], RecommendationComponent);
export { RecommendationComponent };
//# sourceMappingURL=../../../../../src/app/components/recommendation/recommendations.js.map