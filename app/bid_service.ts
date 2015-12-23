import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Injectable } from "angular2/core";
import PhoenixChannels from "angular2-phoenix-channels";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";
import {Observable} from "rxjs";

@Injectable()
class BidService {
  constructor(http: Http, phoenixChannels: PhoenixChannels) {
    this.http = http;
    this.phoenixChannels = phoenixChannels;
    this.maxBidChannel = this.phoenixChannels.channel("bids:max");
    this.maxBidChannel.join().subscribe( () => { console.log("joined!"); });
  }

  getMaxBid() {
    channelObservable = this.maxBidChannel.observeMessage("change");
    httpObservable = this.http.get('http://localhost:4000/api/bids/max').map(res => res.json());
    return Observable.merge(channelObservable, httpObservable);
  }

  addBid(bid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/api/bids',
      JSON.stringify({bid: bid}),
      {headers: headers}
    ).map(res => res.json());
  }
}

export default BidService;
