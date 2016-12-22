import { Component, OnInit, Input } from '@angular/core';
import { RecommendationService } from '../../services/recommendationService'
import { RecommendationObj } from './Recommendation';

@Component({
  selector: 'recommendations',
  templateUrl:'recommendations.html',
  styleUrls: [ 'recommendations.css' ]
})

export class RecommendationComponent implements OnInit {
  recommendations: RecommendationObj[];
  selectedRecommendation: RecommendationObj;
  error: any[]
  constructor(private recommendationService: RecommendationService) {}

  getRecommendations():void{
    this.recommendationService
        .getRecommendations()
        .then(recommendations =>this.recommendations=recommendations);
  }

//
//   add(keyword: string): void {
//   keyword = keyword.trim();
//   if (!keyword) { return; }
//   this.recommendationService.create(keyword)
//     .then(recommendation => {
//       this.recommendations.push(recommendation);
//       this.selectedRecommendation = null;
//     });
// }

delete(recommendation:RecommendationObj): void {
  this.recommendationService
      .delete(recommendation.id)
      .then(() => {
        this.recommendations = this.recommendations.filter(h => h !== recommendation);
        if (this.selectedRecommendation === recommendation) { this.selectedRecommendation = null; }
      });
}

ngOnInit(): void {
  this.getRecommendations();

}
onSelect(recommnedation): void {
  this.selectedRecommendation = recommnedation;
}
  // recommendation: any[];
  // error: any;
  // selectedRecommendation: RecommendationObj;
  // onSelect(reco: RecommendationObj): void {
  // this.selectedRecommendation = reco;
  // }
  //
  // constructor(private recommendationService: RecommendationService) {
  //   this.recommendationService
  //       .getRecommendation()
  //       .then(recommendation =>{
  //         this.recommendation=recommendation
  //       }
  //
  //     )
  //
  // }
  //
  //
  //
  //
  //
  //


}
