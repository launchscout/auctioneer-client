import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Injectable } from "angular2/core";
import PhoenixChannels from "angular2-phoenix-channels";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";
import {Observable} from "rxjs";

@Injectable()
class ThingService {
  constructor(http: Http, phoenixChannels: PhoenixChannels) {
    this.http = http;
    this.phoenixChannels = phoenixChannels;
    this.thingsChannel = this.phoenixChannels.channel("things:all");
    this.thingsChannel.join().subscribe( () => { console.log("joined!"); });
  }

  getThings() {
    channelObservable = this.thingsChannel.observeMessage("change");
    httpObservable = this.http.get('http://localhost:4000/api/things').map(res => res.json());
    return Observable.merge(channelObservable, httpObservable);
  }

  addThing(thing) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/api/things',
      JSON.stringify({thing: thing}),
      {headers: headers}
    ).map(res => res.json());
  }
}

export default ThingService;
