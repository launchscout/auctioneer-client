import { bootstrap } from "angular2/platform/browser";
import { Component, CORE_DIRECTIVES, FORM_DIRECTIVES, provide } from "angular2/core";
import BidService from "./bid_service";
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import PhoenixChannels from "angular2-phoenix-channels";

@Component({
  templateUrl: "app/auction-bid.html",
  selector: "auction-bid",
  providers: [BidService]
})
class App {
  constructor(bidService: BidService) {
    this.newBid = {amount: 0};
    this.bidService = bidService;
    this.bidService.getMaxBid().subscribe((res) => {
      this.maxBid = res.data;
      this.newBid = {amount: this.maxBid.amount + 1};
      console.log(this.maxBid);
    });

  }
  addBid() {
    this.bidService.addBid(this.newBid).subscribe( (res) => {
      console.log(res);
    });
  }
}

let phoenixChannelsProvider = provide(PhoenixChannels, { useFactory: () => {
  return new PhoenixChannels("ws://localhost:4000/socket");
} });

bootstrap(App, [HTTP_PROVIDERS, phoenixChannelsProvider]);
