import { Component, Input, CORE_DIRECTIVES, FORM_DIRECTIVES, provide } from "angular2/core";
import BidService from "./bid_service";
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
  templateUrl: "app/auction-bid.html",
  selector: "auction-bid",
  providers: [BidService]
})
class AuctionBid {
  @Input() bidder;
  constructor(bidService: BidService) {
    this.newBid = {amount: 0};
    this.bidService = bidService;
    this.bidService.getMaxBid().subscribe((res) => {
      this.maxBid = res.data;
      this.newBid = {amount: this.maxBid.amount + 1};
      console.log(this.maxBid);
    });
  }

  winning() {
    return this.maxBid && this.bidder && this.maxBid.bidder_id == this.bidder.id;
  }

  losing() {
    return this.maxBid && this.bidder && this.maxBid.bidder_id != this.bidder.id;
  }

  addBid() {
    this.newBid.bidder_id = this.bidder.id;
    this.bidService.addBid(this.newBid).subscribe( (res) => {
      console.log("result is", res);
      this.error = null;
    }, (error) => {
      console.log(error);
      this.error = error;
    });
  }
}

export default AuctionBid;
