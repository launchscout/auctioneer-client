import { bootstrap } from "angular2/platform/browser";
import { Component, CORE_DIRECTIVES, FORM_DIRECTIVES, provide } from "angular2/core";
import BidderService from "./bidder_service";
import AuctionBid from "./auction-bid";
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import PhoenixChannels from "angular2-phoenix-channels";

@Component({
  templateUrl: "app/auction-app.html",
  selector: "auction-app",
  providers: [BidderService],
  directives: [AuctionBid]
})
class AuctionApp {
  constructor(bidderService: BidderService) {
    this.bidderService = bidderService;
    this.bidderService.createBidder().subscribe((res) => {
      this.bidder = res.data;
    });
  }
}

let phoenixChannelsProvider = provide(PhoenixChannels, { useFactory: () => {
  return new PhoenixChannels("ws://localhost:4000/socket");
} });

bootstrap(AuctionApp, [HTTP_PROVIDERS, phoenixChannelsProvider]);
