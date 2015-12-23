import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Injectable } from "angular2/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";
import {Observable} from "rxjs";

@Injectable()
class BidderService {
  constructor(http: Http) {
    this.http = http;
  }

  createBidder() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/api/bidders',
      JSON.stringify({bidder: {} }),
      {headers: headers}
    ).map(res => res.json());
  }
}

export default BidderService;
