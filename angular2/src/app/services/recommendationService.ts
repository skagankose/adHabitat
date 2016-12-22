import { Injectable } from '@angular/core';
import { Headers,Http,RequestOptions } from '@angular/http';
import { RecommendationObj } from '../components/recommendation/Recommendation'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecommendationService {
  apiURL = 'http://localhost:8000/recommendations';
  headers = new Headers({'Content-Type': 'application/json'});



  constructor(private http: Http) {

  }

  // getRecommendation() {
  //   return this.http.get(this.apiURL)
  //             .toPromise()
  //             .then(response => response.json())
  //             .catch(this.handleError);
  // }

  getRecommendations():Promise<RecommendationObj[]> {
  return this.http.get(this.apiURL)
             .toPromise()
             .then(response => response.json())
             .catch(this.handleError);
}
  getRecommendation(keyword):Promise<RecommendationObj>  {
    //const url = `${this.apiURL}/${keyword}`;
    return this.http.get('http://localhost:8000/recommendations/'+keyword)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
}
  delete(keyword): Promise<void>{
  //const url = `${this.apiURL}/${keyword}`;
  return this.http.delete('http://localhost:8000/recommendations/'+keyword)
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
}
//   create(keyword: string): Promise<RecommendationObj> {
//   return this.http
//     .post(this.apiURL, JSON.stringify({keyword: keyword}), {headers: this.headers})
//     .toPromise()
//     .then(res => res.json().data)
//     .catch(this.handleError);
// }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
