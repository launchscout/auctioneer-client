import { Component, CORE_DIRECTIVES, FORM_DIRECTIVES, provide } from "angular2/core";
import BidService from "./bid_service";
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
  templateUrl: "app/auction-bid.html",
  selector: "auction-bid",
  providers: [BidService]
})
class AuctionBid {
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

export default AuctionBid;
